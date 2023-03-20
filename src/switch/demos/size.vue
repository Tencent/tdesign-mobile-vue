<template>
  <t-cell title="大尺寸 32">
    <template #rightIcon>
      <t-switch size="large" :default-value="true" />
    </template>
  </t-cell>
  <t-cell title="中尺寸 28">
    <template #rightIcon>
      <t-switch :default-value="true" />
    </template>
  </t-cell>
  <t-cell title="小尺寸 24">
    <template #rightIcon>
      <t-switch :default-value="true" size="small" />
    </template>
  </t-cell>
</template>

<style scoped>
.t-cell + .t-cell {
  margin-top: 16px;
}
</style>
