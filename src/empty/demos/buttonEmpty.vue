<template>
  <t-empty :icon="userIcon" description="描述文字">
    <template #action>
      <t-button theme="primary" size="large">操作按钮</t-button>
    </template>
  </t-empty>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { InfoCircleFilledIcon } from 'tdesign-icons-vue-next';

const userIcon = () => h(InfoCircleFilledIcon);
</script>
