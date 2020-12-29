<template>
  <t-popup v-model="open" position="left">
    <div :class="dSideBarClassName">
      <div v-for="item in sidebar" :key="item.name" :class="dSideBarItemClassName" @click="takePath(item.path)">
        <div v-if="showIcon">
          <img :src="item.iconImg" :class="dSideBarItemIconClassName" v-if="item.iconImg">
          <t-icon :name="item.iconName" :class="dSideBarItemIconClassName" v-if="item.iconName"/>
        </div>
        <div :class="dSideBarItemNameClassName">{{item.name}}</div>
      </div>
    </div>
  </t-popup>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  watch,
  toRefs,
  ref,
  computed,
} from 'vue';
import config from '../config';

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
      type: Array,
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
      dSideBarClassName,
      dSideBarItemClassName,
      dSideBarItemIconClassName,
      dSideBarItemNameClassName,
      takePath,
      open,
    };
  },
});
</script>
