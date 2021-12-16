<template>
  <div :class="name">
    <div :class="`${name}__back`">
      <span v-if="leftArrow" :class="`${name}__back--arrow`" @click="handleBack">
        <t-chevron-left-icon />
      </span>
      <slot name="left"> </slot>
    </div>

    <div :class="`${name}__text`" @click="clickText">
      <slot>{{ nTitleContent }}</slot>
    </div>

    <div :class="`${name}__right`">
      <slot name="right"> </slot>
      <i v-if="rightShow" :class="`${name}__right--more`" @click="handleMore">
        <svg
          t="1614321969302"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2091"
          width="24"
          height="24"
        >
          <path
            d="M512 449.749333a64 64 0 1 1 0 128 64 64 0 0 1 0-128z m-318.805333-1.109333a64 64 0 1 1 0 128 64 64 0 0 1 0-128z m638.677333 0a64 64 0 1 1 0 128 64 64 0 0 1 0-128z"
            fill="#444444"
            p-id="2092"
          ></path>
        </svg>
      </i>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, SetupContext } from 'vue';
import { ChevronLeftIcon as TChevronLeftIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import { NavbarProps } from './navbar.interface';

const { prefix } = config;
const name = `${prefix}-navbar`;

export default defineComponent({
  name,
  components: { TChevronLeftIcon },
  props: NavbarProps,
  emits: ['click-right', 'click-text'],
  setup(props, context: SetupContext) {
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

    const handleMore = (evt: MouseEvent) => {
      context.emit('click-right', evt);
    };

    const clickText = (evt: MouseEvent) => {
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
