<template>
  <t-notice-bar
    visible
    content="这是一条普通的消息通知"
    :suffix-icon="arrowRight"
    class="notice-bar-demo-block"
    @click="handleClick"
  >
    <template #operation>
      <t-link style="margin-left: 5px" theme="primary">详情</t-link>
    </template>
  </t-notice-bar>
  <t-notice-bar visible content="这是一条普通的通知信息" :suffix-icon="arrowRight" @click="handleClick" />
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { CloseIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';

const iconFunc = () => h(CloseIcon);
const arrowRight = () => h(ChevronRightIcon);
const handleClick = (context: string) => {
  Toast(`click:${context}`);
};
</script>
