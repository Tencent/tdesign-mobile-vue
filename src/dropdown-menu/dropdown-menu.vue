<template>
  <div :class="classes">
    <div :class="styleBar">
      <div :class="styleBarItem(item)" v-for="item in list" :key="item" @click="expandMenu">
        <div :class="`${name}__title`">{{item.title}}</div>
      </div>
    </div>
    <dropdown-item />
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref, reactive } from 'vue';

import DropdownItem from './dropdown-item.vue';

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
  components: {
    DropdownItem,
  },
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
  setup(props: DropdownMenuProps) {
    const barStatus = reactive({
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
      ...toRefs(barStatus),
    };
  },
};
</script>
