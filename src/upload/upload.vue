<template>
  <div>
    <ul :class="`${UPLOAD_NAME}__card`">
      <li v-for="(file, index) in uploadedFiles" :key="index" :class="`${UPLOAD_NAME}__card-item`" :style="itemStyle">
        <div :class="`${UPLOAD_NAME}__card-content ${UPLOAD_NAME}__card-box`" :style="itemContentStyle">
          <div
            key="delete-icon"
            :class="`${UPLOAD_NAME}__card-delete-item`"
            @click="(e) => handleRemove(e, file, index)"
          >
            <template v-if="deleteBtnContent">
              <t-node :content="deleteBtnContent"></t-node>
            </template>
            <template v-else>
              <close-icon class="close-icon" />
            </template>
          </div>
          <img :class="`${UPLOAD_NAME}__card-image`" :src="file.url" @click="(e) => handlePreview(e, file)" />
          <!--上传失败时，reload重试-->
          <div v-if="file.status === 'fail'" :class="`${UPLOAD_NAME}__card-mask`">
            <span key="refresh-icon" :class="`${UPLOAD_NAME}__card-mask-item`">
              <refresh-icon @click="handleReload(file)" />
            </span>
          </div>
        </div>
      </li>
      <template v-if="defaultContent">
        <div @click="triggerUpload">
          <t-node :content="defaultContent"></t-node>
        </div>
      </template>
      <template v-else>
        <li :class="`${UPLOAD_NAME}__card-item`" @click="triggerUpload">
          <div :class="`${UPLOAD_NAME}__card-container ${UPLOAD_NAME}__card-box`">
            <add-icon></add-icon>
          </div>
        </li>
      </template>
    </ul>
    <input
      ref="inputRef"
      :value="files"
      type="file"
      :multiple="multiple"
      hidden
      :accept="accept"
      @change="handleChange"
    />
    <t-image-viewer v-model:images="images" v-model="showViewer" :initial-index="initialIndex"></t-image-viewer>
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext, getCurrentInstance, ref, Ref, toRefs, computed, ComputedRef } from 'vue';
import { AddIcon, CloseIcon, RefreshIcon } from 'tdesign-icons-vue-next';
import findIndex from 'lodash/findIndex';
import xhr from '../_common/js/upload/xhr';
import { useDefault, useEmitEvent, isFunction, isArray, isObject, renderTNode, TNode } from '../shared';
import { TdUploadProps, UploadFile, RequestMethodResponse, SizeLimitObj } from './type';
import { SuccessContext, InnerProgressContext } from './interface';
import props from './props';
import config from '../config';
import { isOverSizeLimit } from './util';

