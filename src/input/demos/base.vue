<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Input 输入框</h1>
    <p class="summary">空状态时的占位提示。</p>
    <tdesign-demo-block title="01 类型" summary="基础文本框">
      <t-input label="标签文字" placeholder="请输入文字"></t-input>
    </tdesign-demo-block>
    <tdesign-demo-block summary="无文本输入框">
      <t-input placeholder="请输入文字" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带提示信息文本框">
      <t-input v-model="text" label="标准五个字" placeholder="预设文本(非必填)">
        <template #rightIcon>
          <icon name="help-circle-filled" />
        </template>
      </t-input>
    </tdesign-demo-block>
    <tdesign-demo-block summary="长标题文本框">
      <t-input label="一个很长的标题需换行" placeholder="预设文本保持上下居中"> </t-input>
    </tdesign-demo-block>
    <tdesign-demo-block summary="长文本输入框">
      <t-input type="textarea" placeholder="长文本预设内容，文本默认容纳四行" />
      <t-input label="标题文字" type="textarea" placeholder="长文本预设内容，文本默认容纳四行" />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="文本框状态">
      <t-cell-group style="margin-top: 16px">
        <t-input v-model="text1" label="标签文字"></t-input>
        <!-- <t-input v-model="text3" label="未填写警告" placeholder="警告文本" :error="text3.length === 0" /> -->
        <t-input v-model="text1" label="填写错误" error-message="提示信息" />
        <t-input v-model="text2" label="不可编辑" disabled />
      </t-cell-group>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 特殊类型" summary="特殊文本框类型">
      <t-input v-model="passwd" label="密码" type="password" clearable />
      <t-input label="验证码" placeholder="输入验证码">
        <template #suffix>
          <div>XYDZ</div>
        </template>
      </t-input>
      <t-input placeholder="请输入手机号码">
        <template #suffix>
          <t-button theme="primary" variant="text" size="small">发送验证码</t-button>
        </template>
      </t-input>
      <t-input label="价格" placeholder="0.00" suffix="元" />
      <t-input label="个数" placeholder="填写个数" suffix="个" />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { Icon } from 'tdesign-icons-vue-next';
import { reactive, toRefs, defineComponent } from 'vue';

export default defineComponent({
  components: { Icon },
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
