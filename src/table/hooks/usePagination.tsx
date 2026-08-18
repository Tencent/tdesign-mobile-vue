import { computed, ref, watch, type Ref } from 'vue';
import TablePagination from '../TablePagination';
import useClassName from './useClassName';
import type { PageInfo, PaginationProps, TableRowData, TdBaseTableProps } from '../type';

/**
 * 分页功能 hook
 * 当 loadingMode = 'pagination' 且传入 pagination 配置时启用
 * 自动对本地数据进行分页切片
 */
export default function usePagination(props: TdBaseTableProps, tableContentRef: Ref<HTMLDivElement | undefined>) {
  const { tableBaseClass, classPrefix } = useClassName();

  const dataSource = ref<TableRowData[]>([]);
  const isPaginateData = ref(false);

  const pagination = computed(() => props.pagination);
  const isControlled = computed(() => pagination.value?.current !== undefined);

  // 内部分页状态（非受控时使用）
  const innerCurrent = ref(pagination.value?.current ?? pagination.value?.defaultCurrent ?? 1);
  const innerPageSize = ref(pagination.value?.pageSize ?? pagination.value?.defaultPageSize ?? 10);

  const calculatePaginatedData = (current: number, pageSize: number) => {
    const data = props.data || [];
    const shouldPaginate = data.length > pageSize;
    if (shouldPaginate) {
      const start = (current - 1) * pageSize;
      const end = current * pageSize;
      return { newData: data.slice(start, end), shouldPaginate: true };
    }
    return { newData: data, shouldPaginate: false };
  };

  const updateDataSource = (current: number, pageSize: number) => {
    const { newData, shouldPaginate } = calculatePaginatedData(current, pageSize);
    isPaginateData.value = shouldPaginate;
    dataSource.value = newData;
    return newData;
  };

  // 监听 pagination 和 data 变化
  watch(
    () => [props.data, props.pagination, props.loadingMode],
    () => {
      if (!pagination.value || props.loadingMode !== 'pagination') {
        isPaginateData.value = false;
        return;
      }
      const current = isControlled.value ? pagination.value.current || 1 : innerCurrent.value;
      const pageSize = isControlled.value ? (pagination.value.pageSize ?? 10) : innerPageSize.value;
      updateDataSource(current, pageSize);
    },
    { immediate: true, deep: true },
  );

  const renderPagination = () => {
    if (!pagination.value || props.loadingMode !== 'pagination') return null;

    const current = isControlled.value ? pagination.value.current || 1 : innerCurrent.value;
    const pageSize = isControlled.value ? (pagination.value.pageSize ?? 10) : innerPageSize.value;
    const total = pagination.value.total ?? (props.data || []).length;

    return (
      <div class={`${classPrefix}-table__pagination`}>
        <TablePagination
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={(pageInfo: PageInfo) => {
            pagination.value?.onChange?.(pageInfo);

            if (isControlled.value) {
              const { newData } = calculatePaginatedData(pageInfo.current, pageInfo.pageSize);
              dataSource.value = newData;
              isPaginateData.value = true;
            } else {
              innerCurrent.value = pageInfo.current;
              innerPageSize.value = pageInfo.pageSize;
              updateDataSource(pageInfo.current, pageInfo.pageSize);
            }

            // 切换分页时滚动到顶部
            const el = tableContentRef.value;
            if (el) {
              if (el.scrollTo) {
                el.scrollTo({ top: 0, left: 0 });
              } else {
                el.scrollTop = 0;
                el.scrollLeft = 0;
              }
            }
          }}
        />
      </div>
    );
  };

  return {
    isPaginateData,
    dataSource,
    renderPagination,
  };
}
