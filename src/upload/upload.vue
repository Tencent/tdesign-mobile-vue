<template>
  <div :class="`${name}`">
    <div v-for="(file, index) in renderUploadFiles" :key="index" :class="`${name}__item`">
      <t-image
        :class="`${name}__image`"
        shape="round"
        v-bind="imageProps"
        :src="file.url"
        @click="(e) => handlePreview(e, file)"
      />
      <div v-if="file.status === 'fail' || file.status === 'progress'" :class="`${name}__progress-mask`">
        <template v-if="file.status === 'progress'">
          <loading-icon :class="`${name}__progress-loading`" size="24" />
          <div :class="`${name}__progress-text`">{{ file.percent ? file.percent + '%' : '上传中...' }}</div>
        </template>
        <close-circle-icon v-else size="24" />
        <div v-if="file.status === 'fail'" :class="`${name}__progress-text`">上传失败</div>
      </div>
      <close-icon :class="`${name}__delete-btn`" @click="({ e }) => handleRemove(e, file, index)" />
    </div>
    <template v-if="max === 0 || (max > 0 && renderUploadFiles?.length < max)">
      <div v-if="defaultContent" @click="triggerUpload">
        <t-node :content="defaultContent" />
      </div>
      <div v-else :class="`${name}__item ${name}__item--add`" @click="triggerUpload">
        <div :class="`${name}__add-icon`">
          <t-node v-if="addContent" :content="addContent" />
          <add-icon v-else size="28" />
        </div>
      </div>
    </template>

    <input
      ref="inputRef"
      :value="files"
      type="file"
      :multiple="multiple"
      hidden
      :accept="accept"
      @change="handleChange"
    />
    <t-image-viewer v-model:images="renderImages" v-model="showViewer" :index="initialIndex" />
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, Ref, toRefs, computed, ComputedRef } from 'vue';
import { AddIcon, LoadingIcon, CloseIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';
import findIndex from 'lodash/findIndex';
import isFunction from 'lodash/isFunction';

import TImage from '../image';
import TImageViewer from '../image-viewer';
import xhr from '../_common/js/upload/xhr';
import { useDefault, renderTNode, TNode } from '../shared';
import { TdUploadProps, UploadFile, RequestMethodResponse, SizeLimitObj } from './type';
import { SuccessContext, InnerProgressContext } from './interface';
import UploadProps from './props';
import config from '../config';
import { isOverSizeLimit } from '../_common/js/upload/utils';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
const name = `${prefix}-upload`;
const { isArray } = Array;

export default defineComponent({
  name,
  components: {
    AddIcon,
    LoadingIcon,
    CloseCircleIcon,
    TNode,
    CloseIcon,
    TImage,
    TImageViewer,
  },
  props: UploadProps,
  emits: [
    'update:files',
    'update:modelValue',
    'change',
    'fail',
    'preview',
    'progress',
    'remove',
    'success',
    'select-change',
    'validate',
  ],
  setup(props, { emit }) {
    const disabled = useFormDisabled();
    const [innerFiles, setInnerFiles] = useDefault<TdUploadProps['files'], TdUploadProps>(
      props,
      emit,
      'files',
      'change',
    );
    const internalInstance = getCurrentInstance();
    const defaultContent = computed(() => renderTNode(internalInstance, 'default'));
    const addContent = computed(() => renderTNode(internalInstance, 'addContent'));
    const images: Ref<Array<string>> = ref([]);
    const showViewer = ref(false);
    const initialIndex = ref(0);
    const xhrReq = ref<XMLHttpRequest | null>(null);
    // 等待上传的文件
    const toUploadFiles: Ref<Array<UploadFile>> = ref([]);
    // 上传成功的文件
    const uploadedFiles: ComputedRef<UploadFile[]> = computed(() => {
      if (innerFiles.value && isArray(innerFiles.value)) {
        // 上传失败的文件用localUrl展示，并且可上传重试
        return innerFiles.value;
      }
      return [];
    });

    const renderUploadFiles = computed((): UploadFile[] => {
      if (props.autoUpload) {
        return uploadedFiles.value;
      }
      return uploadedFiles.value.concat(toUploadFiles.value).map((file) => {
        return {
          ...file,
          status: 'success',
        };
      });
    });

    const renderImages = computed(() => {
      if (innerFiles.value) {
        console.log(innerFiles.value);
        const imgs = innerFiles.value.map((item) => item.url as string);
        return images.value.concat(...imgs);
      }
      return images.value;
    });

    const inputRef = ref<null | HTMLInputElement>(null);

    const triggerUpload = () => {
      const input = inputRef.value as HTMLInputElement;
      if (disabled.value) return;
      input.click();
    };

    const handlePreview = (e: MouseEvent, file: UploadFile) => {
      showViewer.value = true;
      emit('preview', {
        e,
        file,
      });
    };

    const handleReload = (file: UploadFile) => {
      uploadFiles([file.fileRaw]);
    };

    const handleChange = () => {
      const input = inputRef.value;
      if (disabled.value || !input || !input.files) return;

      const formatFiles = formatFileToUploadFile(input.files);
      emit?.('select-change', [...formatFiles], { currentSelectedFiles: uploadedFiles.value });
      uploadFiles(formatFiles);
      input.value = '';
    };

    const formatFileToUploadFile = (files: FileList): File[] => {
      const { format } = props;
      if (!format || !isFunction(format)) {
        const res = [];
        for (let i = 0; i < files.length; i++) {
          res.push(files[i]);
        }
        return res;
      }

      const NewFiles = [...files];
      NewFiles.forEach((item) => {
        item = format(item) as any;
      });
      return NewFiles;
    };

    const handleBeforeUpload = (file: File | UploadFile): Promise<boolean> => {
      if (props.beforeUpload && isFunction(props.beforeUpload)) {
        const beforeUpload = props.beforeUpload(file);
        if (beforeUpload instanceof Promise) return beforeUpload;
        return Promise.resolve(beforeUpload);
      }
      return new Promise((resolve) => {
        if (props.sizeLimit) {
          const isOverSizeLimit = handleSizeLimit(file.size || 0);
          if (isOverSizeLimit) {
            props.onValidate?.({ type: 'FILE_OVER_SIZE_LIMIT', files: [file] });
          }
          resolve(!handleSizeLimit(file.size || 0));
        }
        resolve(true);
      });
    };

    const handleSizeLimit = (fileSize: number) => {
      let sizeLimit: SizeLimitObj;
      if (typeof props.sizeLimit === 'number') {
        sizeLimit = { size: props.sizeLimit, unit: 'KB' };
      } else if (typeof props.sizeLimit === 'object') {
        sizeLimit = props.sizeLimit;
      } else {
        sizeLimit = { size: 0, unit: 'KB' };
      }
      return isOverSizeLimit(fileSize, sizeLimit.size, sizeLimit.unit);
    };

    const uploadFiles = (files: File[]) => {
      const { max } = toRefs(props);
      let tmpFiles = [...files];
      if (max.value) {
        tmpFiles = tmpFiles.slice(0, max.value - uploadedFiles.value.length);
        if (tmpFiles.length !== files.length) {
          console.warn(`TDesign Upload Warn: you can only upload ${max.value} files`);
        }
      }
      tmpFiles.forEach((fileRaw: any) => {
        const uploadFile: UploadFile = {
          ...fileRaw,
          fileRaw,
          lastModified: fileRaw.lastModified,
          name: fileRaw.name,
          size: fileRaw.size,
          type: fileRaw.type,
          percent: 0,
          status: 'waiting',
        };
        // node 环境不支持 URL.createObjectURL, 保证测试用例通过
        if (!(typeof process !== 'undefined' && process.release.name === 'node')) {
          uploadFile.url = URL.createObjectURL(fileRaw);
          if (!props.autoUpload) {
            images.value.push(uploadFile.url as string);
          }
        }
        handleBeforeUpload(fileRaw).then((canUpload) => {
          if (!canUpload) return;
          const newFiles: Array<UploadFile> = toUploadFiles.value.concat();

          // 判断是否为重复文件条件，已选是否存在检验
          if (props.allowUploadDuplicateFile) {
            newFiles.push(uploadFile);
          } else {
            const isDuplicated = toUploadFiles.value.some((file) => file.name === uploadFile.name);
            if (isDuplicated) {
              props.onValidate?.({
                type: 'FILTER_FILE_SAME_NAME',
                files: [uploadFile],
              });
            } else {
              newFiles.push(uploadFile);
            }
          }
          toUploadFiles.value = newFiles;
          if (props.autoUpload) {
            upload(uploadFile);
          }
        });
      });
    };

    /** 模拟进度条 Mock Progress */
    const handleMockProgress = (file: UploadFile) => {
      const timer = setInterval(() => {
        file.percent = file.percent ?? 0;
        if (file.status === 'success' || file.percent >= 99) {
          clearInterval(timer);
          return;
        }
        file.percent += 1;
        handleProgress({
          file,
          percent: file.percent,
          type: 'mock',
        });
      }, 10);
    };

    const handleProgress = ({ event, file, percent, type = 'real' }: InnerProgressContext) => {
      if (!file) throw new Error('Error file');
      file.percent = Math.min(percent, 100);
      const progressCtx = {
        percent,
        e: event,
        file,
        type,
      };
      props.onProgress?.(progressCtx);
    };

    const handleRemove = (e: MouseEvent, file: UploadFile, index: number) => {
      const files = uploadedFiles.value.concat();
      files.splice(index, 1);
      setInnerFiles(files, { e, trigger: 'remove', index, file });
      emit('remove', { e, index, file });
      images.value.splice(index, 1);
    };

    const upload = async (file: UploadFile): Promise<void> => {
      if (!props.action && !props.requestMethod) {
        console.error('TDesign Upload Error: one of action and requestMethod must be exist.');
        return;
      }
      file.status = 'progress';
      // requestMethod 为父组件定义的自定义上传方法
      if (props.requestMethod) {
        handleRequestMethod(file);
      } else {
        // 模拟进度条
        if (props.useMockProgress) {
          handleMockProgress(file);
        }
        const request = xhr;
        const data = {
          file: file.fileRaw,
          ...props.data,
        };
        xhrReq.value = request({
          action: props.action,
          data: props.formatRequest ? props.formatRequest(data) : data,
          file,
          method: props.method,
          headers: props.headers || {},
          withCredentials: props.withCredentials,
          onError: handleError,
          onProgress: handleProgress,
          onSuccess: handleSuccess,
        } as any);
      }
    };

    const handleRequestMethod = (file: UploadFile) => {
      if (!isFunction(props.requestMethod)) {
        console.warn('TDesign Upload Warn: `requestMethod` must be a function.');
        return;
      }
      props.requestMethod?.(file).then((res: RequestMethodResponse) => {
        if (!handleRequestMethodResponse(res)) return;
        if (res.status === 'success') {
          handleSuccess({ file, response: res.response });
        } else if (res.status === 'fail') {
          const r = res.response || {};
          handleError({ event: undefined, file, response: { ...r, error: res.error } });
        }
      });
    };

    const handleRequestMethodResponse = (res: RequestMethodResponse) => {
      if (!res) {
        console.error('TDesign Upoad Error: `requestMethodResponse` is required.');
        return false;
      }
      if (!res.status) {
        console.error(
          'TDesign Upoad Error: `requestMethodResponse.status` is missing, which value is `success` or `fail`',
        );
        return false;
      }
      if (!['success', 'fail'].includes(res.status)) {
        console.error('TDesign Upoad Error: `requestMethodResponse.status` must be `success` or `fail`');
        return false;
      }
      if (res.status === 'success' && (!res.response || !res.response.url)) {
        console.warn(
          'TDesign Upoad Warn: `requestMethodResponse.response.url` is required, when `status` is `success`',
        );
      }
      return true;
    };

    const handleSuccess = ({ event, file, response }: SuccessContext) => {
      if (!file) throw new Error('Error file');
      file.status = 'success';
      let res = response;
      if (props.formatResponse && isFunction(props.formatResponse)) {
        res = props.formatResponse(response, { file: file as UploadFile });
      }
      // 如果返回值存在 error，则认为当前接口上传失败
      if (res?.error) {
        handleError({
          event,
          file: file as UploadFile,
          response: res,
          resFormatted: true,
        });
        return;
      }
      file.url = res?.url || file.url;
      // 从待上传文件队列中移除上传成功的文件
      const index = findIndex(toUploadFiles.value, (o: UploadFile) => o.name === file.name);
      toUploadFiles.value.splice(index, 1);
      // 上传成功的文件发送到 files
      const newFile = { ...file, response: res };
      const files = uploadedFiles.value.concat(newFile as UploadFile);
      setInnerFiles(files, { e: event, response: res, trigger: 'upload-success' });
      emit('success', {
        file,
        fileList: files,
        e: event,
        response: res,
      });
      images.value.push(newFile.url as string);
    };

    const handleError = (options: {
      event?: ProgressEvent;
      file: UploadFile;
      response?: any;
      resFormatted?: boolean;
    }) => {
      const { event, file, response, resFormatted } = options;
      file.status = 'fail';
      let res = response;
      if (!resFormatted && props.formatResponse && isFunction(props.formatResponse)) {
        res = props.formatResponse(response, { file });
      }
      if (
        !uploadedFiles.value.find((item) => {
          return item.name === file.name;
        })
      ) {
        const files = uploadedFiles.value.concat(file);
        setInnerFiles(files, { e: event, response: res, trigger: 'upload-fail' });
      }
      props.onFail?.({ e: event, file });
    };

    return {
      ...toRefs(props),
      name,
      images,
      showViewer,
      initialIndex,
      prefix,
      innerFiles,
      xhrReq,
      toUploadFiles,
      inputRef,
      uploadedFiles,
      defaultContent,
      addContent,
      setInnerFiles,
      triggerUpload,
      handleChange,
      handlePreview,
      handleReload,
      handleBeforeUpload,
      handleSizeLimit,
      uploadFiles,
      renderUploadFiles,
      renderImages,
      handleMockProgress,
      handleProgress,
      handleRemove,
      upload,
      handleRequestMethodResponse,
      handleSuccess,
      handleError,
    };
  },
});
</script>
