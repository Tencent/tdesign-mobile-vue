<template>
  <div class="badgeWrapper">
    <span :class="badgeClasses" :style="`background-color: ${color}`">{{value}}</span>
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
    const badgeClasses = computed(() => [
      `${name}`,
      props.dot && `${name}__dot`,
      props.size === 'small' && `${name}__small`,
      props.size === 'large' && `${name}__large`,
    ]);

    const value = computed(() => {
      if (props.text) {
        return props.text;
      }
      return props.count > props.overflowCount ? `${props.overflowCount}+` : props.count;
    });

    return {
      badgeClasses,
      ...toRefs(props),
      value,
    };
  },
});
</script>
<style lang="less" scoped>
.badgeWrapper {
  position: relative;
  display: inline-block;

  .t-badge {
    transform: translate(50%,-50%);
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
    font-size: 12px;
    color: white;
    background-color: red;
    border-radius: 10px;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    text-align: center;
    line-height: 20px;
    font-weight: 400;
  }

  .t-badge__dot {
    height: 10px;
    border-radius: 5px;
    min-width: 10px;
    padding: 0;
  }

  .t-badge__small {
    transform: translate(50%,-50%) scale(0.75);
  }

  .t-badge__large {
    transform: translate(50%,-50%) scale(1.5);
  }
}
</style>
