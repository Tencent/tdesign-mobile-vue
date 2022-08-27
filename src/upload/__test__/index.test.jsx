import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AddIcon, CloseIcon, RefreshIcon, UploadIcon } from 'tdesign-icons-vue-next';
import Upload from '../upload.vue';

const mockFileFoo = new File(['foo'], 'foo.png', {
  type: 'image/png',
});

const mockFileBar = new File(['bar'], 'bar.png', {
  type: 'image/png',
});

const action = 'http://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo';

const sleep = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

describe('Upload', () => {
  describe('props', () => {
    it(': allowUploadDuplicateFile', async () => {
      const props = {
        autoUpload: false,
        allowUploadDuplicateFile: true,
      };

      const wrapper = mount(Upload, {
        props,
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo],
        },
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo],
        },
      });

      await nextTick();
      expect(wrapper.vm.toUploadFiles.length).toBe(2);
    });

    it(': disabled', async () => {
      const onSelectChange = vi.fn();

      const props = {
        disabled: true,
        onSelectChange,
      };

      const wrapper = mount(Upload, {
        props,
      });

      await wrapper.findComponent(Upload).trigger('click');
      expect(onSelectChange).not.toHaveBeenCalled();
    });

    it(': files', async () => {
      const files = ref([]);

      const wrapper = mount(<Upload action={action} v-model={files.value} />);

      await wrapper.findComponent(Upload).setValue([mockFileFoo]);
      expect(files.value.length).toBe(1);
    });

    it(': defaultFiles', async () => {
      const defaultFiles = ref([]);

      const wrapper = mount({
        setup() {
          return () => <Upload action={action} defaultFiles={defaultFiles.value} />;
        },
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo],
        },
      });

      await nextTick();
      expect(defaultFiles.value.length).toBe(0);
    });

    it(': gridConfig', async () => {
      const gridConfig = ref({
        column: 2,
      });

      const props = {
        action,
        gridConfig: gridConfig.value,
        multiple: true,
        allowUploadDuplicateFile: true,
      };

      const wrapper = mount(Upload, {
        props,
      });

      await wrapper.findComponent(Upload).setValue([mockFileFoo, mockFileBar, mockFileFoo, mockFileBar]);

      expect(wrapper.vm.itemStyle).toStrictEqual({ flexBasis: `${100 / 2}%` });

      gridConfig.value.column = 4;
      expect(wrapper.vm.itemStyle).toStrictEqual({ flexBasis: `${100 / 4}%` });
    });

    it(': max', async () => {
      const props = {
        action,
        allowUploadDuplicateFile: true,
        max: 3,
      };

      const wrapper = mount(Upload, {
        props,
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo, mockFileBar, mockFileFoo, mockFileBar],
        },
      });

      await nextTick();
      expect(wrapper.vm.toUploadFiles.length).toBe(3);
    });

    it(': multiple', async () => {
      const props = {
        autoUpload: false,
        multiple: true,
      };

      const wrapper = mount(Upload, {
        props,
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo, mockFileBar],
        },
      });

      await nextTick();
      expect(wrapper.vm.toUploadFiles.length).toBe(2);
    });

    it(': requestMethod', async () => {
      const onSuccess = vi.fn();
      const onFail = vi.fn();

      const props = {
        onSuccess,
        onFail,
        requestMethod: (file) =>
          new Promise((resolve, reject) => {
            const reslut =
              file.name === 'foo.png'
                ? {
                    status: 'success',
                    response: { url: 'https://tdesign.gtimg.com/site/source/figma-pc.png' },
                  }
                : {
                    status: 'fail',
                    error: 'bar',
                  };
            resolve(reslut);
          }),
      };

      const wrapper = mount(Upload, {
        props,
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo],
        },
      });

      await sleep(500);
      expect(onSuccess).toHaveBeenCalled();

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileBar],
        },
      });

      await sleep(500);
      expect(onFail).toHaveBeenCalled();
    }, 2000);

    it(': sizeLimit', () => {
      const props = {
        action,
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
      target.vm.handleChange({
        target: {
          files: [
            new File(['t'.repeat(1023)], 'foo.png', {
              type: 'image/png',
            }),
          ],
        },
      });
      expect(wrapper.vm.uploadFiles.length).toBe(1);

      target.vm.uploadFiles = [];
      target.vm.handleChange({
        target: {
          files: [
            new File(['t'.repeat(1025)], 'foo.png', {
              type: 'image/png',
            }),
          ],
        },
      });
      expect(wrapper.vm.uploadFiles.length).toBe(0);
    });
  });

  describe('slots', () => {
    it(': deleteBtn', async () => {
      const props = {
        action,
        deleteBtn: () => <AddIcon />,
      };

      const wrapper = mount(Upload, {
        props,
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo],
        },
      });

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
    it(': events', async () => {
      const props = {
        action,
      };

      const wrapper = mount(Upload, {
        props,
      });

      const target = wrapper.findComponent(Upload);
      target.vm.handleChange({
        target: {
          files: [mockFileFoo],
        },
      });

      await nextTick();
      expect(wrapper.emitted()).toHaveProperty('select-change');

      await sleep(3000);
      expect(wrapper.emitted()).toHaveProperty('progress');
      expect(wrapper.emitted()).toHaveProperty('success');

      await wrapper.find('.t-upload__card-image').trigger('click');
      expect(wrapper.emitted()).toHaveProperty('preview');

      await wrapper.findComponent(CloseIcon).trigger('click');
      expect(wrapper.emitted()).toHaveProperty('remove');
    }, 4000);
  });

  describe('function', () => {
    it(': beforeUpload', async () => {
      const canUpload = ref(false);
      const beforeUpload = vi.fn(() => canUpload.value);

      const props = {
        action,
        beforeUpload,
      };

      const wrapper = mount(Upload, {
        props,
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo],
        },
      });
      await nextTick();
      expect(beforeUpload).toHaveBeenCalled();
      expect(beforeUpload).toHaveReturnedWith(false);

      canUpload.value = true;
      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileBar],
        },
      });
      await nextTick();
      expect(beforeUpload).toHaveReturnedWith(true);
    });

    it(': format', async () => {
      const format = vi.fn((file) => ({ ...file, name: 'bar.png', raw: file }));

      const props = {
        action,
        format,
      };

      const wrapper = mount(Upload, {
        props,
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo],
        },
      });

      await nextTick();
      expect(format).toHaveBeenCalled();
      expect(wrapper.vm.toUploadFiles[0].name).toBe('bar.png');
    });

    it(': onFail', async () => {
      const onFail = vi.fn();

      const props = {
        action,
        method: 'PATCH',
        onFail,
      };

      const wrapper = mount(Upload, {
        props,
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo],
        },
      });

      await sleep(3000);
      expect(onFail).toHaveBeenCalled();

      const spy = vi.spyOn(wrapper.vm, 'handleReload');
      await wrapper.findComponent(RefreshIcon).trigger('click');
      expect(spy).toHaveBeenCalled();
    }, 4000);

    it(': on-functions', async () => {
      const onSelectChange = vi.fn();
      const onProgress = vi.fn();
      const onSuccess = vi.fn();
      const onPreview = vi.fn();
      const onRemove = vi.fn();

      const props = {
        action,
        onSelectChange,
        onProgress,
        onSuccess,
        onPreview,
        onRemove,
      };

      const wrapper = mount(Upload, {
        props,
      });

      wrapper.findComponent(Upload).vm.handleChange({
        target: {
          files: [mockFileFoo],
        },
      });

      await nextTick();
      expect(onSelectChange).toHaveBeenCalled();

      await sleep(3000);
      expect(onProgress).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();

      await wrapper.find('.t-upload__card-image').trigger('click');
      expect(onPreview).toHaveBeenCalled();

      await wrapper.findComponent(CloseIcon).trigger('click');
      expect(onRemove).toHaveBeenCalled();
    }, 4000);
  });
});
