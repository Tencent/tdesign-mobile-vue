import { defineComponent, computed, ref, toRefs, watch, onUnmounted, Transition } from 'vue';
import { createPopper, Placement } from '@popperjs/core';
import PopoverProps from './props';
import { TdPopoverProps } from './type';
import config from '../config';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { useClickAway } from '../shared';
import useVModel from '../hooks/useVModel';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-popover`,
  props: PopoverProps,
  emits: ['visible-change', 'update:visible', 'update:modelValue'],
  setup(props, context) {
    const popoverClass = usePrefixClass('popover');

    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const { visible, modelValue } = toRefs(props);
    const [currentVisible, setCurrentVisible] = useVModel(
      visible,
      modelValue,
      props.defaultVisible,
      props.onVisibleChange,
      'visible',
    );

    const referenceRef = ref<HTMLElement>();
    const popoverRef = ref<HTMLElement>();

    const contentClasses = computed(() => [`${popoverClass.value}__content`, `${popoverClass.value}--${props.theme}`]);

    /** popperjs instance */
    let popper: ReturnType<typeof createPopper>;

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
        setCurrentVisible(false);
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
      setCurrentVisible(!currentVisible.value);
    };

    onUnmounted(() => {
      closeOnClickOutside.value?.();
    });

    watch(
      () => props.placement,
      () => {
        destroyPopper();
        updatePopper();
      },
    );

    const renderArrow = () => {
      return props.showArrow && <div class={`${popoverClass.value}__arrow`} data-popper-arrow />;
    };

    const renderContentNode = () => {
      return (
        currentVisible.value && (
          <div ref={popoverRef} data-popper-placement class={`${popoverClass.value}`}>
            <div class={contentClasses.value}>
              {renderTNodeJSX('content')}
              {renderArrow()}
            </div>
          </div>
        )
      );
    };

    return () => {
      const triggerElementContent = renderContent('default', 'triggerElement');

      return (
        <>
          <div ref={referenceRef} class={`${popoverClass.value}__wrapper`} onClick={onClickReference}>
            {triggerElementContent}
          </div>
          <Transition
            name={`${popoverClass.value}--animation`}
            appear
            onEnter={updatePopper}
            onAfterLeave={destroyPopper}
          >
            {renderContentNode()}
          </Transition>
        </>
      );
    };
  },
});
