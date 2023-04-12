<template>
  <div>
    <div class="summary">圆形徽标</div>
    <div class="badge-demo">
      <t-badge count="2" :offset="[-2, -2]">
        <t-icon name="notification" size="24" aria-label="通知" />
      </t-badge>
    </div>

    <div class="summary">方形徽标</div>
    <div class="badge-demo">
      <t-badge count="2" shape="square" :offset="[-2, -2]">
        <t-icon name="notification" size="24" aria-label="通知" />
      </t-badge>
    </div>

    <div class="summary">气泡徽标</div>
    <div class="badge-demo">
      <t-badge count="领积分" shape="bubble" aria-role="button">
        <t-button :icon="IconShop" aria-label="商店" shape="square" size="large" />
      </t-badge>
    </div>

    <div class="summary" style="margin-bottom: 16px">角标</div>
    <t-cell title="单行标题">
      <template #note>
        <t-badge count="New" :offset="[0, 0]" shape="ribbon" />
      </template>
    </t-cell>
  </div>
</template>

<script setup lang="ts">
import { Icon as TIcon, ShopIcon } from 'tdesign-icons-vue-next';
import { h } from 'vue';

const IconShop = () => h(ShopIcon);
</script>
