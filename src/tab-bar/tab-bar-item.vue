<template>
  <div :class="componentName">
    <div
      :class="[`${componentName}__content`, isChecked && 'is-checked', icon && 's']"
      @click="toggle(currentName)"
    >
      <div :class="`${componentName}__icon`" v-if="icon">
        <t-icon :name="icon"></t-icon>
      </div>
      <div :class="`${componentName}__text`">
        <div :class="`${componentName}__icon-menu`" v-if="children"></div>
        <slot/>
      </div>
    </div>

    <transition name="spread">
      <ul :class="[`${componentName}__spread`]" v-if="children && isSpread">
        <li
          :class="[`${componentName}__spread-item`]"
          v-for="(child, index) in children"
          :key="child.name || index"
          @click="selectChild(child.name || index)"
        >{{ child.text }}</li>
      </ul>
    </transition>
  </div>

</template>

<script lang='ts'>
import { defineComponent, inject, computed, ref, watch } from 'vue';
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
    name: [Number, String],
    icon: String,
    children: Array,
  },
  setup(props) {
    const { defaultIndex, activeValue, updateChild } = inject('tab-bar', {});
    const currentName:number | string = initName(defaultIndex);
    const hasChildren = !!props.children;
    const isSpread:ref<boolean> = ref(false);

    const isChecked = computed(() => {
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
        if (!isToggleCurrent) {
          updateChild([currentName]);
        }
      };
      updateChild(currentName);
    };

    const selectChild = (childName) => {
      if (!(
        Array.isArray(activeValue.value)
        && activeValue.value[1] === childName
      )) {
        updateChild([currentName, childName]);
      }
      isSpread.value = false;
    };

    return {
      componentName,
      isChecked,
      toggle,
      isSpread,
      selectChild,
    };
  },
});
</script>
