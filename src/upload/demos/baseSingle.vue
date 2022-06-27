<template>
  <div>
    <t-cell-group class="dialog-type-title">
      <div class="title">单选上传图片</div>
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
    </t-cell-group>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { UploadChangeContext, UploadFile, UploadRemoveContext, SuccessContext, ProgressContext } from '../type';

export default defineComponent({
  setup() {
    const onFail = ({ e, file }) => {
      console.log('---onFail', file, e);
      return null;
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
    return {
      action,
      onFail,
      onChange,
      onPreview,
      onSuccess,
      onRemove,
      onProgress,
      onSelectChange,
    };
  },
});
</script>

<style scoped>
.title {
  height: 58px;
  background: #f5f5f5;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  padding: 24px 0 12px 16px;
}
</style>
