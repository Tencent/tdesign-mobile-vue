<template>
  <div>
    <div class="summary">红点徽标</div>
    <div class="badge-demo">
      <t-badge dot :offset="[-4, 4]" class="badge-item" content="消息" />
      <t-badge dot :offset="[1, -1]" class="badge-item">
        <t-icon name="notification" size="24" aria-label="通知" />
      </t-badge>
      <t-badge dot :offset="[1, 1]" class="badge-item">
        <t-button>按钮123</t-button>
      </t-badge>
    </div>

    <div class="summary">数字徽标</div>
    <div class="badge-demo">
      <t-badge count="8" content="消息" :offset="[-8, 0]" class="badge-item" />
      <t-badge count="2" :offset="[-2, -2]" class="badge-item">
        <t-icon name="notification" size="24" aria-label="通知" />
      </t-badge>
      <t-badge count="8" :offset="[2, 2]" class="badge-item">
        <t-button>按钮</t-button>
      </t-badge>
    </div>

    <div class="summary">自定义徽标</div>
    <div class="badge-demo">
      <t-badge count="NEW" :offset="[0, 2]" aria-role="button">
        <t-button :icon="IconNotification" aria-label="通知" shape="square" size="large" />
      </t-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon as TIcon, NotificationIcon } from 'tdesign-icons-vue-next';
import { h } from 'vue';

const IconNotification = () => h(NotificationIcon);
</script>
<style lang="less">
.badge-demo {
  color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
}
</style>
