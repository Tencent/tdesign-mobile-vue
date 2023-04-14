<template>
  <div class="upload-demo">
    <div class="upload-title">上传图片</div>
    <t-upload
      :default-files="files"
      :multiple="false"
      accept="image/png"
      action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
    >
    </t-upload>
  </div>

  <div class="upload-demo__title">上传失败</div>

  <div class="upload-demo">
    <div class="upload-title">上传图片</div>
    <t-upload
      :default-files="failFiles"
      :multiple="false"
      accept="image/png"
      action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
    >
    </t-upload>
  </div>
</template>
<script setup lang="ts">
const files = [
  {
    url: 'https://tdesign.gtimg.com/site/upload1.png',
    name: 'uploaded1.png',
    type: 'image',
    status: 'progress',
  },
  {
    url: 'https://tdesign.gtimg.com/site/upload1.png',
    name: 'uploaded1.png',
    type: 'image',
    status: 'progress',
    percent: 68,
  },
];

const failFiles = [
  {
    url: 'https://tdesign.gtimg.com/site/upload1.png',
    name: 'uploaded1.png',
    type: 'image',
    status: 'fail',
  },
];
</script>

<style scoped lang="less">
.upload-demo {
  background: #fff;

  & + & {
    margin-top: 16px;
  }

  &__title {
    font-size: 14px;
    margin: 24px 16px 16px;
    color: rgba(0, 0, 0, 0.6);
  }
  .upload-title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    padding: 12px 16px 0;
  }
}
</style>
