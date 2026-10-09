import { ref, computed, watch, onBeforeUnmount, Ref } from 'vue';
import { get } from 'lodash-es';
import type { MoveEvent, Options, SortableEvent } from 'sortablejs';
import Sortable from 'sortablejs';
import { getColumnDataByKey, getColumnIndexByKey } from '../../_common/js/table/utils';
import swapDragArrayElement from '../../_common/js/utils/swapDragArrayElement';
import { hasClass } from '../../shared/dom';
import useClassName from './useClassName';
import type { BaseTableColumns, PrimaryTableRef } from '../interface';
import type { DragSortContext, PaginationProps, TableRowData, TdPrimaryTableProps } from '../type';

export const EXPANDED_SUFFIX = '__expanded';
export const DATA_ID_ATTR = 'data-id';
export const DATA_PARENT_ID_ATTR = 'data-parent-id';

interface DragSortOptions {
  primaryTableRef: Ref<PrimaryTableRef>;
  innerPagination: Ref<PaginationProps | undefined>;
}

function useDragSort(props: TdPrimaryTableProps, options: DragSortOptions) {
  const { dragSort, data, onDragSort } = props;
  const { primaryTableRef, innerPagination } = options;

  const { tableDraggableClasses, tableExpandClasses, tableBaseClass, tableFullRowClasses } = useClassName();

  const columns = ref<BaseTableColumns>(props.columns || []);
  const dragCol = computed(() => columns.value.find((item: any) => item.colKey === 'drag'));
  const isRowDraggable = computed(() => dragSort === 'row');
  const isRowHandlerDraggable = computed(
    () => ['row-handler', 'row-handler-col'].includes(dragSort || '') && !!dragCol.value,
  );
  const isColDraggable = computed(() => ['col', 'row-handler-col'].includes(dragSort || ''));

  let tData: TableRowData[] = data || [];
  const dragRowInstance = ref<Sortable | null>(null);
  const dragColInstance = ref<Sortable | null>(null);
  const trIdList = ref<string[]>([]);
  const lastColIdList = ref<string[]>([]);
  const dragColumns = ref<BaseTableColumns>([]);
  const originalColumns = ref<BaseTableColumns>([]);
  const scrollRef = ref<{ el: HTMLElement; prevOverflowY: string } | null>(null);

  const updateLastRowList = () => {
    trIdList.value = dragRowInstance.value?.toArray() || [];
  };

  const lockScrollContainer = () => {
    // 虚拟滚动场景下锁定容器滚动，避免 DOM 索引计算异常
    // eslint-disable-next-line no-underscore-dangle
    const isVirtual = tData?.some((d: any) => d.__VIRTUAL_SCROLL_INDEX !== undefined);
    if (!isVirtual) return;
    const el = primaryTableRef.value?.tableContentElement as HTMLElement | undefined;
    if (!el || scrollRef.value) return;
    scrollRef.value = { el, prevOverflowY: el.style.overflowY };
    el.style.overflowY = 'hidden';
  };

  const unlockScrollContainer = () => {
    // 拖拽结束时解锁，恢复原先的 overflow-y 值
    if (!scrollRef.value) return;
    const { el, prevOverflowY } = scrollRef.value;
    el.style.overflowY = prevOverflowY;
    scrollRef.value = null;
  };

  const getDataPageIndex = (index: number, pagination: PaginationProps) => {
    const current = pagination.current ?? pagination.defaultCurrent;
    const pageSize = pagination.pageSize ?? pagination.defaultPageSize;
    if (pagination && data.length > pageSize) {
      return pageSize * (current - 1) + index;
    }
    return index;
  };

  const cloneNodeWithStyles = (sourceEl: HTMLElement) => {
    const clone = sourceEl.cloneNode(true) as HTMLElement;
    const sourceEls = sourceEl.querySelectorAll('*');
    const cloneEls = clone.querySelectorAll('*');

    const cloneStyles = (src: HTMLElement, dest: HTMLElement) => {
      if (!window) return dest;
      const computed = window.getComputedStyle(src);
      const cssText = Array.from(computed)
        .map((name) => `${name}:${computed.getPropertyValue(name)};`)
        .join('');
      dest.style.cssText = cssText;
    };

    cloneStyles(sourceEl, clone);
    sourceEls.forEach((src, i) => cloneStyles(src as HTMLElement, cloneEls[i] as HTMLElement));
    return clone;
  };

  const getDescendantRows = (parentId: string) => {
    const container = primaryTableRef.value?.tableContentElement;
    const children = Array.from(
      container?.querySelectorAll(`tr[${DATA_PARENT_ID_ATTR}="${parentId}"]`) || [],
    ) as HTMLElement[];
    let allDescendants = [...children];
    children.forEach((child) => {
      const childId = child.getAttribute(DATA_ID_ATTR);
      if (childId) {
        allDescendants = allDescendants.concat(getDescendantRows(childId));
      }
    });
    return allDescendants;
  };

  const getValidSiblingId = (el: Element | null, dir: 'prev' | 'next'): string | null => {
    let node = el;
    while (node) {
      if (node.nodeType !== 1) {
        node = dir === 'prev' ? node.previousElementSibling : node.nextElementSibling;
        continue;
      }
      const id = node.getAttribute(DATA_ID_ATTR);
      const isFullRow = hasClass(node as HTMLElement, tableFullRowClasses.base);
      const isExpandedRow = id && id.endsWith(EXPANDED_SUFFIX);
      if (id && !isFullRow && !isExpandedRow) return id;
      node = dir === 'prev' ? node.previousElementSibling : node.nextElementSibling;
    }
    return null;
  };

  const registerRowDragEvent = (element: HTMLElement): void => {
    if (element?.children?.length === 0 || (!isRowHandlerDraggable.value && !isRowDraggable.value)) return;

    const dragContainer = element?.querySelector('tbody');
    if (!dragContainer) return null;

    const baseOptions: Options = {
      animation: 150,
      dataIdAttr: DATA_ID_ATTR,
      ghostClass: tableDraggableClasses.ghost,
      chosenClass: tableDraggableClasses.chosen,
      dragClass: tableDraggableClasses.dragging,
      filter: `.${tableFullRowClasses.base}`,
      setData: (dataTransfer, dragEl) => {
        const dragRowId = dragEl.getAttribute(DATA_ID_ATTR);
        const childRows = getDescendantRows(dragRowId);

        if (!childRows || childRows.length === 0) return;

        // 拖拽时跟随在鼠标附近的元素剪影
        const ghostNode = cloneNodeWithStyles(dragEl);
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.borderSpacing = '0';
        const tbody = document.createElement('tbody');
        tbody.appendChild(ghostNode);

        childRows.forEach((row) => {
          tbody.appendChild(cloneNodeWithStyles(row as HTMLElement));
        });
        table.appendChild(tbody);

        // 必须先有实际节点
        document.body.appendChild(table);
        dataTransfer.setDragImage(table, 10, 10);
        requestAnimationFrame(() => {
          if (document.body.contains(table)) {
            // 开启移动后即可移除
            document.body.removeChild(table);
          }
        });
      },
      onStart: (evt: SortableEvent) => {
        lockScrollContainer();
        updateLastRowList();
        const dragRowId = evt.item.getAttribute(DATA_ID_ATTR);
        (evt.to as HTMLElement).style.overflow = 'hidden';
        const childRows = getDescendantRows(dragRowId);
        childRows.forEach((row) => {
          (row as HTMLElement).style.display = 'none';
        });
      },
      onMove: (evt: MoveEvent) => {
        const isFullRow = hasClass(evt.related, tableFullRowClasses.base);
        if (isFullRow) return false;
        const { related, willInsertAfter } = evt;
        const isTargetExpandedParent = hasClass(related, tableExpandClasses.expanded);
        const isTargetExpandedChild = hasClass(related, tableExpandClasses.row);
        if (isTargetExpandedParent && willInsertAfter) {
          return false;
        }
        return !(isTargetExpandedChild && !willInsertAfter);
      },
      onEnd: (evt: SortableEvent) => {
        try {
          const dragId = evt.item.getAttribute(DATA_ID_ATTR);
          const prevId = getValidSiblingId(evt.item.previousElementSibling, 'prev');
          const nextId = getValidSiblingId(evt.item.nextElementSibling, 'next');

          const childRows = getDescendantRows(dragId);
          childRows.forEach((row) => {
            (row as HTMLElement).style.display = '';
          });

          const dataIdList = tData.map((item) => String(get(item, props.rowKey)));
          const currentIndex = dataIdList.indexOf(dragId);
          if (currentIndex === -1) return;

          let targetIndex = -1;
          if (prevId) {
            const anchor = dataIdList.indexOf(prevId);
            if (anchor === -1) return;
            targetIndex = anchor < currentIndex ? anchor + 1 : anchor;
          } else if (nextId) {
            const anchor = dataIdList.indexOf(nextId);
            if (anchor === -1) return;
            targetIndex = anchor > currentIndex ? anchor - 1 : anchor;
          } else {
            return;
          }

          if (targetIndex === currentIndex) return;

          let swapCurrent = currentIndex;
          let swapTarget = targetIndex;

          if (innerPagination.value?.current) {
            swapCurrent = getDataPageIndex(swapCurrent, innerPagination.value);
            swapTarget = getDataPageIndex(swapTarget, innerPagination.value);
          }

          const newData = swapDragArrayElement([...tData], swapCurrent, swapTarget);
          const params: DragSortContext<TableRowData> = {
            currentIndex: swapCurrent,
            current: tData[swapCurrent],
            targetIndex: swapTarget,
            target: tData[swapTarget],
            data: tData,
            newData,
            e: evt,
            sort: 'row',
          };
          params.currentData = params.newData;

          if (onDragSort) {
            dragRowInstance.value?.sort(trIdList.value);
            onDragSort(params);
          } else {
            tData = newData;
            updateLastRowList();
          }
        } finally {
          unlockScrollContainer();
        }
      },
      ...props.dragSortOptions,
    };

    try {
      if (isRowDraggable.value) {
        dragRowInstance.value = new Sortable(dragContainer, { ...baseOptions });
      } else if (isRowHandlerDraggable.value) {
        dragRowInstance.value = new Sortable(dragContainer, {
          ...baseOptions,
          handle: `.${tableDraggableClasses.handle}`,
        });
      }
    } catch (error) {
      // log.error
    }
    updateLastRowList();
  };

  const registerOneLevelColDragEvent = (container: HTMLElement, recover: boolean) => {
    const options: Options = {
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
          dragColInstance.value?.sort([...lastColIdList.value]);
        }
        const { oldIndex, newIndex, target: targetElement } = evt;
        let currentIndex = recover ? oldIndex : newIndex;
        let targetIndex = recover ? newIndex : oldIndex;
        const oldElement = (targetElement as HTMLElement).children[currentIndex] as HTMLElement;
        const newElement = (targetElement as HTMLElement).children[targetIndex] as HTMLElement;
        const current = getColumnDataByKey(originalColumns.value, oldElement.dataset.colkey);
        const target = getColumnDataByKey(originalColumns.value, newElement.dataset.colkey);
        if (!current || !current.colKey) return;
        if (!target || !target.colKey) return;
        currentIndex = getColumnIndexByKey(originalColumns.value, current.colKey);
        targetIndex = getColumnIndexByKey(originalColumns.value, target.colKey);
        const params: DragSortContext<TableRowData> = {
          data: dragColumns.value,
          currentIndex,
          current,
          targetIndex,
          target,
          newData: swapDragArrayElement([...originalColumns.value], currentIndex, targetIndex),
          e: evt,
          sort: 'col',
        };
        params.currentData = params.newData;
        onDragSort?.(params);
      },
      ...props.dragSortOptions,
    };
    if (!container) return;

    dragColInstance.value = new Sortable(container, options);
    return dragColInstance.value;
  };

  const registerColDragEvent = (tableElement: HTMLElement) => {
    if (!isColDraggable.value || !tableElement) return;

    const trList = tableElement.querySelectorAll('thead > tr');
    if (trList.length <= 1) {
      const container = trList[0];
      const dragInstanceTmp = registerOneLevelColDragEvent(container as HTMLElement, true);
      lastColIdList.value = dragInstanceTmp?.toArray();
    } else {
      trList?.forEach((container) => {
        registerOneLevelColDragEvent(container as HTMLElement, false);
      });
    }
  };

  const cleanupSortableInstances = () => {
    dragRowInstance.value?.destroy();
    dragRowInstance.value = null;
    dragColInstance.value?.destroy();
    dragColInstance.value = null;
  };

  watch(
    () => data,
    (newData) => {
      tData = newData || [];
      updateLastRowList();
    },
    { immediate: true },
  );

  watch(
    () => props.columns,
    (newColumns) => {
      lastColIdList.value = (newColumns || []).map((t) => t.colKey);
      dragColumns.value = newColumns || [];
      originalColumns.value = newColumns || [];
    },
    { immediate: true },
  );

  watch(
    () => [columns.value, dragSort, innerPagination.value, primaryTableRef.value],
    () => {
      if (!primaryTableRef.value) return;
      cleanupSortableInstances();
      registerRowDragEvent(primaryTableRef.value.tableElement);
      registerColDragEvent(primaryTableRef.value.tableHtmlElement);
    },
    { immediate: true },
  );

  onBeforeUnmount(() => {
    cleanupSortableInstances();
  });

  const updateLastRowListFn = () => {
    updateLastRowList();
  };

  const setDragSortColumns = (cols: BaseTableColumns) => {
    columns.value = cols;
  };

  return {
    isRowDraggable,
    isRowHandlerDraggable,
    isColDraggable,
    updateLastRowList: updateLastRowListFn,
    setDragSortColumns,
  };
}

export default useDragSort;
