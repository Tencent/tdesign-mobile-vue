<template>
  <div :class="[componentName, (icon || $slots.icon) && `${prefix}-no-border`]">
    <div
      :class="{
        [`${componentName}__content`]: true,
        [`${prefix}-is-checked`]: isChecked,
        [`${prefix}-size-s`]: icon || $slots.icon,
      }"
      @click="toggle"
    >
      <slot v-if="$slots.icon" name="icon" :is-checked="isChecked" />
      <div v-else-if="typeof icon === 'function'" :class="`${componentName}__icon`">
        <component :is="icon()"></component>
      </div>

      <div :class="`${componentName}__text`">
        <div v-if="children && children.length > 0" :class="`${componentName}__icon-menu`"></div>
        <slot />
      </div>
    </div>

    <transition name="spread">
      <ul v-if="children && children.length > 0 && isSpread" :class="`${componentName}__spread`">
        <li
          v-for="(child, index) in children"
          :key="child.name || index"
          :class="`${componentName}__spread-item`"
          @click="selectChild(child.name || index)"
        >
          {{ child.text }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref, watch, Ref, ComputedRef, PropType } from 'vue';
import config from '../config';
import { initName } from './useTabBar';
import { TabBarItemSpreadProps } from './tab-bar.interface';

const { prefix } = config;
const componentName = `${prefix}-tab-bar-item`;

export default defineComponent({
  name: componentName,
  props: {
    name: {
      type: [Number, String],
      default: '',
    },
    icon: {
      type: Function,
      default: undefined,
    },
    children: {
      type: Array as PropType<TabBarItemSpreadProps[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { defaultIndex, activeValue, updateChild } = inject<any>('tab-bar');
    const currentName = initName(defaultIndex);
    const hasChildren = !!props.children;
    const isSpread: Ref<boolean> = ref(false);

    const isChecked: ComputedRef<boolean> = computed(() => {
      if (hasChildren && Array.isArray(activeValue.value)) {
        return activeValue.value.includes(currentName);
      }
      return currentName === activeValue.value;
    });

    watch(isChecked, (newValue) => {
      if (!newValue) {
        isSpread.value = false;
      }
    });

    const isToggleCurrent = computed(() => Array.isArray(activeValue.value) && activeValue.value[0] === currentName);

    const toggle = () => {
      if (hasChildren) {
        isSpread.value = !isSpread.value;
        if (!isToggleCurrent.value) {
          updateChild([currentName]);
        }
      }
      updateChild(currentName);
    };

    const selectChild = (childName: number | string) => {
      if (!(Array.isArray(activeValue.value) && activeValue.value[1] === childName)) {
        updateChild([currentName, childName]);
      }
      isSpread.value = false;
    };

    return {
      prefix,
      componentName,
      isChecked,
      toggle,
      isSpread,
      selectChild,
    };
  },
});
</script>
