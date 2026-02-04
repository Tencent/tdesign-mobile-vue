import { ComputedRef, ref, Ref } from 'vue';
import type { TdUploadProps, UploadFile } from '../type';

export default function useDrag(
  props: TdUploadProps,
  setUploadValue: (value: UploadFile[], ...args: any[]) => void,
  uploadClass: ComputedRef<string>,
  listRef: Ref<HTMLElement | undefined>,
) {
  const dragIndex = ref<number>(-1);
  let pendingTargetIndex = -1;

  // 缓存网格布局信息
  let baseData = {
    itemWidth: 0,
    itemHeight: 0,
    columns: 0,
    wrapLeft: 0,
    wrapTop: 0,
  };

  // 生成文件唯一ID，用于拖拽排序识别
  const getFileId = (file: UploadFile) => {
    if ((file as any).__uid) return (file as any).__uid;
    const uid = `u_${Math.random().toString(36).slice(2, 9)}`;
    (file as any).__uid = uid;
    return uid;
  };

  const updateDragBaseData = () => {
    const listEl = listRef.value;
    const itemEl = listEl?.querySelector(`.${uploadClass.value}__item`);
    if (listEl && itemEl) {
      const rect = listEl.getBoundingClientRect();
      const itemWidth = (itemEl as HTMLElement).offsetWidth;
      const itemHeight = (itemEl as HTMLElement).offsetHeight;
      const style = window.getComputedStyle(listEl);
      const gapX = parseInt(style.columnGap || style.gap, 10) || 8;
      const gapY = parseInt(style.rowGap || style.gap, 10) || 16;
      const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      const paddingTop = parseInt(style.paddingTop, 10) || 0;

      baseData = {
        itemWidth: itemWidth + gapX,
        itemHeight: itemHeight + gapY,
        columns:
          Math.round(
            (rect.width - paddingLeft - (parseInt(style.paddingRight, 10) || 0) + gapX) / (itemWidth + gapX),
          ) || 4,
        wrapLeft: rect.left + paddingLeft,
        wrapTop: rect.top + paddingTop,
      };
    }
  };

  const performSort = (index: number, displayFiles: UploadFile[], e: DragEvent | TouchEvent) => {
    if (index === -1 || index === dragIndex.value) {
      pendingTargetIndex = -1;
      return;
    }
    if (index === pendingTargetIndex) return;

    pendingTargetIndex = index;
    const sourceIdx = dragIndex.value;
    const newFiles = [...displayFiles];

    if (sourceIdx === -1 || sourceIdx === index) return;

    const [item] = newFiles.splice(sourceIdx, 1);
    newFiles.splice(index, 0, item);

    setUploadValue(newFiles, { e, trigger: 'sort', index, file: item, files: newFiles });
    if (dragIndex.value !== -1) {
      dragIndex.value = index;
    }
  };

  // 根据网格坐标计算目标索引
  const onTouchmove = (e: TouchEvent, displayFiles: UploadFile[]) => {
    if (!props.draggable || dragIndex.value === -1) return;
    if (e.cancelable) e.preventDefault();

    const touch = e.touches[0];
    const { itemWidth, itemHeight, columns, wrapLeft, wrapTop } = baseData;

    const x = touch.clientX - wrapLeft;
    const y = touch.clientY - wrapTop;

    let curX = Math.floor(x / itemWidth);
    const curY = Math.floor(y / itemHeight);

    // 将 X 限制在列范围内，确保在行边界内滑动
    curX = Math.max(0, Math.min(columns - 1, curX));

    let targetIndex = curX + columns * curY;
    targetIndex = Math.max(0, Math.min(displayFiles.length - 1, targetIndex));

    if (targetIndex !== dragIndex.value) {
      const targetX = targetIndex % columns;
      const targetY = Math.floor(targetIndex / columns);
      const sourceX = dragIndex.value % columns;
      const sourceY = Math.floor(dragIndex.value / columns);

      const xProgress = x / itemWidth - targetX;
      const yProgress = y / itemHeight - targetY;

      let shouldSort = false;
      if (targetY !== sourceY) {
        shouldSort = targetY > sourceY ? yProgress > 0.5 : yProgress < 0.5;
      } else {
        shouldSort = targetX > sourceX ? xProgress > 0.5 : xProgress < 0.5;
      }

      if (shouldSort) {
        performSort(targetIndex, displayFiles, e);
      } else if (pendingTargetIndex !== -1) {
        pendingTargetIndex = -1;
      }
    }
  };

  const resetDrag = () => {
    dragIndex.value = -1;
    pendingTargetIndex = -1;
  };

  return {
    onDragstart: (e: DragEvent, index: number) => {
      if (!props.draggable) return;
      dragIndex.value = index;
      updateDragBaseData();
    },
    onDragover: (e: DragEvent, index: number, files: UploadFile[]) => {
      if (!props.draggable || dragIndex.value === -1) return;
      e.preventDefault();
      performSort(index, files, e);
    },
    onDragend: resetDrag,
    onTouchstart: (e: TouchEvent, index: number) => {
      if (!props.draggable) return;
      dragIndex.value = index;
      updateDragBaseData();
    },
    onTouchmove,
    dragIndex,
    getFileId,
  };
}
