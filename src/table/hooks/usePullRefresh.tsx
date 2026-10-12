import { ref, watch, onBeforeUnmount, Ref, computed, toRefs } from 'vue';
import { usePrefixClass } from '../../hooks/useClass';
import Loading from '../../loading/loading';
import type { PageInfo, TableRowData, TdBaseTableProps } from '../type';

const PULL_REFRESH_DISTANCE = 80;

/**
 * 上拉加载分页 hook
 * 参考 usePagination 实现，内部管理分页数据，上拉触发时自动加载下一页
 * 支持跟手位移效果和 loading 状态
 */
export default function usePullRefresh(props: TdBaseTableProps, containerRef: Ref<HTMLDivElement | null>) {
  const { pagination, data, loading, loadingProps, loadingMode } = toRefs(props);
  const classPrefix = usePrefixClass();

  const dataSource = ref<TableRowData[]>([]);
  const isPaginateData = ref(false);

  // 上拉跟手位移量（px）
  const pullOffset = ref(0);
  // 是否正在拖拽中（用于控制 CSS transition）
  const isPulling = ref(false);
  // 是否正在加载更多（上拉触发后的 loading 状态）
  const isLoadingMore = ref(false);

  const pageSize = computed(() => pagination.value?.pageSize ?? pagination.value?.defaultPageSize ?? 10);
  const isControlled = computed(() => pagination.value?.current !== undefined);

  // 当前页码（内部维护）
  const currentPageRef = ref<number>(pagination.value?.current || pagination.value?.defaultCurrent || 1);

  // 触摸相关
  let startY = 0;
  let isPullingFlag = false;

  // 是否还有更多数据
  const hasMoreRef = ref<boolean>(true);

  /**
   * 计算当前应展示的数据（累积模式：展示第 1 页到第 current 页的所有数据）
   */
  const calculateAccumulatedData = (current: number, size: number) => {
    const { total } = pagination.value || {};
    const curTotal = current * size;
    const list = data.value || [];
    const shouldPaginate = list.length > size || (total || 0) > curTotal;
    if (!shouldPaginate) {
      return { newData: list, hasMore: false };
    }
    const end = current * size;
    const newData = list.slice(0, end);
    const hasMore = end < list.length || (total || 0) > curTotal;
    return { newData, hasMore };
  };

  // 初始化和 data 变更时重新计算
  watch(
    () => [data.value, pagination.value],
    () => {
      if (!pagination.value) {
        isPaginateData.value = false;
        dataSource.value = data.value || [];
        return;
      }

      isPaginateData.value = true;
      const current = isControlled.value ? pagination.value.current || 1 : currentPageRef.value;
      const { newData, hasMore } = calculateAccumulatedData(current, pageSize.value);
      dataSource.value = newData || [];
      hasMoreRef.value = hasMore;
    },
    { immediate: true },
  );

  // 受控模式下 current 变更时同步
  watch(
    () => pagination.value?.current,
    (current) => {
      if (!pagination.value || !isControlled.value) return;
      currentPageRef.value = current || 1;
      const { newData, hasMore } = calculateAccumulatedData(currentPageRef.value, pageSize.value);
      dataSource.value = newData || [];
      hasMoreRef.value = hasMore;
    },
  );

  // loading 结束时重置 isLoadingMore 和位移
  watch(
    () => [loading.value, isLoadingMore.value],
    ([loadingVal, loadingMoreVal], [oldLoadingVal, oldLoadingMoreVal]) => {
      // loading 结束时重置 isLoadingMore
      if (!loadingVal && loadingMoreVal) {
        isLoadingMore.value = false;
      }
      // isLoadingMore 变为 false 时重置位移
      if (oldLoadingMoreVal && !loadingMoreVal) {
        pullOffset.value = 0;
      }
    },
    { flush: 'post' },
  );

  /**
   * 加载下一页
   */
  const loadNextPage = () => {
    if (!hasMoreRef.value) return;

    const previousPage = currentPageRef.value;
    const nextPage = previousPage + 1;
    currentPageRef.value = nextPage;

    const { newData, hasMore } = calculateAccumulatedData(nextPage, pageSize.value);
    dataSource.value = newData || [];
    hasMoreRef.value = hasMore;

    // 设置加载状态
    isLoadingMore.value = true;

    // 触发 onPageChange 事件
    const pageInfo: PageInfo = { current: nextPage, previous: previousPage, pageSize: pageSize.value };
    props.onPageChange?.(pageInfo, newData || []);
  };

  // --- 触摸事件逻辑 ---
  const isAtBottom = (): boolean => {
    const container = containerRef.value;
    if (!container) return false;
    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollTop + clientHeight >= scrollHeight - 1;
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (isLoadingMore.value || !hasMoreRef.value) return;
    if (typeof loading.value === 'boolean' && loading.value) return;
    if (!isAtBottom()) return;
    startY = e.touches[0].clientY;
    isPullingFlag = true;
    isPulling.value = true;
    pullOffset.value = 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isLoadingMore.value || !isPullingFlag) return;
    if (typeof loading.value === 'boolean' && loading.value) return;

    const currentY = e.touches[0].clientY;
    const diff = startY - currentY; // 正值表示上拉

    if (diff > 0) {
      // 阻止默认滚动，因为已经到底了
      if (isAtBottom()) {
        e.preventDefault();
      }
      // 使用阻尼效果：实际位移 = diff * 0.5，最大不超过 PULL_REFRESH_DISTANCE * 1.5
      const dampedOffset = Math.min(diff * 0.5, PULL_REFRESH_DISTANCE * 1.5);
      pullOffset.value = dampedOffset;
    } else {
      // 向下滑回时重置
      pullOffset.value = 0;
    }
  };

  const handleTouchEnd = () => {
    if (isLoadingMore.value || !isPullingFlag) return;
    if (typeof loading.value === 'boolean' && loading.value) return;

    const currentOffset = pullOffset.value;
    isPullingFlag = false;
    isPulling.value = false;

    if (currentOffset >= PULL_REFRESH_DISTANCE * 0.5) {
      // 达到触发阈值，加载下一页，保持一定位移展示 loading
      pullOffset.value = PULL_REFRESH_DISTANCE * 0.5;
      loadNextPage();
    } else {
      // 未达到阈值，弹回
      pullOffset.value = 0;
    }
  };

  // 绑定触摸事件
  const bindTouchEvents = () => {
    const container = containerRef.value;
    if (!container || !pagination.value || loadingMode.value !== 'pull-refresh') return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
  };

  const unbindTouchEvents = () => {
    const container = containerRef.value;
    if (!container) return;
    container.removeEventListener('touchstart', handleTouchStart);
    container.removeEventListener('touchmove', handleTouchMove);
    container.removeEventListener('touchend', handleTouchEnd);
  };

  watch(
    () => [containerRef.value, pagination.value, loadingMode.value],
    () => {
      unbindTouchEvents();
      bindTouchEvents();
    },
    { immediate: true },
  );

  onBeforeUnmount(() => {
    unbindTouchEvents();
  });

  /**
   * 渲染上拉加载 loading
   * 当用户上拉时（isPulling 或 isLoadingMore）展示底部 loading
   */
  const renderPullRefreshLoading = () => {
    if (!isPulling.value && !isLoadingMore.value) return null;
    return (
      <div class={`${classPrefix.value}-table-loading--bottom`}>
        <Loading text="加载中..." {...loadingProps.value} loading={true} />
      </div>
    );
  };

  return {
    dataSource,
    isPaginateData,
    pullOffset,
    isPulling,
    isLoadingMore,
    renderPullRefreshLoading,
  };
}
