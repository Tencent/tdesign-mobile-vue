/**
 * 基于 sortablejs 实现表格的行与列的拖拽功能
 * @docs https://github.com/SortableJS/Sortable
 *
 * (1) toArray() 会返回当前容器内所有 tr 节点的 dataIdAttr 列表
 * (2) sort([id1, id2]) 会根据传入的数组自动重新排序 DOM 节点
 *     用于受控模式：恢复拖拽前顺序，等外部数据更新后由 Vue 响应式渲染最终顺序
 */

import { computed, nextTick, onBeforeUnmount, ref, shallowRef, toRefs } from 'vue';
import Sortable, { type Options as SortableOptions, type SortableEvent } from 'sortablejs';
import { get } from 'lodash-es';
import log from '../../_common/js/log';
import { getColumnIndexByKey } from '../../_common/js/table/utils';
import swapDragArrayElement from '../../_common/js/utils/swapDragArrayElement';
import useClassName from './useClassName';
import type { BaseTableColumns } from '../interface';
import type { DragSortContext, TableRowData, TdPrimaryTableProps } from '../type';

export const DATA_ID_ATTR = 'data-id';

export default function useDragSort(props: TdPrimaryTableProps) {
  const { dragSort, data } = toRefs(props);
  const { tableDraggableClasses, tableBaseClass, tableFullRowClasses } = useClassName();

  // 拖拽排序功能内部记录的列信息，由 BaseTable 的 onLeafColumnsChange 同步过来
  const dragSortColumns = shallowRef<BaseTableColumns>((props.columns as unknown as BaseTableColumns) || []);

  // Sortable 实例
  const dragRowInstance = ref<Sortable | null>(null);
  const dragColInstance = ref<Sortable | null>(null);

  // 存储拖拽前的行顺序（用于受控模式恢复）
  const trIdList = ref<string[]>([]);

  // 判断是否有拖拽手柄列
  const dragCol = computed(() => dragSortColumns.value.find((item) => item.colKey === 'drag'));

  // 行拖拽（整行拖拽）
  const isRowDraggable = computed(() => dragSort.value === 'row' || dragSort.value === 'row-handler-col');
  // 行拖拽（手柄列拖拽）
  const isRowHandlerDraggable = computed(
    () => ['row-handler', 'row-handler-col'].includes(dragSort.value) && !!dragCol.value,
  );
  // 列拖拽
  const isColDraggable = computed(() => ['col', 'row-handler-col'].includes(dragSort.value));

  /** 同步表格的 tr 结构变化 */
  const updateLastRowList = () => {
    trIdList.value = dragRowInstance.value?.toArray() || [];
  };

  /**
   * 注册行拖拽事件
   */
  function registerRowDragEvent(element: HTMLElement): void {
    if (!element || (!isRowHandlerDraggable.value && !isRowDraggable.value)) return;

    const dragContainer = element.querySelector('tbody');
    if (!dragContainer) {
      log.error('Table', 'tbody does not exist, cannot bindDrag sort.');
      return;
    }

    const baseOptions: SortableOptions = {
      animation: 150,
      dataIdAttr: DATA_ID_ATTR,
      ghostClass: tableDraggableClasses.ghost,
      chosenClass: tableDraggableClasses.chosen,
      dragClass: tableDraggableClasses.dragging,
      filter: `.${tableFullRowClasses.base}`,
      onStart: () => {
        updateLastRowList();
      },
      onEnd: (evt: SortableEvent) => {
        if (evt.oldIndex === evt.newIndex) return;

        const currentData = data.value || [];
        const rowKey = props.rowKey || 'id';

        // 通过 data-id 获取拖拽元素对应的数据索引
        const dragId = evt.item.getAttribute(DATA_ID_ATTR);
        const dataIdList = currentData.map((item) => String(get(item, rowKey)));
        const currentIndex = dataIdList.indexOf(dragId);
        if (currentIndex === -1) return;

        // 获取拖拽后相邻元素的 ID 来确定目标位置
        const prevSibling = evt.item.previousElementSibling;
        const nextSibling = evt.item.nextElementSibling;
        const prevId = prevSibling?.getAttribute(DATA_ID_ATTR) || null;
        const nextId = nextSibling?.getAttribute(DATA_ID_ATTR) || null;

        let targetIndex = -1;
        if (prevId) {
          const anchor = dataIdList.indexOf(prevId);
          if (anchor !== -1) {
            targetIndex = anchor < currentIndex ? anchor + 1 : anchor;
          }
        } else if (nextId) {
          const anchor = dataIdList.indexOf(nextId);
          if (anchor !== -1) {
            targetIndex = anchor > currentIndex ? anchor - 1 : anchor;
          }
        }

        if (targetIndex === -1 || targetIndex === currentIndex) {
          // 位置未变或无法确定，恢复 DOM
          dragRowInstance.value?.sort(trIdList.value);
          return;
        }

        const newData = swapDragArrayElement([...currentData], currentIndex, targetIndex);
        const params: DragSortContext<TableRowData> = {
          currentIndex,
          current: currentData[currentIndex],
          targetIndex,
          target: currentData[targetIndex],
          data: currentData,
          newData,
          e: evt,
          sort: 'row',
        };
        params.currentData = params.newData;

        // 受控模式：先恢复 DOM 为拖拽前顺序，再触发事件让外部更新 data
        // 外部更新 data 后 Vue 重新渲染，DOM 将呈现正确顺序
        dragRowInstance.value?.sort(trIdList.value);
        props.onDragSort?.(params);
      },
      ...(props.dragSortOptions || {}),
    };

    if (isRowDraggable.value) {
      dragRowInstance.value = new Sortable(dragContainer, { ...baseOptions });
    } else if (isRowHandlerDraggable.value) {
      dragRowInstance.value = new Sortable(dragContainer, {
        ...baseOptions,
        handle: `.${tableDraggableClasses.handle}`,
      });
    }

    // 初始化后同步 trIdList
    updateLastRowList();
  }

  /**
   * 注册列拖拽事件（单层表头）
   */
  function registerOneLevelColDragEvent(container: HTMLElement, recover: boolean) {
    const lastColIdList = dragColInstance.value?.toArray() || [];

    const options: SortableOptions = {
      animation: 150,
      dataIdAttr: 'data-colkey',
      direction: 'vertical',
      ghostClass: tableDraggableClasses.ghost,
      chosenClass: tableDraggableClasses.chosen,
      dragClass: tableDraggableClasses.dragging,
      handle: `.${tableBaseClass.thCellInner}`,
      onEnd: (evt: SortableEvent) => {
        if (evt.newIndex === evt.oldIndex) return;
        if (recover) {
          dragColInstance.value?.sort([...lastColIdList]);
        }
        const { oldIndex, newIndex, target: targetElement } = evt;
        const currentColIndex = recover ? oldIndex : newIndex;
        const targetColIndex = recover ? newIndex : oldIndex;
        const oldElement = targetElement.children[currentColIndex] as HTMLElement;
        const newElement = targetElement.children[targetColIndex] as HTMLElement;
        const currentIndex = getColumnIndexByKey(props.columns, oldElement?.getAttribute('data-colkey'));
        const targetIndex = getColumnIndexByKey(props.columns, newElement?.getAttribute('data-colkey'));

        const params: DragSortContext<TableRowData> = {
          data: dragSortColumns.value as unknown as TableRowData[],
          currentIndex,
          current: props.columns[currentIndex] as unknown as TableRowData,
          targetIndex,
          target: props.columns[targetIndex] as unknown as TableRowData,
          newData: swapDragArrayElement([...props.columns], currentIndex, targetIndex) as unknown as TableRowData[],
          e: evt,
          sort: 'col',
        };
        params.currentData = params.newData;
        props.onDragSort?.(params);
      },
      ...(props.dragSortOptions || {}),
    };

    if (!container) return;
    dragColInstance.value = new Sortable(container, options);
  }

  /**
   * 注册列拖拽事件
   */
  function registerColDragEvent(tableElement: HTMLElement) {
    if (!isColDraggable.value || !tableElement) return;
    const trList = tableElement.querySelectorAll('thead > tr');
    if (trList.length <= 1) {
      const [container] = trList;
      if (container) {
        registerOneLevelColDragEvent(container as HTMLElement, true);
      }
    } else {
      trList.forEach((container) => {
        registerOneLevelColDragEvent(container as HTMLElement, false);
      });
    }
  }

  /** 销毁所有 Sortable 实例 */
  function cleanupSortableInstances() {
    if (dragRowInstance.value) {
      dragRowInstance.value.destroy();
      dragRowInstance.value = null;
    }
    if (dragColInstance.value) {
      dragColInstance.value.destroy();
      dragColInstance.value = null;
    }
  }

  /** 外部调用：设置内部列信息（由 BaseTable onLeafColumnsChange 触发） */
  function setDragSortColumns(val: BaseTableColumns) {
    dragSortColumns.value = val;
  }

  /**
   * 核心注册逻辑：在合适的时机绑定/重绑 Sortable
   * @param tableEl 表格容器 DOM 元素
   */
  function registerDragEvent(tableEl: HTMLElement | null | undefined) {
    if (!tableEl || !dragSort.value) return;
    // 给 DOM 一帧时间完成渲染
    nextTick(() => {
      setTimeout(() => {
        cleanupSortableInstances();
        registerRowDragEvent(tableEl);
        registerColDragEvent(tableEl);
      }, 60);
    });
  }

  // 组件卸载前销毁
  onBeforeUnmount(() => {
    cleanupSortableInstances();
  });

  return {
    isRowDraggable,
    isRowHandlerDraggable,
    isColDraggable,
    setDragSortColumns,
    registerDragEvent,
  };
}
