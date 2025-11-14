<template>
  <t-input :clearable="false" default-value="520 TDesign" label="输入密码" type="password"></t-input>
  <t-input label="验证码" placeholder="输入验证码">
    <template #suffix>
      <div class="suffix">
        <div class="suffix--line"></div>
        <t-image
          aria-label="验证码"
          aria-role="img"
          class="image"
          mode="heightFix"
          src="https://wwcdn.weixin.qq.com/node/wework/images/202010241547.ac6876be9c.png"
        />
      </div>
    </template>
  </t-input>
  <t-input v-model="phoneNumber" :tips="tips" label="手机号" placeholder="输入手机号码">
    <template #suffix>
      <div class="suffix">
        <div class="suffix--line"></div>
        <t-button size="extra-small" theme="primary" variant="text">发送验证码</t-button>
      </div>
    </template>
  </t-input>
  <t-input align="right" label="价格" placeholder="0.00" suffix="元" type="number" />
  <t-input align="right" label="数量" placeholder="填写个数" suffix="个" type="number" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const phoneNumber = ref('17600600600');

const isPhoneNumber = computed(() => {
  if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(phoneNumber.value)) {
    return '';
  }
  return 'error';
});

const tips = computed(() => {
  if (!isPhoneNumber.value) {
    return '';
  }
  return '手机号输入不正确';
});
</script>

<style lang="less">
.suffix {
  display: flex;
  align-items: center;

  --td-button-extra-small-padding-horizontal: 0;
}

.suffix--line {
  width: 1px;
  height: 24px;
  background-color: #f6f6f6;
  margin-right: 16px;
}

.image {
  width: 72px;
  height: 36px;
  display: block;
  margin-top: -6px;
  margin-bottom: -6px;
}

.verify {
  color: rgba(0, 82, 217, 1);
  font-size: 16px;
}
</style>
