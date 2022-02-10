<template>
  <teleport :to="to" :disabled="teleportDisabled">
    <div :class="[rootClasses, $attrs.class]" :style="rootStyles" @touchmove="handleMove">
      <transition name="fade">
        <t-mask v-show="currentVisible" :transparent="!showOverlay" @click="handleMaskClick" />
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
import { ref, computed, SetupContext, watch, defineComponent, PropType } from 'vue';
import popupProps from './props';
import { emitEvent } from '../shared/emit';
import TMask from '../mask';
import config from '../config';

const { prefix } = config;

const name = `${prefix}-popup`;

export default defineComponent({
  name,
  components: { TMask },
  props: popupProps,
  emits: ['open', 'close', 'opened', 'closed', 'visible-change'],
  setup(props, context: SetupContext) {
    const currentVisible = computed(() => props.modelValue || props.visible);

    const rootClasses = computed(() => name);
    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
    }));

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
          emitEvent(props, context, 'open');
          emitEvent(props, context, 'visible-change', true);
        } else {
          document.body.classList.remove(cls);
        }
      },
    );

    const handleMaskClick = () => {
      emitEvent(props, context, 'close');
      emitEvent(props, context, 'visible-change', false);
    };

    const handleMove = (e: TouchEvent) => {
      if (props.lockScroll) {
        e.preventDefault();
      }
    };

    const afterLeave = () => emitEvent(props, context, 'closed');
    const afterEnter = () => emitEvent(props, context, 'opened');

    return {
      name: ref(name),
      currentVisible,
      rootClasses,
      rootStyles,
      contentClasses,
      contentTransitionName,
      afterEnter,
      afterLeave,
      handleMaskClick,
      handleMove,
    };
  },
});
</script>
