import { defineComponent, ref, computed } from 'vue';
import type { InputHTMLAttributes } from 'vue';
import { AddIcon, LoadingIcon, CloseIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';
import { isBoolean } from 'lodash-es';
import TImage from '../image';
import TImageViewer from '../image-viewer';
import { TdUploadProps, UploadFile } from './type';
import UploadProps from './props';
import config from '../config';
import useUpload from './hooks/useUpload';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { usePrefixClass, useConfig } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-upload`,
  components: {
    TImage,
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
    'click-upload',
  ],
  setup(props, { expose }) {
    const uploadClass = usePrefixClass('upload');
    const { globalConfig } = useConfig('upload');

    const {
      disabled,
      displayFiles,
      uploading,
      inputRef,
      uploadFilePercent,
      uploadFiles,
      onNormalFileChange,
      onInnerRemove,
      cancelUpload,
    } = useUpload(props);

    const renderTNodeJSX = useTNodeJSX();

    const showViewer = ref(false);
    const initialIndex = ref(0);

    const handlePreview = (e: MouseEvent, file: UploadFile, index: number) => {
      initialIndex.value = index;
      showViewer.value = props.preview;
      props.onPreview?.({
        e,
        file,
        index,
      });
    };

    const triggerUpload = (e: MouseEvent) => {
      const input = inputRef.value as HTMLInputElement;
      if (disabled?.value) return;
      input.click();
      props.onClickUpload?.({
        e,
      });
    };

    const previewImgs = computed(() => {
      return displayFiles.value.map((item) => item.url as string);
    });

    const handleImageClose = ({ visible }: { visible: boolean }) => {
      showViewer.value = visible;
    };

    const renderStatus = (file: UploadFile) => {
      if (file.status === 'fail' || file.status === 'progress') {
        return (
          <div class={`${uploadClass.value}__progress-mask`}>
            {file.status === 'progress' ? (
              <>
                <LoadingIcon class={`${uploadClass.value}__progress-loading`} size="24" />
                <div class={`${uploadClass.value}__progress-text`}>
                  {file.percent ? `${file.percent}%` : globalConfig.value.progress.uploadingText}
                </div>
              </>
            ) : (
              <CloseCircleIcon size="24" />
            )}
            {file.status === 'fail' && (
              <div class={`${uploadClass.value}__progress-text`}>{globalConfig.value.progress.failText}</div>
            )}
          </div>
        );
      }
    };

    const renderAddContent = () => {
      if (!props.addBtn) return null;

      if (props.max === 0 || (props.max > 0 && displayFiles.value?.length < props.max)) {
        const addBtnNode = renderTNodeJSX('addBtn', <AddIcon />);
        const addContentNode = renderTNodeJSX('addContent');
        return (
          <div class={`${uploadClass.value}__item ${uploadClass.value}__item--add`} onClick={triggerUpload}>
            {<div class={`${uploadClass.value}__add-icon`}>{addContentNode || addBtnNode}</div>}
          </div>
        );
      }
      return null;
    };
    expose({
      upload: inputRef.value,
      uploading,
      triggerUpload,
      uploadFiles,
      cancelUpload,
      uploadFilePercent,
    });
    return () => {
      return (
        <div class={`${uploadClass.value}`}>
          {displayFiles.value.map((file, index) => (
            <div key={index} class={`${uploadClass.value}__item`}>
              {file.url && (
                <t-image
                  class={`${uploadClass.value}__image`}
                  shape="round"
                  {...(props.imageProps as TdUploadProps['imageProps'])}
                  src={file.url}
                  onClick={(e: MouseEvent) => handlePreview(e, file, index)}
                />
              )}
              {renderStatus(file)}
              {(isBoolean(file.removeBtn) ? file.removeBtn : props.removeBtn) && (
                <CloseIcon
                  class={`${uploadClass.value}__delete-btn`}
                  onClick={({ e }: any) => onInnerRemove({ e, file, index })}
                />
              )}
            </div>
          ))}
          {renderAddContent()}
          <input
            ref={inputRef}
            value={props.files}
            type="file"
            multiple={props.multiple}
            hidden
            {...(props.capture ? { capture: props.capture as InputHTMLAttributes['capture'] } : {})}
            accept={props.accept}
            onChange={onNormalFileChange}
          />
          <TImageViewer
            visible={showViewer.value}
            images={previewImgs.value}
            index={initialIndex.value}
            onClose={handleImageClose}
          />
        </div>
      );
    };
  },
});
