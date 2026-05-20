import { ref } from 'vue';
import type { Ref, ShallowRef, ComputedRef, CSSProperties } from 'vue';
import type { TdUploadProps, UploadFile, UploadChangeContext } from '../type';

interface UploadFileWithUid extends UploadFile {
  __uid?: string;
}

export interface UseDragReturn {
  /** 是否处于拖拽中 */
  dragging: Ref<boolean>;
  /** 被拖 item 在 sortedFiles 中的当前 index */
  dragIndex: Ref<number>;
  /** 拖拽排序用的本地文件数组 */
  sortedFiles: Ref<UploadFile[]>;
  /** 浮动 clone 是否可见 */
  cloneVisible: Ref<boolean>;
  /** 浮动 clone 的内联样式 */
  cloneStyle: Ref<CSSProperties>;
  /** clone 显示的文件内容 */
  cloneFile: Ref<UploadFile | null>;
  /** 获取 file 的唯一 key */
  getDragKey: (file: UploadFileWithUid) => string;
  /** 同步 sortedFiles 与 displayFiles（非拖拽时调用） */
  syncFiles: (files: UploadFile[]) => void;
  /** 触摸开始：启动长按定时器 */
  onTouchstart: (e: TouchEvent, index: number) => void;
  /** 触摸移动：更新 clone 位置 + 碰撞检测 */
  onTouchmove: (e: TouchEvent) => void;
  /** 触摸结束：归位动画 + 提交排序结果 */
  onTouchend: (e: TouchEvent) => void;
  /** 触摸取消：清理状态 */
  onTouchcancel: (e: TouchEvent) => void;
}

