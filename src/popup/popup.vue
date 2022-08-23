<template>
  <teleport :to="to" :disabled="!to">
    <div :class="[rootClasses, $attrs.class]" :style="rootStyles" @touchmove="handleMove">
      <transition name="fade">
        <t-overlay
          v-bind="overlayProps"
          :visible="currentVisible"
          :transparent="!showOverlay"
          @click="handleOverlayClick"
        />
      </transition>
      <transition :name="contentTransitionName" @after-enter="afterEnter" @after-leave="afterLeave">
        <div v-show="currentVisible" :class="contentClasses">
          <slot></slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts">
import { ref, computed, SetupContext, watch, defineComponent } from 'vue';
import popupProps from './props';
import TOverlay from '../overlay';
import config from '../config';
import { TdPopupProps } from './type';
import { useDefault, useEmitEvent } from '../shared';

const { prefix } = config;

const name = `${prefix}-popup`;

export default defineComponent({
  name,
  components: { TOverlay },
  props: popupProps,
  emits: ['open', 'close', 'opened', 'closed', 'visible-change', 'update:visible', 'update:modelValue'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const [currentVisible] = useDefault<TdPopupProps['visible'], TdPopupProps>(
      props,
      context.emit,
      'visible',
      'visible-change',
    );

    const rootClasses = computed(() => name);
    const rootStyles = computed(() => `${props.customStyle}z-index:${props.zIndex};`);

    const contentClasses = computed(() => ({
      [`${name}--content`]: true,
      [`${name}--content-${props.placement}`]: true,
    }));

    const contentTransitionName = computed(() => {
      const { transitionName, placement } = props;
      if (transitionName) return transitionName;
      if (placement === 'center') return 'fade-zoom';
      return `slide-${placement}`;
    });

    watch(
      () => currentVisible.value,
      (val) => {
        const cls = `${prefix}-overflow-hidden`;
        if (val) {
          document.body.classList.add(cls);
          emitEvent('open');
          currentVisible.value = true;
        } else {
          document.body.classList.remove(cls);
        }
      },
    );

    const handleOverlayClick = () => {
      if (!props.closeOnOverlayClick) {
        return;
      }
      emitEvent('close');
      currentVisible.value = false;
    };

    const handleMove = (e: TouchEvent) => {
      if (props.lockScroll) {
        e.preventDefault();
      }
    };

    const afterLeave = () => emitEvent('closed');
    const afterEnter = () => emitEvent('opened');

    return {
      name: ref(name),
      currentVisible,
      rootClasses,
      rootStyles,
      contentClasses,
      contentTransitionName,
      afterEnter,
      afterLeave,
      handleOverlayClick,
      handleMove,
    };
  },
});
</script>
