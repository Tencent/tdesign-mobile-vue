<template>
  <t-input label="标签文字" placeholder="请输入文字">
    <template #suffixIcon>
      <info-circle-filled-icon />
    </template>
  </t-input>
  <t-input label="标签文字" placeholder="请输入手机号码">
    <template #suffix>
      <t-button theme="primary" size="extra-small"> 操作按钮 </t-button>
    </template>
  </t-input>
  <t-input label="标签文字" placeholder="请输入文字">
    <template #suffixIcon>
      <user-avatar-icon />
    </template>
  </t-input>
</template>

<script lang="ts" setup>
import { InfoCircleFilledIcon, UserAvatarIcon } from 'tdesign-icons-vue-next';
</script>
