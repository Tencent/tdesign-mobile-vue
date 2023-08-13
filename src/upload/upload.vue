<template>
  <div :class="`${name}`">
    <div v-for="(file, index) in displayFiles" :key="index" :class="`${name}__item`">
      <t-image
        v-if="file.url"
        :class="`${name}__image`"
        shape="round"
        v-bind="imageProps"
        :src="file.url"
        @click="(e) => handlePreview(e, file, index)"
      />
      <div v-if="file.status === 'fail' || file.status === 'progress'" :class="`${name}__progress-mask`">
        <template v-if="file.status === 'progress'">
          <loading-icon :class="`${name}__progress-loading`" size="24" />
          <div :class="`${name}__progress-text`">{{ file.percent ? file.percent + '%' : '上传中...' }}</div>
        </template>
        <close-circle-icon v-else size="24" />
        <div v-if="file.status === 'fail'" :class="`${name}__progress-text`">上传失败</div>
      </div>
      <close-icon :class="`${name}__delete-btn`" @click="({ e }) => onInnerRemove({ e, file, index })" />
    </div>
    <template v-if="max === 0 || (max > 0 && displayFiles?.length < max)">
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
      @change="onNormalFileChange"
    />
    <t-image-viewer
      v-model="showViewer"
      :images="displayFiles.map((item) => item.url as string)"
      :index="initialIndex"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, Ref, toRefs, computed, ComputedRef } from 'vue';
import { AddIcon, LoadingIcon, CloseIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';

import TImage from '../image';
import TImageViewer from '../image-viewer';
import { renderTNode, TNode } from '../shared';
import { UploadFile } from './type';
import UploadProps from './props';
import config from '../config';
import useUpload from './hooks/useUpload';

const { prefix } = config;
const name = `${prefix}-upload`;

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
  setup(props) {
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

    const showViewer = ref(false);
    const initialIndex = ref(0);
    const internalInstance = getCurrentInstance();
    const defaultContent = computed(() => renderTNode(internalInstance, 'default'));
    const addContent = computed(() => renderTNode(internalInstance, 'addContent'));

    const handlePreview = (e: MouseEvent, file: UploadFile, index: number) => {
      initialIndex.value = index;
      showViewer.value = true;
      props.onPreview?.({
        e,
        file,
        index,
      });
    };

    const triggerUpload = () => {
      const input = inputRef.value as HTMLInputElement;
      if (disabled?.value) return;
      input.click();
    };

    return {
      name,
      triggerUpload,
      initialIndex,
      showViewer,
      handlePreview,
      defaultContent,
      addContent,

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
  },
});
</script>
