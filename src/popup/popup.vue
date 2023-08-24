<template>
  <teleport v-if="!destroyOnClose || wrapperVisbile" :to="to" :disabled="!to">
    <t-overlay v-bind="overlayProps" :visible="innerVisible && showOverlay" @click="handleOverlayClick" />
    <transition :name="contentTransitionName" @after-enter="afterEnter" @after-leave="afterLeave">
      <div :class="[name, $attrs.class, contentClasses]" :style="rootStyles">
        <div v-if="closeBtnNode" :class="`${name}__close`" @click="handleCloseClick">
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
import { useDefault, TNode, renderTNode } from '../shared';
import { getAttach } from '../shared/dom';

const { prefix } = config;

const name = `${prefix}-popup`;
const bodyLockClass = `${name}-overflow-hidden`;
let lockTimes = 0;

export default defineComponent({
  name,
  components: { TNode, TOverlay },
  props: popupProps,
  emits: ['open', 'close', 'opened', 'closed', 'visible-change', 'update:visible', 'update:modelValue'],
  setup(props, context) {
    const currentInstance = getCurrentInstance();
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
      styles.visibility = innerVisible.value ? 'visible' : 'hidden';
      if (props.zIndex && innerVisible.value) {
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
      wrapperVisbile.value = false;
      props.onClosed?.();
    };
    const afterEnter = () => props.onOpened?.();
    const to = computed(() => getAttach(props.attach ?? 'body'));

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
      if (!lockTimes) {
        document.body.classList.add(bodyLockClass);
      }

      lockTimes++;
    };

    const unlock = () => {
      if (lockTimes) {
        lockTimes--;

        if (!lockTimes) {
          document.body.classList.remove(bodyLockClass);
        }
      }
    };

    const shouldLock = computed(() => wrapperVisbile.value && props.preventScrollThrough);

    watch(
      () => shouldLock.value,
      (value) => {
        value ? lock() : unlock();
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
      handleCloseClick,
    };
  },
});
</script>
