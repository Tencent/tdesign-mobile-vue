<template>
  <t-cell-group bordered>
    <t-cell title="单行标题" arrow hover />
    <t-cell title="单行标题" arrow hover required />
    <t-cell title="单行标题" arrow hover>
      <template #note>
        <t-badge :count="16" />
      </template>
    </t-cell>
    <t-cell title="单行标题" hover>
      <template #note>
        <t-switch :default-value="true" />
      </template>
    </t-cell>
    <t-cell title="单行标题" note="辅助信息" arrow hover />
    <t-cell title="单行标题" :left-icon="appIcon" arrow hover />
  </t-cell-group>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import { Switch as TSwitch, Badge as TBadge } from 'tdesign-mobile-vue';

const appIcon = () => h(AppIcon);
</script>
