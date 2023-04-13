<template>
  <div class="upload-demo">
    <div class="upload-title">单选上传</div>
    <t-upload
      :default-files="[]"
      :multiple="false"
      :max="1"
      accept="image/png"
      action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
    >
    </t-upload>
  </div>
</template>

<style scoped lang="less">
.upload-demo {
  background: #fff;
  .upload-title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    padding: 12px 16px 0;
  }
}
</style>
