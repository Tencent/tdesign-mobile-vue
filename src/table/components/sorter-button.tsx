import { defineComponent, computed, type PropType } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import useClassName from '../hooks/useClassName';
import { useTNodeJSX } from '../../hooks/tnode';
import type { TNode } from '../../common';
import type { SortType } from '../type';

type SortTypeEnums = Array<'desc' | 'asc'>;

export default defineComponent({
  name: 'TTableSorterButton',
  props: {
    sortType: {
      type: String as PropType<SortType>,
      default: 'all',
    },
    sortOrder: {
      type: String,
    },
    sortIcon: {
      type: Function as PropType<TNode>,
    },
    hideSortTips: Boolean,
    onSortIconClick: {
      type: Function as PropType<(e: MouseEvent, p: { descending: boolean }) => void>,
    },
  },
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const { tableSortClasses, negativeRotate180 } = useClassName();

    const allowSortTypes = computed<SortTypeEnums>(() =>
      props.sortType === 'all' ? ['asc', 'desc'] : [props.sortType as 'asc' | 'desc'],
    );

    const classes = computed(() => [
      tableSortClasses.trigger,
      { [tableSortClasses.doubleIcon]: allowSortTypes.value.length > 1 },
    ]);

    const getSortIcon = (direction: 'asc' | 'desc') => {
      const defaultIcon = <ChevronDownIcon />;
      const icon = renderTNodeJSX('sortIcon') || defaultIcon;
      const activeClass = direction === props.sortOrder ? tableSortClasses.iconActive : tableSortClasses.iconDefault;
      const sortClassName = [
        activeClass,
        tableSortClasses.sortIcon,
        tableSortClasses.iconDirection[direction],
        { [negativeRotate180]: direction === 'asc' },
      ];
      return (
        <span
          key={direction}
          class={sortClassName}
          onClick={(e: MouseEvent) => props.onSortIconClick?.(e, { descending: direction === 'desc' })}
        >
          {icon}
        </span>
      );
    };

    return () => <div class={classes.value}>{allowSortTypes.value.map((direction) => getSortIcon(direction))}</div>;
  },
});
