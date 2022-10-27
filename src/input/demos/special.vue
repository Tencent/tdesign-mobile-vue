<template>
  <t-cell-group>
    <t-input v-model="password" label="输入密码" type="password" clearable />
  </t-cell-group>
  <t-cell-group>
    <t-input label="验证码" placeholder="输入验证码">
      <template #suffix>
        <div style="font-size: 16px">XYDZ</div>
      </template>
    </t-input>
  </t-cell-group>
  <t-cell-group>
    <t-input placeholder="请输入手机号码">
      <template #suffix>
        <t-button theme="primary" variant="text" size="small" style="height: 24px; padding: 0">发送验证码</t-button>
      </template>
    </t-input>
  </t-cell-group>
  <t-cell-group>
    <t-input label="价格" align="right" placeholder="0.00" suffix="元" />
  </t-cell-group>
  <t-cell-group>
    <t-input label="数量" align="right" placeholder="填写个数" suffix="个" />
  </t-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const password = ref('12345678');
</script>

<style scoped lang="less">
.t-cell-group + .t-cell-group {
  margin-top: 16px;
}
</style>
