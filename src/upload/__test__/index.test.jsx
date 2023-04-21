import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AddIcon, CloseIcon, RefreshIcon, UploadIcon } from 'tdesign-icons-vue-next';
import Upload from '../upload.vue';

const mockFileFoo = new File([new ArrayBuffer(3)], 'foo.png', {
  type: 'image/png',
});

const mockFileBar = new File([new ArrayBuffer(3)], 'bar.png', {
  type: 'image/png',
});

const action = 'http://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo';

const requestMethod = (file) =>
  new Promise((resolve, reject) => {
    resolve({
      status: 'success',
      response: { url: 'https://tdesign.gtimg.com/site/source/figma-pc.png' },
    });
  });

const sleep = (timeout) => {
  return new Promise((resolve, reject) => {
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
    it(':action', async () => {
      const onProgress = vi.fn();

      const wrapper = mount(Upload, {
        props: {
          action,
          onProgress,
        },
      });

      triggerUploadFile(wrapper, [mockFileFoo]);

      await sleep(1000);
      expect(onProgress).toHaveBeenCalled();
    });

    it(':allowUploadDuplicateFile', async () => {
      const props = {
        autoUpload: false,
        allowUploadDuplicateFile: true,
      };

      const wrapper = mount(Upload, {
        props,
      });

      triggerUploadFile(wrapper, [mockFileFoo]);
      triggerUploadFile(wrapper, [mockFileFoo]);

      await nextTick();
      expect(wrapper.vm.toUploadFiles.length).toBe(2);

      wrapper.setProps({
        allowUploadDuplicateFile: false,
      });

      triggerUploadFile(wrapper, [mockFileFoo]);

      await nextTick();
      expect(wrapper.vm.toUploadFiles.length).toBe(2);
    });

    it(':disabled', async () => {
      const onSelectChange = vi.fn();

      const props = {
        autoUpload: false,
        disabled: true,
        onSelectChange,
      };

      const wrapper = mount(Upload, {
        props,
      });

      await wrapper.findComponent(Upload).trigger('click');
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

    it(':max', async () => {
      const props = {
        requestMethod,
        allowUploadDuplicateFile: true,
        max: 3,
      };

      const wrapper = mount(Upload, {
        props,
      });

      triggerUploadFile(wrapper, [mockFileFoo, mockFileBar, mockFileFoo, mockFileBar]);
      await nextTick();
      expect(wrapper.vm.toUploadFiles.length).toBe(3);
    });

    it(':multiple', async () => {
      const props = {
        autoUpload: false,
        multiple: true,
      };

      const wrapper = mount(Upload, {
        props,
      });

      triggerUploadFile(wrapper, [mockFileFoo, mockFileBar]);
      await nextTick();
      expect(wrapper.vm.toUploadFiles.length).toBe(2);
    });

    it(':requestMethod', async () => {
      const onSuccess = vi.fn();
      const onFail = vi.fn();
      const response = ref({
        status: 'success',
        response: { url: 'https://tdesign.gtimg.com/site/source/figma-pc.png' },
      });

      const props = {
        allowUploadDuplicateFile: true,
        onSuccess,
        onFail,
        requestMethod: (file) => new Promise((resolve, reject) => resolve(response.value)),
      };

      const wrapper = mount(Upload, {
        props,
      });

      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      expect(onSuccess).toHaveBeenCalledTimes(1);

      response.value = {
        status: 'success',
        error: 'bar',
        response: {
          error: 'foo',
        },
      };
      triggerUploadFile(wrapper, [mockFileFoo]);
      await sleep(0);
      expect(onSuccess).toHaveBeenCalledTimes(1);

      response.value = {
        status: 'fail',
        error: 'bar',
      };
      triggerUploadFile(wrapper, [mockFileBar]);
      await sleep(0);
      expect(onFail).toHaveBeenCalledTimes(2);

      response.value = undefined;
      triggerUploadFile(wrapper, [mockFileBar]);
      await sleep(0);
      expect(onFail).toHaveBeenCalledTimes(2);

      response.value = {
        error: 'bar',
      };
      triggerUploadFile(wrapper, [mockFileBar]);
      await sleep(0);
      expect(onFail).toHaveBeenCalledTimes(2);

      response.value = {
        status: 'yes',
      };
      triggerUploadFile(wrapper, [mockFileBar]);
      await sleep(0);
      expect(onFail).toHaveBeenCalledTimes(2);
    });

    it(':sizeLimit', () => {
      const props = {
        requestMethod,
        sizeLimit: {
          size: 1,
          unit: 'KB',
          message: '图片大小不超过 {sizeLimit} KB',
        },
      };

      const wrapper = mount(Upload, {
        props,
      });

      const target = wrapper.findComponent(Upload);
      triggerUploadFile(wrapper, [
        new File([new ArrayBuffer(1023)], 'foo.png', {
          type: 'image/png',
        }),
      ]);
      expect(wrapper.vm.uploadFiles.length).toBe(1);

      target.vm.uploadFiles = [];
      triggerUploadFile(wrapper, [
        new File([new ArrayBuffer(1025)], 'foo.png', {
          type: 'image/png',
        }),
      ]);
      expect(wrapper.vm.uploadFiles.length).toBe(0);
    });
  });

  describe('slots', () => {
    it(':deleteBtn', async () => {
      const props = {
        requestMethod,
        deleteBtn: () => <AddIcon />,
      };

      const wrapper = mount(Upload, {
        props,
      });

      triggerUploadFile(wrapper, [mockFileFoo]);
      await nextTick();
      expect(wrapper.findComponent(AddIcon).exists()).toBe(true);
    });

    it(': trigger', async () => {
      const wrapper = mount(
        <Upload>
          <UploadIcon />
        </Upload>,
      );

      await nextTick();

      const triggerTarget = wrapper.findComponent(UploadIcon);
      expect(triggerTarget.exists()).toBe(true);

      const spy = vi.spyOn(wrapper.vm, 'triggerUpload');
      await triggerTarget.trigger('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('event', () => {
    it(':events', async () => {
      const props = {
        requestMethod,
      };

      const wrapper = mount(Upload, {
        props,
      });

      triggerUploadFile(wrapper, [mockFileFoo]);

      await sleep(0);
      expect(wrapper.emitted()).toHaveProperty('select-change');
      expect(wrapper.emitted()).toHaveProperty('success');

      await wrapper.find('.t-upload__image').trigger('click');
      expect(wrapper.emitted()).toHaveProperty('preview');

      await wrapper.findComponent(CloseIcon).trigger('click');
      expect(wrapper.emitted()).toHaveProperty('remove');
    });
  });

  describe('function', () => {
    it(':beforeUpload', async () => {
      const canUpload = ref(false);
      const beforeUpload = vi.fn(() => canUpload.value);

      const props = {
        requestMethod,
        beforeUpload,
      };

      const wrapper = mount(Upload, {
        props,
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

    it(':format', async () => {
      const format = vi.fn((file) => ({ ...file, name: 'bar.png', raw: file }));

      const props = {
        requestMethod,
        format,
      };

      const wrapper = mount(Upload, {
        props,
      });

      triggerUploadFile(wrapper, [mockFileBar]);
      await nextTick();
      expect(format).toHaveBeenCalled();
      expect(wrapper.vm.toUploadFiles[0].name).toBe('bar.png');
    });

    it(':onFail', async () => {
      const onFail = vi.fn();

      const props = {
        requestMethod: () =>
          new Promise((resolve, reject) =>
            resolve({
              status: 'fail',
              error: 'bar',
            }),
          ),
        onFail,
      };

      const wrapper = mount(Upload, {
        props,
      });

      triggerUploadFile(wrapper, [mockFileFoo]);

      await sleep(0);
      expect(onFail).toHaveBeenCalled();
    });
  });
});
