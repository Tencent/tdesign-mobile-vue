<template>
  <div>
    <div class="summary">Large</div>
    <div class="block">
      <t-avatar icon="user" size="large" :badge-props="{ count: 8, size: 'large', offset: [7, 7] }" />
    </div>

    <div class="summary">Middle</div>
    <div class="block">
      <t-avatar icon="user" :badge-props="{ count: 8, offset: [5, 5] }" />
    </div>
  </div>
</template>

<style>
.block {
  padding: 16px 16px 24px;
}
</style>
