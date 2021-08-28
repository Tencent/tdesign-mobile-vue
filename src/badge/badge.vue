<template>
  <div v-if='showBadge' :class='badgeClasses'>
    <div :class='badgeInnerClasses' :style='badgeStyles'>{{ value }}</div>
    <slot />
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, toRefs } from 'vue';
import BadgeProps from './props';

import config from '../config';

const name = `${config.prefix}-badge`;

export default defineComponent({
  name,
  props: BadgeProps,
  setup(props, context) {
    // 是否独立使用
    const isIndependent = computed(() => !context.slots.default);

    // 是否展示徽标
    const showBadge = computed(() => props.content || props.showZero || props.count !== 0);

    // 徽标外层样式类
    const badgeClasses = computed(() => ({
      [`${name}`]: true,
      [`${name}__ribbon--outer`]: props.shape === 'ribbon',
    }));

    // 徽标内层样式类
    const badgeInnerClasses = computed(() => ({
      [`${name}--basic`]: true,
      [`${name}--has-children`]: !isIndependent.value,
      [`${name}--dot`]: props.dot,
      [`${name}--small`]: props.size === 'small',
      [`${name}--circle`]: props.shape === 'circle',
      [`${name}--round`]: props.shape === 'round',
      [`${name}--ribbon`]: props.shape === 'ribbon',
    }));

    // 徽标自定义样式
    const badgeStyles = computed(() => {
      if (!props.offset) return {};
      let [xOffset, yOffset]: Array<string | number> = props.offset;
      xOffset = isNaN(Number(xOffset)) ? xOffset : `${xOffset}px`;
      yOffset = isNaN(Number(yOffset)) ? yOffset : `${yOffset}px`;
      return {
        background: props.color,
        right: `${xOffset}px`,
        top: `${yOffset}px`,
      };
    });

    // 徽标内展示的内容
    const value = computed(() => {
      if (props.dot) {
        return '';
      }
      if (props.content) {
        return props.content;
      }
      return props.count > props.maxCount ? `${props.maxCount}+` : props.count;
    });

    return {
      showBadge,
      badgeStyles,
      badgeClasses,
      badgeInnerClasses,
      ...toRefs(props),
      value,
    };
  },
});
</script>
