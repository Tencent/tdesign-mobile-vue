<template>
  <div :class="name">
    <div :class="`${name}__back`" >
      <span v-if="leftArrow" :class="`${name}__back--arrow`" @click="handleBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="design-iconfont">
          <path d="M11.8582894,7.59713074 L19.5,15.5522124 L18.587507,16.5 L11.498,9.12 L4.41249297,16.5 L3.5,15.5522124 L10.909,7.836 L10.9191114,7.82357236 L11.1375087,7.59672752 L11.1375087,7.59672752 L11.1513253,7.58292641 C11.2115006,7.52512156 11.2823927,7.48536415 11.3573087,7.4635197 C11.3596073,7.46416297 11.3616386,7.46358322 11.3636728,7.46301654 C11.4142672,7.44764766 11.4669347,7.44172171 11.5192849,7.44397569 C11.5248129,7.44529451 11.529826,7.44558329 11.5348349,7.44594725 C11.5582292,7.4465962 11.5820348,7.45005533 11.6055329,7.45522173 C11.6097964,7.4571126 11.6140942,7.45811092 11.618381,7.45916681 C11.6407109,7.46375787 11.6626673,7.47082433 11.6841393,7.47943568 C11.6894196,7.48239332 11.6953631,7.48489356 11.7012668,7.48751416 C11.7216346,7.49578909 11.7407437,7.50585616 11.759263,7.51723688 C11.7649967,7.52149408 11.7712335,7.52549836 11.7773993,7.52965557 C11.8063866,7.54857036 11.833398,7.57121858 11.8582894,7.59713074 L11.8253205,7.56635795 C11.8318725,7.57203148 11.8383139,7.57790408 11.8446372,7.58397591 L11.8582894,7.59713074 Z" fill="#444" transform="matrix(0 1 1 0 -.5 .5)" fill-rule="evenodd"/>
        </svg>
      </span>
      <slot name="left">
      </slot>
    </div>

    <div :class="`${name}__text`" @click="clickText">
      <slot>{{ nTitleContent }}</slot>
    </div>

    <div :class="`${name}__right`">
      <slot name="right">
      </slot>
      <i
        v-if="rightShow"
        :class="`${name}__right--more`"
        @click="handleMore"
        >
        <svg t="1614321969302" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2091" width="24" height="24"><path d="M512 449.749333a64 64 0 1 1 0 128 64 64 0 0 1 0-128z m-318.805333-1.109333a64 64 0 1 1 0 128 64 64 0 0 1 0-128z m638.677333 0a64 64 0 1 1 0 128 64 64 0 0 1 0-128z" fill="#444444" p-id="2092"></path></svg>
      </i>
    </div>
  </div>
</template>
<script lang='ts'>
import config from '../config';
import { computed, defineComponent, SetupContext } from 'vue';
import { NavbarProps } from './navbar.interface';

const { prefix } = config;
const name = `${prefix}-navbar`;

export default defineComponent({
  name,
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
