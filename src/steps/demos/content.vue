<template>
  <div class="step-demo">
    <t-steps v-model="current" layout="vertical" :readonly="true">
      <t-step
        title="已完成步骤"
        content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"
      >
        <template #extra>
          <img src="https://0729-75822.gzc.vod.tencent-cloud.com/site_doc/tdesign-logo.png" alt="" />
        </template>
      </t-step>
      <t-step
        title="当前步骤"
        content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"
      ></t-step>
      <t-step
        title="未完成步骤"
        content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"
      ></t-step>
    </t-steps>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(1);
</script>
