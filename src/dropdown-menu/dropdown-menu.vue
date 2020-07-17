<template>
  <div :class="classes">
    <div :class="styleBar">
      <div :class="styleBarItem(item)" v-for="item in items" :key="item" @click="expandMenu">
        <div :class="`${name}__title`">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref, reactive } from 'vue';

import config from '../config';
const { prefix } = config;
const name = `${prefix}-dropdown-menu`;
const barName = `${prefix}-dropdown__bar`;

interface DropdownMenuProps {
  activeColor?: string,
  zIndex: number,
  duration: number,
  overlay: boolean,
  closeOnClickOverlay: boolean,
}
export default {
  name,
  props: {
    activeColor: String,
    zIndex: {
      type: Number,
      default: 10,
    },
    duration: {
      type: Number,
      default: 300,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
  },
  setup(props: DropdownMenuProps, { slots }) {
    const children = slots.default();
    const items = children
      .filter(vn => vn.type === `${prefix}-dropdown-item`)
      .map(vn => ({ ...vn.props }));
    const state = reactive({
      items,
      currentActive: null,
    });
    const classes = computed(() => [
      `${name}`,
    ]);
    const styleBar = computed(() => {
      // if (props.showMenu) return `${name}__bar ${name}__bar--open`;
      return `${name}__bar`;
    });
    const styleBarItem = computed(() => (item: any) => [
      `${name}__item`,
      {
        [`${prefix}-is-disabled`]: item.disabled,
        // [`${prefix}-is-active`]: item.barActive,
      },
    ]);
    return {
      name: ref(name),
      classes,
      styleBar,
      barName,
      styleBarItem,
      ...toRefs(props),
      ...toRefs(state),
    };
  },
};
</script>
