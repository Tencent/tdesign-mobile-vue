<template>
  <t-form
    ref="form"
    :data="formData"
    :rules="rules"
    show-error-message
    :label-align="labelAlign"
    :label-width="labelWidth"
    :disabled="disabled"
    @reset="onReset"
    @submit="onSubmit"
  >
    <t-form-item label="用户名" name="name">
      <t-input v-model="formData.name" borderless placeholder="请输入用户名"></t-input>
    </t-form-item>
    <t-form-item label="性别" name="gender">
      <t-radio-group v-model="formData.gender" borderless direction="horizontal">
        <t-radio value="man" label="男" />
        <t-radio value="women" label="女" />
        <t-radio value="secret" label="保密" />
      </t-radio-group>
    </t-form-item>
    <t-form-item arrow label="生日" name="birth">
      <t-input v-model="formData.birth" borderless readonly placeholder="请选择" @focus="birthVisible = true"></t-input>
    </t-form-item>
    <t-form-item label="年限" name="age">
      <t-stepper v-model="formData.age" theme="filled" />
    </t-form-item>
    <div class="button-group">
      <t-button theme="light" type="reset" size="large">重置</t-button>
      <t-button theme="primary" type="submit" size="large">提交</t-button>
    </div>
  </t-form>

  <t-popup v-model="birthVisible" placement="bottom">
    <t-date-time-picker
      :value="formData.birth"
      :mode="['date']"
      title="选择日期"
      start="2015-5-5"
      format="YYYY-MM-DD"
      @confirm="onBirthConfirm"
      @cancel="birthVisible = false"
    />
  </t-popup>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import type { PropType } from 'vue';
import type { DateValue } from 'tdesign-mobile-vue';

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

const form = ref(null);
const birthVisible = ref(false);

const formData = reactive({
  name: 'Abcdefghijk',
  gender: '',
  birth: '',
  age: 3,
});

const rules = {
  name: [{ validator: (val: any) => val?.length === 8, message: '只能输入8个字符英文' }],
  gender: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  birth: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  age: [{ validator: (val: any) => val <= 2, message: '输入的数字不能大于用户所填生日对应的年龄' }],
};

const onBirthConfirm = (value: DateValue) => {
  formData.birth = String(value);
  birthVisible.value = false;
};

const onReset = () => {
  console.log('[onReset]');
};

const onSubmit = (e: any) => {
  console.log('[onSubmit]', e);
};

onMounted(() => {
  setTimeout(() => {
    // @ts-ignore
    form.value.validate();
  });
});
</script>

<style lang="less" scoped>
.button-group {
  display: flex;
  gap: 16px;
  padding: 16px;

  .t-button {
    flex: 1;
  }
}
</style>
