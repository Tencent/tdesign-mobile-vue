import { computed, defineComponent, type PropType } from 'vue';
import { Button as TButton } from '../button';
import useClassName from './hooks/useClassName';
import type { PageInfo, PaginationProps } from './type';

const PAGE_COUNT_MIN = 1;

export default defineComponent({
  name: 'TTablePagination',
  props: {
    current: Number,
    defaultCurrent: { type: Number, default: 1 },
    pageSize: Number,
    defaultPageSize: { type: Number, default: 10 },
    total: { type: Number, default: 0 },
    onChange: Function as PropType<(pageInfo: PageInfo) => void>,
    onCurrentChange: Function as PropType<(current: number, pageInfo: PageInfo) => void>,
  },
  emits: ['change', 'current-change'],
  setup(props, { emit }) {
    const { tablePaginationClasses } = useClassName();

    const innerCurrent = computed(() => props.current ?? props.defaultCurrent ?? 1);
    const innerPageSize = computed(() => props.pageSize ?? props.defaultPageSize ?? 10);

    const pageCount = computed(() => {
      const calCount = Math.ceil(props.total / innerPageSize.value);
      return calCount > 0 ? calCount : PAGE_COUNT_MIN;
    });

    const handlePageChange = (nextCurrent: number) => {
      let resNextCurrent = nextCurrent;
      if (resNextCurrent < PAGE_COUNT_MIN) {
        resNextCurrent = PAGE_COUNT_MIN;
      }
      if (resNextCurrent > pageCount.value) {
        resNextCurrent = pageCount.value;
      }
      const pageInfo: PageInfo = {
        current: resNextCurrent,
        previous: innerCurrent.value,
        pageSize: innerPageSize.value,
      };
      emit('change', pageInfo);
      emit('current-change', resNextCurrent, pageInfo);
      props.onChange?.(pageInfo);
      props.onCurrentChange?.(resNextCurrent, pageInfo);
    };

    return () => (
      <div class={tablePaginationClasses.content}>
        <TButton
          class={tablePaginationClasses.button}
          disabled={innerCurrent.value === 1}
          shape="rectangle"
          size="small"
          variant="outline"
          onClick={() => handlePageChange(innerCurrent.value - 1)}
        >
          上一页
        </TButton>
        <div class={tablePaginationClasses.paginationIndicator}>
          <span>{innerCurrent.value}</span>
          <span>/</span>
          <span>{pageCount.value}</span>
        </div>
        <TButton
          class={tablePaginationClasses.button}
          disabled={innerCurrent.value === pageCount.value}
          shape="rectangle"
          size="small"
          variant="outline"
          onClick={() => handlePageChange(innerCurrent.value + 1)}
        >
          下一页
        </TButton>
      </div>
    );
  },
});
