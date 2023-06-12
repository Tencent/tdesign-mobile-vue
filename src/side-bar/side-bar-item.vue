<template>
  <div :class="rootClassName" @click="onClick">
    <div v-if="isActive">
      <div :class="`${name}__line`"></div>
      <div :class="`${name}__prefix`"></div>
      <div :class="`${name}__suffix`"></div>
    </div>
    <div v-if="iconNode" :class="`${name}__icon`">
      <t-node :content="iconNode"></t-node>
    </div>
    <t-badge v-if="badgeProps" v-bind="badgeProps" :content="label"> </t-badge>
    <div v-else>{{ label }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance, computed, inject, onUnmounted } from 'vue';
import { renderTNode, TNode } from '../shared';
import SideBarItemProps from './side-bar-item-props';

import config from '../config';

const { prefix } = config;
const name = `${prefix}-side-bar-item`;

export default defineComponent({
  name,
  components: { TNode },
  props: SideBarItemProps,
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const { proxy } = internalInstance as ComponentInternalInstance;
    const sideBarProvide: any = inject('sideBarProvide', undefined);
    sideBarProvide.relation(proxy);

    const index = computed(() => sideBarProvide.state.children.indexOf(proxy));

    const iconNode = computed(() => renderTNode(internalInstance, 'icon'));
    const isActive = computed(() => index.value === sideBarProvide.currentValue.value);

    const rootClassName = computed(() => [
      name,
      { [`${name}--active`]: isActive.value },
      { [`${name}--disabled`]: props.disabled },
    ]);

    const onClick = (e: MouseEvent) => {
      sideBarProvide.onClickItem(index.value, props.label);
    };

    onUnmounted(() => {
      sideBarProvide.removeRelation(proxy);
    });

    return {
      name,
      rootClassName,
      isActive,
      iconNode,
      onClick,
    };
  },
});
</script>
