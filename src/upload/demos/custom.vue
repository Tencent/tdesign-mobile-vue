<template>
  <div class="upload-demo">
    <div class="upload-title">请上传身份证人像面</div>
    <div class="upload-content">
      <t-upload
        class="front"
        :default-files="[]"
        :multiple="false"
        :max="1"
        :size-limit="{ size: 3000000, unit: 'B' }"
        accept="image/png"
        action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        @validate="onValidate"
      >
        <template #addContent>
          <div class="add-content">
            <t-image
              style="width: 32px; height: 32px"
              src="https://oteam-tdesign-1258344706.cos-internal.ap-guangzhou.tencentcos.cn/mobile/demos/upload3.png"
              alt=""
            />
          </div>
        </template>
      </t-upload>
    </div>
    <div class="upload-title">请上传身份证国徽面</div>
    <div class="upload-content">
      <t-upload
        class="reverse"
        :default-files="[]"
        :multiple="false"
        :max="1"
        :size-limit="{ size: 3000000, unit: 'B' }"
        accept="image/png"
        action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        @validate="onValidate"
      >
        <template #addContent>
          <div class="add-content">
            <t-image
              style="width: 32px; height: 32px"
              src="https://oteam-tdesign-1258344706.cos-internal.ap-guangzhou.tencentcos.cn/mobile/demos/upload3.png"
              alt=""
            />
          </div>
        </template>
      </t-upload>
    </div>
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

<style lang="less" scoped>
.upload-demo {
  background: #fff;

  .upload-title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    padding: 12px 16px 0;
  }

  .upload-content {
    --td-upload-width: 343px;
    --td-upload-height: 200px;
    --td-upload-grid-columns: 1;
  }

  .front {
    --td-upload-background: center / 100% 100% no-repeat url('https://tdesign.gtimg.com/mobile/demos/upload1.png');
  }

  .reverse {
    --td-upload-background: center / 100% 100% no-repeat url('https://tdesign.gtimg.com/mobile/demos/upload1.png');
  }

  .add-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 72px;
    background: #d9e1ff;
    border-radius: 50%;
  }
}
</style>
