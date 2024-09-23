<template>
  <teleport v-if="!destroyOnClose || wrapperVisible" :to="to" :disabled="!to">
    <t-overlay v-bind="overlayProps" :visible="innerVisible && showOverlay" @click="handleOverlayClick" />
    <transition :name="contentTransitionName" @after-enter="afterEnter" @after-leave="afterLeave">
      <div
        v-show="innerVisible"
        :class="[popupClass, $attrs.class, contentClasses]"
        :style="rootStyles"
        v-bind="$attrs"
      >
        <div v-if="closeBtnNode" :class="`${popupClass}__close`" @click="handleCloseClick">
          <t-node :content="closeBtnNode" />
        </div>
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, watch, defineComponent, h, getCurrentInstance, ref, nextTick, onUnmounted } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';

import popupProps from './props';
import TOverlay from '../overlay';
import config from '../config';
import { TdPopupProps } from './type';
import { useDefault, TNode, renderTNode, isBrowser } from '../shared';
import { getAttach } from '../shared/dom';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

let lockTimes = 0;

export default defineComponent({
  name: `${prefix}-popup`,
  components: { TNode, TOverlay },
  inheritAttrs: false,
  props: popupProps,
  emits: ['open', 'close', 'opened', 'closed', 'visible-change', 'update:visible', 'update:modelValue'],
  setup(props, context) {
    const popupClass = usePrefixClass('popup');

    const bodyLockClass = `${popupClass.value}-overflow-hidden`;

    const currentInstance = getCurrentInstance();
    const [currentVisible, setVisible] = useDefault<TdPopupProps['visible'], TdPopupProps>(
      props,
      context.emit,
      'visible',
      'visible-change',
    );
    const wrapperVisible = ref(currentVisible.value);
    const innerVisible = ref(currentVisible.value);

    // 因为开启 destroyOnClose，会影响 transition 的动画，因此需要前后设置 visible
    watch(currentVisible, (v) => {
      wrapperVisible.value = v;

      if (v) {
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
      [`${popupClass.value}--${props.placement}`]: true,
    }));

    const contentTransitionName = computed(() => {
      const { transitionName, placement } = props;

      if (transitionName) return transitionName;
      if (placement === 'center') return 'fade-zoom';
      return `slide-${placement}`;
    });

    const closeBtnNode = computed(() =>
      renderTNode(currentInstance, 'closeBtn', {
        defaultNode: h(CloseIcon, { size: '24px' }),
      }),
    );

    const handleCloseClick = (e: MouseEvent) => {
      props.onClose?.({ e });
      setVisible(false, { trigger: 'close-btn' });
    };

    const handleOverlayClick = (args: { e: MouseEvent }) => {
      const { e } = args;
      if (!props.closeOnOverlayClick) {
        return;
      }
      props.onClose?.({ e });
      setVisible(false, { trigger: 'overlay' });
    };

    const afterLeave = () => {
      wrapperVisible.value = false;
      props.onClosed?.();
    };
    const afterEnter = () => props.onOpened?.();
    const to = computed(() => {
      if (!isBrowser || !props.attach) return undefined;
      return getAttach(props.attach ?? 'body');
    });

    watch(
      () => currentVisible.value,
      (val) => {
        if (val) {
          props.onOpen?.();
          setVisible(true);
        }
      },
    );

    const lock = () => {
      if (!lockTimes && isBrowser) {
        document.body.classList.add(bodyLockClass);
      }

      lockTimes++;
    };

    const unlock = () => {
      if (lockTimes) {
        lockTimes--;

        if (!lockTimes && isBrowser) {
          document.body.classList.remove(bodyLockClass);
        }
      }
    };

    const shouldLock = computed(() => wrapperVisible.value && props.preventScrollThrough);

    watch(
      () => shouldLock.value,
      (value) => {
        value ? lock() : unlock();
      },
    );
    onUnmounted(() => {
      unlock();
    });
    return {
      name,
      to,
      popupClass,
      wrapperVisible,
      innerVisible,
      currentVisible,
      rootStyles,
      contentClasses,
      contentTransitionName,
      closeBtnNode,
      afterEnter,
      afterLeave,
      handleOverlayClick,
      handleCloseClick,
    };
  },
});
</script>
