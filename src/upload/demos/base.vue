<template>
  <div class="upload-demo">
    <div class="upload-title">单选上传</div>
    <t-upload
      :default-files="[]"
      :multiple="false"
      :max="1"
      :size-limit="{ size: 3000000, unit: 'B' }"
      accept="image/png"
      action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      @validate="onValidate"
    >
    </t-upload>
  </div>
</template>

<script lang="ts" setup>
import { Message } from 'tdesign-mobile-vue';

const onValidate = (context: any) => {
  if (context.type === 'FILE_OVER_SIZE_LIMIT') {
    Message.warning('文件大小超出上限');
  }
};
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
