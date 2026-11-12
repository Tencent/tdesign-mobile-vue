import { computed, shallowRef } from 'vue';
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useDrag from '../hooks/useDrag';
import useUpload from '../hooks/useUpload';
import UploadProps from '../props';
import type { TdUploadProps, UploadFile } from '../type';

enableAutoUnmount(afterEach);

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

const createFiles = (count = 4): UploadFile[] =>
  Array.from({ length: count }, (_, index) => ({ name: `${index}.txt`, status: 'waiting' }));

const touchEvent = (element: Element, x = 30, y = 40): TouchEvent =>
  ({
    currentTarget: element,
    touches: [{ clientX: x, clientY: y }],
    changedTouches: [],
    cancelable: true,
    preventDefault: vi.fn(),
  }) as unknown as TouchEvent;

const mockRect = (element: Element, left: number, top: number, width: number, height: number) =>
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({}),
  });

const mountDragHost = (props: TdUploadProps = {}) => {
  let drag: ReturnType<typeof useDrag> | undefined;
  const setUploadValue = vi.fn();
  const toUploadFiles = shallowRef<UploadFile[]>([]);
  const wrapper = mount(
    {
      props: UploadProps,
      setup(props: TdUploadProps) {
        const state = useDrag(
          props,
          computed(() => 't-upload'),
          setUploadValue,
          toUploadFiles,
        );
        drag = state;
        state.syncFiles(props.defaultFiles);
        return () => (
          <div class="t-upload">
            {state.sortedFiles.value.map((file) => (
              <div key={state.getDragKey(file)} data-drag-key={state.getDragKey(file)}>
                {file.name}
              </div>
            ))}
          </div>
        );
      },
    },
    { props: { draggable: true, defaultFiles: createFiles(), ...props } },
  );
  if (!drag) throw new Error('Expected useDrag to initialize');
  // 使用真实的两列宫格和有间距的列表几何，避免依赖 jsdom 全为 0 的默认尺寸
  mockRect(wrapper.element, 20, 30, 200, 300);
  const items = wrapper.findAll('[data-drag-key]');
  items.forEach((item, index) => {
    if (props.theme === 'list') {
      mockRect(item.element, 20, 50 + index * 50, 200, 40);
    } else {
      mockRect(item.element, 20 + (index % 2) * 100, 30 + Math.floor(index / 2) * 100, 80, 80);
    }
  });
  return { wrapper, drag, items, setUploadValue, toUploadFiles };
};

const mountUploadHost = (props: TdUploadProps = {}) => {
  let upload: ReturnType<typeof useUpload> | undefined;
  const wrapper = mount(
    {
      props: UploadProps,
      setup(props: TdUploadProps) {
        const state = useUpload(props);
        upload = state;
        return () => <input ref={state.inputRef} type="file" onChange={state.onNormalFileChange} />;
      },
    },
    { props },
  );
  if (!upload) throw new Error('Expected useUpload to initialize');
  return { wrapper, upload };
};

