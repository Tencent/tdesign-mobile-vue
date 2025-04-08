import { computed, watch, defineComponent, h, ref, toRefs, nextTick, Teleport, Transition } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';

import popupProps from './props';
import TOverlay from '../overlay';
import config from '../config';
import { TdPopupProps } from './type';
import { TNode } from '../shared';
import useVModel from '../hooks/useVModel';
import { usePrefixClass } from '../hooks/useClass';
import { useLockScroll } from '../hooks/useLockScroll';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import useTeleport from '../hooks/useTeleport';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-popup`,
  components: { TNode, TOverlay },
  inheritAttrs: false,
  props: popupProps,
  emits: ['open', 'close', 'opened', 'closed', 'visible-change', 'update:visible', 'update:modelValue'],
  setup(props, context) {
    const popupClass = usePrefixClass('popup');

    const popupRef = ref<HTMLElement>();

    const renderTNodeContent = useContent();

    const renderTNodeJSX = useTNodeJSX();

    const { visible, modelValue } = toRefs(props);
    const [currentVisible, setCurrentVisible] = useVModel(
      visible,
      modelValue,
      props.defaultVisible,
      props.onVisibleChange,
      'visible',
    );

    const wrapperVisible = ref(currentVisible.value);
    const innerVisible = ref(currentVisible.value);
    const mounted = ref(false);

    // 因为开启 destroyOnClose，会影响 transition 的动画，因此需要前后设置 visible
    watch(currentVisible, (v) => {
      if (v) {
        wrapperVisible.value = v;
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

    const closeBtnNode = computed(() => renderTNodeJSX('closeBtn', h(CloseIcon, { size: '24px' })));

    const handleCloseClick = (e: MouseEvent) => {
      props.onClose?.({ e });
      setCurrentVisible(false, { trigger: 'close-btn' });
    };

    const handleOverlayClick = (args: { e: MouseEvent }) => {
      const { e } = args;
      if (!props.closeOnOverlayClick) {
        return;
      }
      props.onClose?.({ e });
      setCurrentVisible(false, { trigger: 'overlay' });
    };

    const afterLeave = () => {
      wrapperVisible.value = false;
      props.onClosed?.();
    };

    const afterEnter = () => props.onOpened?.();

    const teleportElement = useTeleport(() => props.attach);

    watch(
      () => currentVisible.value,
      (val) => {
        if (val) {
          props.onOpen?.();
        }
        mounted.value = val;
      },
    );

    useLockScroll(popupRef, () => wrapperVisible.value && props.preventScrollThrough, popupClass.value);

    return () => {
      const renderOverlayContent = (
        <TOverlay
          {...props.overlayProps}
          visible={innerVisible.value && props.showOverlay}
          onClick={handleOverlayClick}
        />
      );

      const renderCloseBtn = closeBtnNode.value && (
        <div class={`${popupClass.value}__close`} onClick={handleCloseClick}>
          {closeBtnNode.value}
        </div>
      );

      const renderContent = (
        <Transition name={contentTransitionName.value} onAfterEnter={afterEnter} onAfterLeave={afterLeave}>
          <div
            v-show={innerVisible.value}
            ref={popupRef}
            {...context.attrs}
            class={[popupClass.value, context.attrs.class, contentClasses.value]}
            style={rootStyles.value}
          >
            {renderCloseBtn}

            {renderTNodeContent('default', 'content')}
          </div>
        </Transition>
      );

      const inner = (
        <>
          {renderOverlayContent}
          {renderContent}
        </>
      );

      const renderPopupContent = mounted.value ? (
        <Teleport to={teleportElement.value} disabled={!teleportElement.value}>
          {inner}
        </Teleport>
      ) : (
        inner
      );

      return (!props.destroyOnClose || wrapperVisible.value) && renderPopupContent;
    };
  },
});
