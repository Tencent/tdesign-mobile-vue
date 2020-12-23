<template>
  <div class="t-steps-demo">
    <t-cell-group title="横向不可操作">
      <t-cell >
        <t-steps
          v-model="current"
          :readonly="false">
          <t-step title="步骤描述"></t-step>
          <t-step title="选中步骤"></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current1" :readonly="false">
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="选中步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="横向带图标可操作">
      <t-cell>
        <t-steps v-model="current2" :readonly="false">
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="横向只读步骤条">
      <t-cell>
        <t-steps v-model="current3">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current4">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="错误步骤" content="辅助信息文字最多两行" status="error"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="竖向只读步骤条">
      <t-cell>
        <t-steps v-model="current5" direction="vertical">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current6" direction="vertical">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="错误步骤" content="辅助信息文字最多两行" status="error"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="竖向简化只读步骤条">
      <t-cell>
        <t-steps type="dot" v-model="current5" direction="vertical">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="竖向自定义内容步骤条">
      <t-cell>
        <t-steps v-model="current7" direction="vertical">
          <t-step title="已完成步骤" content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。">
            <template v-slot:extra>
              <img src="//0729-75822.gzc.vod.tencent-cloud.com/site_doc/tdesign-logo.png" alt="">
            </template>
          </t-step>
          <t-step title="当前步骤" content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"></t-step>
          <t-step title="未完成步骤" content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-steps-demo`;
export default {
  name,
  setup() {
    const current = ref(0);
    const current1 = ref(1);
    const current2 = ref(1);
    const current3 = ref(1);
    const current4 = ref(1);
    const current5 = ref(1);
    const current6 = ref(1);
    const current7 = ref(1);

    return {
      current,
      current1,
      current2,
      current3,
      current4,
      current5,
      current6,
      current7,
    };
  },
};
</script>
