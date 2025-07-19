import { ref } from 'vue';
import type { TdUploadProps, UploadFile } from '../type';

/**
 * 用于实现拖拽排序功能的 Hook。
 * @param props - TdUpload 组件的 props。
 * @param emit - 组件的 emit 函数。
 * @param itemClassName - 单个可拖拽项的类名。
 * @returns 返回一个包含拖拽事件处理器和状态的对象。
 */
export function useDrag(
  props: TdUploadProps,
  emit: (event: 'update:modelValue', files: UploadFile[]) => void,
  itemClassName: string,
) {
  // 正在被拖拽的元素的索引。
  const dragStartIndex = ref<number | null>(null);
  // 标记当前是否正在进行拖拽操作。
  const isDragging = ref(false);
  // 拖拽元素当前悬停的元素的索引。
  const draggedOverIndex = ref<number | null>(null);

  /**
   * 重置所有拖拽相关的状态。
   * 无论拖拽成功、失败还是取消，都应该调用此函数来清理状态。
   */
  const resetDragState = () => {
    isDragging.value = false;
    dragStartIndex.value = null;
    draggedOverIndex.value = null;
  };

  /**
   * 处理拖拽开始事件 (桌面端)。
   * @param e - 拖拽事件对象。
   * @param index - 拖拽开始的元素的索引。
   */
  const onDragStart = (e: DragEvent, index: number) => {
    if (!props.draggable) return;
    isDragging.value = true;
    dragStartIndex.value = index;
    e.dataTransfer?.setData('text/plain', String(index));
  };

  /**
   * 处理拖拽经过事件 (桌面端)。
   * 必须阻止默认行为才能允许放置。
   * @param e - 拖拽事件对象。
   * @param index - 被拖拽元素经过的元素的索引。
   */
  const onDragOver = (e: DragEvent, index: number) => {
    if (!props.draggable || dragStartIndex.value === null) return;
    e.preventDefault();
    if (index !== dragStartIndex.value) {
      draggedOverIndex.value = index;
    }
  };

  /**
   * 处理拖拽结束事件 (桌面端)。
   * 这里是触发实际排序逻辑的地方。
   */
  const onDragEnd = () => {
    if (!props.draggable || dragStartIndex.value === null || draggedOverIndex.value === null) {
      resetDragState();
      return;
    }

    const currentFiles = props.modelValue || [];
    const newFiles = [...currentFiles];
    const [draggedItem] = newFiles.splice(dragStartIndex.value, 1);
    newFiles.splice(draggedOverIndex.value, 0, draggedItem);

    // 使用 v-model 的标准方式 emit 更新
    emit('update:modelValue', newFiles);

    // 重置状态
    resetDragState();
  };

  /**
   * 处理触摸开始事件 (移动端)。
   * @param e - 触摸事件对象。
   * @param index - 被触摸的元素的索引。
   */
  const onTouchStart = (e: TouchEvent, index: number) => {
    if (!props.draggable) return;
    dragStartIndex.value = index;
    isDragging.value = true;
  };

  /**
   * 处理触摸移动事件 (移动端)。
   * 判断当前悬停在哪个元素上并更新状态。
   * @param e - 触摸事件对象。
   */
  const onTouchMove = (e: TouchEvent) => {
    if (!props.draggable || dragStartIndex.value === null) return;
    e.preventDefault();
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

    if (targetElement) {
      const targetItem = targetElement.closest(`.${itemClassName}`);
      if (targetItem?.parentElement) {
        const items = Array.from(targetItem.parentElement.children).filter(
          (el) => el.classList.contains(itemClassName) && !el.classList.contains(`${itemClassName}--add`),
        );
        const index = items.indexOf(targetItem);
        if (index > -1 && index !== dragStartIndex.value) {
          draggedOverIndex.value = index;
        }
      }
    }
  };

  /**
   * 处理触摸结束事件 (移动端)。
   * 触发与 onDragEnd 相同的排序逻辑。
   */
  const onTouchEnd = () => {
    if (!props.draggable || dragStartIndex.value === null) {
      resetDragState();
      return;
    }
    // 复用与桌面端拖拽相同的逻辑
    onDragEnd();
  };

  /**
   * 获取指定索引项的拖拽相关 props。
   * 当 draggable 为 false 时返回一个空对象，以避免不必要的事件绑定。
   * @param index - 需要获取拖拽 props 的项的索引。
   * @returns 一个包含可展开到元素上的拖拽相关 props 的对象。
   */
  const getDragProps = (index: number) => {
    if (!props.draggable) {
      return {};
    }

    return {
      draggable: true,
      onDragstart: (e: DragEvent) => onDragStart(e, index),
      onDragover: (e: DragEvent) => onDragOver(e, index),
      onDragend: onDragEnd,
      onTouchstart: (e: TouchEvent) => onTouchStart(e, index),
      onTouchmove: onTouchMove,
      onTouchend: onTouchEnd,
    };
  };

  return {
    draggedOverIndex,
    isDragging,
    dragStartIndex,
    getDragProps,
  };
}
