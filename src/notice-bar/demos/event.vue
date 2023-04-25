<template>
  <div class="noticebar-demo">
    <t-notice-bar
      visible
      content="提示文字描述提示文字描述提示文字描述"
      :suffix-icon="arrowRight"
      @click="handleClick"
    />
    <t-notice-bar
      visible
      content="提示文字描述提示文字描述"
      extra="详情"
      :suffix-icon="iconFunc"
      @click="handleClick"
    />
  </div>
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
