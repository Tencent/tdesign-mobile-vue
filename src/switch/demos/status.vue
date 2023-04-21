<template>
  <t-cell title="加载状态">
    <template #rightIcon>
      <t-switch loading />
    </template>
  </t-cell>

  <t-cell title="加载状态">
    <template #rightIcon>
      <t-switch loading :default-value="true" />
    </template>
  </t-cell>

  <div class="demo__title">禁用状态</div>

  <t-cell title="禁用状态">
    <template #rightIcon>
      <t-switch disabled />
    </template>
  </t-cell>

  <t-cell title="禁用状态">
    <template #rightIcon>
      <t-switch disabled :value="true" />
    </template>
  </t-cell>
</template>

<style>
.t-cell + .t-cell {
  margin-top: 16px;
}

.demo__title {
  margin: 24px 16px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  line-height: 22px;
}
</style>
