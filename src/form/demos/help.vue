<template>
  <t-form :data="formData" :label-align="labelAlign" :label-width="labelWidth" :disabled="disabled">
    <t-form-item label="用户名" name="name" help="用户名支持大小写英文字母，最多 8 个字符">
      <t-input v-model="formData.name" borderless placeholder="请输入用户名"></t-input>
    </t-form-item>
    <t-form-item label="密码" name="password" help="密码长度 6–16 位，支持字母、数字">
      <t-input v-model="formData.password" borderless type="password" placeholder="请输入密码">
        <template #suffixIcon>
          <BrowseOffIcon />
        </template>
      </t-input>
    </t-form-item>
    <t-form-item label="性别" name="gender" help="性别不能为空">
      <t-radio-group v-model="formData.gender" borderless direction="horizontal">
        <t-radio value="man" label="男" />
        <t-radio value="women" label="女" />
        <t-radio value="secret" label="保密" />
      </t-radio-group>
    </t-form-item>
    <t-form-item arrow label="生日" name="birth" help="生日不能为空">
      <t-input v-model="formData.birth" borderless readonly placeholder="请选择" @focus="birthVisible = true"></t-input>
    </t-form-item>
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
import { computed, reactive, ref, toRefs } from 'vue';
import type { PropType } from 'vue';
import { BrowseOffIcon } from 'tdesign-icons-vue-next';
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

const birthVisible = ref(false);

const formData = reactive({
  name: 'Abcdefgh',
  password: 'Abcdefgh',
  gender: 'man',
  birth: '2022-08-10',
});

const onBirthConfirm = (value: DateValue) => {
  formData.birth = String(value);
  birthVisible.value = false;
};
</script>
