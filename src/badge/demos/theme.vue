<template>
  <div>
    <div class="summary">圆形徽标</div>
    <div class="badge-demo">
      <t-badge count="8" :offset="[2, -2]">
        <NotificationIcon size="24px" />
      </t-badge>
    </div>

    <div class="summary">方形徽标</div>
    <div class="badge-demo">
      <t-badge count="8" shape="square" :offset="[1, -2]">
        <NotificationIcon size="24px" />
      </t-badge>
    </div>

    <div class="summary">气泡徽标</div>
    <div class="badge-demo">
      <t-badge count="领取积分" shape="bubble" aria-role="button">
        <t-button :icon="IconShop" aria-label="商店" shape="square" size="large" />
      </t-badge>
    </div>

    <div class="summary" style="margin-bottom: 16px">角标</div>
    <t-cell title="单行标题">
      <template #note>
        <t-badge count="NEW" :offset="[0, 0]" shape="ribbon-left" />
      </template>
    </t-cell>
    <t-cell title="单行标题">
      <template #note>
        <t-badge count="NEW" :offset="[0, 0]" shape="ribbon" />
      </template>
    </t-cell>

    <div class="summary" style="margin-bottom: 16px">三角角标</div>
    <t-cell title="单行标题">
      <template #note>
        <t-badge count="NEW" :offset="[0, 0]" shape="triangle-left" />
      </template>
    </t-cell>
    <t-cell title="单行标题">
      <template #note>
        <t-badge count="NEW" :offset="[0, 0]" shape="triangle-right" />
      </template>
    </t-cell>
  </div>
</template>

<script setup lang="ts">
import { ShopIcon, NotificationIcon } from 'tdesign-icons-vue-next';
import { h } from 'vue';

const IconShop = () => h(ShopIcon, { size: '24px' });
</script>
