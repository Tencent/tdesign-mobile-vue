<template>
  <t-form
    ref="form"
    :data="formData"
    :rules="rules"
    reset-type="empty"
    show-error-message
    label-align="top"
    :disabled="disabled"
    @reset="onReset"
    @submit="onSubmit"
  >
    <t-form-item label="用户名" name="name" help="输入用户名">
      <t-input v-model="formData.name" borderless placeholder="请输入内容"></t-input>
    </t-form-item>
    <t-form-item label="密码" name="password">
      <t-input v-model="formData.password" borderless type="password" :clearable="false" placeholder="请输入内容">
        <template #suffixIcon>
          <BrowseOffIcon />
        </template>
      </t-input>
    </t-form-item>
    <t-form-item label="性别" name="gender">
      <t-radio-group v-model="formData.gender" class="box" borderless @change="groupChangeFn">
        <t-radio :block="false" name="radio" value="man" label="男" />
        <t-radio :block="false" name="radio" value="women" label="女" />
        <t-radio :block="false" name="radio" value="secret" label="保密" />
      </t-radio-group>
    </t-form-item>
    <t-form-item arrow label="生日" name="birth">
      <t-input v-model="formData.birth" borderless placeholder="请输入内容" @click="visible = true"></t-input>
      <t-popup v-model="visible" placement="bottom">
        <t-date-time-picker
          :value="formData.birth"
          :mode="['date']"
          title="选择日期"
          start="2015-5-5"
          format="YYYY-MM-DD"
          @change="onChange"
          @pick="onPick"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
    </t-form-item>
    <t-form-item arrow label="籍贯" name="place">
      <t-input v-model="formData.place" borderless placeholder="请输入内容" @click="showCascader"></t-input>
      <t-cascader
        v-model:visible="visibleCascader"
        :value="address"
        title="选择地址"
        :options="options"
        @change="onChangeCascader"
      />
    </t-form-item>
    <t-form-item label="年限" name="age">
      <t-stepper v-model="formData.age" theme="filled" @change="onChangeStepper" />
    </t-form-item>
    <t-form-item label="自我评价" name="description">
      <t-rate v-model="formData.description" variant="filled" allow-half :gap="rateGap" />
    </t-form-item>
    <t-form-item label="个人简介" name="resume">
      <t-textarea
        v-model="formData.resume"
        class="textarea"
        indicator
        :maxlength="50"
        placeholder="请输入个人简介"
      ></t-textarea>
    </t-form-item>
    <t-form-item label="上传照片" name="photo">
      <t-upload
        :default-files="formData.photo"
        multiple
        :max="8"
        :action="action"
        :on-fail="onFail"
        :on-progress="onProgress"
        :on-change="onChangeUpload"
        :on-preview="onPreview"
        :on-success="onSuccess"
        :on-remove="onRemove"
        :on-select-change="onSelectChange"
      >
      </t-upload>
    </t-form-item>
    <div class="button-group">
      <t-button theme="primary" variant="light" type="submit" size="large">提交</t-button>
      <t-button theme="default" variant="base" type="reset" size="large">重置</t-button>
    </div>
  </t-form>
</template>
<script lang="ts" setup>
import { ref, reactive, defineProps, toRefs, onMounted } from 'vue';
import { BrowseOffIcon } from 'tdesign-icons-vue-next';

import {
  UploadChangeContext,
  UploadFile,
  UploadRemoveContext,
  SuccessContext,
  ProgressContext,
} from '../../upload/type';

const props = defineProps({
  disabled: Boolean,
});
const { disabled } = toRefs(props);

// upload
const onFail = ({ file, e }: { file: UploadFile; e: ProgressEvent }) => {
  console.log('---onFail', file, e);
  return null;
};

