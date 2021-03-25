<template>
  <t-popup v-model="open" position="left">
    <div :class="dSideBarClassName">
      <div v-for="item in sidebar" :key="item.name" :class="dSideBarItemClassName" @click="takePath(item.path)">
        <template v-if="item.icon">
          <img v-if="typeof item.icon === 'string'" :src="item.icon" :class="dSideBarItemIconClassName" />
          <component :is="computedIcon(item.icon)" v-else></component>
        </template>
        <div :class="dSideBarItemNameClassName">{{ item.name }}</div>
      </div>
    </div>
  </t-popup>
</template>

<script lang="ts">
import { TNode } from '@/shared';
import { ref, watch, toRefs, computed, PropType, SetupContext, defineComponent } from 'vue';
import config from '../config';
import { SidebarItemType } from './drawer.interface';

const { prefix } = config;
const name = `${prefix}-drawer`;

export default defineComponent({
  name,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Function as PropType<SidebarItemType['icon']>,
      default: undefined,
    },
    sidebar: {
      type: Array as PropType<SidebarItemType[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, context: SetupContext) {
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
    const computedIcon = (icon: TNode) => {
      if (typeof icon === 'function') {
        return icon();
      }
      if (typeof icon === 'string') {
        return icon;
      }
      return context.slots?.icon;
    };
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
