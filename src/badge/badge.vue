<template>
  <div :class="badgeClasses" v-if="showBadge">
    <span :class="badgeInnerClasses" :style="badgeStyles">{{value}}</span>
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { badgeProps } from './badge.interface';

import config from '../config';
const name = `${config.prefix}-badge`;

export default defineComponent({
  name,
  props: badgeProps,
  setup(props) {
    // 是否展示徽标
    const showBadge = computed(() => props.content || props.showZero || props.count !== 0);

    // 徽标样式类
    const badgeClasses = computed(() => [
      `${name}`,
    ]);

    console.log('offset: ', props.offset);

    const badgeInnerClasses = computed(() => [
      `${name}--basic`,
      props.dot && `${name}--dot`,
      props.size === 'small' && `${name}--small`,
      props.shape === 'circle' && `${name}--circle`,
      props.shape === 'round' && `${name}--round`,
      props.shape === 'ribbon' && `${name}--ribbon`,
    ]);

    // 徽标自定义颜色
    const badgeStyles = computed(() => ({
      background: props.color,
      top: `${props.offset[0]}px`,
      right: `${props.offset[1]}px`,
    }));

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
