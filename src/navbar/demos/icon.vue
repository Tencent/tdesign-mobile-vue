<template>
  <div>
    <div class="tdesign-demo-block">
      <t-navbar title="导航栏 - 带icon" left-icon home-icon>
        <template #right-icon>
          <ellipsis-icon />
        </template>
      </t-navbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EllipsisIcon } from 'tdesign-icons-vue-next';
</script>
