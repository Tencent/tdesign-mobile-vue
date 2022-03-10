<template>
  <div>
    <div class="tdesign-demo-block">
      <t-back-top v-show="showBackTop" theme="half-round-dark" />
      <t-back-top v-show="showBackTop" text="顶部">
        <template #icon>
          <div>图标</div>
        </template>
      </t-back-top>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped></style>
