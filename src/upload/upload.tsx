import { defineComponent, ref, computed } from 'vue';
import type { InputHTMLAttributes } from 'vue';
import {
  AddIcon,
  LoadingIcon,
  CloseIcon,
  CloseCircleIcon,
  UploadIcon,
  DeleteIcon,
  ErrorCircleFilledIcon,
  File1Icon,
  FileZipFilledIcon,
  FileExcelFilledIcon,
  FilePdfFilledIcon,
  FileWordFilledIcon,
  FilePowerpointFilledIcon,
  VideoFilledIcon,
} from 'tdesign-icons-vue-next';
import { isBoolean } from 'lodash-es';
import TImage from '../image';
import TImageViewer from '../image-viewer';
import TButton from '../button';
import { TdUploadProps, UploadFile } from './type';
import UploadProps from './props';
import config from '../config';
import useUpload from './hooks/useUpload';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass, useConfig } from '../hooks/useClass';
import {
  FILE_PDF_REGEXP,
  FILE_EXCEL_REGEXP,
  FILE_WORD_REGEXP,
  FILE_PPT_REGEXP,
  VIDEO_REGEXP,
  AUDIO_REGEXP,
  returnFileSize,
} from '../_common/js/upload/utils';

const { prefix } = config;

const FILE_ZIP_REGEXP = /(\.zip|\.rar|\.7z|\.tar|\.gz|\.bz2|\.xz)/i;

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
      isImageFile,
      onNormalFileChange,
      onInnerRemove,
      cancelUpload,
    } = useUpload(props);

    const renderTNodeJSX = useTNodeJSX();

    const showViewer = ref(false);
    const initialIndex = ref(0);

    const rootClass = computed(() => [
      uploadClass.value,
      `${uploadClass.value}--${props.theme || 'grid'}`,
      { [`${uploadClass.value}--disabled`]: props.disabled },
    ]);

    const previewImgs = computed(() =>
      displayFiles.value.filter((item) => isImageFile(item)).map((item) => item.url as string),
    );

    const handlePreview = (e: MouseEvent, file: UploadFile, index: number) => {
      props.onPreview?.({ e, file, index });
      if (!isImageFile(file)) return;
      const imageIndex = displayFiles.value.filter((item, i) => isImageFile(item) && i <= index).length - 1;
      initialIndex.value = Math.max(0, imageIndex);
      showViewer.value = props.preview;
    };

    const triggerUpload = (e: MouseEvent) => {
      if (disabled?.value) return;
      inputRef.value?.click();
      props.onClickUpload?.({ e });
    };

    const handleImageClose = ({ visible }: { visible: boolean }) => {
      showViewer.value = visible;
    };

    const getFileTypeIcon = (file: UploadFile) => {
      const mime = file.raw?.type || file.type || '';
      const fileType = `${file.name || ''} ${file.url || ''} ${mime}`;
      const baseClass = `${uploadClass.value}__file-type`;
      if (FILE_PDF_REGEXP.test(fileType)) return <FilePdfFilledIcon class={[baseClass, `${baseClass}--pdf`]} />;
      if (FILE_EXCEL_REGEXP.test(fileType) || /spreadsheetml/i.test(mime))
        return <FileExcelFilledIcon class={[baseClass, `${baseClass}--excel`]} />;
      if (FILE_PPT_REGEXP.test(fileType) || /presentationml/i.test(mime))
        return <FilePowerpointFilledIcon class={[baseClass, `${baseClass}--ppt`]} />;
      if (FILE_WORD_REGEXP.test(fileType) || /wordprocessingml/i.test(mime))
        return <FileWordFilledIcon class={[baseClass, `${baseClass}--word`]} />;
      if (VIDEO_REGEXP.test(fileType) || AUDIO_REGEXP.test(fileType))
        return <VideoFilledIcon class={[baseClass, `${baseClass}--media`]} />;
      if (FILE_ZIP_REGEXP.test(fileType) || /zip|compressed/i.test(mime))
        return <FileZipFilledIcon class={[baseClass, `${baseClass}--zip`]} />;
      return <File1Icon class={[baseClass, `${baseClass}--other`]} />;
    };

    const renderStatus = (file: UploadFile) => {
      if (file.status !== 'fail' && file.status !== 'progress') return null;
      return (
        <div class={`${uploadClass.value}__progress-mask`}>
          {file.status === 'progress' ? (
            <>
              <LoadingIcon class={`${uploadClass.value}__progress-loading`} />
              <div class={`${uploadClass.value}__progress-text`}>
                {file.percent ? `${file.percent}%` : globalConfig.value.progress.uploadingText}
              </div>
            </>
          ) : (
            <>
              <CloseCircleIcon class={`${uploadClass.value}__progress-fail-icon`} />
              <div class={`${uploadClass.value}__progress-text`}>{globalConfig.value.progress.failText}</div>
            </>
          )}
        </div>
      );
    };

    const reachMax = computed(() => props.max > 0 && displayFiles.value?.length >= props.max);

    const renderAddContent = () => {
      if (!props.addBtn || reachMax.value) return null;

      const addBtnNode = renderTNodeJSX('addBtn', <AddIcon />);
      const addContentNode = renderTNodeJSX('addContent');
      return (
        <div class={`${uploadClass.value}__item ${uploadClass.value}__item--add`} onClick={triggerUpload}>
          <div class={`${uploadClass.value}__add-icon`}>{addContentNode || addBtnNode}</div>
        </div>
      );
    };

    const renderGridLayout = () => (
      <>
        {displayFiles.value.map((file, index) => {
          const isFileItem = !isImageFile(file) && !file.url;
          const showFileContent = isFileItem && file.status !== 'progress' && file.status !== 'fail';
          const showRemoveBtn = isBoolean(file.removeBtn) ? file.removeBtn : props.removeBtn;
          const showDisabledMask =
            disabled?.value && !isFileItem && file.status !== 'progress' && file.status !== 'fail';
          return (
            <div
              key={index}
              class={[`${uploadClass.value}__item`, { [`${uploadClass.value}__item--file`]: isFileItem }]}
            >
              {file.url && (
                <t-image
                  class={`${uploadClass.value}__image`}
                  shape="round"
                  {...(props.imageProps as TdUploadProps['imageProps'])}
                  src={file.url}
                  onClick={(e: MouseEvent) => handlePreview(e, file, index)}
                />
              )}
              {showFileContent && (
                <div
                  class={`${uploadClass.value}__file-content`}
                  onClick={(e: MouseEvent) => handlePreview(e, file, index)}
                >
                  <div class={`${uploadClass.value}__file-icon`}>{getFileTypeIcon(file)}</div>
                  <div class={`${uploadClass.value}__file-name`}>{file.name}</div>
                </div>
              )}
              {renderStatus(file)}
              {showDisabledMask && <div class={`${uploadClass.value}__disabled-mask`} />}
              {showRemoveBtn && (
                <CloseIcon
                  class={`${uploadClass.value}__delete-btn`}
                  onClick={({ e }: any) => onInnerRemove({ e, file, index })}
                />
              )}
            </div>
          );
        })}
        {renderAddContent()}
      </>
    );

    const renderListItemIcon = (file: UploadFile) => {
      if (file.status === 'progress') {
        return <LoadingIcon class={`${uploadClass.value}__list-item-loading`} />;
      }
      if (file.status === 'fail') {
        return <ErrorCircleFilledIcon class={`${uploadClass.value}__list-item-error-icon`} />;
      }
      if (isImageFile(file) && file.url) {
        return (
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <t-image
              class={`${uploadClass.value}__list-item-thumbnail`}
              shape="round"
              {...(props.imageProps as TdUploadProps['imageProps'])}
              src={file.url}
            />
            {disabled?.value && <div class={`${uploadClass.value}__disabled-mask`} />}
          </div>
        );
      }
      return <span class={`${uploadClass.value}__list-item-icon`}>{getFileTypeIcon(file)}</span>;
    };

    const renderListItemSubText = (file: UploadFile) => {
      if (file.status === 'progress') {
        const percentText = file.percent ? ` ${file.percent}%` : '';
        return `${globalConfig.value.progress.uploadingText}${percentText}`;
      }
      if (file.status === 'fail') {
        return file.response?.error || globalConfig.value.progress.failText;
      }
      if (file.size != null) return returnFileSize(file.size);
      return '';
    };

    const renderListLayout = () => {
      const addContentNode = renderTNodeJSX('addContent');
      const addBtnNode = renderTNodeJSX('addBtn');
      const defaultTriggerBtn = (
        <TButton theme="primary" size="medium" disabled={disabled?.value} onClick={(e: MouseEvent) => triggerUpload(e)}>
          {{
            icon: () => <UploadIcon />,
            default: () => 'Upload',
          }}
        </TButton>
      );
      const triggerNode = addContentNode || addBtnNode || defaultTriggerBtn;
      const showTrigger = props.addBtn && !reachMax.value;

      return (
        <>
          {showTrigger && <div class={`${uploadClass.value}__list-trigger`}>{triggerNode}</div>}
          {displayFiles.value.length > 0 && (
            <div class={`${uploadClass.value}__list`}>
              {displayFiles.value.map((file, index) => {
                const itemClass = [
                  `${uploadClass.value}__list-item`,
                  {
                    [`${uploadClass.value}__list-item--fail`]: file.status === 'fail',
                    [`${uploadClass.value}__list-item--progress`]: file.status === 'progress',
                  },
                ];
                const showRemoveBtn = isBoolean(file.removeBtn) ? file.removeBtn : props.removeBtn;
                return (
                  <div key={index} class={itemClass} onClick={(e: MouseEvent) => handlePreview(e, file, index)}>
                    {renderListItemIcon(file)}
                    <div class={`${uploadClass.value}__list-item-content`}>
                      <div class={`${uploadClass.value}__list-item-name`}>{file.name}</div>
                      <div class={`${uploadClass.value}__list-item-size`}>{renderListItemSubText(file)}</div>
                    </div>
                    <div class={`${uploadClass.value}__list-item-action`}>
                      {showRemoveBtn && (
                        <DeleteIcon
                          class={`${uploadClass.value}__list-item-delete`}
                          onClick={({ e }: any) => {
                            e?.stopPropagation?.();
                            onInnerRemove({ e, file, index });
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      );
    };

    expose({
      upload: inputRef.value,
      uploading,
      triggerUpload,
      uploadFiles,
      cancelUpload,
      uploadFilePercent,
    });

    return () => (
      <div class={rootClass.value}>
        {props.theme === 'list' ? renderListLayout() : renderGridLayout()}
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
  },
});
