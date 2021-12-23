<template>
  <div v-if="destroyOnHide || isActive" v-show="isActive" :class="`${prefix}-tabs__panel`" :value="value">
    <slot>
      <t-node :content="panelContent"></t-node>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRefs, Ref, computed, getCurrentInstance } from 'vue';
import { renderContent, renderTNode, TNode } from '../shared';
import config from '../config';
import TabPanelProps from './tab-panel-props';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-tab-panel`,
  components: { TNode },
  props: TabPanelProps,
  setup(props) {
    const currentValue = inject('currentValue', '') as unknown as Ref<string>;
    const isActive = computed(() => currentValue.value === props.value);
    const internalInstance = getCurrentInstance();
    const panelContent = computed(() => renderContent(internalInstance, 'default', 'panel'));
    return {
      prefix,
      isActive,
      panelContent,
      ...toRefs(props),
    };
  },
});
</script>
