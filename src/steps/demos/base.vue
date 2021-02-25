<template>
  <div class="t-steps-demo">
    <t-cell-group title="横向可操作步骤条">
      <t-cell >
        <t-steps
          v-model="current"
          :readonly="false"
          >
          <t-step title="步骤描述"></t-step>
          <t-step title="选中步骤"></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current1" :readonly="false">
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="选中步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current2" :readonly="false">
          <t-step title="步骤描述" ></t-step>
          <t-step title="选中步骤" ></t-step>
          <t-step title="步骤描述"></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current3" :readonly="false">
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="选中步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current4" :readonly="false">
          <t-step title="步骤描述" ></t-step>
          <t-step title="选中步骤" ></t-step>
          <t-step title="步骤描述" ></t-step>
          <t-step title="步骤描述" ></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current5" :readonly="false">
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="选中步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="横向带图标可操作步骤条">
      <t-cell>
        <t-steps v-model="current6" :readonly="false">
          <t-step title="步骤描述" ></t-step>
          <t-step title="选中步骤" ></t-step>
          <t-step title="步骤描述" ></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current7" :readonly="false">
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="选中步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="横向只读步骤条">
      <t-cell>
        <t-steps v-model="current8">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current9">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="错误步骤" content="辅助信息文字最多两行" status="error"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="竖向只读步骤条">
      <t-cell>
        <t-steps v-model="current10" direction="vertical">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
      <t-cell>
        <t-steps v-model="current11" direction="vertical">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="错误步骤" content="辅助信息文字最多两行" status="error"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="竖向可操作步骤条">
      <t-cell>
        <t-steps v-model="current14" direction="vertical" :readonly="false">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="竖向简化只读步骤条">
      <t-cell>
        <t-steps v-model="current12" type="dot" direction="vertical">
          <t-step title="事件描述"></t-step>
          <t-step title="事件描述"></t-step>
          <t-step title="事件描述"></t-step>
        </t-steps>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="自定义内容步骤条">
      <t-cell>
        <t-steps v-model="current13" direction="vertical">
          <t-step title="已完成步骤" content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。">
            <template #extra>
              <img src="https://0729-75822.gzc.vod.tencent-cloud.com/site_doc/tdesign-logo.png" alt="">
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
import { defineComponent, ref } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-steps-demo`;
export default defineComponent({
  name,
  setup() {
    const current = ref(1);
    const current1 = ref(1);
    const current2 = ref(1);
    const current3 = ref(1);
    const current4 = ref(1);
    const current5 = ref(1);
    const current6 = ref(1);
    const current7 = ref(1);
    const current8 = ref(2);
    const current9 = ref(1);
    const current10 = ref(1);
    const current11 = ref(1);
    const current12 = ref(1);
    const current13 = ref(1);
    const current14 = ref(1);

    return {
      current,
      current1,
      current2,
      current3,
      current4,
      current5,
      current6,
      current7,
      current8,
      current9,
      current10,
      current11,
      current12,
      current13,
      current14,
    };
  },
});
</script>

<style lang="less" scoped>

</style>
