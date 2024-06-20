import { computed, watch, defineComponent, h, ref, nextTick, Teleport, Transition } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';

import popupProps from './props';
import TOverlay from '../overlay';
import config from '../config';
import { TdPopupProps } from './type';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { useDefault, isBrowser } from '../shared';
import { getAttach } from '../shared/dom';

const { prefix } = config;

const name = `${prefix}-popup`;
const bodyLockClass = `${name}-overflow-hidden`;
let lockTimes = 0;

export default defineComponent({
  name,
  inheritAttrs: false,
  props: popupProps,
  emits: ['open', 'close', 'opened', 'closed', 'visible-change', 'update:visible', 'update:modelValue'],
  setup(props, context) {
    const [currentVisible, setVisible] = useDefault<TdPopupProps['visible'], TdPopupProps>(
      props,
      context.emit,
      'visible',
      'visible-change',
    );

    const wrapperVisible = ref(currentVisible.value);

    const innerVisible = ref(currentVisible.value);

    const renderTNodeContent = useContent();

    const renderTNodeJSX = useTNodeJSX();

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
      return { ...(context.attrs.style as Object), ...styles, display: innerVisible.value ? 'block' : 'none' };
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

    const closeBtnNode = computed(() => renderTNodeJSX('closeBtn', h(CloseIcon, { size: '24px' })));

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

    return () => {
      const renderOverlayContent = computed(() => (
        <TOverlay
          {...props.overlayProps}
          visible={innerVisible.value && props.showOverlay}
          onClick={handleOverlayClick}
        />
      ));

      const renderCloseBtn = computed(() =>
        closeBtnNode.value ? (
          <div class={`${name}__close`} onClick={handleCloseClick}>
            {closeBtnNode.value}
          </div>
        ) : null,
      );

      const renderContent = computed(() => (
        <Transition name={contentTransitionName.value} onAfterEnter={afterEnter} onAfterLeave={afterLeave}>
          <div {...context.attrs} class={[name, contentClasses.value]} style={rootStyles.value}>
            {renderCloseBtn.value}

            {renderTNodeContent('default', 'content')}
          </div>
        </Transition>
      ));

      const renderPopupContent = computed(() =>
        !props.destroyOnClose || wrapperVisible.value ? (
          <Teleport to={to.value} disabled={!to.value}>
            {renderOverlayContent.value}
            {renderContent.value}
          </Teleport>
        ) : null,
      );

      return <>{renderPopupContent.value}</>;
    };
  },
});
