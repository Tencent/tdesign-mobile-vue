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
</template>
<script setup lang="ts">
const files = [
  {
    url: 'https://tdesign.gtimg.com/site/upload1.png',
    name: 'uploaded1.png',
    type: 'image',
  },
];
</script>

<style scoped lang="less">
.upload-demo {
  background: #fff;
  .upload-title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    padding: 12px 0 12px 16px;
  }
}
</style>
