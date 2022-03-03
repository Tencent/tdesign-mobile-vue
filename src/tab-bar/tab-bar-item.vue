<template>
  <div
    role="tab"
    aria-label="TabBar"
    :aria-selected="isChecked"
    :aria-haspopup="subTabBar && subTabBar.length > 0"
    :class="[componentName, iconContent && `${prefix}-no-border`]"
  >
    <div
      :class="{
        [`${componentName}__content`]: true,
        [`${prefix}-is-checked`]: isChecked,
        [`${componentName}--onlytext`]: !iconContent,
      }"
      @click="toggle"
    >
      <div v-if="iconContent" :class="`${componentName}__icon`">
        <t-badge
          v-if="badgeProps && (badgeProps.dot || badgeProps.count)"
          :count="badgeProps.count"
          :max-count="badgeProps.maxCount || 99"
          :dot="badgeProps.dot"
          :content="badgeProps.content"
          :size="badgeProps.size"
          :offset="badgeProps.offset || [0, 5]"
        >
          <t-node :content="iconContent"></t-node>
        </t-badge>
        <t-node v-else :content="iconContent"></t-node>
      </div>
      <div v-if="itemContent" :class="`${componentName}__text`">
        <div v-if="subTabBar && subTabBar.length > 0" :class="`${componentName}__icon-menu`"></div>
        <t-node :content="itemContent"></t-node>
      </div>
    </div>
    <transition name="spread">
      <ul v-if="subTabBar && subTabBar.length > 0 && isSpread" role="menu" :class="`${componentName}__spread`">
        <li
          v-for="(child, index) in subTabBar"
          :key="child.value || index"
          role="menuitem"
          :aria-label="child.label"
          :class="`${componentName}__spread-item`"
          @click="selectChild(child.value || index)"
        >
          {{ child.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref, watch, Ref, getCurrentInstance, toRefs } from 'vue';
import TBadge from '../badge';
import config from '../config';
import { initName } from './useTabBar';
import TabBarItemProps from './tab-bar-item-props';
import { renderContent, renderTNode, TNode } from '../shared';

const { prefix } = config;
const componentName = `${prefix}-tab-bar-item`;

export default defineComponent({
  name: componentName,
  components: { TNode, TBadge },
  props: TabBarItemProps,
  setup(props) {
    const { defaultIndex, activeValue, updateChild } = inject<any>('tab-bar');
    const currentName = initName(defaultIndex);
    const hasSubTabBar = !!props.subTabBar;
    const isSpread: Ref<boolean> = ref(false);

    const isChecked = computed(() => {
      if (hasSubTabBar && Array.isArray(activeValue.value)) {
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
      if (hasSubTabBar) {
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
    const internalInstance = getCurrentInstance();
    const itemContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));

    return {
      ...toRefs(props),
      prefix,
      componentName,
      isChecked,
      toggle,
      isSpread,
      selectChild,
      itemContent,
      iconContent,
    };
  },
});
</script>
