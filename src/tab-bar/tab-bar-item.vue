<template>
  <div :class="componentName">
    <div
      :class="{
        [`${componentName}__content`]: true,
        [`${prefix}-is-checked`]: isChecked,
        [`${prefix}-size-s`]: icon,
      }"
      @click="toggle"
    >
      <div v-if="icon" :class="`${componentName}__icon`">
        <t-icon :name="icon"></t-icon>
      </div>
      <div :class="`${componentName}__text`">
        <div v-if="children" :class="`${componentName}__icon-menu`"></div>
        <slot/>
      </div>
    </div>

    <transition name="spread">
      <ul v-if="children && isSpread" :class="[`${componentName}__spread`]">
        <li
          v-for="(child, index) in children"
          :key="child.name || index"
          :class="[`${componentName}__spread-item`]"
          @click="selectChild(child.name || index)"
        >{{ child.text }}</li>
      </ul>
    </transition>
  </div>

</template>

<script lang='ts'>
import { defineComponent, inject, computed, ref, watch, Ref, ComputedRef } from 'vue';
import TIcon from '../icon';
import config from '../config';
import { initName } from './useTabBar';
const { prefix } = config;
const componentName = `${prefix}-tab-bar-item`;

export default defineComponent({
  name: componentName,
  components: {
    [TIcon.name]: TIcon,
  },
  props: {
    name: {
      type: [Number, String],
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    children: {
      type: Array,
      default: () => [],
    }
  },
  setup(props) {
    const { defaultIndex, activeValue, updateChild } = inject<any>('tab-bar');
    const currentName = initName(defaultIndex);
    const hasChildren = !!props.children;
    const isSpread:Ref<boolean> = ref(false);

    const isChecked: ComputedRef<boolean> = computed(() => {
      if (hasChildren && Array.isArray(activeValue.value)) {
        return activeValue.value.includes(currentName);
      };
      return currentName === activeValue.value;
    });

    watch(isChecked, (newValue) => {
      !newValue && (isSpread.value = false);
    });

    const isToggleCurrent = computed(() => Array.isArray(activeValue.value) && activeValue.value[0] === currentName);

    const toggle = () => {
      if (hasChildren) {
        isSpread.value = !isSpread.value;
        if (!isToggleCurrent.value) {
          updateChild([currentName]);
        }
      };
      updateChild(currentName);
    };

    const selectChild = (childName: number | string) => {
      if (!(
        Array.isArray(activeValue.value)
        && activeValue.value[1] === childName
      )) {
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
