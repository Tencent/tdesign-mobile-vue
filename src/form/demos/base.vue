<template>
  <t-form
    :data="formData"
    :rules="rules"
    show-error-message
    reset-type="empty"
    :label-align="labelAlign"
    :label-width="labelWidth"
    scroll-to-first-error="auto"
    :disabled="disabled"
    @reset="onReset"
    @submit="onSubmit"
  >
    <t-form-item label="用户名" name="name">
      <t-input v-model="formData.name" borderless placeholder="请输入用户名"></t-input>
    </t-form-item>
    <t-form-item label="密码" name="password">
      <t-input v-model="formData.password" borderless type="password" placeholder="请输入密码">
        <template #suffixIcon>
          <BrowseOffIcon />
        </template>
      </t-input>
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
    <t-form-item arrow label="籍贯" name="place">
      <t-input v-model="formData.place" borderless readonly placeholder="请选择" @focus="placeVisible = true"></t-input>
    </t-form-item>
    <t-form-item label="年限" name="age">
      <t-stepper v-model="formData.age" theme="filled" />
    </t-form-item>
    <t-form-item label="自我评价" name="description">
      <t-rate v-model="formData.description" allow-half :show-text="false" :gap="8" />
    </t-form-item>
    <t-form-item label="个人简介" name="resume">
      <t-textarea
        v-model="formData.resume"
        class="textarea"
        :autosize="{ minRows: 4, maxRows: 4 }"
        indicator
        :maxlength="50"
        placeholder="请输入个人简介"
      ></t-textarea>
    </t-form-item>
    <t-form-item label="上传照片" name="photo">
      <t-upload
        v-model="formData.photo"
        multiple
        :max="6"
        :action="action"
        :on-fail="onFail"
        :on-progress="onProgress"
        :on-preview="onPreview"
        :on-success="onSuccess"
        :on-remove="onRemove"
        :on-select-change="onSelectChange"
      >
      </t-upload>
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

  <t-cascader
    v-model:visible="placeVisible"
    :value="placeValue"
    title="选择地址"
    :options="addressOptions"
    @change="onPlaceChange"
  />
</template>
<script lang="ts" setup>
import { computed, reactive, ref, toRefs } from 'vue';
import type { PropType } from 'vue';
import { BrowseOffIcon } from 'tdesign-icons-vue-next';
import type { DateValue, UploadFile } from 'tdesign-mobile-vue';

const action = 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo';

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
const placeVisible = ref(false);
const placeValue = ref<string | number>('440300');

const formData = reactive({
  name: 'Abcdefgh',
  password: 'Abcdefgh',
  gender: 'man',
  birth: '2022-08-10',
  place: '广东省 深圳市',
  age: 3,
  description: 3.5,
  resume: '本人性格开朗、稳重、细心，待人热情、真诚，工作认真负责，积极主动，勇于创新，具有很强的团队协作精神。',
  photo: [
    { url: 'https://tdesign.gtimg.com/mobile/demos/example4.png', name: 'uploaded1.png', type: 'image' },
    { url: 'https://tdesign.gtimg.com/mobile/demos/example6.png', name: 'uploaded2.png', type: 'image' },
  ],
});

const addressOptions = [
  {
    label: '广东省',
    value: '440000',
    children: [{ value: '440300', label: '深圳市' }],
  },
  {
    label: '北京市',
    value: '110000',
    children: [
      {
        value: '110100',
        label: '北京市',
        children: [
          { value: '110101', label: '东城区' },
          { value: '110102', label: '西城区' },
          { value: '110105', label: '朝阳区' },
          { value: '110108', label: '海淀区' },
        ],
      },
    ],
  },
  {
    label: '天津市',
    value: '120000',
    children: [
      {
        value: '120100',
        label: '天津市',
        children: [
          { value: '120101', label: '和平区' },
          { value: '120102', label: '河东区' },
          { value: '120103', label: '河西区' },
          { value: '120104', label: '南开区' },
        ],
      },
    ],
  },
];

const onFail = ({ file, e }: any) => {
  console.log('[onFail]', { file, e });
};

const onProgress = ({ file, percent, type, e }: any) => {
  console.log('[onProgress]', { file, percent, type, e });
};

const onPreview = ({ file, e }: any) => {
  console.log('[onPreview]', { file, e });
};

const onSuccess = ({ file, fileList, response, e }: any) => {
  console.log('[onSuccess]', { file, fileList, e, response });
};

const onRemove = ({ index, file, e }: any) => {
  console.log('[onRemove]', { index, file, e });
};

const onSelectChange = (files: UploadFile[]) => {
  console.log('[onSelectChange]', files);
};

const onBirthConfirm = (value: DateValue) => {
  formData.birth = String(value);
  birthVisible.value = false;
};

const onPlaceChange = (value: string | number, selectedOptions: any) => {
  placeValue.value = value;
  placeVisible.value = false;
  formData.place = selectedOptions?.map((item: any) => item.label).join(' ');
};

const onReset = () => {
  console.log('[onReset]');
};

const onSubmit = (e: any) => {
  console.log('[onSubmit]', e);
};

const rules = {
  name: [{ validator: (val: any) => val?.length === 8, message: '只能输入8个字符英文' }],
  password: [{ validator: (val: any) => val?.length > 6, message: '密码长度 6–16 位，支持字母、数字' }],
  gender: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  birth: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  place: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  description: [{ validator: (val: any) => val > 3, message: '分数过低会影响整体评价' }],
  resume: [{ validator: (val: any) => val !== '', message: '不能为空' }],
};
</script>

<style lang="less" scoped>
.textarea {
  width: 100%;
}
.button-group {
  display: flex;
  gap: 16px;
  padding: 16px;

  .t-button {
    flex: 1;
  }
}
</style>
