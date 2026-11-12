<template>
  <t-form class="form-demo-form" :data="formData" label-align="left" label-width="81px" :disabled="disabled">
    <t-form-item label="用户名" name="name">
      <t-input v-model="formData.name" borderless placeholder="请输入用户名"></t-input>
    </t-form-item>
    <t-form-item label="年限" name="age">
      <t-stepper v-model="formData.age" theme="filled" />
    </t-form-item>
  </t-form>
  <t-form class="form-demo-form" :data="formData" label-align="right" label-width="81px" :disabled="disabled">
    <t-form-item label="用户名" name="name">
      <t-input v-model="formData.name" borderless placeholder="请输入用户名"></t-input>
    </t-form-item>
    <t-form-item label="年限" name="age">
      <t-stepper v-model="formData.age" theme="filled" />
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
  name: 'Abcdefgh',
  age: 3,
});
</script>
