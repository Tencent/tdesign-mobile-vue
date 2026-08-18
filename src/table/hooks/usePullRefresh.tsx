import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import { Loading as TLoading } from '../../loading';
import useClassName from './useClassName';
import type { PageInfo, TableRowData, TdBaseTableProps } from '../type';

const PULL_REFRESH_DISTANCE = 80;

/**
 * 上拉加载分页 hook
 * 内部管理分页数据，上拉触发时自动加载下一页（累积模式）
 * 支持跟手位移效果和 loading 状态
 */
export default function usePullRefresh(props: TdBaseTableProps, containerRef: Ref<HTMLDivElement | undefined>) {
  const { classPrefix } = useClassName();

  const dataSource = ref<TableRowData[]>([]);
  const isPaginateData = ref(false);

  // 上拉跟手位移量（px）
  const pullOffset = ref(0);
  // 是否正在拖拽中（用于控制 CSS transition）
  const isPulling = ref(false);
  // 是否正在加载更多
  const isLoadingMore = ref(false);

  const pagination = computed(() => props.pagination);
  const pageSize = computed(() => pagination.value?.pageSize ?? pagination.value?.defaultPageSize ?? 10);
  const isControlled = computed(() => pagination.value?.current !== undefined);

  // 当前页码（内部维护）
  let currentPage = pagination.value?.current || pagination.value?.defaultCurrent || 1;
  // 是否还有更多数据
  let hasMore = true;

  // 触摸相关变量
  let startY = 0;
  let isPullingRef = false;

  /**
   * 计算累积数据（第 1 页到第 current 页）
   */
  const calculateAccumulatedData = (current: number, size: number) => {
    const total = pagination.value?.total ?? (props.data || []).length;
    const curTotal = current * size;
    const list = props.data || [];
    const shouldPaginate = list.length > size || total > curTotal;
    if (!shouldPaginate) {
      return { newData: list, hasMore: false };
    }
    const end = current * size;
    const newData = list.slice(0, end);
    const moreAvailable = end < list.length || total > curTotal;
    return { newData, hasMore: moreAvailable };
  };

  // 初始化和 data 变更时重新计算
  watch(
    () => [props.data, props.pagination, props.loadingMode],
    () => {
      if (!pagination.value || props.loadingMode !== 'pull-refresh') {
        isPaginateData.value = false;
        dataSource.value = props.data || [];
        return;
      }

      isPaginateData.value = true;
      const current = isControlled.value ? pagination.value.current || 1 : currentPage;
      const { newData, hasMore: more } = calculateAccumulatedData(current, pageSize.value);
      dataSource.value = newData;
      hasMore = more;
    },
    { immediate: true, deep: true },
  );

  // loading 结束时重置 isLoadingMore
  watch(
    () => props.loading,
    (val) => {
      if (!val && isLoadingMore.value) {
        isLoadingMore.value = false;
        pullOffset.value = 0;
      }
    },
  );

  /**
   * 加载下一页
   */
  const loadNextPage = () => {
    if (!hasMore || isLoadingMore.value) return;

    const previousPage = currentPage;
    const nextPage = previousPage + 1;
    currentPage = nextPage;

    const { newData, hasMore: more } = calculateAccumulatedData(nextPage, pageSize.value);
    dataSource.value = newData;
    hasMore = more;

    isLoadingMore.value = true;

    // 触发 onPageChange 事件
    const pageInfo: PageInfo = { current: nextPage, previous: previousPage, pageSize: pageSize.value };
    (props as any).onPageChange?.(pageInfo, newData);

    // 模拟加载结束（如外部未控制 loading 状态，则自动结束）
    setTimeout(() => {
      if (isLoadingMore.value) {
        isLoadingMore.value = false;
        pullOffset.value = 0;
      }
    }, 500);
  };

  /**
   * 滚动到底部时触发加载更多
   */
  const handleScrollToBottom = () => {
    if (!pagination.value || props.loadingMode !== 'pull-refresh') return;
    if (props.loading || isLoadingMore.value || !hasMore) return;
    loadNextPage();
  };

  // --- 触摸事件逻辑 ---
  const isAtBottom = () => {
    const container = containerRef.value;
    if (!container) return false;
    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollTop + clientHeight >= scrollHeight - 1;
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (props.loading || isLoadingMore.value || !hasMore) return;
    if (!isAtBottom()) return;
    startY = e.touches[0].clientY;
    isPullingRef = true;
    isPulling.value = true;
    pullOffset.value = 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (props.loading || isLoadingMore.value || !isPullingRef) return;

    const currentY = e.touches[0].clientY;
    const diff = startY - currentY; // 正值表示上拉

    if (diff > 0) {
      if (isAtBottom()) {
        e.preventDefault();
      }
      // 使用阻尼效果
      const dampedOffset = Math.min(diff * 0.5, PULL_REFRESH_DISTANCE * 1.5);
      pullOffset.value = dampedOffset;
    } else {
      pullOffset.value = 0;
    }
  };

  const handleTouchEnd = () => {
    if (props.loading || isLoadingMore.value || !isPullingRef) return;

    const currentOffset = pullOffset.value;
    isPullingRef = false;
    isPulling.value = false;

    if (currentOffset >= PULL_REFRESH_DISTANCE * 0.5) {
      // 达到触发阈值，加载下一页
      pullOffset.value = PULL_REFRESH_DISTANCE * 0.5;
      loadNextPage();
    } else {
      pullOffset.value = 0;
    }
  };

  // 绑定触摸事件
  let bindContainer: HTMLDivElement | null = null;

  const bindEvents = () => {
    const container = containerRef.value;
    if (!container || !pagination.value || props.loadingMode !== 'pull-refresh') {
      unbindEvents();
      return;
    }
    if (bindContainer === container) return;
    unbindEvents();
    bindContainer = container;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
  };

  const unbindEvents = () => {
    if (bindContainer) {
      bindContainer.removeEventListener('touchstart', handleTouchStart);
      bindContainer.removeEventListener('touchmove', handleTouchMove);
      bindContainer.removeEventListener('touchend', handleTouchEnd);
      bindContainer = null;
    }
  };

  watch(
    () => [containerRef.value, pagination.value, props.loadingMode],
    () => {
      bindEvents();
    },
    { immediate: true, flush: 'post' },
  );

  onMounted(() => {
    bindEvents();
  });

  onBeforeUnmount(() => {
    unbindEvents();
  });

  /**
   * 渲染底部 loading
   */
  const renderPullRefreshLoading = () => {
    if (!pagination.value || props.loadingMode !== 'pull-refresh') return null;
    if (!isLoadingMore.value && !isPulling.value) return null;
    return (
      <div class={`${classPrefix}-table-loading--bottom`}>
        <TLoading text="加载中..." loading={true} />
      </div>
    );
  };

  return {
    dataSource,
    isPaginateData,
    pullOffset,
    isPulling,
    isLoadingMore,
    handleScrollToBottom,
    renderPullRefreshLoading,
  };
}
