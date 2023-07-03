<template>
  <div ref="referenceRef" :class="`${name}__wrapper`" @click="onClickReference">
    <t-node :content="triggerElementContent"></t-node>
  </div>

  <Transition :name="`${name}--animation`" appear @enter="updatePopper" @after-leave="destroyPopper">
    <div v-show="currentVisible" ref="popoverRef" data-popper-placement :class="[`${name}`]">
      <div :class="contentClasses">
        <t-node :content="content"></t-node>
        <div v-if="showArrow" :class="`${name}__arrow`" />
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
    });

    const updatePopper = () => {
      if (referenceRef.value && popoverRef.value) {
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
