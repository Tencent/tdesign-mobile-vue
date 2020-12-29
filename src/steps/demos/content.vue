<template>
  <div class="cell-base">
    <t-cell-group title="竖向更多内容步骤">
      <t-steps v-model="current" direction="vertical">
        <t-step title="已完成步骤" content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。">
          <template v-slot:extra>
            <img src="//0729-75822.gzc.vod.tencent-cloud.com/site_doc/tdesign-logo.png" alt="">
          </template>
        </t-step>
        <t-step title="当前步骤" content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"></t-step>
        <t-step title="未完成步骤" content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"></t-step>
      </t-steps>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {
      current: 0,
    };
  },
};
</script>
