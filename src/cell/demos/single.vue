<template>
  <div>
    <t-cell-group bordered>
      <t-cell title="单行标题" @click="onClick" />
      <t-cell title="单行标题" required />
      <t-cell title="单行标题" note="辅助信息"></t-cell>
      <t-cell title="单行标题" arrow></t-cell>
      <t-cell title="单行标题" note="辅助信息" :right-icon="chevronRightIcon"></t-cell>
      <t-cell title="单行标题" arrow>
        <template #note>
          <t-badge :count="2"></t-badge>
        </template>
      </t-cell>
      <t-cell title="单行标题">
        <template #note>
          <t-switch :default-value="true"></t-switch>
        </template>
      </t-cell>
      <t-cell title="单行标题" :left-icon="appIcon" />
    </t-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { ChevronRightIcon, AppIcon } from 'tdesign-icons-vue-next';
import TSwitch from '../../switch';
import TBadge from '../../badge';
import Message from '../../message';

const onClick = () => {
  Message.info('cell click');
};
const chevronRightIcon = () => h(ChevronRightIcon);
const appIcon = () => h(AppIcon);
</script>
