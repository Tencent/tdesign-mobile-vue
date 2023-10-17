<template>
  <div ref="referenceRef" :class="`${name}__wrapper`" @click="onClickReference">
    <t-node :content="triggerElementContent"></t-node>
  </div>

  <Transition :name="`${name}--animation`" appear @enter="updatePopper" @after-leave="destroyPopper">
    <div v-show="currentVisible" ref="popoverRef" data-popper-placement :class="[`${name}`]">
      <div :class="contentClasses">
        <t-node :content="content"></t-node>
        <div v-if="showArrow" :class="`${name}__arrow`" data-popper-arrow />
      </div>
    </div>
  </Transition>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, computed, ref, watch, onUnmounted } from 'vue';
import { createPopper, Placement } from '@popperjs/core';
import PopoverProps from './props';
import { TdPopoverProps } from './type';
import config from '../config';
import { renderContent, renderTNode, TNode, useDefault, useClickAway } from '../shared';

const { prefix } = config;
const name = `${prefix}-popover`;

export default defineComponent({
  name,
  components: { TNode },
  props: PopoverProps,
  emits: ['visible-change', 'update:visible', 'update:modelValue'],
  setup(props, context) {
    const [currentVisible, setVisible] = useDefault<TdPopoverProps['visible'], TdPopoverProps>(
      props,
      context.emit,
      'visible',
      'visible-change',
    );

    const internalInstance = getCurrentInstance();
    const referenceRef = ref<HTMLElement>();
    const popoverRef = ref<HTMLElement>();

    const contentClasses = computed(() => [`${name}__content`, `${name}--${props.theme}`]);

    /** popperjs instance */
    let popper: ReturnType<typeof createPopper>;
    const content = computed(() => renderTNode(internalInstance, 'content'));
    const triggerElementContent = computed(() => renderContent(internalInstance, 'default', 'triggerElement'));

    const getPopperPlacement = (placement: TdPopoverProps['placement']): Placement => {
      return placement?.replace(/-(left|top)$/, '-start').replace(/-(right|bottom)$/, '-end') as Placement;
    };

    const getPopoverOptions = () => ({
      placement: getPopperPlacement(props.placement),
      modifiers: [
        {
          name: 'arrow',
          options: {
            padding: placementPadding,
          },
        },
      ],
    });

    const placementPadding = ({
      popper,
      reference,
      placement,
    }: {
      popper: {
        width: number;
        height: number;
        x: number;
        y: number;
      };
      reference: {
        width: number;
        height: number;
        x: number;
        y: number;
      };
      placement: String;
    }) => {
      const horizontal = ['top', 'bottom'];
      const vertical = ['left', 'right'];
      const isBase = [...horizontal, ...vertical].find((item) => item === placement);
      if (isBase) {
        return 0;
      }

      const { width, x } = reference;
      const { width: popperWidth, height: popperHeight } = popper;
      const { width: windowWidth } = window.screen;

      const isHorizontal = horizontal.find((item) => placement.includes(item));
      const isEnd = placement.includes('end');
      const small = (a: number, b: number) => {
        return a < b ? a : b;
      };

      if (isHorizontal) {
        const padding = isEnd ? small(width + x, popperWidth) : small(windowWidth - x, popperWidth);
        return {
          // border-radius: 6, arrow width: 16;
          [isEnd ? 'left' : 'right']: padding - 22,
        };
      }

      const isVertical = vertical.find((item) => placement.includes(item));
      if (isVertical) {
        return {
          // border-radius: 6, arrow height: 16;
          [isEnd ? 'top' : 'bottom']: popperHeight - 22,
        };
      }
    };

    // @ts-ignore
    const updatePopper = () => {
      if (currentVisible.value && referenceRef.value && popoverRef.value) {
        popper = createPopper(referenceRef.value, popoverRef.value, getPopoverOptions());
      }
      return null;
    };

    const destroyPopper = () => {
      if (popper) {
        popper?.destroy();
        // @ts-ignore
        popper = null;
      }
    };

    const onClickAway = () => {
      if (currentVisible.value && props.closeOnClickOutside) {
        setVisible(false);
      }
    };

    const closeOnClickOutside = ref(
      useClickAway(
        [referenceRef, popoverRef],
        () => {
          onClickAway();
        },
        { detectIframe: true },
      ),
    );

    const onClickReference = () => {
      setVisible(!currentVisible.value);
    };

    onUnmounted(() => {
      closeOnClickOutside.value?.();
    });

    watch(
      () => currentVisible.value,
      (val) => {
        setVisible(val);
      },
    );

    watch(
      () => props.placement,
      () => {
        destroyPopper();
        updatePopper();
      },
    );

    return {
      name,
      currentVisible,
      referenceRef,
      popoverRef,
      triggerElementContent,
      content,
      contentClasses,
      updatePopper,
      destroyPopper,
      onClickReference,
    };
  },
});
</script>
