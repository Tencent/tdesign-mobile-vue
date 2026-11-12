<template>
  <t-form :data="formData" :label-align="labelAlign" :label-width="labelWidth" colon :disabled="disabled">
    <t-form-item label="用户名" name="name">
      <t-input v-model="formData.name" borderless placeholder="请输入用户名"></t-input>
    </t-form-item>
    <t-form-item label="年限" name="age">
      <t-stepper v-model="formData.age" theme="filled" />
    </t-form-item>
  </t-form>
</template>
<script lang="ts" setup>
import { computed, reactive, toRefs } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
  labelAlign: {
    type: String as PropType<'left' | 'right' | 'top'>,
    default: 'top',
  },
  disabled: Boolean,
});
const { labelAlign, disabled } = toRefs(props);

const isHorizontal = computed(() => labelAlign.value !== 'top');
const labelWidth = computed(() => (isHorizontal.value ? '81px' : undefined));

const formData = reactive({
  name: 'Abcdefgh',
  age: 3,
});
</script>
