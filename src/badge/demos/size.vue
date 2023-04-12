<template>
  <div>
    <div class="summary">Large</div>
    <div class="block">
      <t-avatar :icon="IconUser" size="large" :badge-props="{ count: 8, size: 'large', offset: [7, 7] }" />
    </div>

    <div class="summary">Middle</div>
    <div class="block">
      <t-avatar :icon="IconUser" :badge-props="{ count: 8, offset: [5, 5] }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserIcon } from 'tdesign-icons-vue-next';
import { h } from 'vue';

const IconUser = () => h(UserIcon);
</script>

<style>
.block {
  padding: 16px 16px 24px;
}
</style>
