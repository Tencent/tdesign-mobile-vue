import { computed, h, ref, toRefs } from 'vue';
import { isFunction, isString } from 'lodash';
import { SizeLimitObj, TdUploadProps, UploadChangeContext, UploadFile, UploadRemoveContext } from '../type';
import { useVModel } from '../../shared';
import { formatToUploadFile, getDisplayFiles, validateFile, upload, getFilesAndErrors } from '@/_common/js/upload/main';
import {
  FileChangeReturn,
  InnerProgressContext,
  OnResponseErrorContext,
  SuccessContext,
} from '@/_common/js/upload/types';
import { getFileList, getFileUrlByFileRaw } from '@/_common/js/upload/utils';

// @ts-ignore
export type ValidateParams = Parameters<TdUploadProps['onValidate']>[0];

export default function useUpload(props: TdUploadProps) {
  const inputRef = ref<HTMLInputElement>();
  const { disabled, autoUpload, isBatchUpload, multiple, files, modelValue, defaultFiles } = toRefs(props);
  // @ts-ignore
  const [uploadValue, setUploadValue] = useVModel(files, modelValue, defaultFiles.value, props.onChange, 'files');
  const xhrReq = ref<{ files: UploadFile[]; xhrReq: XMLHttpRequest }[]>([]);
  const toUploadFiles = ref<UploadFile[]>([]);
  const sizeOverLimitMessage = ref('');

  const uploading = ref(false);

  // 文件列表显示的内容（自动上传和非自动上传有所不同）
  const displayFiles = computed(() => {
    return getDisplayFiles({
      multiple: multiple?.value || false,
      toUploadFiles: toUploadFiles.value,
      uploadValue: uploadValue.value as UploadFile[],
      autoUpload: autoUpload?.value || false,
      isBatchUpload: isBatchUpload?.value || false,
    });
  });

  const uploadFilePercent = (params: { file: UploadFile; percent: number }) => {
    const { file, percent } = params;
    const index = toUploadFiles.value.findIndex((item) => file.raw === item.raw);
    toUploadFiles.value[index] = { ...toUploadFiles.value[index], percent };
  };

  const updateFilesProgress = () => {
    if (props.autoUpload) {
      toUploadFiles.value = [...toUploadFiles.value];
    }
  };

  const onResponseError = (p: OnResponseErrorContext) => {
    if (!p || !p.files || !p.files[0]) return;
    const { response, event, files } = p;
    updateFilesProgress();
    props.onOneFileFail?.({
      e: event,
      file: files?.[0],
      currentFiles: files,
      failedFiles: files,
      response,
    });
    // 单选或多文件替换，需要清空上一次上传成功的文件
    if (!props.multiple || props.isBatchUpload) {
      setUploadValue([], {
        trigger: 'progress-fail',
        e: p.event,
        file: p.files[0],
      });
    }
  };

  // 多文件上传场景，单个文件进度
  const onResponseProgress = (p: InnerProgressContext) => {
    updateFilesProgress();
    props.onProgress?.({
      e: p.event,
      file: p.file,
      currentFiles: p.files as UploadFile[],
      percent: p.percent,
      type: p.type,
      XMLHttpRequest: p.XMLHttpRequest,
    });
  };

  // 多文件上传场景，单个文件上传成功后
  const onResponseSuccess = (p: SuccessContext) => {
    // 只有多个上传请求同时触发时才需 onOneFileSuccess
    if (props.multiple && !props.uploadAllFilesInOneRequest) {
      updateFilesProgress();
      props.onOneFileSuccess?.({
        e: p.event,
        file: (p.files as UploadFile[])[0],
        response: p.response,
      });
    }
  };

  // 处理正则表达式
  const t = function <T>(pattern: T, ...args: any[]) {
    const [data] = args;
    if (isString(pattern)) {
      if (!data) return pattern;
      const regular = /\{\s*([\w-]+)\s*\}/g;
      const translated = pattern.replace(regular, (match, key) => {
        if (data) {
          return String(data[key]);
        }
        return '';
      });
      return translated;
    }
    if (isFunction(pattern)) {
      // 重要：组件的渲染必须存在参数 h，不能移除
      if (!args.length) return pattern(h);
      return pattern(...args);
    }
    return '';
  };

  function getSizeLimitError(sizeLimitObj: SizeLimitObj): string {
    const limit = sizeLimitObj;
    return limit.message
      ? t(limit.message, { sizeLimit: limit.size })
      : `${t('', { sizeLimit: limit.size })} ${limit.unit}`;
  }

  const handleNotAutoUpload = (toFiles: UploadFile[]) => {
    const tmpFiles =
      props.multiple && !isBatchUpload?.value ? (uploadValue?.value as UploadFile[]).concat(toFiles) : toFiles;
    if (!tmpFiles.length) return;
    const list = tmpFiles.map(
      (file) =>
        new Promise((resolve) => {
          getFileUrlByFileRaw(file.raw as File).then((url) => {
            resolve({ ...file, url: file.url || url });
          });
        }),
    );
    Promise.all(list).then((files) => {
      setUploadValue(files as UploadFile[], {
        trigger: 'add',
        index: (uploadValue.value as UploadFile[]).length,
        file: toFiles[0],
        files: toFiles,
      });
    });
    toUploadFiles.value = [];
  };

  const onFileChange = (files: File[]) => {
    if (disabled?.value) return;
    const params = { currentSelectedFiles: formatToUploadFile([...files], props.format) };
    props.onSelectChange?.([...files], params);
    validateFile({
      uploadValue: uploadValue.value as UploadFile[],
      files: [...files],
      allowUploadDuplicateFile: props.allowUploadDuplicateFile,
      max: props.max,
      sizeLimit: props.sizeLimit,
      isBatchUpload: isBatchUpload?.value,
      autoUpload: autoUpload?.value,
      format: props.format,
      beforeUpload: props.beforeUpload,
      beforeAllFilesUpload: props.beforeAllFilesUpload,
    }).then((args) => {
      // 自定义全文件校验不通过
      if (args.validateResult?.type === 'BEFORE_ALL_FILES_UPLOAD') {
        const params: ValidateParams = { type: 'BEFORE_ALL_FILES_UPLOAD', files: args.files as UploadFile[] };
        props.onValidate?.(params);
        return;
      }
      // 文件数量校验不通过
      if (args.lengthOverLimit) {
        const params: ValidateParams = { type: 'FILES_OVER_LENGTH_LIMIT', files: args.files as UploadFile[] };
        props.onValidate?.(params);
        if (!(args.files as UploadFile[]).length) return;
      }
      // 过滤相同的文件名
      if (args.hasSameNameFile) {
        const params: ValidateParams = { type: 'FILTER_FILE_SAME_NAME', files: args.files as UploadFile[] };
        props.onValidate?.(params);
      }
      // 文件大小校验结果处理（已过滤超出限制的文件）
      if (args.fileValidateList instanceof Array) {
        const { sizeLimitErrors, beforeUploadErrorFiles, toFiles } = getFilesAndErrors(
          args.fileValidateList,
          // @ts-ignore
          getSizeLimitError,
        );
        const tmpWaitingFiles = autoUpload?.value ? toFiles : toUploadFiles.value.concat(toFiles);
        toUploadFiles.value = tmpWaitingFiles;
        props.onWaitingUploadFilesChange?.({ files: tmpWaitingFiles, trigger: 'validate' });
        // 文件大小处理
        if (sizeLimitErrors[0]) {
          sizeOverLimitMessage.value = sizeLimitErrors[0]?.file?.response?.error;
          props.onValidate?.({
            type: 'FILE_OVER_SIZE_LIMIT',
            files: sizeLimitErrors.map((t) => t.file) as FileChangeReturn[],
          });
        } else {
          sizeOverLimitMessage.value = '';
          // 自定义方法 beforeUpload 拦截的文件
          if (beforeUploadErrorFiles.length) {
            const params: ValidateParams = { type: 'CUSTOM_BEFORE_UPLOAD', files: beforeUploadErrorFiles };
            props.onValidate?.(params);
          }
        }
        // 如果是自动上传
        if (autoUpload?.value) {
          uploadFiles(tmpWaitingFiles);
        } else {
          handleNotAutoUpload(tmpWaitingFiles);
        }
      }
    });

    // 清空 <input type="file"> 元素的文件，避免出现重复文件无法选择的情况
    if (inputRef.value) {
      inputRef.value.value = '';
    }
  };

  const onNormalFileChange = (e: Event) => {
    const fileList = getFileList((e.target as HTMLInputElement).files as FileList);
    onFileChange?.(fileList);
  };

  /**
   * 上传文件。对外暴露方法，修改时需谨慎
   * @param toFiles 本地上传的文件列表
   */
  function uploadFiles(toFiles?: UploadFile[]) {
    const notUploadedFiles = (uploadValue.value as UploadFile[]).filter((t) => t.status !== 'success');
    const files = autoUpload?.value ? toFiles || toUploadFiles.value : notUploadedFiles;
    if (!files || !files.length) return;
    uploading.value = true;
    xhrReq.value = [];
    upload({
      action: props.action,
      headers: props.headers,
      method: props.method,
      name: props.name,
      withCredentials: props.withCredentials,
      uploadedFiles: uploadValue.value as UploadFile[],
      toUploadFiles: files,
      multiple: props.multiple,
      isBatchUpload: isBatchUpload?.value,
      autoUpload: props.autoUpload,
      uploadAllFilesInOneRequest: props.uploadAllFilesInOneRequest,
      useMockProgress: props.useMockProgress,
      data: props.data,
      mockProgressDuration: props.mockProgressDuration,
      requestMethod: props.requestMethod,
      formatRequest: props.formatRequest,
      formatResponse: props.formatResponse,
      onResponseProgress,
      onResponseSuccess,
      onResponseError,
      setXhrObject: (xhr) => {
        if (xhr.files[0]?.raw && xhrReq.value.find((item) => item.files[0]?.raw === xhr.files[0].raw)) return;
        xhrReq.value = xhrReq.value.concat(xhr);
      },
    }).then(
      // 多文件场景时，全量文件完成后
      ({ status, data, list, failedFiles }) => {
        uploading.value = false;
        if (status === 'success') {
          if (props.autoUpload) {
            setUploadValue([...(data?.files as UploadFile[])], {
              trigger: 'add',
              file: (data?.files as UploadFile[])[0],
            });
          }
          xhrReq.value = [];
          props.onSuccess?.({
            fileList: data?.files,
            currentFiles: files,
            file: files[0],
            // 只有全部请求完成后，才会存在该字段
            // @ts-ignore
            results: list?.map((t) => t.data),
            // 单文件单请求有一个 response，多文件多请求有多个 response
            response: data?.response || list?.map((t) => t.data?.response),
            XMLHttpRequest: data?.XMLHttpRequest,
          });
        } else if (failedFiles?.[0]) {
          props.onFail?.({
            e: data?.event,
            file: failedFiles[0],
            failedFiles,
            currentFiles: files,
            response: data?.response,
            XMLHttpRequest: data?.XMLHttpRequest,
          });
        }

        // 非自动上传，文件都在 uploadValue，不涉及 toUploadFiles
        if (autoUpload?.value) {
          toUploadFiles.value = failedFiles as UploadFile[];
          props.onWaitingUploadFilesChange?.({ files: failedFiles as UploadFile[], trigger: 'uploaded' });
        }
      },
    );
  }

  function onInnerRemove(p: UploadRemoveContext) {
    sizeOverLimitMessage.value = '';
    p.e.stopPropagation?.();
    const changePrams: UploadChangeContext = {
      e: p.e,
      trigger: 'remove',
      index: p.index,
      file: p.file,
    };
    // remove all files for batchUpload
    if (props.isBatchUpload || !props.multiple) {
      toUploadFiles.value = [];
      props.onWaitingUploadFilesChange?.({ files: [], trigger: 'remove' });
      setUploadValue([], changePrams);
    } else if (!props.autoUpload) {
      (uploadValue.value as UploadFile[]).splice(p.index, 1);
      setUploadValue([...(uploadValue.value as UploadFile[])], changePrams);
    } else {
      // autoUpload 场景下， p.index < uploadValue.length 表示移除已经上传成功的文件；反之表示移除待上传列表文件
      // eslint-disable-next-line
      if (p.index < (uploadValue.value as UploadFile[]).length) {
        (uploadValue.value as UploadFile[]).splice(p.index, 1);
        setUploadValue([...(uploadValue.value as UploadFile[])], changePrams);
      } else {
        // @ts-ignore
        toUploadFiles.value.splice(p.index - uploadValue.value.length, 1);
        toUploadFiles.value = [...toUploadFiles.value];
        props.onWaitingUploadFilesChange?.({ files: [...toUploadFiles.value], trigger: 'remove' });
      }
    }
    props.onRemove?.(p);
  }

  const cancelUpload = (context?: { file?: UploadFile; e?: MouseEvent }) => {
    xhrReq.value?.forEach((item) => {
      item.xhrReq?.abort();
    });
    uploading.value = false;

    if (autoUpload?.value) {
      toUploadFiles.value = toUploadFiles.value.map((item) => ({ ...item, status: 'waiting' }));
    } else {
      setUploadValue(
        (uploadValue.value as UploadFile[]).map((item) => {
          if (item.status !== 'success') {
            return { ...item, status: 'waiting' };
          }
          return item;
        }),
        { trigger: 'abort' },
      );
    }

    if (context?.file && !autoUpload?.value) {
      onInnerRemove?.({ file: context.file, e: context.e as MouseEvent, index: 0 });
    }

    props.onCancelUpload?.();
  };

  return {
    toUploadFiles,
    uploadValue,
    displayFiles,
    sizeOverLimitMessage,
    uploading,
    inputRef,
    disabled,
    xhrReq,
    uploadFilePercent,
    uploadFiles,
    onFileChange,
    onNormalFileChange,
    onInnerRemove,
    cancelUpload,
  };
}
