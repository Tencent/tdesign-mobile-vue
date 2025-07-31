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

  /**
   * 处理拖拽开始事件 (桌面端)。
   * @param e - 拖拽事件对象。
   * @param index - 拖拽开始的元素的索引。
   */
  const onDragStart = (e: DragEvent, index: number) => {
    if (!props.draggable) return;
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
    if (!props.draggable || dragStartIndex.value === null || dragStartIndex.value === index) return;
    e.preventDefault();

    const currentFiles = props.modelValue || [];
    const newFiles = [...currentFiles];
    const [draggedItem] = newFiles.splice(dragStartIndex.value, 1);
    newFiles.splice(index, 0, draggedItem);

    // 实时更新 v-model
    emit('update:modelValue', newFiles);
    dragStartIndex.value = index;
  };

  /**
   * 处理拖拽结束事件 (桌面端)。
   * 这里是触发实际排序逻辑的地方。
   */
  const onDragEnd = () => {
    dragStartIndex.value = null;
  };

  /**
   * 处理触摸开始事件 (移动端)。
   * @param e - 触摸事件对象。
   * @param index - 被触摸的元素的索引。
   */
  const onTouchStart = (e: TouchEvent, index: number) => {
    if (!props.draggable) return;
    dragStartIndex.value = index;
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
          const currentFiles = props.modelValue || [];
          const newFiles = [...currentFiles];
          const [draggedItem] = newFiles.splice(dragStartIndex.value, 1);
          newFiles.splice(index, 0, draggedItem);
          emit('update:modelValue', newFiles);
          dragStartIndex.value = index;
        }
      }
    }
  };

  /**
   * 处理触摸结束事件 (移动端)。
   * 触发与 onDragEnd 相同的排序逻辑。
   */
  const onTouchEnd = () => {
    dragStartIndex.value = null;
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
    getDragProps,
  };
}
