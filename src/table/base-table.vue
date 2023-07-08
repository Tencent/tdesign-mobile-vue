<template>
  <div ref="tableRef" :class="dynamicBaseTableClasses" style="position: relative">
    <div
      ref="tableContentRef"
      :class="tableBaseClass.content"
      :style="tableContentStyles"
      @wheel="onInnerVirtualScroll"
    >
      <table ref="tableElmRef" :class="tableElmClasses" :style="tableElementStyles">
        <colgroup>
          <col
            v-for="col_item in columns"
            :key="col_item.colKey"
            :style="{
              width: `${formatCSSUnit(col_item.width || defaultColWidth)}`,
              minWidth: `${
                !formatCSSUnit(col_item.width || defaultColWidth) && !col_item.minWidth && tableLayout === 'fixed'
                  ? '80px'
                  : formatCSSUnit(col_item.minWidth)
              }`,
            }"
          />
        </colgroup>
        <thead v-if="showHeader" ref="theadRef" :class="theadClasses">
          <tr>
            <th
              v-for="(item_th, index_th) in columns"
              :key="index_th"
              :class="[
                {
                  [`${classPrefix}-table__th-${item_th.colKey}`]: item_th.colKey,
                  [tdEllipsisClass]: item_th.ellipsisTitle || item_th.ellipsis,
                  [tdAlignClasses[`${item_th.align}`]]: item_th.align && item_th.align !== 'left',
                },
              ]"
            >
              <div :class="(item_th.ellipsisTitle || item_th.ellipsis) && ellipsisClasses">{{ item_th.title }}</div>
            </th>
          </tr>
        </thead>
        <tbody :class="tbodyClasses">
          <tr v-if="renderContentEmpty" :class="tableBaseClass.emptyRow">
            <td :colspan="columns?.length">
              <div :class="tableBaseClass.empty">
                <t-node :content="renderContentEmpty"></t-node>
              </div>
            </td>
          </tr>
          <tr
            v-for="(tr_item, tr_index) in data"
            v-else
            :key="tr_index"
            @click="handleRowClick(tr_item, tr_index, $event)"
          >
            <td
              v-for="(td_item, td_index) in columns"
              :key="td_index"
              :class="[
                {
                  [tdEllipsisClass]: td_item.ellipsis,
                  [tdAlignClasses[`${td_item.align}`]]: td_item.align && td_item.align !== 'left',
                },
              ]"
              @click="handleCellClick(tr_item, td_item, tr_index, td_index, $event)"
            >
              <div
                v-if="![undefined, '', null].includes(get(tr_item, td_item.colKey || ''))"
                :class="td_item.ellipsis && ellipsisClasses"
              >
                {{ get(tr_item, td_item.colKey || '') }}
              </div>
              <t-node v-else :content="renderCellEmptyContent"></t-node>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loadingContent" :class="loadingClasses">
        <t-node :content="loadingContent"></t-node>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, getCurrentInstance, h } from 'vue';
import get from 'lodash/get';
import TdBaseTableProps from './base-table-props';
import config from '../config';
import useClassName from './hooks/useClassName';
import useStyle, { formatCSSUnit } from './hooks/useStyle';
import { renderTNode, TNode } from '../shared';
import { TableRowData } from './type';
import TLoading from '../loading';

const { prefix } = config;
const name = `${prefix}-base-table`;

export default defineComponent({
  name,
  components: { TNode },
  props: TdBaseTableProps,
  emits: ['cell-click', 'row-click', 'scroll'],
  setup(props) {
    const { classPrefix, tableLayoutClasses, tableHeaderClasses, tableBaseClass, tdAlignClasses, tdEllipsisClass } =
      useClassName();
    const defaultLoadingContent = h(TLoading, { ...props.loadingProps });
    // 表格基础样式类
    const { tableClasses, tableContentStyles, tableElementStyles } = useStyle(props);

    const defaultColWidth = props.tableLayout === 'fixed' ? '80px' : undefined;

    const theadClasses = computed(() => [
      tableHeaderClasses.header,
      {
        [tableHeaderClasses.fixed]: Boolean(props.maxHeight || props.height),
        [tableBaseClass.bordered]: props.bordered,
      },
    ]);

    const tbodyClasses = computed(() => [tableBaseClass.body]);

    const ellipsisClasses = computed(() => [`${classPrefix}-table__ellipsis`, `${classPrefix}-text-ellipsis`]);

    const handleRowClick = (row: TableRowData, rowIndex: number, e: MouseEvent) => {
      props.onRowClick?.({ row, index: rowIndex, e });
    };

    const handleCellClick = (row: TableRowData, col: any, rowIndex: number, colIndex: number, e: MouseEvent) => {
      if (col.stopPropagation) {
        e.stopPropagation();
      }
      props.onCellClick?.({ row, col, rowIndex, colIndex, e });
    };

    const dynamicBaseTableClasses = computed(() => [tableClasses.value]);

    const tableElmClasses = computed(() => [[tableLayoutClasses[props.tableLayout || 'fixed']]]);
    const internalInstance = getCurrentInstance();
    const renderContentEmpty = computed(() => renderTNode(internalInstance, 'empty'));
    const renderCellEmptyContent = computed(() => renderTNode(internalInstance, 'cellEmptyContent'));
    const loadingClasses = computed(() => [`${classPrefix}-table__loading--full`]);
    const loadingContent = computed(() =>
      renderTNode(internalInstance, 'loading', { defaultNode: defaultLoadingContent }),
    );
    const onInnerVirtualScroll = (e: WheelEvent) => {
      props.onScroll?.({ params: e });
    };

    return {
      ...toRefs(props),
      classPrefix,
      tableBaseClass,
      dynamicBaseTableClasses,
      tableContentStyles,
      tableElmClasses,
      tableElementStyles,
      defaultColWidth,
      tableHeaderClasses,
      theadClasses,
      tdAlignClasses,
      tdEllipsisClass,
      tbodyClasses,
      ellipsisClasses,
      renderContentEmpty,
      renderCellEmptyContent,
      loadingClasses,
      loadingContent,
      formatCSSUnit,
      onInnerVirtualScroll,
      get,
      handleCellClick,
      handleRowClick,
    };
  },
});
</script>
