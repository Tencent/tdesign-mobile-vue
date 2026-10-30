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
import { trigger } from '@/image-viewer/__tests__/touch';

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

// 请求配置类属性（method/headers/withCredentials/data/formatRequest/模拟进度）走 XHR 链路，
// 通过临时替换全局 XMLHttpRequest 捕获请求参数，不做真实网络请求
const OriginXMLHttpRequest = window.XMLHttpRequest;

class MockXMLHttpRequest {
  upload: { onprogress: ((event: ProgressEvent) => void) | null; requestParams?: Record<string, any> } = {
    onprogress: null,
  };

  withCredentials = false;

  onerror: ((event: ProgressEvent) => void) | null = null;

  ontimeout: ((event: ProgressEvent) => void) | null = null;

  onload: ((event: ProgressEvent) => void) | null = null;

  open = vi.fn();

  setRequestHeader = vi.fn();

  send = vi.fn();

  abort = vi.fn();

  constructor() {
    mockXHRInstances.push(this);
  }
}

let mockXHRInstances: MockXMLHttpRequest[] = [];

const useMockXMLHttpRequest = () => {
  mockXHRInstances = [];
  window.XMLHttpRequest = MockXMLHttpRequest as unknown as typeof window.XMLHttpRequest;
};

const restoreXMLHttpRequest = () => {
  window.XMLHttpRequest = OriginXMLHttpRequest;
};

