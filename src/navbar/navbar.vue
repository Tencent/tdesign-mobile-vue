<template>
  <div :class="name">
    <div :class="`${name}__back`" >
      <t-icon v-if="leftArrow" :class="`${nBackClass}--arrow`" name="arrow-left" @click="handleBack"></t-icon>
      <slot name="left">
      </slot>
    </div>

    <div :class="`${name}__text`" @click="clickText">
      <slot>{{ nTitleContent }}</slot>
    </div>

    <div :class="`${name}__right`" @click="handleMore">
      <slot name="right">
        <i :class="`$${name}__right--more`"></i>
      </slot>
    </div>
  </div>
</template>
<script lang='ts'>
import config from '../config';
import { computed, defineComponent, SetupContext } from 'vue';
import TIcon from '../icon';
import { NavbarProps } from './navbar.interface';

const { prefix } = config;
const name = `${prefix}-navbar`;

export default defineComponent({
  name,
  components: { TIcon },
  props: NavbarProps,
  emits: ['on-click-right', 'on-click-text'],
  setup(props: IDNavbarProps, context: SetupContext) {
    const nClassName = computed(() => `${name}`);
    const nBackClass = computed(() => `${name}__back`);
    const nCloseClass = computed(() => `${name}__close`);
    const nTitleClass = computed(() => `${name}__text`);
    const nRightClass = computed(() => `${name}__right`);
    const nTitleContent = computed(() => {
      const { title, maxLen } = props;
      if (title && title.trim().length > maxLen) {
        return `${title.slice(0, maxLen)}...`;
      }
      return title;
    });

    const handleBack = () => {
      if (history.length > 1) {
        history.back();
      }
    };

    const handleMore = (evt: TouchEvent) => {
      context.emit('click-right', evt);
    };

    const clickText = (evt: TouchEvent) => {
      context.emit('click-text', evt);
    };

    return {
      name,
      nTitleContent,
      handleBack,
      handleMore,
      clickText,
    };
  },
});
</script>
