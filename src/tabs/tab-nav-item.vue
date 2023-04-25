<template>
  <div>
    <t-badge v-bind="badgeProps">
      <t-node :content="labelContent"></t-node>
    </t-badge>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue';
import { renderContent, renderTNode, TNode } from '../shared';
import config from '../config';
import TabPanelProps from './tab-panel-props';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-tab-nav`,
  components: { TNode },
  props: {
    label: TabPanelProps.label,
    badgeProps: TabPanelProps.badgeProps,
  },
  setup(props) {
    const internalInstance = getCurrentInstance();
    const labelContent = computed(() => renderContent(internalInstance, 'default', 'label'));
    return {
      labelContent,
    };
  },
});
</script>
