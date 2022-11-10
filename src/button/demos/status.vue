<template>
  <div class="button-demo">
    <t-button size="large" theme="primary" block :disabled="disabled">强按钮</t-button>
    <t-button size="large" theme="primary" block variant="outline" :disabled="disabled"> 弱按钮 </t-button>
    <t-button size="large" variant="outline" block :disabled="disabled">次按钮</t-button>
    <t-button size="large" theme="primary" variant="outline" :icon="iconFunc" block :disabled="disabled">
      带图标按钮
    </t-button>
    <t-button size="large" theme="danger" block :disabled="disabled">强警告按钮</t-button>
    <t-button size="large" theme="danger" variant="outline" block :disabled="disabled"> 弱警告按钮 </t-button>
  </div>

  <div style="background: #a6a6a6; padding: 8px 16px; margin-bottom: 16px">
    <t-button size="large" variant="outline" ghost block :disabled="disabled"> 幽灵按钮 </t-button>
  </div>
  <div class="margin-button">
    <t-button size="large" theme="primary" variant="text" block :disabled="disabled"> 文字按钮 </t-button>
  </div>
  <div class="no-border-radius margin-button">
    <t-button size="large" theme="primary" block :disabled="disabled"> 通栏按钮 </t-button>
  </div>
  <div class="no-border-radius no-border flex margin-button">
    <t-button size="large" variant="outline" block :disabled="disabled">次按钮</t-button>
    <t-button size="large" theme="primary" block :disabled="disabled">主按钮</t-button>
  </div>

  <div class="button-demo align-center margin-right">
    <div class="flex align-center margin-right">
      <t-button theme="primary" :icon="iconFunc" :disabled="disabled">带图标按钮</t-button>
      <t-button theme="primary" shape="round" :icon="iconFunc" :disabled="disabled">带图标按钮</t-button>
    </div>
    <div class="flex align-center margin-right">
      <t-button theme="primary" shape="square" :icon="iconFunc" :disabled="disabled"></t-button>
      <t-button theme="primary" shape="circle" :icon="iconFunc" :disabled="disabled"></t-button>
    </div>
  </div>

  <div class="flex align-center margin-right button-demo-loading">
    <div class="button-demo flex">
      <t-button size="large" shape="square" theme="primary" loading :disabled="disabled"></t-button>
      <t-button size="large" theme="primary" loading :disabled="disabled">加载中...</t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';

const disabled = ref(true);
const iconFunc = () => h(TIconApp);
</script>
