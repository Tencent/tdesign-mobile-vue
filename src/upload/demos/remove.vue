<template>
  <div class="upload-demo">
    <div class="upload-title">单选上传</div>
    <t-upload
      ref="uploadRef"
      v-model="files"
      :multiple="false"
      :max="1"
      accept="image/*"
      action="https://apifoxmock.com/m1/5139971-4803795-cac090a1/test"
      @success="onSuccessUpload"
      @fail="onFailUpload"
      :formatResponse="formatResponseUpload"
    >
    </t-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Message, Toast } from 'tdesign-mobile-vue';

const files = ref([]);
const uploadRef = ref();
console.log('uploadRef', uploadRef);
const onSuccessUpload = (context: any) => {
  console.log(context);
};
const formatResponseUpload = (response: any, context: any) => {
  // Define your response formatting logic here
  console.log(response);

  response.error = response.msg || '上传失败22222';

  console.log('formatResponse', response);
  return response;
};
const onFailUpload = (context: any) => {
  console.error('Upload failed', context);
  // Message.warning(context.response.error);
  Toast({
    style: { color: 'red' },
    // theme: "error",
    direction: 'row',
    message: context.response.error,
    onDestroy: () => {
      console.log('需要清除图片内容');
      uploadRef.value.removeAllFiles();
    },
  });

  // response error 有问题 不显示错误信息
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