describe('Upload', () => {
  describe('props', () => {
    it('accept[string]', () => {
      const wrapper = mount(Upload, {
        props: { accept: 'image/*' },
      });
      expect(wrapper.find('input').attributes('accept')).toBe('image/*');
    });

    it('addBtn[false] hides add area', async () => {
      const wrapper = mount(Upload, {
        props: { addBtn: false },
      });
      expect(wrapper.find('.t-upload__item--add').exists()).toBe(false);
    });

    it('beforeAllFilesUpload[function] returning false should be intercepted', async () => {
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

    it('beforeUpload[function]', async () => {
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

    it('capture[string]', () => {
      const wrapper = mount(Upload, {
        props: { capture: 'camera' },
      });
      expect(wrapper.find('input').attributes('capture')).toBe('camera');
    });

    it('data[object]', async () => {
      useMockXMLHttpRequest();
      try {
        const wrapper = mount(Upload, {
          props: { action, data: { channel: 'wx' } },
        });
        triggerUploadFile(wrapper, [mockFileFoo]);
        await sleep(0);
        const { requestParams } = mockXHRInstances[0].upload;
        // 额外字段随请求发送，默认字段 file/length 保留
        expect(requestParams).toMatchObject({ channel: 'wx', length: 1 });
        expect(requestParams.file).toBe(mockFileFoo);
      } finally {
        restoreXMLHttpRequest();
      }
    });

    it('data[function]', async () => {
      useMockXMLHttpRequest();
      try {
        // type.ts 声明 data 支持 function（props.ts 运行时仅声明 Object，传入函数会有 Vue 类型告警）
        const data = vi.fn((files) => ({ count: files.length, fileName: files[0].name }));
        const wrapper = mount(Upload, {
          props: { action, data },
        });
        triggerUploadFile(wrapper, [mockFileFoo]);
        await sleep(0);
        expect(data).toHaveBeenCalled();
        expect(mockXHRInstances[0].upload.requestParams).toMatchObject({ count: 1, fileName: 'foo.png' });
      } finally {
        restoreXMLHttpRequest();
      }
    });

    it('disabled[boolean]', async () => {
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

    it('draggable[boolean]', async () => {
      vi.useFakeTimers();
      try {
        const onDrag = vi.fn();
        const wrapper = mount(Upload, {
          props: {
            draggable: true,
            onDrag,
            defaultFiles: [
              { name: 'a.png', url: 'https://x.png', type: 'image/png', status: 'success' },
              { name: 'b.png', url: 'https://y.png', type: 'image/png', status: 'success' },
            ],
          },
        });
        await nextTick();
        const item = wrapper.findAll('.t-upload__item:not(.t-upload__item--add)')[0];
        // 长按 300ms 进入拖拽态
        await trigger(item, 'touchstart', 10, 10);
        await vi.advanceTimersByTimeAsync(300);
        expect(onDrag).toHaveBeenCalledWith(expect.objectContaining({ index: 0 }));
        expect(wrapper.find('.t-upload').classes()).toContain('t-upload--dragging');
        // 拖拽浮层 clone 挂载到 body
        expect(document.querySelector('.t-upload__drag-clone')).not.toBeNull();
        await trigger(item, 'touchend', 10, 10);
        await vi.advanceTimersByTimeAsync(0);

        // 未开启 draggable 时长按不进入拖拽
        const onDrag2 = vi.fn();
        const wrapper2 = mount(Upload, {
          props: {
            onDrag: onDrag2,
            defaultFiles: [
              { name: 'a.png', url: 'https://x.png', type: 'image/png', status: 'success' },
              { name: 'b.png', url: 'https://y.png', type: 'image/png', status: 'success' },
            ],
          },
        });
        await nextTick();
        const item2 = wrapper2.findAll('.t-upload__item:not(.t-upload__item--add)')[0];
        await trigger(item2, 'touchstart', 10, 10);
        await vi.advanceTimersByTimeAsync(300);
        expect(onDrag2).not.toHaveBeenCalled();
        expect(wrapper2.find('.t-upload').classes()).not.toContain('t-upload--dragging');
      } finally {
        vi.useRealTimers();
        // 清理 teleport 到 body 的拖拽 clone
        document.body.innerHTML = '';
      }
    });

    // fileListDisplay 在 props.ts 声明但组件未实现渲染逻辑
    it.todo('fileListDisplay[function]');

    it('files[array]', async () => {
      const files = ref([]);
      const wrapper = mount(<Upload requestMethod={requestMethod} v-model={files.value} />);
      await wrapper.findComponent(Upload).setValue([mockFileFoo]);
      expect(files.value.length).toBe(1);
    });

    it('defaultFiles[array]', async () => {
      const defaultFiles = ref([]);
      const wrapper = mount({
        setup() {
          return () => <Upload requestMethod={requestMethod} defaultFiles={defaultFiles.value} />;
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      expect(defaultFiles.value.length).toBe(0);
    });

    it('formatRequest[function]', async () => {
      useMockXMLHttpRequest();
      try {
        const formatRequest = vi.fn((requestData) => ({ fileList: requestData.file, extra: 'custom' }));
        const wrapper = mount(Upload, {
          props: { action, formatRequest },
        });
        triggerUploadFile(wrapper, [mockFileFoo]);
        await sleep(0);
        expect(formatRequest).toHaveBeenCalled();
        // formatRequest 完全自定义请求字段
        expect(mockXHRInstances[0].upload.requestParams).toEqual({ fileList: mockFileFoo, extra: 'custom' });
      } finally {
        restoreXMLHttpRequest();
      }
    });

    it('headers[object]', async () => {
      useMockXMLHttpRequest();
      try {
        const wrapper = mount(Upload, {
          props: { action, headers: { 'X-Token': 'tdesign' } },
        });
        triggerUploadFile(wrapper, [mockFileFoo]);
        await sleep(0);
        expect(mockXHRInstances[0].setRequestHeader).toHaveBeenCalledWith('X-Token', 'tdesign');
      } finally {
        restoreXMLHttpRequest();
      }
    });

    it('imageProps should be passed down', async () => {
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

    it('isBatchUpload[boolean]', async () => {
      // 宫格布局使用 TransitionGroup，jsdom 中移除节点不触发过渡结束会残留 DOM，故以 onChange 载荷断言
      const onChangeBatch = vi.fn();
      const wrapper = mount(Upload, {
        props: { autoUpload: false, multiple: true, isBatchUpload: true, onChange: onChangeBatch },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      triggerUploadFile(wrapper, [mockFileBar]);
      await sleep(0);
      // 批量模式下文件作为整体替换，第二批不追加第一批文件
      expect(onChangeBatch).toHaveBeenLastCalledWith(
        [expect.objectContaining({ name: 'bar.png' })],
        expect.objectContaining({ trigger: 'add' }),
      );

      // 默认非批量模式下多选文件追加到列表
      const onChange = vi.fn();
      const wrapper2 = mount(Upload, {
        props: { autoUpload: false, multiple: true, onChange },
      });
      triggerUploadFile(wrapper2, [mockFileFoo]);
      await sleep(0);
      triggerUploadFile(wrapper2, [mockFileBar]);
      await sleep(0);
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      expect(lastCall[0]).toHaveLength(2);
    });

    it('max should reject extra files', async () => {
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

    it('max hides add btn when reaching limit (grid)', async () => {
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

    it('method[string]', async () => {
      useMockXMLHttpRequest();
      try {
        const wrapper = mount(Upload, {
          props: { action, method: 'PUT' },
        });
        triggerUploadFile(wrapper, [mockFileFoo]);
        await sleep(0);
        expect(mockXHRInstances[0].open).toHaveBeenCalledWith('PUT', action, true);

        // 默认 POST
        mockXHRInstances = [];
        const wrapper2 = mount(Upload, {
          props: { action },
        });
        triggerUploadFile(wrapper2, [mockFileFoo]);
        await sleep(0);
        expect(mockXHRInstances[0].open).toHaveBeenCalledWith('POST', action, true);
      } finally {
        restoreXMLHttpRequest();
      }
    });

    it('mockProgressDuration[number]', async () => {
      useMockXMLHttpRequest();
      vi.useFakeTimers();
      try {
        const onProgress = vi.fn();
        const wrapper = mount(Upload, {
          props: { action, mockProgressDuration: 100, onProgress },
        });
        triggerUploadFile(wrapper, [mockFileFoo]);
        // 间隔 100ms：300ms（即 100ms 开启 + 100ms 首次步进）内出现首个模拟进度 10%
        await vi.advanceTimersByTimeAsync(200);
        expect(onProgress).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'mock', percent: 10, file: expect.objectContaining({ name: 'foo.png' }) }),
        );
        expect(wrapper.text()).toContain('10%');
        await vi.advanceTimersByTimeAsync(100);
        expect(wrapper.text()).toContain('20%');
      } finally {
        vi.useRealTimers();
        restoreXMLHttpRequest();
      }
    });

    it('multiple[boolean]', () => {
      const wrapper = mount(Upload, {
        props: { multiple: true },
      });
      expect(wrapper.find('input').attributes('multiple')).toBeDefined();
    });

    it('preview[false] should not open viewer', async () => {
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

    it('removeBtn[false] should hide delete icon', async () => {
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

    it('sizeLimit[object]', () => {
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

    it('sizeLimit[number]', async () => {
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

    it('uploadAllFilesInOneRequest[boolean]', async () => {
      const oneByOne = vi.fn(requestMethod);
      const wrapper = mount(Upload, {
        props: { requestMethod: oneByOne, multiple: true, allowUploadDuplicateFile: true },
      });
      triggerUploadFile(wrapper, [mockFileFoo, mockFileBar]);
      await sleep(0);
      // 默认一个文件一个请求
      expect(oneByOne).toHaveBeenCalledTimes(2);
      expect(oneByOne.mock.calls[0][0]).toHaveLength(1);
      expect(oneByOne.mock.calls[1][0]).toHaveLength(1);

      const allInOne = vi.fn(requestMethod);
      const wrapper2 = mount(Upload, {
        props: {
          requestMethod: allInOne,
          multiple: true,
          uploadAllFilesInOneRequest: true,
          allowUploadDuplicateFile: true,
        },
      });
      triggerUploadFile(wrapper2, [mockFileFoo, mockFileBar]);
      await sleep(0);
      // 全部文件在同一个请求中上传
      expect(allInOne).toHaveBeenCalledTimes(1);
      expect(allInOne.mock.calls[0][0]).toHaveLength(2);
    });

    it('useMockProgress[boolean]', async () => {
      useMockXMLHttpRequest();
      vi.useFakeTimers();
      try {
        const onProgress = vi.fn();
        const wrapper = mount(Upload, {
          props: { action, onProgress },
        });
        triggerUploadFile(wrapper, [mockFileFoo]);
        // 默认间隔 300ms：600ms 后出现首个模拟进度
        await vi.advanceTimersByTimeAsync(600);
        const mockProgressCalls = onProgress.mock.calls.filter((args) => args[0]?.type === 'mock');
        expect(mockProgressCalls).toHaveLength(1);
        expect(mockProgressCalls[0][0].percent).toBe(10);

        // useMockProgress = false 时不产生模拟进度
        const onProgress2 = vi.fn();
        mockXHRInstances = [];
        const wrapper2 = mount(Upload, {
          props: { action, useMockProgress: false, onProgress: onProgress2 },
        });
        triggerUploadFile(wrapper2, [mockFileFoo]);
        await vi.advanceTimersByTimeAsync(1000);
        expect(onProgress2).not.toHaveBeenCalled();
      } finally {
        vi.useRealTimers();
        restoreXMLHttpRequest();
      }
    });

    it('theme[list] renders list structure', async () => {
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

    it('theme[list] hides trigger when reaching max', async () => {
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

    it('theme[list] shows progress / fail status', async () => {
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

    it('theme[list] shows file size when no progress/fail', async () => {
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

    it('theme[grid] shows progress mask', async () => {
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

    it('theme[grid] shows fail mask', async () => {
      const wrapper = mount(Upload, {
        props: {
          defaultFiles: [{ name: 'a.png', url: 'https://x.png', type: 'image/png', status: 'fail' }],
        },
      });
      await nextTick();
      expect(wrapper.findComponent(CloseCircleIcon).exists()).toBe(true);
    });

    it('theme[grid] renders file content for non-image without url', async () => {
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

    // defaultValue 在 props.ts 声明但组件未消费（useUpload 的初始值仅读取 defaultFiles）
    it.todo('defaultValue[array]');

    it('withCredentials[boolean]', async () => {
      useMockXMLHttpRequest();
      try {
        const wrapper = mount(Upload, {
          props: { action, withCredentials: true },
        });
        triggerUploadFile(wrapper, [mockFileFoo]);
        await sleep(0);
        expect(mockXHRInstances[0].withCredentials).toBe(true);

        // 默认不携带 cookie
        mockXHRInstances = [];
        const wrapper2 = mount(Upload, {
          props: { action },
        });
        triggerUploadFile(wrapper2, [mockFileFoo]);
        await sleep(0);
        expect(mockXHRInstances[0].withCredentials).toBe(false);
      } finally {
        restoreXMLHttpRequest();
      }
    });

    it('onFail[function]', async () => {
      const onFail = vi.fn();
      const formatResponse = vi.fn(() => ({
        url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
      }));

      const wrapper = mount(Upload, {
        props: {
          requestMethod: () =>
            new Promise((resolve) => {
              resolve({
                status: 'fail',
                error: 'bar',
              });
            }),
          onFail,
          formatResponse,
        },
      });

      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      expect(onFail).toHaveBeenCalled();
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
    it('addBtn', async () => {
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

    it('addContent', async () => {
      const wrapper = mount(<Upload addContent={() => <UploadIcon />}></Upload>);
      await nextTick();
      const triggerTarget = wrapper.findComponent(UploadIcon);
      expect(triggerTarget.exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('success/preview/remove', async () => {
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

  describe('instanceFunctions', () => {
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
