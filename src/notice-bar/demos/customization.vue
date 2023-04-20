<template>
  <div>
    <t-notice-bar
      visible
      :prefix-icon="false"
      content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
    />
    <t-notice-bar
      visible
      content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
      @click="handleClick"
    />
    <t-notice-bar
      visible
      content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
      extra="详情"
      :suffix-icon="arrowRight"
      @click="handleClick"
    />
    <!-- slot实现自定义content内容 -->
    <t-notice-bar visible>
      <template #content>
        提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述
        <text class="extra" @click="clickDetail"> 详情 </text>
      </template>
      <template #suffixIcon>
        <CloseIcon />
      </template>
    </t-notice-bar>
  </div>
</template>
<script lang="ts" setup>
import { h } from 'vue';
import { CloseIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';

const closeIcon = () => h(CloseIcon);
const arrowRight = () => h(ChevronRightIcon);
const handleClick = (context: string) => {
  Toast(`click:${context}`);
};
const clickDetail = () => {
  Toast(`click detail text`);
};
</script>

<style lang="less">
.extra {
  font-weight: 700;
  text-decoration: underline;
}
</style>
