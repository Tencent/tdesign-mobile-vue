<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Upload上传</h1>
    <p class="summary">上传图片（单张上传、多张上传</p>
    <tdesign-demo-block title="01 类型" summary="上传图片">
      <div class="upload-demo">
        <div class="upload-title">单选上传图片</div>
        <t-upload
          :multiple="false"
          :action="action"
          :on-fail="onFail"
          :on-progress="onProgress"
          :on-change="onChange"
          :on-preview="onPreview"
          :on-success="onSuccess"
          :on-remove="onRemove"
          :on-select-change="onSelectChange"
        >
        </t-upload>
        <div class="upload-title">多选上传图片</div>
        <t-upload
          :multiple="true"
          :max="max"
          :grid-config="gridConfig"
          :action="action"
          :on-fail="onFail"
          :on-progress="onProgress"
          :on-change="onChange"
          :on-preview="onPreview"
          :on-success="onSuccess"
          :on-remove="onRemove"
          :on-select-change="onSelectChange"
        >
        </t-upload>
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { defineComponent, h } from 'vue';
import { AddIcon } from 'tdesign-icons-vue-next';
import { UploadChangeContext, UploadFile, UploadRemoveContext, SuccessContext, ProgressContext } from '../type';

export default defineComponent({
  components: {},
  setup() {
    const addIcon = () => h(AddIcon);
    const onFail = ({ e, file }) => {
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
    const onPreview = ({ file, e }) => {
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
    const action = 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo';
    // const action = 'www';
    const max = 10;
    return {
      action,
      max,
      addIcon,
      onFail,
      onChange,
      onPreview,
      onSuccess,
      onRemove,
      onProgress,
      gridConfig,
      onSelectChange,
    };
  },
});
</script>
<style scoped lang="less">
.upload-demo {
  background: #fff;
  .upload-title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    padding: 12px 0 0 16px;
  }
}
</style>
