<template>
  <div class="tdesign-mobile-demo">
    <div class="summary">红点徽标</div>
    <div class="badge-demo">
      <t-badge dot :offset="[-4, 4]" class="badge-item" content="消息" />
      <t-badge dot :offset="[1, -1]" class="badge-item">
        <t-icon name="notification" size="24" ariaLabel="通知" />
      </t-badge>
      <t-badge dot :offset="[1, 1]" class="badge-item">
        <t-button>按钮</t-button>
      </t-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon as TIcon } from 'tdesign-icons-vue-next';
</script>
