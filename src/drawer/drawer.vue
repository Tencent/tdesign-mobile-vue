<template>
  <t-popup v-model="open" position="left">
    <div :class="dSideBarClassName">
      <div v-for="item in sidebar" :key="item.name" :class="dSideBarItemClassName" @click="takePath(item.path)">
        <component :is="computedIcon(item.icon)" v-if="item.icon" :img="item.icon"></component>
        <div :class="dSideBarItemNameClassName">{{ item.name }}</div>
      </div>
    </div>
  </t-popup>
</template>

<script lang="ts">
import { TNode } from '@/shared';
import { ref, watch, toRefs, computed, PropType, SetupContext, defineComponent } from 'vue';
import config from '../config';
import { SidebarItem } from './drawer.interface';
import ImgIcon from './imageIcon.vue';

const { prefix } = config;
const name = `${prefix}-drawer`;

export default defineComponent({
  name,
  components: { ImgIcon },
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
      if (!!context.slots.icon) {
        return context.slots.icon;
      }
      if (typeof icon === 'string') {
        return ImgIcon;
      }
      return undefined;
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
