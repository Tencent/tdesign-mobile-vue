import { computed, toRefs } from 'vue';
import { TdBaseTableProps } from '../type';
import useClassName from './useClassName';

export function formatCSSUnit(unit: string | number | undefined) {
  if (!unit) return unit;
  return isNaN(Number(unit)) ? unit : `${unit}px`;
}

export default function useStyle(props: TdBaseTableProps) {
  const { bordered, stripe, verticalAlign, height, maxHeight, tableContentWidth } = toRefs(props);

  const { tableBaseClass, tableAlignClasses } = useClassName();

  const tableClasses = computed(() => [
    tableBaseClass.table,
    [tableAlignClasses[verticalAlign?.value || 'middle']],
    {
      [tableBaseClass.bordered]: bordered?.value,
      [tableBaseClass.striped]: stripe?.value,
      [tableBaseClass.loading]: props.loading,
    },
  ]);

  const tableContentStyles = computed(() => ({
    height: formatCSSUnit(height?.value),
    maxHeight: formatCSSUnit(maxHeight?.value),
  }));

  const tableElementStyles = computed(() => ({
    width: formatCSSUnit(tableContentWidth?.value),
  }));

  return {
    tableClasses,
    tableElementStyles,
    tableContentStyles,
  };
}
