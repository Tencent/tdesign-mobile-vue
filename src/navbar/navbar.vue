<template>
  <div v-show="visible" :class="name" :style="`${navStyle}`">
    <div v-if="homeContent || leftContent" :class="`${name}__back`">
      <span v-if="leftIcon === true" :class="`${name}__back--arrow`" @click="handleLeftClick">
        <t-chevron-left-icon />
      </span>
      <span v-if="homeIcon === true" :class="`${name}__back--arrow`">
        <t-home-icon />
      </span>
      <t-node :content="homeContent"></t-node>
      <t-node :content="leftContent"></t-node>
    </div>

    <div :class="`${name}__text`">
      <t-node :content="titleContent"></t-node>
    </div>

    <div :class="`${name}__right`" @click="handleRightClick">
      <t-node :content="rightContent"></t-node>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, toRefs } from 'vue';
import { ChevronLeftIcon as TChevronLeftIcon, HomeIcon as THomeIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import { renderTNode, TNode, useEmitEvent } from '../shared';
import NavbarProps from './props';

const { prefix } = config;
const name = `${prefix}-navbar`;

export default defineComponent({
  name,
  components: { TChevronLeftIcon, TNode, THomeIcon },
  props: NavbarProps,
  emits: ['left-click', 'right-click'],
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const { title, titleMaxLength, fixed, background } = toRefs(props);

    const navStyle = computed(
      () => `position: ${fixed.value ? 'fixed' : 'relative'}; background: ${background.value || ''};`,
    );

    const titleContent = computed(() => {
      if (titleMaxLength.value != null && title.value) {
        if (titleMaxLength.value <= 0) {
          console.warn('titleMaxLength must be greater than 0');
        } else {
          return title.value.length <= titleMaxLength.value
            ? props.title
            : `${(title.value as string).slice(0, titleMaxLength.value)}...`;
        }
      }

      return renderTNode(internalInstance, 'title');
    });

    const leftContent = computed(() => renderTNode(internalInstance, 'left-icon'));
    const rightContent = computed(() => renderTNode(internalInstance, 'right-icon'));
    const homeContent = computed(() => renderTNode(internalInstance, 'home-icon'));

    const emitEvent = useEmitEvent(props, context.emit);

    const handleLeftClick = () => {
      emitEvent('left-click');
    };

    const handleRightClick = () => {
      emitEvent('right-click');
    };

    return {
      name,
      titleContent,
      leftContent,
      rightContent,
      navStyle,
      homeContent,
      handleLeftClick,
      handleRightClick,
    };
  },
});
</script>
