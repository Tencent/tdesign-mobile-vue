<template>
  <div>
    <div class="tdesign-demo-block">
      <t-navbar>
        导航栏 - 带icon
        <template #right>
          <sound-icon></sound-icon>
        </template>
      </t-navbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SoundIcon } from 'tdesign-icons-vue-next';
</script>
