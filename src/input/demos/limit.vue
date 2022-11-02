<template>
  <t-cell-group>
    <t-input placeholder="最大输入10个字符" :maxlength="10" />
  </t-cell-group>
  <t-cell-group>
    <t-input placeholder="最大输入10个字符，汉字算两个" :maxcharacter="10" />
  </t-cell-group>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.t-cell-group + .t-cell-group {
  margin-top: 16px;
}
</style>
