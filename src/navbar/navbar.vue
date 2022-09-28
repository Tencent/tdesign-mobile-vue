<template>
  <div v-show="visible" :class="name" :style="`background: ${background || ''}`">
    <div v-if="leftIcon || homeIcon || leftContent" :class="`${name}__back`">
      <span v-if="leftIcon" :class="`${name}__back--arrow`" @click="handleBack">
        <t-chevron-left-icon />
      </span>
      <span v-if="homeIcon" :class="`${name}__back--arrow`" @click="handleHomeClick">
        <t-home-icon />
      </span>
      <t-node :content="leftContent"></t-node>
    </div>

    <div :class="`${name}__text`">
      <t-node :content="titleContent"></t-node>
    </div>

    <div :class="`${name}__right`">
      <t-node :content="rightContent"></t-node>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, SetupContext, toRefs } from 'vue';
import { ChevronLeftIcon as TChevronLeftIcon, HomeIcon as THomeIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import { renderTNode, TNode, isNumber, useEmitEvent } from '../shared';
import NavbarProps from './props';

const { prefix } = config;
const name = `${prefix}-navbar`;

export default defineComponent({
  name,
  components: { TChevronLeftIcon, TNode, THomeIcon },
  props: NavbarProps,
  emits: ['click-text', 'home-click'],
  setup(props, context: SetupContext) {
    const internalInstance = getCurrentInstance();
    const { title, titleMaxLength } = toRefs(props);

    const titleContent = computed(() => {
      if (titleMaxLength.value != null && title.value) {
        if (!isNumber(titleMaxLength.value)) {
          console.warn('titleMaxLength must be number');
        } else if (titleMaxLength.value <= 0) {
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

    const emitEvent = useEmitEvent(props, context.emit);

    const handleBack = () => {
      emitEvent('left-click');

      if (history.length > 1) {
        history.back();
      }
    };

    const handleHomeClick = () => {
      emitEvent('home-click');
    };

    const handleRightClick = (evt: MouseEvent) => {
      context.emit('click-right', evt);
    };

    const handleTitleClick = (evt: MouseEvent) => {
      context.emit('click-text', evt);
    };

    return {
      name,
      titleContent,
      leftContent,
      rightContent,
      handleBack,
      handleRightClick,
      handleTitleClick,
      handleHomeClick,
    };
  },
});
</script>
