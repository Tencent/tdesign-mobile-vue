import { defineComponent, h, ref, isVNode, type PropType } from 'vue';
import { isEmpty, isFunction } from 'lodash-es';
import { FilterIcon } from 'tdesign-icons-vue-next';
import log from '../../_common/js/log';
import TButton from '../../button';
import { CheckboxGroup } from '../../checkbox';
import { Input } from '../../input';
import { RadioGroup } from '../../radio';
import { Popup, type PopupProps } from '../../popup';
import { useConfig } from '../../config-provider/useConfig';
import { useTNodeJSX } from '../../hooks/tnode';
import type { FilterValue, PrimaryTableCol, TableRowData, TdPrimaryTableProps } from '../type';
import type { TableClassName } from '../hooks/useClassName';

export default defineComponent({
  name: 'TTableFilterController',
  props: {
    filterIcon: {
      type: Function as PropType<TdPrimaryTableProps['filterIcon']>,
    },
    tFilterValue: {
      type: Object as PropType<FilterValue>,
    },
    innerFilterValue: {
      type: Object as PropType<FilterValue>,
    },
    tableFilterClasses: {
      type: Object as PropType<TableClassName['tableFilterClasses']>,
      required: true,
    },
    isFocusClass: {
      type: String,
      required: true,
    },
    column: {
      type: Object as PropType<PrimaryTableCol<TableRowData>>,
      required: true,
    },
    colIndex: {
      type: Number,
    },
    popupProps: {
      type: Object as PropType<PopupProps>,
    },
    onVisibleChange: {
      type: Function as PropType<(val: boolean) => void>,
    },
    onReset: {
      type: Function as PropType<(column: PrimaryTableCol<TableRowData>) => void>,
    },
    onConfirm: {
      type: Function as PropType<(column: PrimaryTableCol<TableRowData>) => void>,
    },
    onInnerFilterChange: {
      type: Function as PropType<(val: any, column: PrimaryTableCol<TableRowData>) => void>,
    },
  },
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const { globalConfig } = useConfig('table');
    const filterPopupVisible = ref(false);

    const onFilterPopupVisibleChange = (visible: boolean) => {
      filterPopupVisible.value = visible;
      props.onVisibleChange?.(visible);
    };

    const renderDefaultFilterIcon = () => {
      const icon = renderTNodeJSX('filterIcon', { params: { col: props.column, colIndex: props.colIndex } });
      if (icon) return icon;
      const configIcon = globalConfig.value.filterIcon;
      if (isFunction(configIcon)) return configIcon(h);
      if (isVNode(configIcon)) return configIcon;
      return <FilterIcon />;
    };

    const getFilterContent = (column: PrimaryTableCol<TableRowData>) => {
      const types = ['single', 'multiple', 'input'];
      if (column.filter.type && !types.includes(column.filter.type)) {
        log.error('Table', `TDesign Table Error: column.filter.type must be the following: ${JSON.stringify(types)}`);
        return null;
      }
      const ComponentMap: Record<string, any> = {
        single: RadioGroup,
        multiple: CheckboxGroup,
        input: Input,
      };
      const Component = ComponentMap[column.filter.type];
      if (!Component && !column.filter?.component) return null;

      const filterComponentProps: Record<string, any> = {
        options: ['single', 'multiple'].includes(column.filter.type) ? column.filter?.list : undefined,
        ...(column.filter?.props || {}),
        onChange: (val: any) => {
          props.onInnerFilterChange?.(val, column);
        },
      };
      if (column.colKey && props.innerFilterValue && column.colKey in props.innerFilterValue) {
        filterComponentProps.value = props.innerFilterValue[column.colKey];
      }
      // 允许自定义触发确认搜索的事件，如输入框回车确认搜索：confirmEvents: ['onEnter']
      if (column.filter?.confirmEvents) {
        column.filter.confirmEvents.forEach((event) => {
          filterComponentProps[event] = () => {
            filterPopupVisible.value = false;
            props.onConfirm?.(column);
          };
        });
      }
      const FilterComponent = column.filter?.component || Component;
      const filter = column.filter || {};
      return (
        <div class={props.tableFilterClasses.contentInner}>
          <FilterComponent class={filter.classNames} style={filter.style} {...filter.attrs} {...filterComponentProps} />
        </div>
      );
    };

    const getBottomButtons = (column: PrimaryTableCol<TableRowData>) => {
      if (!column.filter.showConfirmAndReset) return null;
      return (
        <div class={props.tableFilterClasses.bottomButtons}>
          <TButton
            theme="default"
            size="small"
            onClick={() => {
              filterPopupVisible.value = false;
              props.onReset?.(column);
            }}
          >
            {globalConfig.value.resetText}
          </TButton>
          <TButton
            theme="primary"
            size="small"
            onClick={() => {
              filterPopupVisible.value = false;
              props.onConfirm?.(column);
            }}
          >
            {globalConfig.value.confirmText}
          </TButton>
        </div>
      );
    };

    return () => {
      const { column } = props;
      if (!column.filter || !Object.keys(column.filter).length) {
        return null;
      }
      const filterValue = props.tFilterValue?.[column.colKey];
      const isObjectTrue = typeof filterValue === 'object' && !isEmpty(filterValue);
      const isValueExist = ![null, undefined, ''].includes(filterValue) && typeof filterValue !== 'object';

      return (
        <div class={[props.tableFilterClasses.icon, { [props.isFocusClass]: isObjectTrue || isValueExist }]}>
          <div onClick={() => (filterPopupVisible.value = true)}>{renderDefaultFilterIcon()}</div>
          <Popup
            visible={filterPopupVisible.value}
            destroyOnClose
            placement="bottom"
            onVisibleChange={onFilterPopupVisibleChange}
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
