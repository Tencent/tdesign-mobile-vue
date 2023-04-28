<template>
  <div
    :class="{
      [`${name}`]: true,
      [`${name}--split`]: split,
      [`${name}--text-only`]: !iconContent,
      [`${name}--crowded`]: crowded,
      [`${name}--${shape}`]: true,
    }"
  >
    <div
      :class="{
        [`${name}__content`]: true,
        [`${name}__content--checked`]: isChecked,
        [`${name}__content--${theme}`]: true,
      }"
      :aria-selected="(!hasChildren || !isSpread) && isChecked"
      :aria-expanded="hasChildren && isSpread"
      :role="hasChildren ? 'button' : 'tab'"
      :aria-label="ariaLabel"
      @click="toggle"
    >
      <div
        v-if="!!iconContent"
        :class="`${name}__icon`"
        :style="{ height: `${iconOnly ? 24 : 20}px` }"
        :aria-hidden="badgeProps?.dot || badgeProps?.count"
      >
        <t-badge
          v-if="badgeProps?.dot || badgeProps?.count"
          :count="badgeProps?.count || 0"
          :max-count="badgeProps?.maxCount || 99"
          :dot="badgeProps?.dot || false"
          :content="badgeProps?.content || ''"
          :size="badgeProps?.size || 'medium'"
          :offset="badgeProps?.offset || [0, 0]"
        >
          <t-node :content="iconContent" />
        </t-badge>
        <t-node v-else :content="iconContent" />
      </div>
      <!-- 缩放0.83是因为设计稿字体10px，而chrome最小12px，为了和20px的图标保持协调 -->
      <div
        ref="textNode"
        :class="{
          [`${name}__text`]: true,
          [`${name}__text--small`]: !!iconContent,
        }"
        :style="!!iconContent ? 'transform: scale(0.83)' : ''"
      >
        <t-view-list-icon v-if="hasChildren" size="16" :class="`${name}__icon-menu`" />
        <t-node :content="itemContent" />
      </div>
    </div>
    <div v-if="hasChildren && isSpread" role="menu" :class="`${name}__spread`">
      <div
        v-for="(child, index) in subTabBar"
        :key="index"
        role="tab"
        :class="`${name}__spread-item`"
        @click="selectChild(child.value || index)"
      >
        <div v-if="index !== 0" :class="`${name}__spread-item-split`" />
        <div :class="`${name}__spread-item-text`">{{ child.label }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  computed,
  ref,
  watch,
  Ref,
  getCurrentInstance,
  toRefs,
  ComponentInternalInstance,
} from 'vue';
import { ViewListIcon as TViewListIcon } from 'tdesign-icons-vue-next';
import TBadge from '../badge';
import config from '../config';
import { initName } from './useTabBar';
import TabBarItemProps from './tab-bar-item-props';
import { renderContent, renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-tab-bar-item`;

export default defineComponent({
  name,
  components: { TNode, TBadge, TViewListIcon },
  props: TabBarItemProps,
  setup(props) {
    const { split, shape, theme, defaultIndex, activeValue, itemCount, updateChild } = inject<any>('tab-bar');
    const currentName = initName(defaultIndex);

    const textNode = ref<HTMLElement>();

    const getBadgeAriaLabel = () => {
      const options = props.badgeProps;
      if (options?.dot || options?.count) {
        const maxCount = options.maxCount || 99;
        if (options.dot) {
          return '有新的消息';
        }
        if (options.count === '...') {
          return '有很多消息';
        }
        const count = Number(options.count);
        if (isNaN(count)) {
          return options.count;
        }
        const str1 = `有${maxCount}+条消息`;
        const str2 = `有${options.count}条消息`;
        return Number(options.count) > maxCount ? str1 : str2;
      }
      return 'TabBar';
    };
    const ariaLabel = ref(getBadgeAriaLabel());

    const iconOnly = ref(false);
    watch(textNode, () => {
      const height = textNode.value?.clientHeight;
      iconOnly.value = Number(height) === 0;
    });

    const hasSubTabBar = computed(() => {
      return Array.isArray(props.subTabBar) && props.subTabBar.length > 0;
    });

    const isChecked = computed(() => {
      if (hasSubTabBar.value && Array.isArray(activeValue.value)) {
        return activeValue.value.includes(currentName);
      }
      return currentName === activeValue.value;
    });

    const isSpread = ref(false);
    watch(isChecked, (newValue) => {
      if (!newValue) {
        isSpread.value = false;
      }
    });

    const crowded = ref(false);
    watch(itemCount, () => {
      if (isChecked.value) {
        crowded.value = itemCount.value > 3;
        isSpread.value = true;
      }
    });

    const isToggleCurrent = computed(() => Array.isArray(activeValue.value) && activeValue.value[0] === currentName);

    const toggle = () => {
      if (hasSubTabBar.value) {
        isSpread.value = !isSpread.value;
        if (!isToggleCurrent.value) {
          updateChild([currentName]);
          return;
        }
      }
      updateChild(currentName);
    };

    const hasChildren = computed(() => {
      return Number(props.subTabBar?.length) > 0;
    });

    const selectChild = (childName: number | string) => {
      if (!(Array.isArray(activeValue.value) && activeValue.value[1] === childName)) {
        updateChild([currentName, childName]);
      }
      isSpread.value = false;
    };
    const internalInstance = getCurrentInstance();
    const itemContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const iconContent = computed(() => {
      const iconSlot = renderTNode(internalInstance, 'icon');
      iconSlot?.forEach((item: ComponentInternalInstance) => {
        if (item.type?.name === 'Icon') {
          item.props.size = iconOnly.value ? '24px' : '20px';
        }
      });
      return iconSlot;
    });

    return {
      ...toRefs(props),
      name,
      split,
      shape,
      crowded,
      theme,
      isChecked,
      toggle,
      hasChildren,
      isSpread,
      ariaLabel,
      iconOnly,
      textNode,
      selectChild,
      itemContent,
      iconContent,
    };
  },
});
</script>
