<template>
  <div class="pure-text-demo">
    <t-loading :indicator="false" text="加载中..." />
    <t-loading theme="error" />
    <t-loading :indicator="false">
      <div class="custom-error">
        加载失败
        <span>刷新</span>
      </div>
    </t-loading>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.pure-text-demo {
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(3, auto);
}
.custom-error {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  > span {
    color: rgba(0, 82, 217, 1);
    cursor: pointer;
  }
}
</style>
