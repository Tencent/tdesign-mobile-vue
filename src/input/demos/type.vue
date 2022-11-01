<template>
  <t-cell-group title="基础文本框">
    <t-input label="标签文字" placeholder="请输入文字" />
  </t-cell-group>
  <t-cell-group title="必填、选填文本框">
    <t-input label="标签文字" placeholder="请输入文字" :required="true" />
    <t-input label="标签文字" placeholder="请输入文字 (选填)" />
  </t-cell-group>
  <t-cell-group title="无标题文本框">
    <t-input placeholder="请输入文字" />
  </t-cell-group>
  <t-cell-group title="带提示信息文本框">
    <t-input v-model="text" label="标签文字" placeholder="请输入文字">
      <template #suffixIcon>
        <info-circle-filled-icon />
      </template>
    </t-input>
  </t-cell-group>
  <t-cell-group title="长标题文本框">
    <t-input label="超长需换行的标签" placeholder="预设文本" />
  </t-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InfoCircleFilledIcon } from 'tdesign-icons-vue-next';

const text = ref('');
</script>

<style lang="less">
.t-cell-group__title {
  font-size: 12px;
  line-height: 20px;
}
</style>
