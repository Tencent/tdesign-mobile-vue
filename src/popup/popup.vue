<template>
  <teleport v-if="!destroyOnClose || wrapperVisbile" :to="to" :disabled="!to">
    <t-overlay v-bind="overlayProps" :visible="innerVisible && showOverlay" @click="handleOverlayClick" />
    <transition :name="contentTransitionName" @after-enter="afterEnter" @after-leave="afterLeave">
      <div
        v-show="innerVisible"
        :class="[name, $attrs.class, contentClasses]"
        :style="rootStyles"
        @touchmove="handleMove"
      >
        <div v-if="closeBtnNode" :class="`${name}__close`">
          <t-node :content="closeBtnNode" />
        </div>
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, watch, defineComponent, h, getCurrentInstance, ref, nextTick } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';

import popupProps from './props';
import TOverlay from '../overlay';
import config from '../config';
import { TdPopupProps } from './type';
import { useDefault, useEmitEvent, TNode, renderTNode } from '../shared';
import { getAttach } from '../shared/dom';

const { prefix } = config;

const name = `${prefix}-popup`;

export default defineComponent({
  name,
  components: { TNode, TOverlay },
  props: popupProps,
  emits: ['open', 'close', 'opened', 'closed', 'visible-change', 'update:visible', 'update:modelValue'],
  setup(props, context) {
    const currentInstance = getCurrentInstance();
    const emitEvent = useEmitEvent(props, context.emit);
    const [currentVisible, setVisible] = useDefault<TdPopupProps['visible'], TdPopupProps>(
      props,
      context.emit,
      'visible',
      'visible-change',
    );
    const wrapperVisbile = ref(currentVisible.value);
    const innerVisible = ref(currentVisible.value);

    // 因为开启 destroyOnClose，会影响 transition 的动画，因此需要前后设置 visible
    watch(currentVisible, (v) => {
      if (v) {
        wrapperVisbile.value = v;
        if (props.destroyOnClose) {
          nextTick(() => {
            innerVisible.value = v;
          });
        } else {
          innerVisible.value = v;
        }
      } else {
        innerVisible.value = v;
      }
    });

    const rootStyles = computed(() => {
      const styles: Record<string, any> = {};

      if (props.zIndex) {
        styles.zIndex = `${props.zIndex}`;
      }
      return { ...(context.attrs.style as Object), ...styles };
    });

    const contentClasses = computed(() => ({
      [`${name}--${props.placement}`]: true,
    }));

    const contentTransitionName = computed(() => {
      const { transitionName, placement } = props;

      if (transitionName) return transitionName;
      if (placement === 'center') return 'fade-zoom';
      return `slide-${placement}`;
    });

    const closeBtnNode = computed(() =>
      renderTNode(currentInstance, 'closeBtn', {
        defaultNode: h(CloseIcon, {
          size: '24px',
          onClick() {
            setVisible(false);
          },
        }),
      }),
    );

    const handleOverlayClick = (args: { e: MouseEvent }) => {
      const { e } = args;
      if (!props.closeOnOverlayClick) {
        return;
      }
      emitEvent('close', { e });
      setVisible(false);
    };

    const handleMove = (e: TouchEvent) => {
      if (props.preventScrollThrough) {
        e.preventDefault();
      }
    };

    const afterLeave = () => {
      wrapperVisbile.value = false;
      emitEvent('closed');
    };
    const afterEnter = () => emitEvent('opened');
    const to = computed(() => getAttach(props.attach ?? 'body'));

    watch(
      () => currentVisible.value,
      (val) => {
        if (val) {
          emitEvent('open');
          setVisible(true);
        }
      },
    );

    return {
      name,
      to,
      wrapperVisbile,
      innerVisible,
      currentVisible,
      rootStyles,
      contentClasses,
      contentTransitionName,
      closeBtnNode,
      afterEnter,
      afterLeave,
      handleOverlayClick,
      handleMove,
    };
  },
});
</script>
