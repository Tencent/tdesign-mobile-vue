<template>
  <div class="my-popover">
    <ArrowUpIcon class="pop-icon" />
    <p class="popover-desc">自定义的图形或说明文案，用来解释或指导该功能使用。</p>
    <div class="popover-action">
      <t-button v-if="current + 1 !== total" theme="light" size="extra-small" @click="handleSkip"> 跳过 </t-button>
      <t-button v-if="current + 1 === total" theme="light" size="extra-small" @click="handleBack"> 返回 </t-button>
      <t-button v-if="current + 1 < total" theme="primary" size="extra-small" @click="handleNext"> 下一步 </t-button>
      <t-button v-if="current + 1 === total" theme="primary" size="extra-small" @click="handleFinish"> 完成 </t-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { ArrowUpIcon } from 'tdesign-icons-vue-next';

type ClickHandler = (e: MouseEvent) => void;

defineProps({
  handleBack: Function as PropType<ClickHandler>,
  handleNext: Function as PropType<ClickHandler>,
  handleSkip: Function as PropType<ClickHandler>,
  handleFinish: Function as PropType<ClickHandler>,
  current: Number,
  total: Number,
});
</script>

<style scoped>
.my-popover {
  width: 240px;
}

.pop-icon {
  color: white;
  font-size: 32px;
  font-weight: bold;
}

.popover-desc {
  margin-top: 16px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  line-height: 24px;
}

.popover-action {
  margin-top: 16px;
  text-align: right;
}

.popover-action button {
  margin-left: 12px;
}
</style>
