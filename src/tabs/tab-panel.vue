<template>
  <div v-if="destroyOnHide || isActive" v-show="isActive" :class="tabPanelClass" :value="value">
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
const name = `${prefix}-tab-panel`;

export default defineComponent({
  name,
  components: { TNode },
  props: TabPanelProps,
  setup(props) {
    const currentValue = inject('currentValue', '') as unknown as Ref<string>;
    const isActive = computed(() => currentValue.value === props.value);
    const internalInstance = getCurrentInstance();
    const panelContent = computed(() => renderContent(internalInstance, 'default', 'panel'));
    const tabPanelClass = computed(() => [`${name}`, `${prefix}-tabs__panel`]);
    return {
      prefix,
      name,
      isActive,
      panelContent,
      tabPanelClass,
      ...toRefs(props),
    };
  },
});
</script>
