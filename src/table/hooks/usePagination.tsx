import { ref, watch, Ref, computed, toRefs } from 'vue';
import { usePrefixClass } from '../../hooks/useClass';
import Button from '../../button/button';
import type { PageInfo, PaginationProps, TableRowData, TdBaseTableProps } from '../type';

// 分页功能包含：远程数据排序受控、远程数据排序非受控、本地数据排序受控、本地数据排序非受控 等 4 类功能
export default function usePagination(props: TdBaseTableProps, tableContentRef: Ref<HTMLDivElement>) {
  const { pagination, data, loadingMode } = toRefs(props);
  const classPrefix = usePrefixClass();
  const innerPagination = ref<PaginationProps>(pagination.value);
  const dataSource = ref<TableRowData[]>([]);
  const isPaginateData = ref(false);
  const isControlled = computed(() => pagination.value?.current !== undefined);

  const calculatePaginatedData = (current = 1, pageSize = 10) => {
    // data 数据数量超出分页大小时，则自动启动本地数据分页
    const shouldPaginate = (data.value || []).length > pageSize;
    let newData: TableRowData[] = [];
    if (shouldPaginate) {
      const start = (current - 1) * pageSize;
      const end = current * pageSize;
      newData = [...(data.value || []).slice(start, end)];
    } else {
      newData = data.value || [];
    }
    return { newData, shouldPaginate };
  };

  const updateDataSourceAndPaginate = (current = 1, pageSize = 10) => {
    const { newData, shouldPaginate } = calculatePaginatedData(current, pageSize);
    isPaginateData.value = shouldPaginate;
    dataSource.value = newData;
    return newData;
  };

  watch(
    () => [pagination.value, loadingMode.value],
    () => {
      isPaginateData.value = !!pagination.value && loadingMode.value === 'pagination';
    },
    { immediate: true },
  );

  // 受控情况
  watch(
    () => [pagination.value, isControlled.value, loadingMode.value, data.value],
    () => {
      if (!pagination.value || !isControlled.value || loadingMode.value !== 'pagination') return;
      const current = pagination.value?.current || 1;
      const pageSize = pagination.value?.pageSize ?? 10;
      updateDataSourceAndPaginate(current, pageSize);
      innerPagination.value = { current, pageSize };
    },
    { immediate: true },
  );

  // 非受控情况
  watch(
    () => [isControlled.value, loadingMode.value, data.value],
    () => {
      if (!pagination.value || isControlled.value || loadingMode.value !== 'pagination') return;
      const current = pagination.value?.defaultCurrent || 1;
      const pageSize = pagination.value?.defaultPageSize ?? 10;
      updateDataSourceAndPaginate(current, pageSize);
    },
    { immediate: true },
  );

  const renderPagination = () => {
    if (!pagination.value) return null;
    const current = innerPagination.value?.current || pagination.value.defaultCurrent || 1;
    const pageSize = innerPagination.value?.pageSize || pagination.value.defaultPageSize || 10;
    const total = pagination.value.total || (data.value || []).length;
    const pageCount = Math.ceil(total / pageSize);

    const handlePageChange = (nextCurrent: number) => {
      let resNextCurrent = nextCurrent;
      // 边界处理
      if (nextCurrent < 1) {
        resNextCurrent = 1;
      }
      if (nextCurrent > pageCount) {
        resNextCurrent = pageCount;
      }
      const pageInfo: PageInfo = {
        current: resNextCurrent,
        previous: current,
        pageSize,
      };
      props.pagination?.onChange?.(pageInfo);
      if (isControlled.value) {
        const { newData } = calculatePaginatedData(pageInfo.current, pageInfo.pageSize);
        props.onPageChange?.(pageInfo, newData);
      } else {
        innerPagination.value = pageInfo;
        const newData = updateDataSourceAndPaginate(pageInfo.current, pageInfo.pageSize);
        props.onPageChange?.(pageInfo, newData);
      }

      // 当切换分页时，内容区域滚动到顶部
      const ref = tableContentRef.value;
      if (ref?.scrollTo) {
        ref.scrollTo({ top: 0, left: 0 });
      } else if (ref) {
        // 兼容测试环境或旧浏览器
        ref.scrollTop = 0;
        ref.scrollLeft = 0;
      }
    };

    return (
      <div class={`${classPrefix.value}-table__pagination`}>
        <div class={`${classPrefix.value}-table__pagination-content`}>
          <Button
            class={`${classPrefix.value}-table__pagination-content__button`}
            disabled={current === 1}
            size="small"
            variant="outline"
            onClick={() => handlePageChange(current - 1)}
          >
            上一页
          </Button>
          <div class={`${classPrefix.value}-table__pagination-content__indicator`}>
            <span>{current}</span>
            <span>/</span>
            <span>{pageCount}</span>
          </div>
          <Button
            class={`${classPrefix.value}-table__pagination-content__button`}
            disabled={current === pageCount}
            size="small"
            variant="outline"
            onClick={() => handlePageChange(current + 1)}
          >
            下一页
          </Button>
        </div>
      </div>
    );
  };

  const getDataSource = () => {
    if (isPaginateData.value) {
      return dataSource.value;
    }
    return data.value;
  };

  return {
    isPaginateData,
    dataSource,
    innerPagination,
    renderPagination,
    getDataSource,
    updateDataSourceAndPaginate,
    calculatePaginatedData,
  };
}
