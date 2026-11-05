import { ref, nextTick } from 'vue';
import { mount, enableAutoUnmount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import {
  AddIcon,
  CloseIcon,
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
import TImage from '../../image';
import ConfigProvider from '../../config-provider';
import Upload from '../upload';
import type { RequestMethodResponse, UploadFile } from '../type';
import { trigger } from '@/test/touch';
import { sleep } from '../../shared/util';

// 模拟进度的真实定时器可能晚于用例断言触发，自动卸载组件可避免残留渲染在环境销毁后执行
enableAutoUnmount(afterEach);

// 组件通过 ref 暴露的实例方法（expose），vm 类型上不可见，需断言收敛
type UploadInstanceFunctions = {
  uploading: boolean;
  triggerUpload: (e: MouseEvent) => void;
  uploadFiles: (toFiles?: UploadFile[]) => void;
  uploadFilePercent: (params: { file: UploadFile; percent: number }) => void;
  cancelUpload: (context?: { file?: UploadFile; e?: MouseEvent }) => void;
};

const getUploadInstance = (wrapper: VueWrapper<any>) => wrapper.vm as typeof wrapper.vm & UploadInstanceFunctions;

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

afterEach(() => {
  // 清理 teleport 到 body 的拖拽浮层，并复位全局 mock
  document.body.innerHTML = '';
  vi.useRealTimers();
  vi.unstubAllGlobals();
  restoreXMLHttpRequest();
});

const mockFileFoo = new File([new ArrayBuffer(3)], 'foo.png', {
  type: 'image/png',
});

const mockFileBar = new File([new ArrayBuffer(3)], 'bar.png', {
  type: 'image/png',
});

const action = 'http://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo';
const successUrl = 'https://tdesign.gtimg.com/site/source/figma-pc.png';

const requestMethod = (_files: UploadFile | UploadFile[]): Promise<RequestMethodResponse> =>
  Promise.resolve({ status: 'success', response: { url: successUrl } });

const triggerUploadFile = (wrapper: VueWrapper<any>, fileList: File[]) => {
  const target = wrapper.find('input');
  const element = target.element as HTMLInputElement & { _hijack?: boolean };

  // 判断 HTMLInputElement 对象是否被处理过
  if (element._hijack) {
    element.files = [...(element.files as unknown as File[]), ...fileList] as unknown as FileList;
  } else {
    element._hijack = true;
    Object.defineProperty(element, 'files', {
      value: fileList,
      writable: true,
    });
    // handleChange() 之后会执行 input.value = ''，因此需要清空 files，否则会持续积攒
    Object.defineProperty(element, 'value', {
      set(value) {
        if (value === '') {
          element.files = [] as unknown as FileList;
        }
      },
    });
  }

  target.trigger('change');
};

const triggerUploadFileAndWait = async (wrapper: VueWrapper<any>, file = mockFileFoo) => {
  triggerUploadFile(wrapper, [file]);
  await sleep(0);
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

  // 供测试手动触发 onload 模拟请求成功
  status = 200;

  responseText = JSON.stringify({ url: successUrl });

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

const imageFiles = (names: readonly string[]): UploadFile[] =>
  names.map((name) => ({ name: `${name}.png`, url: `https://${name}.png`, type: 'image/png', status: 'success' }));

describe('Upload', () => {
  describe('props', () => {
    it('accept[string]', () => {
      const wrapper = mount(Upload, {
        props: { accept: 'image/*' },
      });
      expect(wrapper.find('input[type="file"]').attributes('accept')).toBe('image/*');
    });

    it('action[string]', async () => {
      useMockXMLHttpRequest();
      const customAction = 'https://tdesign.gtimg.com/api/upload-demo';
      const wrapper = mount(Upload, {
        props: { action: customAction },
      });
      await triggerUploadFileAndWait(wrapper);
      // 上传请求发往 action 指定的地址
      expect(mockXHRInstances[0].open).toHaveBeenCalledWith('POST', customAction, true);
      expect(mockXHRInstances[0].send).toHaveBeenCalled();
    });

    it('addBtn[boolean]', () => {
      for (const theme of ['grid', 'list'] as const) {
        const selector = theme === 'grid' ? '.t-upload__item--add' : '.t-upload__list-trigger';
        const wrapper = mount(Upload, { props: { theme } });
        expect(wrapper.find(selector).exists()).toBe(true);
        if (theme === 'grid') expect(wrapper.findComponent(AddIcon).exists()).toBe(true);
        const hiddenWrapper = mount(Upload, { props: { theme, addBtn: false } });
        expect(hiddenWrapper.find(selector).exists()).toBe(false);
      }
    });

    it('addBtn[slot]', () => {
      for (const theme of ['grid', 'list'] as const) {
        const wrapper = mount(Upload, {
          props: { theme },
          slots: { addBtn: () => <span class="custom-add-btn">custom add</span> },
        });
        expect(wrapper.find('.custom-add-btn').text()).toBe('custom add');
        expect(wrapper.findComponent(AddIcon).exists()).toBe(false);
      }
    });

    it('addContent[string]', () => {
      for (const theme of ['grid', 'list'] as const) {
        const wrapper = mount(Upload, { props: { theme, addContent: '点击上传' } });
        const selector = theme === 'grid' ? '.t-upload__item--add' : '.t-upload__list-trigger';
        expect(wrapper.find(selector).text()).toBe('点击上传');
      }
    });

    it('addContent[function]', () => {
      for (const theme of ['grid', 'list'] as const) {
        const wrapper = mount(Upload, {
          props: { theme, addContent: () => <span class="custom-add-content">自定义上传文案</span> },
        });
        expect(wrapper.find('.custom-add-content').text()).toBe('自定义上传文案');
      }
    });

    it('addContent[slot]', () => {
      for (const theme of ['grid', 'list'] as const) {
        const wrapper = mount(Upload, {
          props: { theme },
          slots: { addContent: () => <span class="custom-add-content">custom content</span> },
        });
        expect(wrapper.find('.custom-add-content').text()).toBe('custom content');
      }
    });

    it('allowUploadDuplicateFile[boolean]', async () => {
      const onValidate = vi.fn();
      const uploadMethod = vi.fn(requestMethod);
      const wrapper = mount(Upload, {
        props: { requestMethod: uploadMethod, onValidate },
      });
      await triggerUploadFileAndWait(wrapper);
      expect(uploadMethod).toHaveBeenCalledTimes(1);

      // 默认过滤同名文件：再次选择同名文件触发校验提示且不再上传
      await triggerUploadFileAndWait(wrapper);
      expect(onValidate).toHaveBeenCalledWith(expect.objectContaining({ type: 'FILTER_FILE_SAME_NAME' }));
      expect(uploadMethod).toHaveBeenCalledTimes(1);

      // 允许重复上传：同名文件可再次发起请求
      const onValidate2 = vi.fn();
      const uploadMethod2 = vi.fn(requestMethod);
      const wrapper2 = mount(Upload, {
        props: { requestMethod: uploadMethod2, allowUploadDuplicateFile: true, onValidate: onValidate2 },
      });
      await triggerUploadFileAndWait(wrapper2);
      await triggerUploadFileAndWait(wrapper2);
      expect(onValidate2).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'FILTER_FILE_SAME_NAME' }));
      expect(uploadMethod2).toHaveBeenCalledTimes(2);
    });

    it('autoUpload[boolean]', async () => {
      const uploadMethod = vi.fn(requestMethod);
      const onChange = vi.fn();
      const wrapper = mount(Upload, {
        props: { autoUpload: false, requestMethod: uploadMethod, onChange },
      });
      await triggerUploadFileAndWait(wrapper);
      // 非自动上传：文件仅以 waiting 状态加入列表，不发起上传
      expect(uploadMethod).not.toHaveBeenCalled();
      expect(onChange).toHaveBeenLastCalledWith(
        [expect.objectContaining({ name: 'foo.png', status: 'waiting' })],
        expect.objectContaining({ trigger: 'add' }),
      );

      // 默认自动上传：选择文件后立即请求
      const autoMethod = vi.fn(requestMethod);
      const wrapper2 = mount(Upload, {
        props: { requestMethod: autoMethod },
      });
      triggerUploadFile(wrapper2, [mockFileBar]);
      await sleep(0);
      expect(autoMethod).toHaveBeenCalledTimes(1);
    });

    it('beforeAllFilesUpload[function]', async () => {
      const beforeAllFilesUpload = vi.fn((_files: UploadFile[]) => false);
      const uploadMethod = vi.fn(requestMethod);
      const onValidate = vi.fn();
      const wrapper = mount(Upload, {
        props: { requestMethod: uploadMethod, beforeAllFilesUpload, onValidate },
      });
      await triggerUploadFileAndWait(wrapper);
      // 返回 false 终止整批文件上传
      expect(beforeAllFilesUpload).toHaveBeenCalledTimes(1);
      expect(beforeAllFilesUpload.mock.calls[0][0][0]).toMatchObject({ name: 'foo.png' });
      expect(onValidate).toHaveBeenCalledWith(expect.objectContaining({ type: 'BEFORE_ALL_FILES_UPLOAD' }));
      expect(uploadMethod).not.toHaveBeenCalled();
    });

    it('beforeUpload[function]', async () => {
      const beforeUpload = vi.fn(() => false);
      const uploadMethod = vi.fn(requestMethod);
      const onValidate = vi.fn();
      const wrapper = mount(Upload, {
        props: { requestMethod: uploadMethod, beforeUpload, onValidate },
      });
      await triggerUploadFileAndWait(wrapper);
      // 返回 false 时当前文件被剔除，不发起上传
      expect(beforeUpload).toHaveBeenCalledWith(expect.objectContaining({ name: 'foo.png' }));
      expect(onValidate).toHaveBeenCalledWith(expect.objectContaining({ type: 'CUSTOM_BEFORE_UPLOAD' }));
      expect(uploadMethod).not.toHaveBeenCalled();
    });

    it('capture[string]', () => {
      const wrapper = mount(Upload, {
        props: { capture: 'camera' },
      });
      expect(wrapper.find('input').attributes('capture')).toBe('camera');
    });

    it('capture[boolean]', () => {
      const wrapper = mount(Upload, {
        props: { capture: true },
      });
      expect(wrapper.find('input').attributes('capture')).toBe('true');
    });

    it('data[object]', async () => {
      useMockXMLHttpRequest();
      const wrapper = mount(Upload, {
        props: { action, data: { channel: 'wx' } },
      });
      await triggerUploadFileAndWait(wrapper);
      const { requestParams } = mockXHRInstances[0].upload;
      // 额外字段随请求发送，默认字段 file/length 保留
      expect(requestParams).toMatchObject({ channel: 'wx', length: 1 });
      expect(requestParams.file).toBe(mockFileFoo);
    });

    it('data[function]', async () => {
      useMockXMLHttpRequest();
      // 函数接收当前上传文件，返回值作为额外请求字段
      const data = vi.fn((files: UploadFile[]) => ({ count: files.length, fileName: files[0].name }));
      const wrapper = mount(Upload, {
        props: { action, data },
      });
      await triggerUploadFileAndWait(wrapper);
      expect(data).toHaveBeenCalledTimes(1);
      expect(mockXHRInstances[0].upload.requestParams).toMatchObject({ count: 1, fileName: 'foo.png' });
    });

    it('disabled[boolean]', async () => {
      const onClickUpload = vi.fn();
      const wrapper = mount(Upload, {
        props: { disabled: true, onClickUpload },
      });
      expect(wrapper.find('.t-upload').classes()).toContain('t-upload--disabled');
      // 点击添加按钮不触发文件选择，也不触发 clickUpload 事件
      await wrapper.find('.t-upload__item--add').trigger('click');
      expect(onClickUpload).not.toHaveBeenCalled();

      for (const theme of ['grid', 'list'] as const) {
        const disabledWrapper = mount(Upload, {
          props: {
            theme,
            disabled: true,
            defaultFiles: [
              ...imageFiles(['success']),
              { ...imageFiles(['progress'])[0], status: 'progress' },
              { ...imageFiles(['fail'])[0], status: 'fail' },
              { name: 'document.txt', status: 'success' },
            ],
          },
        });
        // 只有可预览且非上传中/失败的图片显示禁用遮罩
        expect(disabledWrapper.findAll('.t-upload__disabled-mask')).toHaveLength(1);
      }
    });

    it('draggable[boolean]', async () => {
      vi.useFakeTimers();
      const onDrag = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          draggable: true,
          onDrag,
          defaultFiles: imageFiles(['a', 'b']),
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

      // 未开启 draggable 时长按不进入拖拽
      const onDrag2 = vi.fn();
      const wrapper2 = mount(Upload, {
        props: {
          onDrag: onDrag2,
          defaultFiles: imageFiles(['a', 'b']),
        },
      });
      await nextTick();
      const item2 = wrapper2.findAll('.t-upload__item:not(.t-upload__item--add)')[0];
      await trigger(item2, 'touchstart', 10, 10);
      await vi.advanceTimersByTimeAsync(300);
      expect(onDrag2).not.toHaveBeenCalled();
      expect(wrapper2.find('.t-upload').classes()).not.toContain('t-upload--dragging');
    });

    // fileListDisplay 在 props.ts 声明，但组件未实现对应的自定义文件列表渲染逻辑
    it.todo('fileListDisplay[function]');

    it('files[array]', async () => {
      const initialFiles = imageFiles(['a']);
      const wrapper = mount(Upload, {
        props: { files: initialFiles, requestMethod },
      });
      // 初始渲染受控文件
      expect(wrapper.findComponent(TImage).props('src')).toBe('https://a.png');

      await triggerUploadFileAndWait(wrapper);
      // 上传成功后通过 update:files 通知父组件
      const updateEvents = wrapper.emitted<[UploadFile[]]>('update:files');
      expect(updateEvents).toHaveLength(1);
      expect(updateEvents[0][0]).toEqual([
        expect.objectContaining({ name: 'foo.png', status: 'success', url: successUrl }),
      ]);
      // 父组件未回写前，受控列表仍显示原文件
      expect(wrapper.findComponent(TImage).props('src')).toBe('https://a.png');

      // 回写后展示新文件
      await wrapper.setProps({ files: updateEvents[0][0] });
      expect(wrapper.findComponent(TImage).props('src')).toBe(successUrl);
    });

    it('defaultFiles[array]', () => {
      const wrapper = mount(Upload, {
        props: { defaultFiles: imageFiles(['a', 'b']) },
      });
      expect(wrapper.findAll('.t-upload__item:not(.t-upload__item--add)')).toHaveLength(2);
      expect(wrapper.findAll('.t-upload__image')).toHaveLength(2);
    });

    it('format[function]', async () => {
      const format = vi.fn((file: File) => ({ name: `formatted-${file.name}` }));
      const onSelectChange = vi.fn();
      const wrapper = mount(Upload, {
        props: { requestMethod, format, onSelectChange },
      });
      await triggerUploadFileAndWait(wrapper);
      // format 接收原始 File，返回值合并进 UploadFile
      expect(format).toHaveBeenCalledWith(mockFileFoo);
      const selected = onSelectChange.mock.calls[0][1].currentSelectedFiles;
      expect(selected[0]).toMatchObject({ name: 'formatted-foo.png', raw: mockFileFoo });
    });

    it('formatRequest[function]', async () => {
      useMockXMLHttpRequest();
      const formatRequest = vi.fn((requestData: { [key: string]: any }) => ({
        fileList: requestData.file,
        extra: 'custom',
      }));
      const wrapper = mount(Upload, {
        props: { action, formatRequest },
      });
      await triggerUploadFileAndWait(wrapper);
      expect(formatRequest).toHaveBeenCalledTimes(1);
      // formatRequest 完全自定义请求字段
      expect(mockXHRInstances[0].upload.requestParams).toEqual({ fileList: mockFileFoo, extra: 'custom' });
    });

    it('formatResponse[function]', async () => {
      const formatResponse = vi.fn((response: any) => ({
        ...response,
        url: 'https://tdesign.gtimg.com/formatted.png',
      }));
      const onSuccess = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          requestMethod: () => Promise.resolve({ status: 'success', response: { url: 'https://x.png' } }),
          formatResponse,
          onSuccess,
        },
      });
      await triggerUploadFileAndWait(wrapper);
      // 原始响应经 formatResponse 解析
      expect(formatResponse).toHaveBeenCalledWith(
        { url: 'https://x.png' },
        expect.objectContaining({ currentFiles: [expect.objectContaining({ name: 'foo.png' })] }),
      );
      // 返回值的 url / response 写入上传成功的文件
      expect(onSuccess).toHaveBeenCalledTimes(1);
      const { fileList } = onSuccess.mock.calls[0][0];
      expect(fileList[0]).toMatchObject({
        url: 'https://tdesign.gtimg.com/formatted.png',
        response: { url: 'https://tdesign.gtimg.com/formatted.png' },
      });
    });

    it('headers[object]', async () => {
      useMockXMLHttpRequest();
      const wrapper = mount(Upload, {
        props: { action, headers: { 'X-Token': 'tdesign' } },
      });
      await triggerUploadFileAndWait(wrapper);
      expect(mockXHRInstances[0].setRequestHeader).toHaveBeenCalledWith('X-Token', 'tdesign');
    });

    it('imageProps[object]', async () => {
      const wrapper = mount(Upload, {
        props: { requestMethod, imageProps: { fit: 'cover' } },
      });
      await triggerUploadFileAndWait(wrapper);
      // imageProps 透传给内部 Image 组件
      const image = wrapper.findComponent(TImage);
      expect(image.exists()).toBe(true);
      expect(image.props('fit')).toBe('cover');
    });

    it('isBatchUpload[boolean]', async () => {
      // 宫格布局使用 TransitionGroup，jsdom 中移除节点不触发过渡结束会残留 DOM，故以 onChange 载荷断言
      const onChangeBatch = vi.fn();
      const wrapper = mount(Upload, {
        props: { autoUpload: false, multiple: true, isBatchUpload: true, onChange: onChangeBatch },
      });
      await triggerUploadFileAndWait(wrapper);
      await triggerUploadFileAndWait(wrapper, mockFileBar);
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
      await triggerUploadFileAndWait(wrapper2);
      triggerUploadFile(wrapper2, [mockFileBar]);
      await sleep(0);
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      expect(lastCall[0]).toHaveLength(2);
    });

    it('max[number]', async () => {
      // 超出数量限制触发校验
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
      expect(onValidate).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'FILES_OVER_LENGTH_LIMIT',
          files: [expect.objectContaining({ name: 'foo.png' })],
        }),
      );

      // 达到上限后隐藏添加入口（宫格布局）
      const grid = mount(Upload, {
        props: { max: 1, defaultFiles: imageFiles(['a']) },
      });
      expect(grid.find('.t-upload__item--add').exists()).toBe(false);

      // 达到上限后隐藏上传入口（列表布局）
      const listWrapper = mount(Upload, {
        props: { theme: 'list', max: 1, defaultFiles: imageFiles(['a']) },
      });
      expect(listWrapper.find('.t-upload__list-trigger').exists()).toBe(false);
    });

    it('method[string]', async () => {
      useMockXMLHttpRequest();
      const wrapper = mount(Upload, {
        props: { action, method: 'PUT' },
      });
      await triggerUploadFileAndWait(wrapper);
      expect(mockXHRInstances[0].open).toHaveBeenCalledWith('PUT', action, true);

      // 默认 POST
      const wrapper2 = mount(Upload, {
        props: { action },
      });
      await triggerUploadFileAndWait(wrapper2);
      expect(mockXHRInstances[1].open).toHaveBeenCalledWith('POST', action, true);
    });

    it('mockProgressDuration[number]', async () => {
      useMockXMLHttpRequest();
      vi.useFakeTimers();
      const onProgress = vi.fn();
      const wrapper = mount(Upload, {
        props: { action, mockProgressDuration: 100, onProgress },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      // 间隔 100ms：200ms（100ms 开启模拟进度 + 100ms 首次步进）后出现首个模拟进度 10%
      await vi.advanceTimersByTimeAsync(200);
      expect(onProgress).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'mock', percent: 10, file: expect.objectContaining({ name: 'foo.png' }) }),
      );
      expect(wrapper.text()).toContain('10%');
      await vi.advanceTimersByTimeAsync(100);
      expect(wrapper.text()).toContain('20%');
    });

    it('multiple[boolean]', async () => {
      const wrapper = mount(Upload, {
        props: { multiple: true },
      });
      expect(wrapper.find('input').attributes('multiple')).toBeDefined();

      // 多文件场景一次选择全部追加到列表
      const onChange = vi.fn();
      const wrapper2 = mount(Upload, {
        props: { multiple: true, autoUpload: false, onChange },
      });
      triggerUploadFile(wrapper2, [mockFileFoo, mockFileBar]);
      await sleep(0);
      expect(onChange).toHaveBeenLastCalledWith(
        [expect.objectContaining({ name: 'foo.png' }), expect.objectContaining({ name: 'bar.png' })],
        expect.objectContaining({ trigger: 'add' }),
      );
    });

    it('name[string]', async () => {
      useMockXMLHttpRequest();
      const wrapper = mount(Upload, {
        props: { action, name: 'customFile' },
      });
      await triggerUploadFileAndWait(wrapper);
      const { requestParams } = mockXHRInstances[0].upload;
      // 文件字段使用 name 别名，默认 file 字段不再存在
      expect(requestParams.customFile).toBe(mockFileFoo);
      expect(requestParams.file).toBeUndefined();
    });

    it('preview[boolean]', async () => {
      // 默认支持预览：点击图片打开 ImageViewer
      const wrapper = mount(Upload, {
        props: { requestMethod },
      });
      await triggerUploadFileAndWait(wrapper);
      await wrapper.find('.t-upload__image').trigger('click');
      expect(wrapper.find('.t-image-viewer').exists()).toBe(true);

      // preview=false 时点击不打开预览
      const wrapper2 = mount(Upload, {
        props: { requestMethod, preview: false },
      });
      await triggerUploadFileAndWait(wrapper2);
      await wrapper2.find('.t-upload__image').trigger('click');
      expect(wrapper2.find('.t-image-viewer').exists()).toBe(false);
    });

    it('removeBtn[boolean]', async () => {
      const wrapper = mount(Upload, {
        props: { requestMethod },
      });
      await triggerUploadFileAndWait(wrapper);
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(true);
      await wrapper.setProps({ removeBtn: false });
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(false);

      await Promise.all(
        (['grid', 'list'] as const).map(async (theme) => {
          const icon = theme === 'grid' ? CloseIcon : DeleteIcon;
          const files = imageFiles(['a', 'b', 'c']);
          files[0].removeBtn = true;
          files[1].removeBtn = false;
          const fileWrapper = mount(Upload, { props: { theme, removeBtn: false, defaultFiles: files } });
          expect(fileWrapper.findAllComponents(icon)).toHaveLength(1);
          await fileWrapper.setProps({ removeBtn: true });
          expect(fileWrapper.findAllComponents(icon)).toHaveLength(2);
        }),
      );
    });

    it('requestMethod[function]', async () => {
      const uploadMethod = vi.fn(requestMethod);
      const onSuccess = vi.fn();
      const wrapper = mount(Upload, {
        props: { requestMethod: uploadMethod, onSuccess },
      });
      await triggerUploadFileAndWait(wrapper);
      // 自定义上传函数接管请求，单文件场景入参为待上传文件对象
      expect(uploadMethod).toHaveBeenCalledTimes(1);
      expect(uploadMethod.mock.calls[0][0]).toMatchObject({ name: 'foo.png', raw: mockFileFoo });
      // 返回值 response.url 作为上传成功后的文件地址
      expect(onSuccess).toHaveBeenCalledTimes(1);
      const { fileList } = onSuccess.mock.calls[0][0];
      expect(fileList[0]).toMatchObject({
        name: 'foo.png',
        url: successUrl,
        status: 'success',
      });
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
      // 数字类型默认单位 KB：2048B 超出 1KB 限制
      triggerUploadFile(wrapper, [new File([new ArrayBuffer(2048)], 'big.png', { type: 'image/png' })]);
      await sleep(0);
      expect(onValidate).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'FILE_OVER_SIZE_LIMIT',
          files: [expect.objectContaining({ name: 'big.png' })],
        }),
      );
    });

    it('sizeLimit[object]', async () => {
      const uploadMethod = vi.fn(requestMethod);
      const onValidate = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          requestMethod: uploadMethod,
          sizeLimit: {
            size: 1,
            unit: 'KB',
            message: '图片大小不超过 {sizeLimit} KB',
          },
          onValidate,
        },
      });

      // 1023B 未超出 1KB 限制，正常上传
      triggerUploadFile(wrapper, [new File([new ArrayBuffer(1023)], 'small.png', { type: 'image/png' })]);
      await sleep(0);
      expect(uploadMethod).toHaveBeenCalledTimes(1);

      // 1025B 超出限制，被拦截并触发校验事件
      triggerUploadFile(wrapper, [new File([new ArrayBuffer(1025)], 'big.png', { type: 'image/png' })]);
      await sleep(0);
      expect(onValidate).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'FILE_OVER_SIZE_LIMIT',
          files: [expect.objectContaining({ name: 'big.png' })],
        }),
      );
      expect(uploadMethod).toHaveBeenCalledTimes(1);
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
      const onProgress = vi.fn();
      const wrapper = mount(Upload, {
        props: { action, onProgress },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      // 默认间隔 300ms：600ms（300ms 开启 + 300ms 首次步进）后出现首个模拟进度
      await vi.advanceTimersByTimeAsync(600);
      const mockProgressCalls = onProgress.mock.calls.filter((args) => args[0]?.type === 'mock');
      expect(mockProgressCalls).toHaveLength(1);
      expect(mockProgressCalls[0][0].percent).toBe(10);

      // useMockProgress=false 时不产生模拟进度
      const onProgress2 = vi.fn();
      const wrapper2 = mount(Upload, {
        props: { action, useMockProgress: false, onProgress: onProgress2 },
      });
      triggerUploadFile(wrapper2, [mockFileFoo]);
      await vi.advanceTimersByTimeAsync(1000);
      expect(onProgress2).not.toHaveBeenCalled();
    });

    it.each([
      ['grid', ['a'], '.t-upload__item--add'],
      ['list', ['a', 'b'], '.t-upload__list-trigger'],
    ] as const)('theme[%s]', (theme, files, triggerSelector) => {
      const wrapper = mount(Upload, { props: { theme, defaultFiles: imageFiles(files) } });
      expect(wrapper.find(`.t-upload--${theme}`).exists()).toBe(true);
      expect(wrapper.find(triggerSelector).exists()).toBe(true);
      if (theme === 'grid') expect(wrapper.find('.t-upload__image').exists()).toBe(true);
      else expect(wrapper.findAll('.t-upload__list-item')).toHaveLength(files.length);
    });

    // value 在 props.ts 声明，但组件 v-model 基于 files/modelValue 实现（useUpload 仅读取 files、modelValue、defaultFiles），value 未被消费
    it.todo('value[array]');

    it('modelValue[array]', async () => {
      const wrapper = mount(Upload, {
        props: { modelValue: [], requestMethod },
      });
      await triggerUploadFileAndWait(wrapper);
      // 上传成功后通过 update:modelValue 通知父组件
      const updateEvents = wrapper.emitted<[UploadFile[]]>('update:modelValue');
      expect(updateEvents).toHaveLength(1);
      expect(updateEvents[0][0]).toEqual([
        expect.objectContaining({ name: 'foo.png', status: 'success', url: successUrl }),
      ]);

      // 父组件回写后展示上传成功的文件
      await wrapper.setProps({ modelValue: updateEvents[0][0] });
      expect(wrapper.find('.t-upload__image img').attributes('src')).toBe(successUrl);
    });

    // defaultValue 在 props.ts 声明，但组件初始值仅读取 defaultFiles，defaultValue 未被消费
    it.todo('defaultValue[array]');

    it('withCredentials[boolean]', async () => {
      useMockXMLHttpRequest();
      const wrapper = mount(Upload, {
        props: { action, withCredentials: true },
      });
      await triggerUploadFileAndWait(wrapper);
      expect(mockXHRInstances[0].withCredentials).toBe(true);

      // 默认不携带 cookie
      const wrapper2 = mount(Upload, {
        props: { action },
      });
      await triggerUploadFileAndWait(wrapper2);
      expect(mockXHRInstances[1].withCredentials).toBe(false);
    });
  });

  describe('events', () => {
    it('cancelUpload', () => {
      const onCancelUpload = vi.fn();
      const wrapper = mount(Upload, {
        props: { onCancelUpload },
      });
      const instance = getUploadInstance(wrapper);
      instance.cancelUpload();
      expect(onCancelUpload).toHaveBeenCalledTimes(1);
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          onChange,
          defaultFiles: imageFiles(['a']),
        },
      });
      // 上传成功新增文件
      await triggerUploadFileAndWait(wrapper);
      expect(onChange).toHaveBeenLastCalledWith(
        [expect.objectContaining({ name: 'foo.png', status: 'success' })],
        expect.objectContaining({ trigger: 'add' }),
      );
      // 删除文件
      await wrapper.findComponent(CloseIcon).trigger('click');
      expect(onChange).toHaveBeenLastCalledWith(
        [],
        expect.objectContaining({ trigger: 'remove', index: 0, file: expect.objectContaining({ name: 'foo.png' }) }),
      );
    });

    it('clickUpload', async () => {
      const onClickUpload = vi.fn();
      const wrapper = mount(Upload, {
        props: { onClickUpload },
      });
      const clickSpy = vi.spyOn(wrapper.find('input').element, 'click');
      await wrapper.find('.t-upload__item--add').trigger('click');
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(onClickUpload).toHaveBeenCalledTimes(1);
      expect(onClickUpload.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
    });

    it('drag', async () => {
      vi.useFakeTimers();
      const onDrag = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          draggable: true,
          onDrag,
          defaultFiles: imageFiles(['a', 'b']),
        },
      });
      await nextTick();
      const item = wrapper.findAll('.t-upload__item:not(.t-upload__item--add)')[0];
      await trigger(item, 'touchstart', 10, 10);
      await vi.advanceTimersByTimeAsync(300);
      expect(onDrag).toHaveBeenCalledTimes(1);
      expect(onDrag.mock.calls[0][0]).toMatchObject({
        index: 0,
        file: expect.objectContaining({ name: 'a.png' }),
      });
      await trigger(item, 'touchend', 10, 10);
    });

    it('drop', async () => {
      vi.useFakeTimers();
      // 同步执行 rAF 回调，避免依赖 jsdom 的异步帧调度
      vi.stubGlobal('requestAnimationFrame', (cb: (time: number) => void) => {
        cb(0);
        return 0;
      });
      const onDrop = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          draggable: true,
          onDrop,
          onChange,
          defaultFiles: imageFiles(['a', 'b']),
        },
      });
      await nextTick();
      const item = wrapper.findAll('.t-upload__item:not(.t-upload__item--add)')[0];
      await trigger(item, 'touchstart', 10, 10);
      await vi.advanceTimersByTimeAsync(300);
      // 拖动第一个元素到第二个位置
      await trigger(item, 'touchmove', 60, 60);
      await trigger(item, 'touchend', 60, 60);
      expect(onDrop).toHaveBeenCalledTimes(1);
      expect(onDrop.mock.calls[0][0].map((file: UploadFile) => file.name)).toEqual(['b.png', 'a.png']);
      expect(onChange).toHaveBeenCalledWith(
        [expect.objectContaining({ name: 'b.png' }), expect.objectContaining({ name: 'a.png' })],
        expect.objectContaining({ trigger: 'sort' }),
      );
    });

    it('fail', async () => {
      const onFail = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          requestMethod: () => Promise.resolve({ status: 'fail', error: '上传失败', response: {} }),
          onFail,
        },
      });
      await triggerUploadFileAndWait(wrapper);
      expect(onFail).toHaveBeenCalledTimes(1);
      expect(onFail.mock.calls[0][0]).toMatchObject({
        file: expect.objectContaining({ name: 'foo.png' }),
        failedFiles: [expect.objectContaining({ name: 'foo.png' })],
        currentFiles: [expect.objectContaining({ name: 'foo.png' })],
        response: expect.objectContaining({ error: '上传失败' }),
      });
    });

    it('oneFileFail', async () => {
      const onOneFileFail = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          multiple: true,
          allowUploadDuplicateFile: true,
          // 多文件场景 requestMethod 入参为单文件数组
          requestMethod: (files: UploadFile | UploadFile[]) => {
            const file = Array.isArray(files) ? files[0] : files;
            return Promise.resolve(
              file.name === 'bar.png'
                ? { status: 'fail', error: 'bar 上传失败', response: {} }
                : { status: 'success', response: { url: successUrl } },
            );
          },
          onOneFileFail,
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo, mockFileBar]);
      await sleep(0);
      // 仅失败的那个文件触发 oneFileFail
      expect(onOneFileFail).toHaveBeenCalledTimes(1);
      expect(onOneFileFail.mock.calls[0][0]).toMatchObject({
        file: expect.objectContaining({ name: 'bar.png' }),
        failedFiles: [expect.objectContaining({ name: 'bar.png' })],
        response: expect.objectContaining({ error: 'bar 上传失败' }),
      });
    });

    it('oneFileSuccess', async () => {
      const onOneFileSuccess = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          multiple: true,
          allowUploadDuplicateFile: true,
          requestMethod,
          onOneFileSuccess,
        },
      });
      triggerUploadFile(wrapper, [mockFileFoo, mockFileBar]);
      await sleep(0);
      // 多文件场景下每个文件上传成功都触发一次
      expect(onOneFileSuccess).toHaveBeenCalledTimes(2);
      const names = onOneFileSuccess.mock.calls.map((args) => args[0].file.name).sort();
      expect(names).toEqual(['bar.png', 'foo.png']);
    });

    it('preview', async () => {
      const onPreview = vi.fn();
      const wrapper = mount(Upload, {
        props: { requestMethod, onPreview },
      });
      await triggerUploadFileAndWait(wrapper);
      await wrapper.find('.t-upload__image').trigger('click');
      expect(onPreview).toHaveBeenCalledTimes(1);
      expect(onPreview.mock.calls[0][0]).toMatchObject({
        index: 0,
        file: expect.objectContaining({ name: 'foo.png' }),
      });

      // 非图片文件点击同样触发，但不打开预览
      const onPreview2 = vi.fn();
      const wrapper2 = mount(Upload, {
        props: {
          onPreview: onPreview2,
          defaultFiles: [{ name: 'doc.pdf', type: 'application/pdf', status: 'success' }],
        },
      });
      await wrapper2.find('.t-upload__file-content').trigger('click');
      expect(onPreview2).toHaveBeenCalledTimes(1);
      expect(wrapper2.find('.t-image-viewer').exists()).toBe(false);
    });

    it('progress', async () => {
      useMockXMLHttpRequest();
      vi.useFakeTimers();
      const onProgress = vi.fn();
      const wrapper = mount(Upload, {
        props: { action, mockProgressDuration: 100, onProgress },
      });
      triggerUploadFile(wrapper, [mockFileFoo]);
      await vi.advanceTimersByTimeAsync(200);
      expect(onProgress).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'mock',
          percent: 10,
          file: expect.objectContaining({ name: 'foo.png' }),
          currentFiles: [expect.objectContaining({ name: 'foo.png' })],
        }),
      );

      const onRealProgress = vi.fn();
      const realWrapper = mount(Upload, {
        props: { action, useMockProgress: false, onProgress: onRealProgress },
      });
      triggerUploadFile(realWrapper, [mockFileBar]);
      await vi.advanceTimersByTimeAsync(0);
      const event = new ProgressEvent('progress', { loaded: 43, total: 100, lengthComputable: true });
      mockXHRInstances[1].upload.onprogress?.(event);
      await nextTick();
      expect(onRealProgress).toHaveBeenCalledWith({
        e: event,
        type: 'real',
        percent: 43,
        file: expect.objectContaining({ name: 'bar.png', percent: 43 }),
        currentFiles: [expect.objectContaining({ name: 'bar.png', percent: 43 })],
        XMLHttpRequest: mockXHRInstances[1],
      });
      expect(realWrapper.find('.t-upload__progress-text').text()).toBe('43%');
    });

    it('remove', async () => {
      const onRemove = vi.fn();
      const wrapper = mount(Upload, {
        props: {
          requestMethod,
          onRemove,
          defaultFiles: imageFiles(['a']),
        },
      });
      await wrapper.findComponent(CloseIcon).trigger('click');
      expect(onRemove).toHaveBeenCalledTimes(1);
      expect(onRemove.mock.calls[0][0]).toMatchObject({
        index: 0,
        file: expect.objectContaining({ name: 'a.png' }),
      });
    });

    it('selectChange', async () => {
      const onSelectChange = vi.fn();
      const wrapper = mount(Upload, {
        props: { requestMethod, onSelectChange },
      });
      await triggerUploadFileAndWait(wrapper);
      expect(onSelectChange).toHaveBeenCalledTimes(1);
      // 第一个参数为原始 File 对象数组
      expect(onSelectChange.mock.calls[0][0]).toHaveLength(1);
      expect(onSelectChange.mock.calls[0][0][0]).toBe(mockFileFoo);
      expect(onSelectChange.mock.calls[0][1]).toMatchObject({
        currentSelectedFiles: [expect.objectContaining({ name: 'foo.png' })],
      });
    });

    it('success', async () => {
      const onSuccess = vi.fn();
      const wrapper = mount(Upload, {
        props: { requestMethod, onSuccess },
      });
      await triggerUploadFileAndWait(wrapper);
      expect(onSuccess).toHaveBeenCalledTimes(1);
      const context = onSuccess.mock.calls[0][0];
      expect(context.fileList).toEqual([
        expect.objectContaining({ name: 'foo.png', status: 'success', url: successUrl }),
      ]);
      expect(context.currentFiles).toEqual([expect.objectContaining({ name: 'foo.png' })]);
      expect(context.response).toMatchObject({ url: successUrl });
    });

    it('validate', async () => {
      const onValidate = vi.fn();
      const wrapper = mount(Upload, {
        props: { requestMethod, sizeLimit: 1, onValidate },
      });
      triggerUploadFile(wrapper, [new File([new ArrayBuffer(2048)], 'big.png', { type: 'image/png' })]);
      await sleep(0);
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'FILE_OVER_SIZE_LIMIT',
          files: [expect.objectContaining({ name: 'big.png' })],
        }),
      );
    });

    it('waitingUploadFilesChange', async () => {
      useMockXMLHttpRequest();
      const onWaitingUploadFilesChange = vi.fn();
      const wrapper = mount(Upload, {
        props: { action, useMockProgress: false, onWaitingUploadFilesChange },
      });
      await triggerUploadFileAndWait(wrapper);
      // 文件通过校验后进入待上传列表
      expect(onWaitingUploadFilesChange).toHaveBeenCalledWith({
        files: [expect.objectContaining({ name: 'foo.png' })],
        trigger: 'validate',
      });
      // 上传过程中删除待上传文件
      await wrapper.findComponent(CloseIcon).trigger('click');
      expect(onWaitingUploadFilesChange).toHaveBeenCalledWith({ files: [], trigger: 'remove' });
    });
  });

  describe('instanceFunctions', () => {
    it('triggerUpload', async () => {
      const wrapper = mount(Upload);
      const instance = getUploadInstance(wrapper);
      const clickSpy = vi.spyOn(wrapper.find('input').element, 'click');
      instance.triggerUpload(new MouseEvent('click'));
      expect(clickSpy).toHaveBeenCalledTimes(1);
      // 禁用后不再触发文件选择
      await wrapper.setProps({ disabled: true });
      instance.triggerUpload(new MouseEvent('click'));
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('uploadFiles', async () => {
      const uploadMethod = vi.fn(requestMethod);
      const onSuccess = vi.fn();
      const wrapper = mount(Upload, {
        props: { autoUpload: false, requestMethod: uploadMethod, onSuccess },
      });
      const instance = getUploadInstance(wrapper);
      await triggerUploadFileAndWait(wrapper);
      // 非自动上传模式选择文件后不发起请求
      expect(uploadMethod).not.toHaveBeenCalled();
      instance.uploadFiles();
      await sleep(0);
      expect(uploadMethod).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    it('uploadFilePercent', async () => {
      const wrapper = mount(Upload, {
        props: {
          autoUpload: false,
          defaultFiles: [{ name: 'p.png', raw: mockFileFoo, type: 'image/png', status: 'progress' }],
        },
      });
      const instance = getUploadInstance(wrapper);
      await nextTick();
      // 上传中的文件按 raw 匹配并更新进度
      instance.uploadFilePercent({ file: { raw: mockFileFoo }, percent: 66 });
      await nextTick();
      expect(wrapper.text()).toContain('66%');
    });

    it('cancelUpload', async () => {
      const onCancelUpload = vi.fn();
      useMockXMLHttpRequest();
      const wrapper = mount(Upload, {
        props: { action, useMockProgress: false, onCancelUpload },
      });
      const instance = getUploadInstance(wrapper);
      await triggerUploadFileAndWait(wrapper);
      // 中断进行中的请求并复位上传状态
      expect(instance.uploading).toBe(true);
      instance.cancelUpload();
      expect(mockXHRInstances[0].abort).toHaveBeenCalledTimes(1);
      expect(instance.uploading).toBe(false);
      expect(onCancelUpload).toHaveBeenCalledTimes(1);

      // 非自动上传模式下，携带 file 的取消会移除对应文件
      const onChange = vi.fn();
      const onRemove = vi.fn();
      const wrapper2 = mount(Upload, {
        props: { autoUpload: false, onChange, onRemove, onCancelUpload },
      });
      const instance2 = getUploadInstance(wrapper2);
      await triggerUploadFileAndWait(wrapper2);
      instance2.cancelUpload({ file: { name: 'foo.png', raw: mockFileFoo }, e: new MouseEvent('click') });
      expect(onCancelUpload).toHaveBeenCalledTimes(2);
      expect(onRemove).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith([], expect.objectContaining({ trigger: 'remove' }));
    });

    it('uploading', async () => {
      useMockXMLHttpRequest();
      const wrapper = mount(Upload, {
        props: { action, useMockProgress: false },
      });
      const instance = getUploadInstance(wrapper);
      expect(instance.uploading).toBe(false);
      await triggerUploadFileAndWait(wrapper);
      // 请求进行中为 true
      expect(instance.uploading).toBe(true);
      // 请求成功后复位为 false
      mockXHRInstances[0].onload?.(new ProgressEvent('load'));
      await sleep(0);
      expect(instance.uploading).toBe(false);
    });

    // upload 暴露的是 setup 执行时 inputRef.value 的快照（此时 input 尚未挂载，值恒为 undefined），源码未能暴露真实 input 元素
    it.todo('upload');
  });

  describe('globalConfig', () => {
    it('upload', () => {
      const wrapper = mount(
        <ConfigProvider globalConfig={{ upload: { progress: { uploadingText: 'Uploading...', failText: 'Failed!' } } }}>
          <Upload
            defaultFiles={[
              { name: 'a.png', raw: mockFileFoo, type: 'image/png', status: 'progress' },
              { name: 'b.png', raw: mockFileFoo, type: 'image/png', status: 'fail' },
            ]}
          />
        </ConfigProvider>,
      );
      const texts = wrapper.findAll('.t-upload__progress-text');
      expect(texts[0].text()).toBe('Uploading...');
      expect(texts[1].text()).toBe('Failed!');
    });
  });
});
