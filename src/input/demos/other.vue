<template>
  <div>
    <t-cell-group title="特殊输入框">
      <t-input v-model="passwd" label="密码" type="password" clearable />
      <t-input label="验证码" placeholder="输入验证码" >
        <template #suffix>
          <div>XYDZ</div>
        </template>
      </t-input>
      <t-input placeholder="请输入手机号码">
        <template #suffix>
          <t-button variant="text">发送验证码</t-button>
        </template>
      </t-input>
      <t-input label="价格" placeholder="0.00" suffix="元" />
      <t-input label="个数" placeholder="填写个数"  suffix="个" />
    </t-cell-group>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const passwd = ref('12345678');
    return {
      passwd
    };
  },
});
</script>