describe('useDrag', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', (callback: (time: number) => void) => {
      callback(0);
      return 0;
    });
  });

  it('assigns distinct stable keys to identical and unnamed files', () => {
    const files: UploadFile[] = [{ name: 'same.txt' }, { name: 'same.txt' }, { name: 'same.txt' }, {}, {}];
    const { drag } = mountDragHost({ defaultFiles: files });
    const keys = files.map(drag.getDragKey);
    expect(keys.every(Boolean)).toBe(true);
    expect(new Set(keys).size).toBe(files.length);
    drag.syncFiles(files);
    expect(files.map(drag.getDragKey)).toEqual(keys);
    expect(drag.getDragKey({})).toBe('');
  });

  it('starts dragging only after the long press threshold', async () => {
    const onDrag = vi.fn();
    const { drag, items } = mountDragHost({ onDrag });
    drag.onTouchstart(touchEvent(items[0].element), 0);
    await vi.advanceTimersByTimeAsync(299);
    expect(drag.dragging.value).toBe(false);
    expect(onDrag).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(drag.dragging.value).toBe(true);
    expect(drag.dragIndex.value).toBe(0);
    expect(drag.cloneVisible.value).toBe(true);
    expect(drag.cloneStyle.value).toMatchObject({ left: '20px', top: '30px', width: '80px', height: '80px' });
    expect(onDrag).toHaveBeenCalledWith({ file: expect.objectContaining({ name: '0.txt' }), index: 0 });

    // 已经拖拽时不能再次启动另一项的长按
    drag.onTouchstart(touchEvent(items[1].element), 1);
    await vi.advanceTimersByTimeAsync(300);
    expect(onDrag).toHaveBeenCalledTimes(1);
    expect(drag.dragIndex.value).toBe(0);
  });

  it('keeps a small finger movement eligible for long press', async () => {
    const { drag, items } = mountDragHost();
    drag.onTouchstart(touchEvent(items[0].element, 30, 40), 0);
    drag.onTouchmove(touchEvent(items[0].element, 40, 50));
    await vi.advanceTimersByTimeAsync(300);
    expect(drag.dragging.value).toBe(true);
  });

  it.each([
    [41, 40],
    [30, 51],
  ])('cancels long press after moving to (%i, %i)', async (x, y) => {
    const onDrag = vi.fn();
    const { drag, items } = mountDragHost({ onDrag });
    drag.onTouchstart(touchEvent(items[0].element, 30, 40), 0);
    drag.onTouchmove(touchEvent(items[0].element, x, y));
    await vi.advanceTimersByTimeAsync(300);
    expect(drag.dragging.value).toBe(false);
    expect(drag.cloneVisible.value).toBe(false);
    expect(onDrag).not.toHaveBeenCalled();
  });

  it('does not start when dragging is disabled or touch coordinates are absent', async () => {
    const { drag, items, wrapper } = mountDragHost({ draggable: false });
    drag.onTouchstart(touchEvent(items[0].element), 0);
    await vi.advanceTimersByTimeAsync(300);
    expect(drag.dragging.value).toBe(false);

    await wrapper.setProps({ draggable: true });
    const event = touchEvent(items[0].element);
    Object.assign(event, { touches: [] });
    drag.onTouchstart(event, 0);
    drag.onTouchmove(event);
    await vi.advanceTimersByTimeAsync(300);
    expect(drag.dragging.value).toBe(false);
  });

  it('keeps an ordinary tap from suppressing image preview', async () => {
    const onDrag = vi.fn();
    const { drag, items } = mountDragHost({ onDrag });
    const event = touchEvent(items[0].element);
    drag.onTouchstart(event, 0);
    drag.onTouchend(event);
    await vi.advanceTimersByTimeAsync(300);
    expect(drag.dragEnded.value).toBe(false);
    expect(onDrag).not.toHaveBeenCalled();
  });

  it('ends a stationary long press without submitting an order change', async () => {
    const onDrop = vi.fn();
    const { drag, items, setUploadValue } = mountDragHost({ onDrop });
    const event = touchEvent(items[0].element);
    drag.onTouchstart(event, 0);
    await vi.advanceTimersByTimeAsync(300);
    drag.onTouchend(event);
    expect(drag.dragging.value).toBe(false);
    expect(drag.cloneVisible.value).toBe(false);
    expect(drag.cloneFile.value).toBeNull();
    expect(drag.dragEnded.value).toBe(true);
    expect(setUploadValue).not.toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(300);
    expect(drag.dragEnded.value).toBe(false);
  });

  it('reorders a two-column grid, follows the finger and commits the dropped files', async () => {
    const onDrop = vi.fn();
    const { drag, items, setUploadValue, toUploadFiles } = mountDragHost({ onDrop });
    toUploadFiles.value = [{ name: 'pending.txt' }];
    drag.onTouchstart(touchEvent(items[0].element), 0);
    await vi.advanceTimersByTimeAsync(300);
    const move = touchEvent(items[0].element, 170, 180);
    drag.onTouchmove(move);
    expect(move.preventDefault).toHaveBeenCalledTimes(1);
    expect(drag.cloneStyle.value).toMatchObject({ left: '130px', top: '140px' });
    expect(drag.dragIndex.value).toBe(3);
    expect(drag.sortedFiles.value.map((file) => file.name)).toEqual(['1.txt', '2.txt', '3.txt', '0.txt']);
    // 外部同步不能覆盖尚未提交的拖拽顺序
    drag.syncFiles([{ name: 'external.txt' }]);
    expect(drag.sortedFiles.value).toHaveLength(4);
    drag.onTouchend(move);
    expect(onDrop).toHaveBeenCalledWith(drag.sortedFiles.value);
    expect(setUploadValue).toHaveBeenCalledWith(drag.sortedFiles.value, {
      trigger: 'sort',
      files: drag.sortedFiles.value,
    });
    expect(toUploadFiles.value).toEqual([]);
    expect(drag.dragging.value).toBe(false);
    expect(drag.cloneVisible.value).toBe(false);
  });

  it.each([
    ['above the list', 0, 0],
    ['in the lower half of the first slot', 105, 1],
    ['in the upper half of the second slot', 130, 1],
    ['below the list', 500, 3],
  ])('locates the drop slot %s', async (_label, y, expectedIndex) => {
    const { drag, items } = mountDragHost({ theme: 'list' });
    drag.onTouchstart(touchEvent(items[2].element, 40, 160), 2);
    await vi.advanceTimersByTimeAsync(300);
    drag.onTouchmove(touchEvent(items[2].element, 40, y));
    expect(drag.dragIndex.value).toBe(expectedIndex);
    expect(drag.sortedFiles.value[expectedIndex].name).toBe('2.txt');
  });

  it('uses changedTouches when active touches are no longer available', async () => {
    const { drag, items } = mountDragHost();
    drag.onTouchstart(touchEvent(items[0].element), 0);
    await vi.advanceTimersByTimeAsync(300);
    const event = touchEvent(items[0].element);
    Object.assign(event, { touches: [], changedTouches: [{ clientX: 170, clientY: 180 }], cancelable: false });
    drag.onTouchmove(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(drag.dragIndex.value).toBe(3);
  });

  it('cancels an active drag without committing its temporary order', async () => {
    const onDrop = vi.fn();
    const { drag, items, setUploadValue } = mountDragHost({ onDrop });
    drag.onTouchstart(touchEvent(items[0].element), 0);
    await vi.advanceTimersByTimeAsync(300);
    const event = touchEvent(items[0].element, 170, 180);
    drag.onTouchmove(event);
    drag.onTouchcancel(event);
    expect(drag.dragging.value).toBe(false);
    expect(drag.dragIndex.value).toBe(-1);
    expect(drag.cloneVisible.value).toBe(false);
    expect(drag.cloneStyle.value).toEqual({});
    expect(setUploadValue).not.toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
  });

  it('clears long press and preview suppression timers on unmount', async () => {
    const onDrag = vi.fn();
    const first = mountDragHost({ onDrag });
    first.drag.onTouchstart(touchEvent(first.items[0].element), 0);
    first.wrapper.unmount();
    expect(vi.getTimerCount()).toBe(0);
    await vi.advanceTimersByTimeAsync(300);
    expect(onDrag).not.toHaveBeenCalled();

    const second = mountDragHost();
    const event = touchEvent(second.items[0].element);
    second.drag.onTouchstart(event, 0);
    await vi.advanceTimersByTimeAsync(300);
    second.drag.onTouchend(event);
    expect(vi.getTimerCount()).toBe(1);
    second.wrapper.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe('useUpload', () => {
  it('recognizes images from raw MIME, declared type and URL', () => {
    const { upload } = mountUploadHost();
    expect(upload.isImageFile({ raw: new File([], 'photo', { type: 'image/png' }) })).toBe(true);
    expect(upload.isImageFile({ type: 'image/jpeg' })).toBe(true);
    expect(upload.isImageFile({ url: 'https://example.com/photo.png' })).toBe(true);
    expect(upload.isImageFile({ name: 'document.pdf', type: 'application/pdf' })).toBe(false);
    expect(upload.isImageFile({})).toBe(false);
  });

  it('ignores file selection while disabled', async () => {
    const onSelectChange = vi.fn();
    const onChange = vi.fn();
    const { upload } = mountUploadHost({ disabled: true, autoUpload: false, onSelectChange, onChange });
    upload.onFileChange([new File(['text'], 'a.txt')]);
    await flushPromises();
    expect(onSelectChange).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expect(upload.displayFiles.value).toEqual([]);
  });

  it('rejects every additional file when the maximum count is already reached', async () => {
    const onValidate = vi.fn();
    const onChange = vi.fn();
    const { upload } = mountUploadHost({
      multiple: true,
      autoUpload: false,
      max: 1,
      defaultFiles: [{ name: 'existing.txt', status: 'success' }],
      onValidate,
      onChange,
    });
    upload.onFileChange([new File(['text'], 'new.txt')]);
    await flushPromises();
    expect(onValidate).toHaveBeenCalledWith({ type: 'FILES_OVER_LENGTH_LIMIT', files: [] });
    expect(onChange).not.toHaveBeenCalled();
    expect(upload.displayFiles.value.map((file) => file.name)).toEqual(['existing.txt']);
  });

  it('interpolates and clears the size limit error message', async () => {
    const { upload } = mountUploadHost({
      autoUpload: false,
      sizeLimit: { size: 2, unit: 'B', message: '最多 {sizeLimit} 字节' },
    });
    upload.onFileChange([new File(['large'], 'large.txt')]);
    await flushPromises();
    expect(upload.sizeOverLimitMessage.value).toBe('最多 2 字节');
    expect(upload.displayFiles.value).toEqual([]);

    upload.onFileChange([new File(['a'], 'small.txt')]);
    await flushPromises();
    expect(upload.sizeOverLimitMessage.value).toBe('');
    expect(upload.displayFiles.value[0].name).toBe('small.txt');
  });

  it('does not add files rejected by asynchronous validation in manual mode', async () => {
    const onChange = vi.fn();
    const onValidate = vi.fn();
    const { upload } = mountUploadHost({
      autoUpload: false,
      beforeUpload: async () => false,
      onChange,
      onValidate,
    });
    upload.onFileChange([new File(['text'], 'rejected.txt')]);
    await flushPromises();
    expect(onValidate).toHaveBeenCalledWith({
      type: 'CUSTOM_BEFORE_UPLOAD',
      files: [expect.objectContaining({ name: 'rejected.txt' })],
    });
    expect(onChange).not.toHaveBeenCalled();
    expect(upload.displayFiles.value).toEqual([]);
  });

  it('ignores progress for an unknown file', () => {
    const raw = new File(['text'], 'known.txt');
    const { upload } = mountUploadHost({ autoUpload: false, defaultFiles: [{ raw, percent: 20 }] });
    upload.uploadFilePercent({ file: { raw: new File([], 'unknown.txt') }, percent: 90 });
    expect(upload.uploadValue.value[0].percent).toBe(20);
  });

  it('removes only the selected file from a manual multiple-file list', () => {
    const files = createFiles(3);
    const onChange = vi.fn();
    const onRemove = vi.fn();
    const { upload } = mountUploadHost({ autoUpload: false, multiple: true, defaultFiles: files, onChange, onRemove });
    const removedFile = files[1];
    const e = new MouseEvent('click');
    upload.onInnerRemove({ file: removedFile, index: 1, e });
    expect(upload.displayFiles.value.map((file) => file.name)).toEqual(['0.txt', '2.txt']);
    expect(onChange).toHaveBeenCalledWith(upload.uploadValue.value, {
      trigger: 'remove',
      index: 1,
      file: removedFile,
      e,
    });
    expect(onRemove).toHaveBeenCalledWith({ file: removedFile, index: 1, e });
  });

  it('removes a waiting automatic upload without removing completed files', () => {
    const onWaitingUploadFilesChange = vi.fn();
    const completed: UploadFile = { name: 'completed.txt', status: 'success' };
    const pending: UploadFile = { name: 'pending.txt', status: 'waiting' };
    const { upload } = mountUploadHost({ multiple: true, defaultFiles: [completed], onWaitingUploadFilesChange });
    upload.toUploadFiles.value = [pending];
    upload.onInnerRemove({ file: pending, index: 1, e: new MouseEvent('click') });
    expect(upload.toUploadFiles.value).toEqual([]);
    expect(upload.uploadValue.value).toEqual([completed]);
    expect(onWaitingUploadFilesChange).toHaveBeenCalledWith({ files: [], trigger: 'remove' });
  });

  it('cancels manual uploads without resetting successful files to waiting', () => {
    const onChange = vi.fn();
    const files: UploadFile[] = [
      { name: 'completed.txt', status: 'success' },
      { name: 'pending.txt', status: 'progress', percent: 30 },
    ];
    const { upload } = mountUploadHost({ autoUpload: false, multiple: true, defaultFiles: files, onChange });
    upload.cancelUpload();
    expect(upload.uploadValue.value.map((file) => file.status)).toEqual(['success', 'waiting']);
    expect(upload.uploading.value).toBe(false);
    expect(onChange).toHaveBeenCalledWith(upload.uploadValue.value, { trigger: 'abort' });
  });
});
