import { defineComponent, ref, computed, toRefs } from 'vue';
import { AddIcon, LoadingIcon, CloseIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';

import TImage from '../image';
import TImageViewer from '../image-viewer';
import { UploadFile } from './type';
import UploadProps from './props';
import config from '../config';
import useUpload from './hooks/useUpload';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { useConfig } from '../config-provider/useConfig';

const { prefix } = config;
const name = `${prefix}-upload`;

export default defineComponent({
  name,
  components: {
    AddIcon,
    LoadingIcon,
    CloseCircleIcon,
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
    'click-upload',
  ],
  setup(props, context) {
    const { globalConfig } = useConfig('upload');

    const {
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
    } = useUpload(props);

    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const showViewer = ref(false);
    const initialIndex = ref(0);

    const handlePreview = (e: MouseEvent, file: UploadFile, index: number) => {
      initialIndex.value = index;
      showViewer.value = true;
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
          <div class={`${name}__progress-mask`}>
            {file.status === 'progress' ? (
              <>
                <loading-icon class={`${name}__progress-loading`} size="24" />
                <div class={`${name}__progress-text`}>
                  {file.percent ? `${file.percent}%` : globalConfig.value.progress.uploadingText}
                </div>
              </>
            ) : (
              <close-circle-icon size="24" />
            )}
            {file.status === 'fail' && (
              <div class={`${name}__progress-text`}>{globalConfig.value.progress.failText}</div>
            )}
          </div>
        );
      }
    };

    const content = () => {
      const defaultContent = renderContent('default', 'content');
      const addContent = renderTNodeJSX('addContent');
      if (props.max === 0 || (props.max > 0 && displayFiles.value?.length < props.max)) {
        if (defaultContent) {
          return <div onClick={triggerUpload}>{defaultContent}</div>;
        }
        return (
          <div class={`${name}__item ${name}__item--add`} onClick={triggerUpload}>
            <div class={`${name}__add-icon`}>{addContent || <add-icon size="28" />}</div>
          </div>
        );
      }
    };

    return {
      ...toRefs(props),
      name,
      globalConfig,
      initialIndex,
      showViewer,
      previewImgs,
      toUploadFiles,
      uploadValue,
      displayFiles,
      sizeOverLimitMessage,
      uploading,
      inputRef,
      disabled,
      xhrReq,
      handlePreview,
      triggerUpload,
      uploadFilePercent,
      uploadFiles,
      onFileChange,
      onNormalFileChange,
      onInnerRemove,
      cancelUpload,
      handleImageClose,
      renderStatus,
      content,
    };

    // return () => {
    //   return (
    //     <div class={`${name}`}>
    //       {displayFiles.value.map((file, index) => (
    //         <div key={index} class={`${name}__item`}>
    //           {file.url && (
    //             <t-image
    //               class={`${name}__image`}
    //               shape="round"
    //               {...(props.imageProps as object)}
    //               src={file.url}
    //               onClick={(e: MouseEvent) => handlePreview(e, file, index)}
    //             />
    //           )}
    //           {renderStatus(file)}
    //           <close-icon class={`${name}__delete-btn`} onClick={({ e }: any) => onInnerRemove({ e, file, index })} />
    //         </div>
    //       ))}
    //       {content()}
    //       <input
    //         ref={inputRef}
    //         value={props.files}
    //         type="file"
    //         multiple={props.multiple}
    //         hidden
    //         accept={props.accept}
    //         onChange={onNormalFileChange}
    //       />
    //       <t-image-viewer
    //         visible={showViewer.value}
    //         images={previewImgs.value}
    //         index={initialIndex.value}
    //         onClose={handleImageClose}
    //       />
    //     </div>
    //   );
    // };
  },
  render() {
    return (
      <div class={`${name}`}>
        {this.displayFiles.map((file, index) => (
          <div key={index} class={`${name}__item`}>
            {file.url && (
              <t-image
                class={`${name}__image`}
                shape="round"
                {...(this.$props.imageProps as object)}
                src={file.url}
                onClick={(e: MouseEvent) => this.handlePreview(e, file, index)}
              />
            )}
            {this.renderStatus(file)}
            <close-icon
              class={`${name}__delete-btn`}
              onClick={({ e }: any) => this.onInnerRemove({ e, file, index })}
            />
          </div>
        ))}
        {this.content()}
        <input
          ref="inputRef"
          value={this.$props.files}
          type="file"
          multiple={this.$props.multiple}
          hidden
          accept={this.$props.accept}
          onChange={this.onNormalFileChange}
        />
        <t-image-viewer
          visible={this.showViewer}
          images={this.previewImgs}
          index={this.initialIndex}
          onClose={this.handleImageClose}
        />
      </div>
    );
  },
});
