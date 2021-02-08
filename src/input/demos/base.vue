<template>
  <div style="padding-bottom: 20px">
    <t-cell-group title="基础输入框">
      <t-input v-model="text" label="标准五个字" placeholder="预设文本(非必填)" right-icon="circle_help" />
      <t-input label="一个很长的标题需换行" placeholder="预设文本保持上下居中">
        <template #rightIcon>
          <t-icon name="circle_info" />
        </template>
      </t-input>
      <t-input placeholder="无标题预设文本" />
      <t-input v-model="text3" label="未填写警告" placeholder="警告文本" :error="text3.length === 0" />
      <t-input v-model="text1" label="填写错误" error-message="提示信息" />
      <t-input v-model="text2" label="不可编辑" disabled />
    </t-cell-group>
    <t-cell-group title="特殊输入框">
      <t-input v-model="passwd" label="密码" type="password" clearable />
      <t-input label="验证码" placeholder="输入验证码">
        <template #suffix>
          <div>XYDZ</div>
        </template>
      </t-input>
      <t-input placeholder="请输入手机号码">
        <template #suffix>
          <t-button theme="default">发送验证码</t-button>
        </template>
      </t-input>
      <t-input label="价格" placeholder="0.00" suffix="元" />
      <t-input label="个数" placeholder="填写个数" suffix="个" />
    </t-cell-group>
    <t-cell-group title="长文本输入框">
      <t-input type="textarea" placeholder="长文本预设内容，文本默认容纳四行" />
    </t-cell-group>
    <t-cell-group>
      <t-input label="标题文字" type="textarea" placeholder="长文本预设内容，文本默认容纳四行" />
    </t-cell-group>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const state = reactive({
      text: '',
      text1: '一段错误填写的内容',
      text2: '不可编辑的内容',
      text3: '',
      passwd: '12345678',
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
