import { computed, defineComponent, ref, toRefs, h, nextTick, onMounted, watch, Teleport } from 'vue';
import isFunction from 'lodash/isFunction';
import TPopover, { PopoverProps } from '../popover';
import TPopup, { PopupProps } from '../popup';
import TButton, { ButtonProps } from '../button';
import config from '../config';
import { useVModel, TNode } from '../shared';
import { addClass, getWindowScroll, removeClass } from '../shared/dom';
import setStyle from '../_common/js/utils/set-style';
import props from './props';
import { GuideStep, TdGuideProps } from './type';
import { isFixed, getRelativePosition, getTargetElm, scrollToParentVisibleArea, scrollToElm } from './utils';
import { GuideCrossProps } from './interface';
import { useConfig } from '../config-provider/useConfig';
import { SizeEnum } from '../common';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-guide`;

export default defineComponent({
  name,
  components: {
    TNode,
    TPopover,
    TButton,
    TPopup,
  },
  props,
  setup(props: TdGuideProps, context) {
    const renderTNodeJSX = useTNodeJSX();
    const componentName = usePrefixClass('guide');
    const { globalConfig } = useConfig('guide');
    const LOCK_CLASS = usePrefixClass(`${componentName.value}--lock`);

    const { current, modelValue, hideCounter, hideSkip, steps, zIndex } = toRefs(props);
    const [innerCurrent, setInnerCurrent] = useVModel(
      current,
      modelValue,
      props.defaultCurrent,
      props.onChange,
      'current',
    );

    // 覆盖层，用于覆盖所有元素
    const overlayLayerRef = ref<HTMLElement>();
    // 高亮层，用于高亮元素
    const highlightLayerRef = ref<HTMLElement>();
    // 提示层，用于高亮元素
    const referenceLayerRef = ref<HTMLElement>();
    // 当前高亮的元素
    const currentHighlightLayerElm = ref<HTMLElement>();
    // dialog wrapper ref
    const popoverWrapperRef = ref<HTMLElement>();
    // dialog ref
    const dialogTooltipRef = ref<HTMLElement>();
    // 是否开始展示
    const actived = ref(false);
    // 步骤总数
    const stepsTotal = computed(() => steps.value.length);
    // 当前步骤的信息
    const currentStepInfo = computed<GuideStep>(() => steps.value[innerCurrent.value]);
    // 当前是否为 popover
    const isPopover = computed(() => getCurrentCrossProps('mode') === 'popover');
    const popoverVisible = ref(false);
    const stepContainer = computed(() => (isPopover.value ? TPopover : TPopup));

    const isPopoverCenter = computed(() => isPopover.value && currentStepInfo.value.placement === 'center');
    const stepProps = computed(() => {
      if (isPopover.value) {
        return {
          visible: popoverVisible.value,
          placement: isPopoverCenter.value ? 'bottom' : currentStepInfo.value.placement,
          theme: 'light',
          showArrow: false,
          ...currentStepInfo.value.popoverProps,
        } as PopoverProps;
      }
      return {
        visible: popoverVisible.value,
        zIndex: zIndex.value,
        placement: 'center',
        // destroyOnClose: true,
        class: `${componentName.value}__dialog`,
        overlayProps: {
          zIndex: zIndex.value - 1,
        },
      } as PopupProps;
    });

    // 当前元素位置状态
    const currentElmIsFixed = computed(() => isFixed(currentHighlightLayerElm.value || document.body));
    // 获取当前步骤的属性值 用户当前步骤设置 > 用户组件设置的
    const getCurrentCrossProps = <Key extends keyof GuideCrossProps>(propsName: Key) =>
      currentStepInfo.value[propsName] ?? props[propsName];

    const hWithParams = (params: Record<string, any> = { currentStepInfo: currentStepInfo.value }) => {
      // @ts-ignore
      const newH = (...args: any[]) => h(...args);
      return Object.assign(newH, params);
    };

    // highlight layer 相关
    // 获取当前步骤的用户设定的高亮内容
    const currentCustomHighlightContent = computed(() => {
      const { highlightContent } = currentStepInfo.value;

      let node: any = highlightContent;
      if (isFunction(highlightContent)) {
        // 支持函数
        node = highlightContent(hWithParams());
      } else if (context.slots.highlightContent) {
        // 支持插槽
        node = context.slots.highlightContent(hWithParams());
      } else if (context.slots['highlight-content']) {
        // 支持插槽
        node = context.slots['highlight-content'](hWithParams());
      }
      // 给自定义元素添加类名
      if (node) {
        if (!node.props) node.props = {};
        node.props.class = node.props.class || '';
      }
      return node;
    });

    // 是否展示高亮区域
    const showCustomHighlightContent = computed(() => Boolean(currentCustomHighlightContent.value && isPopover.value));

    const wrapperClass = computed(() => [
      `${componentName.value}__wrapper`,
      `${componentName.value}--${currentElmIsFixed.value ? 'fixed' : 'absolute'}`,
      {
        [`${componentName.value}__wrapper--content`]: !!currentStepInfo.value.content,
      },
    ]);
    const popoverClass = computed(() => [`${componentName.value}__reference`]);
    const contetnClass = computed(() => [`${componentName.value}__content--${isPopover.value ? 'popover' : 'dialog'}`]);
    const footerClass = computed(() => [
      `${componentName.value}__footer`,
      `${componentName.value}__footer--${isPopover.value ? 'popover' : 'dialog'}`,
    ]);

    // 设置高亮层的位置
    const setHighlightLayerPosition = (highlightLayer: HTMLElement, isReference = false) => {
      let { top, left } = getRelativePosition(currentHighlightLayerElm.value);
      let { width, height } = currentHighlightLayerElm.value.getBoundingClientRect();
      const highlightPadding = getCurrentCrossProps('highlightPadding');

      if (isPopover.value) {
        width += highlightPadding * 2;
        height += highlightPadding * 2;
        top -= highlightPadding;
        left -= highlightPadding;
      } else {
        const { scrollTop, scrollLeft } = getWindowScroll();
        top += scrollTop;
        left += scrollLeft;
      }

      const style = {
        top: `${top}px`,
        left: `${left}px`,
      };

      // 展示自定义高亮
      if (showCustomHighlightContent.value) {
        // 高亮框本身不设定宽高，引用用框的宽高设定为用户自定义的宽高
        if (isReference) {
          const { width, height } = highlightLayerRef.value.getBoundingClientRect();
          Object.assign(style, {
            width: `${width}px`,
            height: `${height}px`,
          });
        } else {
          Object.assign(style, {
            width: 'auto',
            height: 'auto',
          });
        }
      } else {
        Object.assign(style, {
          width: `${width}px`,
          height: `${height}px`,
        });
      }

      setStyle(highlightLayer, style);
    };

    const setReferenceFullW = (referenceElements: HTMLElement[]): void => {
      const style = {
        left: 0,
        width: '100vw',
      };

      referenceElements.forEach((elem) => setStyle(elem, style));
    };

    const showPopoverGuide = () => {
      nextTick(() => {
        currentHighlightLayerElm.value = getTargetElm(currentStepInfo.value.element);
        if (!currentHighlightLayerElm.value) return;
        scrollToParentVisibleArea(currentHighlightLayerElm.value);
        setHighlightLayerPosition(highlightLayerRef.value);
        setHighlightLayerPosition(popoverWrapperRef.value, true);
        setHighlightLayerPosition(referenceLayerRef.value, true);
        scrollToElm(currentHighlightLayerElm.value);
        isPopoverCenter.value && setReferenceFullW([referenceLayerRef.value, popoverWrapperRef.value]);
      });
    };

    const showDialogGuide = () => {
      nextTick(() => {
        currentHighlightLayerElm.value = getTargetElm(currentStepInfo.value.element);
        scrollToParentVisibleArea(currentHighlightLayerElm.value);
        setHighlightLayerPosition(highlightLayerRef.value);
        scrollToElm(currentHighlightLayerElm.value);
      });
    };

    const showGuide = () => {
      if (isPopover.value) {
        showPopoverGuide();
      } else {
        showDialogGuide();
      }
      nextTick(() => {
        popoverVisible.value = true;
      });
    };

    const destroyGuide = () => {
      highlightLayerRef.value?.parentNode.removeChild(highlightLayerRef.value);
      overlayLayerRef.value?.parentNode.removeChild(overlayLayerRef.value);
      removeClass(document.body, LOCK_CLASS.value);
    };

    const renderButtonContent = (buttonProps: ButtonProps, defaultContent: string) => {
      const { content } = buttonProps || {};
      return isFunction(content) ? content(h) : content || defaultContent;
    };

    const handleSkip = (e: MouseEvent) => {
      const total = stepsTotal.value;
      actived.value = false;
      setInnerCurrent(-1, { e, total });
      props.onSkip?.({ e, current: innerCurrent.value, total });
    };

    const handleNext = (e: MouseEvent) => {
      const total = stepsTotal.value;
      setInnerCurrent(innerCurrent.value + 1, { e, total });
      props.onNextStepClick?.({
        e,
        next: innerCurrent.value + 1,
        current: innerCurrent.value,
        total,
      });
    };

    const handleFinish = (e: MouseEvent) => {
      const total = stepsTotal.value;
      actived.value = false;
      setInnerCurrent(-1, { e, total });
      props.onFinish?.({ e, current: innerCurrent.value, total });
    };

    const handleBack = (e: MouseEvent) => {
      const total = stepsTotal.value;
      setInnerCurrent(0, { e, total });
      props.onBack?.({ e, current: innerCurrent.value, total });
    };

    const initGuide = () => {
      if (innerCurrent.value >= 0 && innerCurrent.value < steps.value.length) {
        if (!actived.value) {
          actived.value = true;
          addClass(document.body, LOCK_CLASS.value);
        }
        showGuide();
      }
    };

    watch(innerCurrent, (val) => {
      if (val >= 0 && val < stepsTotal.value) {
        isPopover.value && (popoverVisible.value = false);
        initGuide();
      } else {
        actived.value = false;
        destroyGuide();
      }
    });

    onMounted(() => {
      initGuide();
    });

    return () => {
      const renderOverlayLayer = () => (
        <div ref={overlayLayerRef} class={`${componentName.value}__overlay`} style={{ zIndex: zIndex.value - 2 }} />
      );

      const renderHighlightLayer = () => {
        const style = { zIndex: zIndex.value - 1 };
        const highlightClass = [
          `${componentName.value}__highlight`,
          `${componentName.value}__highlight--${isPopover.value ? 'popover' : 'dialog'}`,
          `${componentName.value}--${currentElmIsFixed.value && isPopover.value ? 'fixed' : 'absolute'}`,
        ];
        const showOverlay = getCurrentCrossProps('showOverlay');
        const maskClass = [`${componentName.value}__highlight--${showOverlay ? 'mask' : 'nomask'}`];

        return (
          <div ref={highlightLayerRef} class={[...highlightClass, ...maskClass]} style={style}>
            {showCustomHighlightContent.value && currentCustomHighlightContent.value}
          </div>
        );
      };

      const triggerElement = <div ref="referenceLayerRef" class={[...popoverClass.value]}></div>;
      const contentSlot = isPopover.value ? 'content' : 'default';

      const contentNode = () => {
        const { content } = currentStepInfo.value;
        const contentProps = {
          handleSkip,
          handleNext,
          handleFinish,
          handleBack,
          current: innerCurrent.value,
          total: stepsTotal.value,
        };
        let renderContent;
        if (isFunction(content)) {
          renderContent = () => content(hWithParams(contentProps));
        } else if (context.slots.content) {
          renderContent = context.slots.content(hWithParams(contentProps));
        } else if (content) {
          renderContent = () => <content {...contentProps} />;
        }
        return renderContent;
      };

      const renderTitle = () => {
        const functionTitle = isFunction(currentStepInfo.value.title)
          ? currentStepInfo.value.title(hWithParams())
          : undefined;
        const slotTitle = context.slots.title ? context.slots.title(hWithParams()) : undefined;
        return functionTitle || slotTitle || currentStepInfo.value.title;
      };

      const renderTooltipContent = () => {
        const title = <div class={`${componentName.value}__title`}>{renderTitle()}</div>;

        const { body } = currentStepInfo.value;
        let renderBody: any = null;
        if (isFunction(body)) {
          renderBody = body(hWithParams());
        } else if (context.slots.body) {
          renderBody = context.slots.body(hWithParams());
        } else if (typeof body === 'string') {
          renderBody = body;
        } else if (body) {
          renderBody = h(body);
        }
        const desc = <div class={`${componentName.value}__desc`}>{renderBody}</div>;
        return (
          <div class={`${componentName.value}__tooltip`}>
            {title}
            {desc}
          </div>
        );
      };

      const renderCounter = () => {
        const renderCounterContent = renderTNodeJSX('counter', {
          params: { total: stepsTotal.value, current: innerCurrent.value },
        });

        const defaultCounter = (
          <div class={`${componentName.value}__counter`}>
            {renderCounterContent || `${innerCurrent.value + 1}/${stepsTotal.value}`}
          </div>
        );
        return <>{!hideCounter.value && defaultCounter}</>;
      };

      const renderFooterAction = () => {
        const isLast = innerCurrent.value === stepsTotal.value - 1;
        const isFirst = innerCurrent.value === 0;
        const buttonSize = (isPopover.value ? 'extra-small' : 'medium') as SizeEnum;

        return (
          <div class={footerClass.value}>
            {!hideSkip.value && !isLast && (
              <TButton
                key="skip"
                class={`${componentName.value}__skip`}
                theme="light"
                size={buttonSize}
                variant="base"
                content={globalConfig.value.skip}
                onClick={handleSkip}
                {...getCurrentCrossProps('skipButtonProps')}
              />
            )}
            {!isLast && (
              <TButton
                key="next"
                class={`${componentName.value}__next`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handleNext}
                {...getCurrentCrossProps('nextButtonProps')}
              >
                {renderButtonContent(getCurrentCrossProps('nextButtonProps'), globalConfig.value.next)}
                {!hideCounter.value && renderCounter()}
              </TButton>
            )}
            {isLast && (
              <TButton
                key="back"
                class={`${componentName.value}__back`}
                theme="light"
                size={buttonSize}
                variant="base"
                content={globalConfig.value.back}
                onClick={handleBack}
                {...getCurrentCrossProps('backButtonProps')}
              />
            )}
            {isLast && (
              <TButton
                key="finish"
                class={`${componentName.value}__finish`}
                theme="primary"
                size={buttonSize}
                variant="base"
                onClick={handleFinish}
                {...props.finishButtonProps}
              >
                {renderButtonContent(props.finishButtonProps, globalConfig.value.finish)}
                {!hideCounter.value && renderCounter()}
              </TButton>
            )}
          </div>
        );
      };
      return (
        <>
          {actived.value && (
            <Teleport to="body">
              {renderOverlayLayer()}
              {renderHighlightLayer()}
              <div ref={popoverWrapperRef} class={wrapperClass.value} style={{ zIndex: zIndex.value }}>
                <component is={stepContainer.value} {...stepProps.value}>
                  {isPopover.value && <template v-slots={{ triggerElement }}>{triggerElement}</template>}
                  <template v-slots={{ [contentSlot]: contentSlot }}>
                    {/* {isPopover.value ? (
                      contentNode()
                    ) : ( */}
                    <div class={contetnClass.value}>
                      {renderTooltipContent()}
                      {renderFooterAction()}
                    </div>
                    {/* )} */}
                  </template>
                </component>
              </div>
            </Teleport>
          )}
        </>
      );
    };
  },
});
