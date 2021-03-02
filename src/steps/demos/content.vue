<template>
  <div class="cell-base">
    <t-steps v-model="current" direction="vertical" class="demo-steps">
      <t-step title="已完成步骤" content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。">
        <template #extra>
          <div class="extra-img">
            <img src="https://0729-75822.gzc.vod.tencent-cloud.com/site_doc/tdesign-logo.png" alt="">
          </div>
        </template>
      </t-step>
      <t-step title="当前步骤" content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"></t-step>
      <t-step title="未完成步骤" content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"></t-step>
    </t-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-steps-demo`;
export default defineComponent({
  name,
  setup() {
    const current = ref(0);
    return {
      current,
    };
  },
});
</script>

<style lang="less" scoped>
.demo-steps {
  padding-top: 12px;
}
.extra-img {
  display: flex;
}
</style>