const { prefix } = config;
const name = `${prefix}-upload`;
export default defineComponent({
  name,
  components: {
    AddIcon,
    TNode,
    CloseIcon,
    RefreshIcon,
  },
  props,
  emits: ['update:files', 'update:modelValue', 'change', 'fail', 'preview', 'progress', 'remove', 'success'],
  setup(props: any, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const [innerFiles, setInnerFiles] = useDefault<TdUploadProps['files'], TdUploadProps>(
      props,
      context.emit,
      'files',
      'change',
    );
    const internalInstance = getCurrentInstance();
    const defaultContent = computed(() => renderTNode(internalInstance, 'default'));
    const deleteBtnContent = computed(() => renderTNode(internalInstance, 'deleteBtn'));
    const images: Ref<Array<string>> = ref([]);
    const showViewer = ref(false);
    const initialIndex = ref(0);
    const UPLOAD_NAME = name;
    const xhrReq = ref<XMLHttpRequest | null>(null);
    // 等待上传的文件
    const toUploadFiles: Ref<Array<UploadFile>> = ref([]);
    // 上传成功的文件
    const uploadedFiles: ComputedRef<UploadFile[]> = computed(() => {
      if (innerFiles.value && isArray(innerFiles.value)) {
        // 上传失败的文件用localUrl展示，并且可上传重试
        return innerFiles.value.filter((file) => file.status === 'success' || file.status === 'fail');
      }
      return [];
    });
    const errorMsg = ref('');
    const inputRef = ref<null | HTMLInputElement>(null);

    const itemStyle = computed(() => {
      const { gridConfig } = toRefs(props);
      let column = 4;
      if (isObject(gridConfig.value)) {
        ({ column } = gridConfig.value as any);
      }
      return {
        flexBasis: `${100 / +column}%`,
      };
    });

    const itemContentStyle = computed(() => {
      let width = 80;
      let height = 80;
      const { gridConfig } = toRefs(props);
      if (isObject(gridConfig.value)) {
        ({ width, height } = gridConfig.value as any);
      }
      return {
        height: `${height}px`,
        width: `${width}px`,
      };
    });

    const triggerUpload = () => {
      const input = inputRef.value as HTMLInputElement;
      if (props.disabled) return;
      input.click();
    };

    const handlePreview = (e: MouseEvent, file: UploadFile) => {
      showViewer.value = true;
      emitEvent('preview', {
        e,
        file,
      });
    };

    const handleReload = (file: UploadFile) => {
      uploadFiles([file]);
    };

    const handleChange = (event: Event) => {
      const { files } = <HTMLInputElement>event.target;
      if (props.disabled || !files) return;
      const input = <HTMLInputElement>inputRef.value;
      uploadFiles(formatFileToUploadFile(files));
      input.value = '';
    };

    const formatFileToUploadFile = (files: any): UploadFile[] => {
      if (!props.format || !isFunction(props.format)) return files;

      const NewFiles = [...files];
      NewFiles.forEach((item) => {
        item = props.format?.(item);
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
          resolve(handleSizeLimit(file.size));
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
      const isOverSize = isOverSizeLimit(fileSize, sizeLimit.size, sizeLimit.unit);
      if (isOverSize) {
        errorMsg.value = sizeLimit.message
          ? sizeLimit.message
          : `TDesign Upoad Error: uploaded picture exceeds ${props.sizeLimit}${sizeLimit.unit} restrictions`;
      }
      return isOverSize;
    };

    const uploadFiles = (files: UploadFile[]) => {
      const { max } = toRefs(props);
      let tmpFiles = [...files];
      if (max.value) {
        tmpFiles = tmpFiles.slice(0, max.value - uploadedFiles.value.length);
        if (tmpFiles.length !== files.length) {
          console.warn(`TDesign Upload Warn: you can only upload ${max.value} files`);
        }
      }
      tmpFiles.forEach((fileRaw: UploadFile) => {
        const uploadFile: UploadFile = {
          ...fileRaw,
          lastModified: fileRaw.lastModified,
          name: fileRaw.name,
          size: fileRaw.size,
          type: fileRaw.type,
          percent: 0,
          status: 'waiting',
        };
        const reader = new FileReader();
        reader.readAsDataURL(fileRaw as any);
        reader.onload = (event: ProgressEvent<FileReader>) => {
          uploadFile.url = event.target?.result as string;
        };
        handleBeforeUpload(fileRaw).then((canUpload) => {
          if (!canUpload) return;
          const newFiles: Array<UploadFile> = toUploadFiles.value.concat();
          newFiles.push(uploadFile);
          toUploadFiles.value = [...new Set(newFiles)];
          if (props.autoUpload) {
            upload(uploadFile);
          }
        });
      });
    };

    /** 模拟进度条 Mock Progress */
    const handleMockProgress = (file: UploadFile) => {
      const timer = setInterval(() => {
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
      emitEvent('progress', progressCtx);
    };

    const handleRemove = (e: MouseEvent, file: UploadFile, index: number) => {
      errorMsg.value = '';
      const files = uploadedFiles.value.concat();
      files.splice(index, 1);
      setInnerFiles(files, { e, trigger: 'remove', index, file });
      emitEvent('remove', { e, index, file });
      images.value.splice(index, 1);
    };

    const upload = async (file: UploadFile): Promise<void> => {
      if (!props.action && !props.requestMethod) {
        console.error('TDesign Upload Error: one of action and requestMethod must be exist.');
        return;
      }
      errorMsg.value = '';
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
        xhrReq.value = request({
          action: props.action,
          data: props.data || {},
          method: props.method,
          file,
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
      const index = findIndex(toUploadFiles.value, (o: any) => o.name === file.name);
      toUploadFiles.value.splice(index, 1);
      // 上传成功的文件发送到 files
      const newFile = { ...file, response: res };
      const files = uploadedFiles.value.concat(newFile as UploadFile);
      setInnerFiles(files, { e: event, response: res, trigger: 'upload-success' });
      emitEvent('success', {
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
    }): any => {
      const { event, file, response, resFormatted } = options;
      file.status = 'fail';
      let res = response;
      if (!resFormatted && props.formatResponse && isFunction(props.formatResponse)) {
        res = props.formatResponse(response, { file });
      }
      errorMsg.value = res?.error;
      if (
        !uploadedFiles.value.find((item) => {
          return item.name === file.name;
        })
      ) {
        const files = uploadedFiles.value.concat(file);
        setInnerFiles(files, { e: event, response: res, trigger: 'upload-fail' });
      }
      emitEvent('fail', { e: event, file });
    };

    return {
      ...toRefs(props),
      UPLOAD_NAME,
      images,
      showViewer,
      initialIndex,
      prefix,
      innerFiles,
      xhrReq,
      toUploadFiles,
      errorMsg,
      inputRef,
      uploadedFiles,
      deleteBtnContent,
      defaultContent,
      itemStyle,
      itemContentStyle,
      emitEvent,
      setInnerFiles,
      triggerUpload,
      handleChange,
      handlePreview,
      handleReload,
      handleBeforeUpload,
      handleSizeLimit,
      uploadFiles,
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
