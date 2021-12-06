<template>
  <t-popup v-model="open" position="left">
    <div :class="dSideBarClassName">
      <div v-for="item in sidebar" :key="item.name" :class="dSideBarItemClassName" @click="takePath(item.path)">
        <t-node :content="computedIcon"></t-node>
        <div :class="dSideBarItemNameClassName">{{ item.name }}</div>
      </div>
    </div>
  </t-popup>
</template>

<script lang="ts">
import { ref, watch, toRefs, computed, PropType, SetupContext, defineComponent, getCurrentInstance } from 'vue';
import config from '../config';
import { SidebarItem } from './drawer.interface';
import { TNode, renderTNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-drawer`;

export default defineComponent({
  name,
  components: { TNode },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    sidebar: {
      type: Array as PropType<SidebarItem[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, context: SetupContext) {
    const internalInstance = getCurrentInstance();
    const { modelValue } = toRefs(props);
    const open = ref(false) || modelValue;

    const dSideBarClassName = computed(() => `${name}__sidebar`);
    const dSideBarItemClassName = computed(() => `${name}__sidebar-item`);
    const dSideBarItemIconClassName = computed(() => `${name}__sidebar-item-icon`);
    const dSideBarItemNameClassName = computed(() => `${name}__sidebar-item-name`);

    const takePath = (path: string) => {
      if (path) {
        window.location.href = path;
      }
    };
    const computedIcon = renderTNode(internalInstance, 'icon');
    watch(open, () => {
      context.emit('update:modelValue', open.value);
    });
    watch(modelValue, () => {
      open.value = modelValue.value;
    });

    return {
      open,
      takePath,
      computedIcon,
      dSideBarClassName,
      dSideBarItemClassName,
      dSideBarItemIconClassName,
      dSideBarItemNameClassName,
    };
  },
});
</script>
