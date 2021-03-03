<template>
  <t-popup v-model="open" position="left">
    <div :class="dSideBarClassName">
      <div v-for="item in sidebar" :key="item.name" :class="dSideBarItemClassName" @click="takePath(item.path)">
        <div v-if="showIcon">
          <img v-if="item.iconImg" :src="item.iconImg" :class="dSideBarItemIconClassName">
          <t-icon v-if="item.iconName" :name="item.iconName" :class="dSideBarItemIconClassName"/>
        </div>
        <div :class="dSideBarItemNameClassName">{{item.name}}</div>
      </div>
    </div>
  </t-popup>
</template>

<script lang="ts">
import {
  ref,
  watch,
  toRefs,
  computed,
  PropType,
  SetupContext,
  defineComponent,
} from 'vue';
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
    showIcon: {
      type: Boolean,
      default: false,
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
      window.location.href = path;
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
      dSideBarClassName,
      dSideBarItemClassName,
      dSideBarItemIconClassName,
      dSideBarItemNameClassName,
    };
  },
});
</script>
