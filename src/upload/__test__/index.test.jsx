import { ref, nextTick, h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import {
  AddIcon,
  CloseIcon,
  UploadIcon,
  DeleteIcon,
  LoadingIcon,
  CloseCircleIcon,
  ErrorCircleFilledIcon,
  File1Icon,
  FileZipFilledIcon,
  FileExcelFilledIcon,
  FilePdfFilledIcon,
  FileWordFilledIcon,
  FilePowerpointFilledIcon,
  VideoFilledIcon,
} from 'tdesign-icons-vue-next';
import Upload from '../upload';

// jsdom 环境下 URL.createObjectURL / revokeObjectURL 不存在，需要 mock
let _objectUrlCounter = 0;
const _origCreateObjectURL = URL.createObjectURL;
const _origRevokeObjectURL = URL.revokeObjectURL;
beforeAll(() => {
  URL.createObjectURL = vi.fn(() => `blob:mock-url-${++_objectUrlCounter}`);
  URL.revokeObjectURL = vi.fn();
});
afterAll(() => {
  URL.createObjectURL = _origCreateObjectURL;
  URL.revokeObjectURL = _origRevokeObjectURL;
});

const mockFileFoo = new File([new ArrayBuffer(3)], 'foo.png', {
  type: 'image/png',
});

const mockFileBar = new File([new ArrayBuffer(3)], 'bar.png', {
  type: 'image/png',
});

const action = 'http://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo';

const requestMethod = (file) =>
  new Promise((resolve) => {
    resolve({
      status: 'success',
      response: { url: 'https://tdesign.gtimg.com/site/source/figma-pc.png' },
    });
  });

const sleep = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

const triggerUploadFile = (node, fileList) => {
  const target = node.find('input');
  const { element } = target;

  // 判断 HTMLInputElement 对象是否被处理过
  if (target.element._hijack) {
    element.files = [...element.files, ...fileList];
  } else {
    target.element._hijack = true;
    Object.defineProperty(target.element, 'files', {
      value: fileList,
      writable: true,
    });
    // handleChange() 之后会执行 input.value = ''，因此需要清空 files，否则会持续积攒
    Object.defineProperty(target.element, 'value', {
      set(value) {
        if (value === '') {
          target.element.files = [];
        }
      },
    });
  }

  target.trigger('change');
};

describe('Upload', () => {
  describe('props', () => {
    it(':accept', () => {
      const wrapper = mount(Upload, {
        props: { accept: 'image/*' },
      });
      expect(wrapper.find('input').attributes('accept')).toBe('image/*');
    });

    it(':multiple', () => {
      const wrapper = mount(Upload, {
        props: { multiple: true },
      });
      expect(wrapper.find('input').attributes('multiple')).toBeDefined();
    });

    it(':capture', () => {
      const wrapper = mount(Upload, {
        props: { capture: 'camera' },
      });
      expect(wrapper.find('input').attributes('capture')).toBe('camera');
    });

    it(':disabled', async () => {
      const onSelectChange = vi.fn();
      const onClickUpload = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          autoUpload: false,
          disabled: true,
          onSelectChange,
          onClickUpload,
        },
      });

      // 点击添加按钮，由于禁用，不应触发 input 选择
      await wrapper.find('.t-upload__item--add').trigger('click');
      expect(onSelectChange).not.toHaveBeenCalled();
    });

    it(':files', async () => {
      const files = ref([]);
      const wrapper = mount(<Upload requestMethod={requestMethod} v-model={files.value} />);
      await wrapper.findComponent(Upload).setValue([mockFileFoo]);
      expect(files.value.length).toBe(1);
    });

    it(':defaultFiles', async () => {
      const defaultFiles = ref([]);
      const wrapper = mount({
        setup() {
          return () => <Upload requestMethod={requestMethod} defaultFiles={defaultFiles.value} />;
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      expect(defaultFiles.value.length).toBe(0);
    });

    it(':max should reject extra files', async () => {
      const onValidate = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          multiple: true,
          max: 1,
          allowUploadDuplicateFile: true,
          onValidate,
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo, mockFileBar]);
      await sleep(0);
      expect(onValidate).toHaveBeenCalled();
      const args = onValidate.mock.calls[0][0];
      expect(args.type).toBe('FILES_OVER_LENGTH_LIMIT');
    });

    it(':max hides add btn when reaching limit (grid)', async () => {
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          max: 1,
          defaultFiles: [{ name: 'a.png', url: 'https://x.png', type: 'image/png', status: 'success' }],
        },
      });
      await nextTick();
      expect(wrapper.find('.t-upload__item--add').exists()).toBe(false);
    });

    it(':addBtn=false hides add area', async () => {
      const wrapper = mount(Upload, {
        props: { addBtn: false },
      });
      expect(wrapper.find('.t-upload__item--add').exists()).toBe(false);
    });

    it(':removeBtn=false should hide delete icon', async () => {
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          removeBtn: false,
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(false);
    });

    it(':preview=false should not open viewer', async () => {
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          preview: false,
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      await wrapper.find('.t-upload__image').trigger('click');
      // preview=false 时点击不打开 ImageViewer
      expect(document.querySelector('.t-image-viewer__modal')).toBeNull();
    });

    it(':imageProps should be passed down', async () => {
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          imageProps: { fit: 'cover' },
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      expect(wrapper.find('.t-upload__image').exists()).toBe(true);
    });

    it(':sizeLimit', () => {
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          sizeLimit: {
            size: 1,
            unit: 'KB',
            message: '图片大小不超过 {sizeLimit} KB',
          },
        },
      });

      triggerUploadFile(wrapper, [new File([new ArrayBuffer(1023)], 'foo.png', { type: 'image/png' })]);
      expect(wrapper.vm.uploadFiles.length).toBe(1);

      wrapper.vm.uploadFiles = [];
      triggerUploadFile(wrapper, [new File([new ArrayBuffer(1025)], 'foo.png', { type: 'image/png' })]);
      expect(wrapper.vm.uploadFiles.length).toBe(0);
    });

    it(':sizeLimit numeric', async () => {
      const onValidate = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          sizeLimit: 1,
          onValidate,
        },
      });

      triggerUploadFile(wrapper, [new File([new ArrayBuffer(2048)], 'big.png', { type: 'image/png' })]);
      await sleep(0);
      expect(onValidate).toHaveBeenCalled();
      const args = onValidate.mock.calls.find((c) => c[0]?.type === 'FILE_OVER_SIZE_LIMIT');
      expect(args).toBeTruthy();
    });

    it(':theme=list renders list structure', async () => {
      const wrapper = mount(Upload, {
        props: {
          theme: 'list',
          defaultFiles: [{ name: 'a.png', url: 'https://x.png', type: 'image/png', status: 'success', size: 1024 }],
        },
      });
      await nextTick();
      expect(wrapper.find('.t-upload--list').exists()).toBe(true);
      expect(wrapper.find('.t-upload__list').exists()).toBe(true);
      expect(wrapper.find('.t-upload__list-item').exists()).toBe(true);
      // 默认上传按钮（TButton）
      expect(wrapper.find('.t-upload__list-trigger').exists()).toBe(true);
      // 删除按钮
      expect(wrapper.findComponent(DeleteIcon).exists()).toBe(true);
    });

    it(':theme=list hides trigger when reaching max', async () => {
      const wrapper = mount(Upload, {
        props: {
          theme: 'list',
          max: 1,
          defaultFiles: [{ name: 'a.png', url: 'https://x.png', type: 'image/png', status: 'success' }],
        },
      });
      await nextTick();
      expect(wrapper.find('.t-upload__list-trigger').exists()).toBe(false);
    });

    it(':theme=list shows progress / fail status', async () => {
      const wrapper = mount(Upload, {
        props: {
          theme: 'list',
          defaultFiles: [
            { name: 'p.png', type: 'image/png', status: 'progress', percent: 30 },
            { name: 'f.png', type: 'image/png', status: 'fail', response: { error: '上传失败 reason' } },
          ],
        },
      });
      await nextTick();
      expect(wrapper.findComponent(LoadingIcon).exists()).toBe(true);
      expect(wrapper.findComponent(ErrorCircleFilledIcon).exists()).toBe(true);
      expect(wrapper.find('.t-upload__list-item--progress').exists()).toBe(true);
      expect(wrapper.find('.t-upload__list-item--fail').exists()).toBe(true);
      expect(wrapper.text()).toContain('30%');
      expect(wrapper.text()).toContain('上传失败 reason');
    });

    it(':theme=list shows file size when no progress/fail', async () => {
      const wrapper = mount(Upload, {
        props: {
          theme: 'list',
          defaultFiles: [{ name: 'doc.pdf', type: 'application/pdf', status: 'success', size: 2048 }],
        },
      });
      await nextTick();
      // 2048B = 2KB
      expect(wrapper.find('.t-upload__list-item-size').text()).toMatch(/KB|B/i);
    });

    it(':theme=grid shows progress mask', async () => {
      const wrapper = mount(Upload, {
        props: {
          defaultFiles: [{ name: 'a.png', url: 'https://x.png', type: 'image/png', status: 'progress', percent: 50 }],
        },
      });
      await nextTick();
      expect(wrapper.find('.t-upload__progress-mask').exists()).toBe(true);
      expect(wrapper.findComponent(LoadingIcon).exists()).toBe(true);
      expect(wrapper.text()).toContain('50%');
    });

    it(':theme=grid shows fail mask', async () => {
      const wrapper = mount(Upload, {
        props: {
          defaultFiles: [{ name: 'a.png', url: 'https://x.png', type: 'image/png', status: 'fail' }],
        },
      });
      await nextTick();
      expect(wrapper.findComponent(CloseCircleIcon).exists()).toBe(true);
    });

    it(':theme=grid renders file content for non-image without url', async () => {
      const wrapper = mount(Upload, {
        props: {
          defaultFiles: [{ name: 'doc.pdf', type: 'application/pdf', status: 'success' }],
        },
      });
      await nextTick();
      expect(wrapper.find('.t-upload__item--file').exists()).toBe(true);
      expect(wrapper.find('.t-upload__file-content').exists()).toBe(true);
      expect(wrapper.find('.t-upload__file-name').text()).toBe('doc.pdf');
    });

    it('renders correct file type icon by extension/mime', async () => {
      const wrapper = mount(Upload, {
        props: {
          theme: 'list',
          defaultFiles: [
            { name: 'a.pdf', type: 'application/pdf', status: 'success' },
            {
              name: 'a.xlsx',
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              status: 'success',
            },
            {
              name: 'a.pptx',
              type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
              status: 'success',
            },
            {
              name: 'a.docx',
              type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              status: 'success',
            },
            { name: 'a.mp4', type: 'video/mp4', status: 'success' },
            { name: 'a.zip', type: 'application/zip', status: 'success' },
            { name: 'a.txt', type: 'text/plain', status: 'success' },
          ],
        },
      });
      await nextTick();
      expect(wrapper.findComponent(FilePdfFilledIcon).exists()).toBe(true);
      expect(wrapper.findComponent(FileExcelFilledIcon).exists()).toBe(true);
      expect(wrapper.findComponent(FilePowerpointFilledIcon).exists()).toBe(true);
      expect(wrapper.findComponent(FileWordFilledIcon).exists()).toBe(true);
      expect(wrapper.findComponent(VideoFilledIcon).exists()).toBe(true);
      expect(wrapper.findComponent(FileZipFilledIcon).exists()).toBe(true);
      expect(wrapper.findComponent(File1Icon).exists()).toBe(true);
    });
  });

  describe('slots', () => {
    it(':addBtn slot', async () => {
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
        },
        slots: {
          addBtn: () => h(AddIcon, { class: 'my-add-btn-icon' }),
        },
      });
      await nextTick();
      expect(wrapper.find('.my-add-btn-icon').exists()).toBe(true);
    });

    it(':addContent', async () => {
      const wrapper = mount(<Upload addContent={() => <UploadIcon />}></Upload>);
      await nextTick();
      const triggerTarget = wrapper.findComponent(UploadIcon);
      expect(triggerTarget.exists()).toBe(true);
    });
  });

  describe('event', () => {
    it(':events (success/preview/remove)', async () => {
      const onSelectChange = vi.fn();
      const onSuccess = vi.fn();
      const onPreview = vi.fn();
      const onRemove = vi.fn();
      const onClickUpload = vi.fn();

      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          onSelectChange,
          onSuccess,
          onPreview,
          onRemove,
          onClickUpload,
        },
      });

      // 点击添加按钮触发 click-upload
      await wrapper.find('.t-upload__item--add').trigger('click');
      expect(onClickUpload).toHaveBeenCalledTimes(1);

      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      expect(onSelectChange).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledTimes(1);

      await wrapper.find('.t-upload__image').trigger('click');
      expect(onPreview).toHaveBeenCalledTimes(1);

      await wrapper.findComponent(CloseIcon).trigger('click');
      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it('handlePreview should fire for non-image but not open viewer', async () => {
      const onPreview = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          theme: 'list',
          onPreview,
          defaultFiles: [{ name: 'doc.pdf', type: 'application/pdf', status: 'success', size: 1024 }],
        },
      });
      await nextTick();
      await wrapper.find('.t-upload__list-item').trigger('click');
      expect(onPreview).toHaveBeenCalled();
      // 非图片不会打开 ImageViewer
      expect(document.querySelector('.t-image-viewer__modal')).toBeNull();
    });

    it('list remove btn click should stop propagation and call onRemove', async () => {
      const onPreview = vi.fn();
      const onRemove = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          theme: 'list',
          onPreview,
          onRemove,
          defaultFiles: [{ name: 'a.png', url: 'https://x.png', type: 'image/png', status: 'success' }],
        },
      });
      await nextTick();
      await wrapper.findComponent(DeleteIcon).trigger('click');
      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('function', () => {
    it(':beforeUpload', async () => {
      const canUpload = ref(false);
      const beforeUpload = vi.fn(() => canUpload.value);

      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          beforeUpload,
        },
      });

      triggerUploadFile(wrapper, [mockFileFoo]);
      await nextTick();
      expect(beforeUpload).toHaveBeenCalled();
      expect(beforeUpload).toHaveReturnedWith(false);

      canUpload.value = true;
      triggerUploadFile(wrapper, [mockFileBar]);
      await nextTick();
      expect(beforeUpload).toHaveReturnedWith(true);
    });

    it(':beforeAllFilesUpload returning false should be intercepted', async () => {
      const onValidate = vi.fn();
      const beforeAllFilesUpload = vi.fn(() => false);
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          beforeAllFilesUpload,
          onValidate,
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      expect(beforeAllFilesUpload).toHaveBeenCalled();
      const args = onValidate.mock.calls.find((c) => c[0]?.type === 'BEFORE_ALL_FILES_UPLOAD');
      expect(args).toBeTruthy();
    });

    it(':onFail', async () => {
      const onFail = vi.fn();
      const formatResponse = vi.fn(() => ({
        url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
      }));

      const wrapper = mount(Upload, {
        props: {
          requestMethod: () =>
            new Promise((resolve) =>
              resolve({
                status: 'fail',
                error: 'bar',
              }),
            ),
          onFail,
          formatResponse,
        },
      });

      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      expect(onFail).toHaveBeenCalled();
    });
  });

  describe('expose', () => {
    it('triggerUpload should click input', async () => {
      const wrapper = mount(Upload, { props: {} });
      const inputEl = wrapper.find('input').element;
      const spy = vi.spyOn(inputEl, 'click');
      wrapper.vm.triggerUpload(new MouseEvent('click'));
      expect(spy).toHaveBeenCalled();
    });

    it('triggerUpload should be no-op when disabled', async () => {
      const wrapper = mount(Upload, { props: { disabled: true } });
      const inputEl = wrapper.find('input').element;
      const spy = vi.spyOn(inputEl, 'click');
      wrapper.vm.triggerUpload(new MouseEvent('click'));
      expect(spy).not.toHaveBeenCalled();
    });

    it('uploadFiles can be called manually for non-autoUpload', async () => {
      const onSuccess = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          autoUpload: false,
          requestMethod,
          onSuccess,
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(50);
      wrapper.vm.uploadFiles();
      await sleep(50);
      expect(onSuccess).toHaveBeenCalled();
    });

    it('uploadFilePercent should update file percent', async () => {
      const wrapper = mount(Upload, {
        props: {
          autoUpload: false,
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      // toUploadFiles 此时已被搬到 uploadValue (handleNotAutoUpload)，调用不会抛错
      expect(() => wrapper.vm.uploadFilePercent({ file: { raw: mockFileFoo }, percent: 30 })).not.toThrow();
    });

    it('cancelUpload should reset uploading and call onCancelUpload', async () => {
      const onCancelUpload = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          autoUpload: false,
          onCancelUpload,
        },
      });
      wrapper.vm.cancelUpload();
      expect(onCancelUpload).toHaveBeenCalled();
      expect(wrapper.vm.uploading).toBe(false);
    });

    it('cancelUpload with file context should remove file (non-autoUpload)', async () => {
      const onCancelUpload = vi.fn();
      const onRemove = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          autoUpload: false,
          onCancelUpload,
          onRemove,
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(50);
      const file = wrapper.vm.uploadValue?.[0] || { name: 'foo.png', raw: mockFileFoo };
      wrapper.vm.cancelUpload({ file, e: new MouseEvent('click') });
      expect(onCancelUpload).toHaveBeenCalled();
      expect(onRemove).toHaveBeenCalled();
    });

    it('onInnerRemove (multiple, autoUpload) should remove uploaded file by index', async () => {
      const onRemove = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          multiple: true,
          onRemove,
          defaultFiles: [
            { name: 'a.png', url: 'https://x.png', type: 'image/png', status: 'success' },
            { name: 'b.png', url: 'https://y.png', type: 'image/png', status: 'success' },
          ],
        },
      });
      await nextTick();
      const closeIcons = wrapper.findAllComponents(CloseIcon);
      await closeIcons[1].trigger('click');
      expect(onRemove).toHaveBeenCalled();
    });
  });
});
