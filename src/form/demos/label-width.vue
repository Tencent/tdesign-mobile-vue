<template>
  <t-form class="form-demo-form" :data="formData" label-align="left" :disabled="disabled">
    <t-form-item label="用户昵称" name="nickname" label-width="80px">
      <t-input v-model="formData.nickname" borderless placeholder="请输入昵称"></t-input>
    </t-form-item>
    <t-form-item label="工作年限" name="workAge" label-width="80px">
      <t-stepper v-model="formData.workAge" theme="filled" />
    </t-form-item>
  </t-form>
  <t-form class="form-demo-form" :data="formData" label-align="left" :disabled="disabled">
    <t-form-item label="标签文案宽度" name="label" label-width="112px">
      <t-input v-model="formData.label" borderless placeholder="请输入内容"></t-input>
    </t-form-item>
    <t-form-item label="标签文案宽度" name="labelAge" label-width="112px">
      <t-stepper v-model="formData.labelAge" theme="filled" />
    </t-form-item>
  </t-form>
  <t-form class="form-demo-form" :data="formData" label-align="left" :disabled="disabled">
    <t-form-item label="标签文案宽度超长样式" name="longLabel" label-width="176px">
      <t-input v-model="formData.longLabel" borderless placeholder="请输入内容"></t-input>
    </t-form-item>
    <t-form-item label="标签文案宽度超长样式" name="longLabelAge" label-width="176px">
      <t-stepper v-model="formData.longLabelAge" theme="filled" />
    </t-form-item>
  </t-form>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

const props = defineProps({
  disabled: Boolean,
});
const { disabled } = toRefs(props);

const formData = reactive({
  nickname: 'Abcdefgh',
  workAge: 3,
  label: 'Abcdefgh',
  labelAge: 3,
  longLabel: 'Abcdefgh',
  longLabelAge: 3,
});
</script>
