<template>
  <t-cell-group bordered>
    <t-cell title="单行标题" arrow />
    <t-cell title="单行标题" arrow required />
    <t-cell title="单行标题" arrow>
      <template #note>
        <t-badge :count="16" />
      </template>
    </t-cell>
    <t-cell title="单行标题">
      <template #note>
        <t-switch :default-value="true" />
      </template>
    </t-cell>
    <t-cell title="单行标题" note="辅助信息" arrow />
    <t-cell title="单行标题" :left-icon="lockIcon" arrow />
  </t-cell-group>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { LockOnIcon } from 'tdesign-icons-vue-next';
import { Switch as TSwitch, Badge as TBadge } from 'tdesign-mobile-vue';

const lockIcon = () => h(LockOnIcon);
</script>