const onProgress = ({ file, percent, type, e }: ProgressContext) => {
  console.log('---onProgress:', file, percent, type, e);
};
const onChangeUpload = (files: Array<UploadFile>, { e, response, trigger, index, file }: UploadChangeContext) => {
  console.log('====onChange', files, e, response, trigger, index, file);
};
const onPreview = ({ file, e }: { file: UploadFile; e: MouseEvent }) => {
  console.log('====onPreview', file, e);
};
const onSuccess = ({ file, fileList, response, e }: SuccessContext) => {
  console.log('====onSuccess', file, fileList, e, response);
};
const onRemove = ({ index, file, e }: UploadRemoveContext) => {
  console.log('====onRemove', index, file, e);
};
const onSelectChange = (files: Array<UploadFile>) => {
  console.log('====onSelectChange', files);
};
const action = 'https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo';
const files = ref([
  {
    url: 'https://tdesign.gtimg.com/miniprogram/images/example4.png',
    name: 'uploaded1.png',
    type: 'image',
  },
  {
    url: 'https://tdesign.gtimg.com/miniprogram/images/example6.png',
    name: 'uploaded2.png',
    type: 'image',
  },
]);

const formData = reactive({
  name: '',
  password: '',
  gender: '',
  birth: '',
  place: '',
  age: 3,
  description: 2,
  resume: '',
  photo: files,
});
const form = ref(null);

const groupChangeFn = (value: any, context: { e: Event }) => {
  console.log(value, context);
};

const visible = ref(false);
const onChange = (value: string) => {
  console.log('change: ', value);
};

const onPick = (value: string) => {
  console.log('pick: ', value);
};

const onCancel = () => {
  console.log('cancel');
  visible.value = false;
};

const onConfirm = (value: string) => {
  console.log('confirm: ', value);
  formData.birth = value;
  visible.value = false;
};

// 级联选择器
const data = {
  areaList: [
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
            { value: '110106', label: '丰台区' },
            { value: '110107', label: '石景山区' },
            { value: '110108', label: '海淀区' },
            { value: '110109', label: '门头沟区' },
            { value: '110111', label: '房山区' },
            { value: '110112', label: '通州区' },
            { value: '110113', label: '顺义区' },
            { value: '110114', label: '昌平区' },
            { value: '110115', label: '大兴区' },
            { value: '110116', label: '怀柔区' },
            { value: '110117', label: '平谷区' },
            { value: '110118', label: '密云区' },
            { value: '110119', label: '延庆区' },
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
            { value: '120105', label: '河北区' },
            { value: '120106', label: '红桥区' },
            { value: '120110', label: '东丽区' },
            { value: '120111', label: '西青区' },
            { value: '120112', label: '津南区' },
            { value: '120113', label: '北辰区' },
            { value: '120114', label: '武清区' },
            { value: '120115', label: '宝坻区' },
            { value: '120116', label: '滨海新区' },
            { value: '120117', label: '宁河区' },
            { value: '120118', label: '静海区' },
            { value: '120119', label: '蓟州区' },
          ],
        },
      ],
    },
  ],
};
const options = data.areaList;

const address = ref('120119');
const visibleCascader = ref(false);

const onChangeCascader = (value: string, options: any) => {
  formData.place = options?.map((item: any) => item.label).join('/');
  visibleCascader.value = false;
};

const showCascader = () => {
  visibleCascader.value = true;
};

// 步进器
const onChangeStepper = ($event: number) => {
  formData.age = $event;
};

// rate
const rateGap = 8;

// form
const onReset = () => {
  console.log('===onReset');
};

const onSubmit = (e: any) => {
  console.log('===onSubmit', e);
};

const rules = {
  name: [{ validator: (val: any) => val === 8, message: '只能输入8个字符英文' }],
  password: [{ validator: (val: any) => val > 6, message: '长度大于6个字符' }],
  gender: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  birth: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  place: [{ validator: (val: any) => val !== '', message: '不能为空' }],
  description: [{ validator: (val: any) => val > 3, message: '分数过低会影响整体评价' }],
  resume: [{ validator: (val: any) => val !== '', message: '不能为空' }],
};

onMounted(() => {
  // @ts-ignore
  form.value.setValidateMessage(rules);
});
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.textarea {
  height: 100px;
  width: 100%;
}
.button-group {
  background-color: #fff;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 0.5px solid #e7e7e7;

  .t-button {
    height: 32px;
    flex: 1;

    &:not(:last-child) {
      flex: 1;
      margin-right: 16px;
    }
  }
}
</style>
