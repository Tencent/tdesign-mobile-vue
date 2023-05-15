<template>
  <div :class="navClass" :style="`${navStyle}`">
    <div v-if="fixed" :class="`${name}____placeholder`"></div>
    <div :class="`${name}__content`">
      <div ref="navLeft" :class="`${name}__left`" @click="handleLeftClick">
        <t-chevron-left-icon v-if="leftArrow" :class="`${name}__left-arrow`" />
        <t-node :content="leftContent"></t-node>
        <div v-if="capsuleContent" :class="`${name}__capsule`">
          <t-node :content="capsuleContent"></t-node>
        </div>
      </div>
      <div :class="`${name}__center`">
        <span v-if="isStringTitle" :class="`${name}__center-title`">{{ titleContent }}</span>
        <t-node v-else :content="titleContent"></t-node>
      </div>
      <div ref="navRight" :class="`${name}__right`" @click="handleRightClick">
        <t-node :content="rightContent"></t-node>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, toRefs } from 'vue';
import { ChevronLeftIcon as TChevronLeftIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import { renderTNode, TNode, useEmitEvent } from '../shared';
import NavbarProps from './props';

const { prefix } = config;
const name = `${prefix}-navbar`;

export default defineComponent({
  name,
  components: { TChevronLeftIcon, TNode },
  props: NavbarProps,
  emits: ['left-click', 'right-click'],
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const { title, titleMaxLength, fixed } = toRefs(props);
    const navLeft = ref<HTMLDivElement>();
    const navRight = ref<HTMLDivElement>();

    const animationSuffix = props.animation ? '-animation' : '';
    const navClass = computed(() => [
      name,
      {
        [`${name}--fixed`]: props.fixed,
      },
      props.visible ? `${name}--visible${animationSuffix}` : `${name}--hide${animationSuffix}`,
    ]);

    // 计算左右区域的最大宽度
    const navbarRight = computed(
      () =>
        Math.max(navLeft.value?.clientWidth ?? 0, navRight.value?.clientWidth ?? 0) + (navLeft.value?.offsetLeft ?? 0),
    );

    const navStyle = computed(
      () => `position: ${fixed.value ? 'fixed' : 'relative'};
            --td-navbar-padding-top: 0px;
            --td-navbar-right: ${navbarRight.value}px;`,
    );

    const isStringTitle = typeof props.title === 'string' && !internalInstance?.slots.title;

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

    const leftContent = computed(() => renderTNode(internalInstance, 'left'));
    const rightContent = computed(() => renderTNode(internalInstance, 'right'));
    const capsuleContent = computed(() => renderTNode(internalInstance, 'capsule'));

    const emitEvent = useEmitEvent(props, context.emit);

    const handleLeftClick = () => {
      emitEvent('left-click');
    };

    const handleRightClick = () => {
      emitEvent('right-click');
    };

    return {
      name,
      navLeft,
      navRight,
      isStringTitle,
      titleContent,
      leftContent,
      rightContent,
      capsuleContent,
      navClass,
      navStyle,
      handleLeftClick,
      handleRightClick,
    };
  },
});
</script>
