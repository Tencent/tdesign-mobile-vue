import { defineComponent, ref, h, PropType } from 'vue';
import { isEmpty } from 'lodash-es';
import { FilterIcon } from 'tdesign-icons-vue-next';
import log from '../_common/js/log';
import Button from '../button';
import { CheckboxGroup } from '../checkbox';
import Input from '../input';
import Popup from '../popup';
import { RadioGroup } from '../radio';
import { useConfig } from '../config-provider/useConfig';
import type { TableClassName } from './hooks/useClassName';
import type { FilterValue, PrimaryTableCol, TableRowData, TdPrimaryTableProps } from './type';

export default defineComponent({
  name: 'TableFilterController',
  props: {
    filterIcon: Function as PropType<TdPrimaryTableProps['filterIcon']>,
    tFilterValue: Object as PropType<FilterValue>,
    innerFilterValue: Object as PropType<FilterValue>,
    tableFilterClasses: Object as PropType<TableClassName['tableFilterClasses']>,
    isFocusClass: String,
    column: Object as PropType<PrimaryTableCol<TableRowData>>,
    colIndex: Number,
    popupProps: Object as PropType<Record<string, any>>,
    onVisibleChange: Function as PropType<(val: boolean) => void>,
    onReset: Function as PropType<(column: PrimaryTableCol<TableRowData>) => void>,
    onConfirm: Function as PropType<(column: PrimaryTableCol<TableRowData>) => void>,
    onInnerFilterChange: Function as PropType<(val: any, column: PrimaryTableCol<TableRowData>) => void>,
  },
  setup(props) {
    const { globalConfig } = useConfig('table');
    const filterPopupVisible = ref(false);
    const defaultFilterIcon = <FilterIcon />;

    const onFilterPopupVisibleChange = (visible: boolean) => {
      filterPopupVisible.value = visible;
      props.onVisibleChange?.(visible);
    };

    const renderFilterIcon = (filterIcon: any, column: PrimaryTableCol<TableRowData>, colIndex: number) => {
      if (!filterIcon) return defaultFilterIcon;
      if (typeof filterIcon === 'function') {
        return filterIcon(h, { col: column, colIndex });
      }
      return filterIcon;
    };

    const getFilterContent = (column: PrimaryTableCol<TableRowData>) => {
      const filter = column.filter || {};
      const filterType = filter.type;
      const types = ['single', 'multiple', 'input'];
      if (column.type && filterType && !types.includes(filterType as string)) {
        log.error('Table', `TDesign Table Error: column.filter.type must be the following: ${JSON.stringify(types)}`);
        return;
      }
      const Component: any = {
        single: RadioGroup,
        multiple: CheckboxGroup,
        input: Input,
      }[filterType as string];
      if (!Component && !filter.component) return;
      const filterComponentProps: { [key: string]: any } = {
        options: ['single', 'multiple'].includes(filterType as string) ? filter.list : undefined,
        ...(filter.props || {}),
        onChange: (val: any) => {
          props.onInnerFilterChange?.(val, column);
        },
      };
      if (column.colKey && props.innerFilterValue && column.colKey in props.innerFilterValue) {
        filterComponentProps.value = props.innerFilterValue[column.colKey];
      }
      // 允许自定义触发确认搜索的事件
      if (filter.confirmEvents) {
        filter.confirmEvents.forEach((event) => {
          filterComponentProps[event] = () => {
            filterPopupVisible.value = false;
            props.onConfirm?.(column);
          };
        });
      }
      const FilterComponent = filter.component || Component;
      return (
        <div class={props.tableFilterClasses.contentInner}>
          <FilterComponent class={filter.classNames} style={filter.style} {...filter.attrs} {...filterComponentProps} />
        </div>
      );
    };

    const getBottomButtons = (column: PrimaryTableCol<TableRowData>) => {
      if (!column.filter.showConfirmAndReset) return;
      return (
        <div class={props.tableFilterClasses.bottomButtons}>
          <Button
            theme="default"
            size="small"
            onClick={() => {
              filterPopupVisible.value = false;
              props.onReset?.(column);
            }}
          >
            {globalConfig.value.resetText}
          </Button>
          <Button
            theme="primary"
            size="small"
            onClick={() => {
              filterPopupVisible.value = false;
              props.onConfirm?.(column);
            }}
          >
            {globalConfig.value.confirmText}
          </Button>
        </div>
      );
    };

    return () => {
      const { column, colIndex, filterIcon, tFilterValue } = props;
      if (!column.filter || (column.filter && !Object.keys(column.filter).length)) {
        return null;
      }
      const filterValue = tFilterValue?.[column.colKey];
      const isObjectTrue = typeof filterValue === 'object' && !isEmpty(filterValue);
      const isValueExist = ![null, undefined, ''].includes(filterValue as any) && typeof filterValue !== 'object';
      return (
        <div class={[props.tableFilterClasses.icon, { [props.isFocusClass]: isObjectTrue || isValueExist }]}>
          <div
            onClick={() => {
              filterPopupVisible.value = true;
            }}
          >
            {renderFilterIcon(filterIcon, column, colIndex)}
          </div>
          <Popup
            visible={filterPopupVisible.value}
            destroyOnClose
            placement="bottom"
            onVisibleChange={(val: boolean) => onFilterPopupVisibleChange(val)}
            {...props.popupProps}
          >
            <div class={props.tableFilterClasses.popupContent}>
              {getFilterContent(column)}
              {getBottomButtons(column)}
            </div>
          </Popup>
        </div>
      );
    };
  },
});
