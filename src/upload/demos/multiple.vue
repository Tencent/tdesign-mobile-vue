<template>
  <div class="upload-demo">
    <div class="upload-title">多选上传</div>
    <t-upload
      :default-files="files"
      multiple
      :max="10"
      :grid-config="gridConfig"
      :action="action"
      :on-fail="onFail"
      :on-progress="onProgress"
      :on-change="onChange"
      :on-preview="onPreview"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-select-change="onSelectChange"
      :on-click-upload="onClickUpload"
    >
    </t-upload>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
  UploadChangeContext,
  UploadFile,
  UploadRemoveContext,
  SuccessContext,
  ProgressContext,
} from 'tdesign-mobile-vue';

const onFail = ({ file, e }: { file: UploadFile; e: ProgressEvent }): any => {
  console.log('---onFail', file, e);
  return null;
};
const gridConfig = {
  column: 4,
};
const onProgress = ({ file, percent, type, e }: ProgressContext) => {
  console.log('---onProgress:', file, percent, type, e);
};
const onChange = (files: Array<UploadFile>, { e, response, trigger, index, file }: UploadChangeContext) => {
  console.log('====onChange', files, e, response, trigger, index, file);
};
const onPreview = ({ file, e }: { file: UploadFile; e: MouseEvent }) => {
  console.log('====onPreview', file, e);
};
const onSuccess = ({ file, fileList, response, e }: SuccessContext) => {
  console.log('====onSuccess', file, fileList, e, response);
};
const onRemove = ({ index, file, e }: UploadRemoveContext) => {
  console.log('====onRemove', index, file, e);
};
const onSelectChange = (files: Array<UploadFile>) => {
  console.log('====onSelectChange', files);
};
const onClickUpload = ({ e }: { e: MouseEvent }) => {
  console.log('====onClickUpload', e);
};
const action = 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo';
const files = ref([
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/upload4.png',
    name: 'uploaded1.png',
    type: 'image',
  },
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/upload6.png',
    name: 'uploaded2.png',
    type: 'image',
  },
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/upload4.png',
    name: 'uploaded3.png',
    type: 'image',
  },
]);
</script>
<style scoped lang="less">
.upload-demo {
  background: var(--bg-color-demo, #fff);
  .upload-title {
    font-size: 16px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
    padding: 12px 16px 0;
  }
}
</style>
