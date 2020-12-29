<template>
  <div :class="nClassName">
    <div :class="nBackClass" >
      <t-icon v-if="leftArrow" @click="handleBack" :class="`${nBackClass}--arrow`" name="arrow-left"></t-icon>
      <slot name="left">
      </slot>
    </div>

    <div :class="nTitleClass" @click="clickText">
      <slot>{{ nTitleContent }}</slot>
    </div>

    <div :class="nRightClass" @click="handleMore">
      <slot name="right">
        <i :class="`${nRightClass}--more`"></i>
      </slot>
    </div>
  </div>
</template>
<script lang='ts'>
import config from '../config';
import { computed, defineComponent, SetupContext } from 'vue';
import { NavbarProps, IDNavbarProps } from './navbar.interface';

const { prefix } = config;
const name = `${prefix}-navbar`;

export default defineComponent({
  name,
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
        return `${title.split(0, maxLen)}...`;
      }
      return title;
    });

    const handleBack = () => {
      if (history.length > 1) {
        history.back();
      }
    };

    const handleMore = (evt) => {
      context.emit('on-click-right', evt);
    };

    const clickText = (evt) => {
      context.emit('on-click-text', evt);
    };

    return {
      nClassName,
      nBackClass,
      nTitleClass,
      nRightClass,
      nTitleContent,
      handleBack,
      handleMore,
      clickText,
      nCloseClass,
    };
  },
});
</script>
