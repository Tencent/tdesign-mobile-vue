import { computed } from 'vue';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import useClassName from './hooks/useClassName';
import type { SortType } from './type';

type SortTypeEnums = Array<'desc' | 'asc'>;

export interface SorterButtonProps {
  sortType: SortType;
  sortOrder: string;
  sortIcon: any;
  hideSortTips?: boolean;
  onSortIconClick: (e: MouseEvent, p: { descending: boolean }) => void;
}

export default function SorterButton(props: SorterButtonProps) {
  const { sortType = 'all' } = props;
  const { tableSortClasses, negativeRotate180 } = useClassName();
  const allowSortTypes: SortTypeEnums = (sortType === 'all' ? ['asc', 'desc'] : [sortType]) as SortTypeEnums;
  const classes = [tableSortClasses.trigger, { [tableSortClasses.doubleIcon]: allowSortTypes.length > 1 }];

  function getSortIcon(direction: string) {
    const defaultIcon = <ChevronDownIcon />;
    const icon = props.sortIcon || defaultIcon;
    const activeClass = direction === props.sortOrder ? tableSortClasses.iconActive : tableSortClasses.iconDefault;
    const sortClassName: any = [
      activeClass,
      tableSortClasses.sortIcon,
      (tableSortClasses.iconDirection as any)[direction],
      { [negativeRotate180]: direction === 'asc' },
    ];
    return (
      <span
        key={direction}
        class={sortClassName}
        onClick={(e: MouseEvent) => props?.onSortIconClick(e, { descending: direction === 'desc' })}
      >
        {icon}
      </span>
    );
  }

  const sortButton = allowSortTypes.map((direction: string) => getSortIcon(direction));

  return <div class={classes}>{sortButton}</div>;
}