export default function useDrag(
  props: TdUploadProps,
  uploadClass: ComputedRef<string>,
  setUploadValue: (value: UploadFile[], context: UploadChangeContext) => void,
  toUploadFilesRef?: ShallowRef<UploadFile[]>,
): UseDragReturn {
  const dragging = ref(false);
  const dragIndex = ref(-1);
  const sortedFiles = ref<UploadFile[]>([]);
  const cloneVisible = ref(false);
  const cloneStyle = ref<CSSProperties>({});
  const cloneFile = ref<UploadFile | null>(null);

  const getDragKey = (file: UploadFileWithUid): string => {
    if (file?.__uid) return file.__uid;
    const uid = `u_${Math.random().toString(36).slice(2, 9)}`;
    file.__uid = uid;
    return uid;
  };

  const syncFiles = (files: UploadFile[]) => {
    if (!dragging.value) {
      sortedFiles.value = [...files];
    }
  };

  // 非响应式内部状态
  let longPressTimer = 0;
  let cachedItemWidth = 0;
  let cachedItemHeight = 0;
  let startFingerX = 0;
  let startFingerY = 0;
  let hasMoved = false;
  let longPressTarget: HTMLElement | null = null;

  // 拖拽开始时的布局参数
  let layout: {
    containerLeft: number;
    containerTop: number;
    columns: number;
    cellWidth: number;
    cellHeight: number;
    // 列表布局：每个 item 的 Y 偏移和高度
    itemTops: number[];
    itemHeights: number[];
  } | null = null;

  // 长按
  const onTouchstart = (e: TouchEvent, index: number) => {
    if (!props.draggable || dragging.value) return;

    const touch = e.touches?.[0];
    if (!touch) return;

    startFingerX = touch.clientX;
    startFingerY = touch.clientY;
    hasMoved = false;

    longPressTarget = e.currentTarget as HTMLElement;

    longPressTimer = window.setTimeout(() => {
      onLongPress(index);
    }, 300);
  };

  const onLongPress = (index: number) => {
    const target = longPressTarget;
    if (!target) return;

    const file = sortedFiles.value[index];
    if (!file) return;

    const rect = target.getBoundingClientRect();
    cachedItemWidth = rect.width;
    cachedItemHeight = rect.height;

    // 快照当前布局参数
    // target.parentElement 可能是更上层的元素。
    // 使用 querySelectorAll('[data-drag-key]') 确保只获取文 item 元素。
    const container = target.closest(`.${uploadClass.value}`);
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const dragItems = container.querySelectorAll('[data-drag-key]');

      if (props.theme === 'list') {
        // 列表布局：缓存每个 item 的相对 top 和 height
        const itemTops: number[] = [];
        const itemHeights: number[] = [];
        dragItems.forEach((el) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          itemTops.push(r.top - containerRect.top);
          itemHeights.push(r.height);
        });
        layout = {
          containerLeft: containerRect.left,
          containerTop: containerRect.top,
          columns: 1,
          cellWidth: containerRect.width,
          cellHeight: cachedItemHeight,
          itemTops,
          itemHeights,
        };
      } else {
        // 宫格布局：推算列数和 cell 尺寸
        let columns = 4;
        let cellWidth = containerRect.width / 4;
        let cellHeight = cachedItemHeight;

        if (dragItems.length >= 2) {
          const firstRect = (dragItems[0] as HTMLElement).getBoundingClientRect();
          for (let i = 1; i < dragItems.length; i++) {
            const r = (dragItems[i] as HTMLElement).getBoundingClientRect();
            if (r.top === firstRect.top && r.left > firstRect.left) {
              cellWidth = r.left - firstRect.left;
              columns = Math.round(containerRect.width / cellWidth) || 4;
              break;
            }
          }
          for (let i = columns; i < dragItems.length; i++) {
            const r = (dragItems[i] as HTMLElement).getBoundingClientRect();
            if (r.top > firstRect.top) {
              cellHeight = r.top - firstRect.top;
              break;
            }
          }
        }

        layout = {
          containerLeft: containerRect.left,
          containerTop: containerRect.top,
          columns,
          cellWidth,
          cellHeight,
          itemTops: [],
          itemHeights: [],
        };
      }
    }

    dragging.value = true;
    dragIndex.value = index;
    cloneVisible.value = true;
    cloneFile.value = file;
    hasMoved = false;

    const isList = props.theme === 'list';
    cloneStyle.value = {
      position: 'fixed',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      zIndex: 9999,
      pointerEvents: 'none',
      transform: isList ? undefined : 'scale(1.05)',
      boxShadow: isList ? '0 4px 16px rgba(0, 0, 0, 0.15)' : '0 8px 24px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      borderRadius: isList ? undefined : '8px',
      overflow: 'hidden',
    };

    props.onDrag?.();
  };

  // 拖拽
  const onTouchmove = (e: TouchEvent) => {
    const touch = e.touches?.[0] || e.changedTouches?.[0];
    if (!touch) return;

    // 指针移动超过 10px 才取消长按定时
    if (!dragging.value) {
      const dx = Math.abs(touch.clientX - startFingerX);
      const dy = Math.abs(touch.clientY - startFingerY);
      if (dx > 10 || dy > 10) {
        clearTimeout(longPressTimer);
        longPressTarget = null;
      }
      return;
    }

    if (e.cancelable) e?.preventDefault();

    hasMoved = true;

    // clone 跟随指针
    cloneStyle.value = {
      ...cloneStyle.value,
      left: `${touch.clientX - cachedItemWidth / 2}px`,
      top: `${touch.clientY - cachedItemHeight / 2}px`,
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    };

    // 碰撞检测
    if (!layout) return;
    const targetIndex = detectTargetSlot(touch.clientX, touch.clientY);
    if (targetIndex === -1 || targetIndex === dragIndex.value) return;

    // 重排 sortedFiles
    const newFiles = [...sortedFiles.value];
    const [moved] = newFiles.splice(dragIndex.value, 1);
    newFiles.splice(targetIndex, 0, moved);
    sortedFiles.value = newFiles.filter(Boolean);
    dragIndex.value = targetIndex;
  };

  // 碰撞检测
  const detectTargetSlot = (fingerX: number, fingerY: number): number => {
    if (!layout) return -1;
    const count = sortedFiles.value.length;
    if (count <= 1) return -1;

    const relX = fingerX - layout.containerLeft;
    const relY = fingerY - layout.containerTop;

    if (layout.itemTops.length > 0) {
      return detectListSlot(relY, count);
    }
    return detectGridSlot(relX, relY, count);
  };

  const detectGridSlot = (relX: number, relY: number, count: number): number => {
    const col = Math.floor(relX / (layout?.cellWidth ?? 1));
    const row = Math.floor(relY / (layout?.cellHeight ?? 1));
    const targetIndex = row * (layout?.columns ?? 1) + col;
    return Math.max(0, Math.min(targetIndex, count - 1));
  };

  const detectListSlot = (relY: number, count: number): number => {
    const { itemTops, itemHeights } = layout;
    for (let i = 0; i < itemTops.length && i < count; i++) {
      const localY = relY - itemTops[i];
      if (localY >= 0 && localY < itemHeights[i]) {
        return localY > itemHeights[i] / 2 ? i + 1 : i;
      }
    }
    return count - 1;
  };

  const onTouchend = () => {
    clearTimeout(longPressTimer);

    if (!dragging.value) {
      longPressTarget = null;
      return;
    }

    // 没有实际移动
    if (!hasMoved) {
      resetState();
      return;
    }

    // clone 动画归位到目标 item 位置
    const dragFile = cloneFile.value;
    const dragKey = dragFile ? getDragKey(dragFile) : -1;

    requestAnimationFrame(() => {
      // 通过 data-drag-key 属性查找被拖 item 的 DOM 元素
      const container = longPressTarget?.closest(`.${uploadClass.value}`);
      const targetEl = container?.querySelector(`[data-drag-key="${dragKey}"]`) as HTMLElement;

      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        cloneStyle.value = {
          ...cloneStyle.value,
          left: `${rect.left}px`,
          top: `${rect.top}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          transform: 'scale(1)',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
        };
      } else {
        cloneStyle.value = {
          ...cloneStyle.value,
          opacity: '0',
          transition: 'opacity 0.3s ease',
        };
      }

      const finalFiles = [...sortedFiles.value];

      // 将所有排序后的文件写入 uploadValue
      props.onDrop?.(finalFiles);
      setUploadValue(finalFiles, { trigger: 'sort', files: finalFiles });
      if (toUploadFilesRef) {
        toUploadFilesRef.value = [];
      }
      resetState();
    });
  };

  const onTouchcancel = () => {
    clearTimeout(longPressTimer);
    // 取消拖拽，恢复原始顺序
    resetState();
    longPressTarget = null;
  };

  const resetState = () => {
    dragging.value = false;
    dragIndex.value = -1;
    cloneVisible.value = false;
    cloneFile.value = null;
    cloneStyle.value = {};
    hasMoved = false;
    cachedItemWidth = 0;
    cachedItemHeight = 0;
    longPressTarget = null;
    layout = null;
  };

  return {
    dragging,
    dragIndex,
    sortedFiles,
    cloneVisible,
    cloneStyle,
    cloneFile,
    getDragKey,
    syncFiles,
    onTouchstart,
    onTouchmove,
    onTouchend,
    onTouchcancel,
  };
}
