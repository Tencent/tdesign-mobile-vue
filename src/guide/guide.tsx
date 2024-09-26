import { computed, defineComponent, ref, toRefs, h, nextTick, onMounted, watch, Teleport } from 'vue';
import isFunction from 'lodash/isFunction';
import TPopover, { PopoverProps } from '../popover';
import TPopup, { PopupProps } from '../popup';
import TButton, { ButtonProps } from '../button';
import config from '../config';
import { useVModel } from '../shared';
import { addClass, getWindowScroll, removeClass } from '../shared/dom';
import setStyle from '../_common/js/utils/set-style';
import guideProps from './props';
import { GuideStep, TdGuideProps } from './type';
import { isFixed, getRelativePosition, getTargetElm, scrollToParentVisibleArea, scrollToElm } from './utils';
import { GuideCrossProps } from './interface';
import { SizeEnum } from '../common';
import { usePrefixClass, useConfig } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-guide`,
  components: {
    TPopover,
    TButton,
    TPopup,
  },
  props: guideProps,
  setup(props: TdGuideProps, context) {
    const { current, modelValue, finishButtonProps, hideCounter, hideSkip, steps, zIndex } = toRefs(props);
    const [innerCurrent, setInnerCurrent] = useVModel(
      current,
      modelValue,
      props.defaultCurrent,
      props.onChange,
      'current',
    );

    const { globalConfig } = useConfig('guide');
    const guideClass = usePrefixClass('guide');

    const LOCK_CLASS = `${guideClass.value}--lock`;

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
    // 是否开始展示
    const actived = ref(false);
    // 步骤总数
    const stepsTotal = computed(() => steps.value.length);
    // 当前步骤的信息
    const currentStepInfo = computed<GuideStep>(() => steps.value[innerCurrent.value]);
    // 当前是否为 popover
    const isPopover = computed(() => getCurrentCrossProps('mode') === 'popover');
    const popoverVisible = ref(false);
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
        class: `${guideClass.value}__dialog`,
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

    const showOverlay = computed(() => getCurrentCrossProps('showOverlay'));

    const highlightClass = computed(() => [
      `${guideClass.value}__highlight`,
      `${guideClass.value}__highlight--${isPopover.value ? 'popover' : 'dialog'}`,
      `${guideClass.value}--${currentElmIsFixed.value && isPopover.value ? 'fixed' : 'absolute'}`,
    ]);
    const maskClass = computed(() => [`${guideClass.value}__highlight--${showOverlay.value ? 'mask' : 'nomask'}`]);
    const wrapperClass = computed(() => [
      `${guideClass.value}__wrapper`,
      `${guideClass.value}--${currentElmIsFixed.value ? 'fixed' : 'absolute'}`,
      {
        [`${guideClass.value}__wrapper--content`]: !!currentStepInfo.value.content,
      },
    ]);
    const popoverClass = computed(() => [`${guideClass.value}__reference`]);
    const contetnClass = computed(() => [`${guideClass.value}__content--${isPopover.value ? 'popover' : 'dialog'}`]);
    const footerClass = computed(() => [
      `${guideClass.value}__footer`,
      `${guideClass.value}__footer--${isPopover.value ? 'popover' : 'dialog'}`,
    ]);

    const isLast = computed(() => innerCurrent.value === stepsTotal.value - 1);
    const buttonSize = computed(() => (isPopover.value ? 'extra-small' : 'medium') as SizeEnum);

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
      removeClass(document.body, LOCK_CLASS);
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

    const contentProps = computed(() => ({
      handleSkip,
      handleNext,
      handleFinish,
      handleBack,
      current: innerCurrent.value,
      total: stepsTotal.value,
    }));

    const initGuide = () => {
      if (innerCurrent.value >= 0 && innerCurrent.value < steps.value.length) {
        if (!actived.value) {
          actived.value = true;
          addClass(document.body, LOCK_CLASS);
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
      const renderStepContent = () => {
        const renderTitleNode = () => {
          const { title } = currentStepInfo.value;
          let renderTitle: any = null;
          if (isFunction(title)) {
            renderTitle = title(hWithParams());
          } else if (context.slots.title) {
            renderTitle = context.slots.title(hWithParams());
          } else if (typeof title === 'string') {
            renderTitle = title;
          } else if (title) {
            renderTitle = h(title);
          }
          return renderTitle;
        };
        const renderBodyNode = () => {
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
          return renderBody;
        };
        const renderCounterNode = () => {
          const params = {
            total: stepsTotal.value,
            current: innerCurrent.value,
          };
          let renderCounter: any = null;
          const { counter } = props;
          if (isFunction(counter)) {
            renderCounter = counter(h, params);
          } else if (context.slots.counter) {
            renderCounter = context.slots.counter(hWithParams(params));
          } else if (counter) {
            renderCounter = h(counter, params);
          }
          return renderCounter || ` (${innerCurrent.value + 1}/${stepsTotal.value})`;
        };
        return (
          <div class={contetnClass.value}>
            <div class={`${guideClass.value}__tooltip`}>
              <div class={`${guideClass.value}__title`}>{renderTitleNode()}</div>
              <div class={`${guideClass.value}__desc`}>{renderBodyNode()}</div>
            </div>
            <div class={footerClass.value}>
              {!hideSkip.value && !isLast.value && (
                <TButton
                  key="skip"
                  class={`${guideClass.value}__skip`}
                  theme="light"
                  size={buttonSize.value}
                  variant="base"
                  content={globalConfig.value.skip}
                  {...getCurrentCrossProps('skipButtonProps')}
                  onClick={handleSkip}
                />
              )}
              {!isLast.value && (
                <TButton
                  key="next"
                  class={`${guideClass.value}__next`}
                  theme="primary"
                  size={buttonSize.value}
                  variant="base"
                  {...getCurrentCrossProps('nextButtonProps')}
                  onClick={handleNext}
                >
                  {{
                    content: () => (
                      <>
                        {renderButtonContent(getCurrentCrossProps('nextButtonProps'), globalConfig.value.next)}
                        {!hideCounter.value && renderCounterNode()}
                      </>
                    ),
                  }}
                </TButton>
              )}
              {isLast.value && (
                <TButton
                  key="back"
                  class={`${guideClass.value}__back`}
                  theme="light"
                  size={buttonSize.value}
                  variant="base"
                  content={globalConfig.value.back}
                  {...getCurrentCrossProps('backButtonProps')}
                  onClick={handleBack}
                ></TButton>
              )}
              {isLast.value && (
                <TButton
                  key="finish"
                  class={`${guideClass.value}__finish`}
                  theme="primary"
                  size={buttonSize.value}
                  variant="base"
                  {...(finishButtonProps.value ?? {})}
                  onClick={handleFinish}
                >
                  {{
                    content: () => (
                      <>
                        {renderButtonContent(finishButtonProps.value, globalConfig.value.finish)}
                        {!hideCounter.value && renderCounterNode()}
                      </>
                    ),
                  }}
                </TButton>
              )}
            </div>
          </div>
        );
      };
      const renderContentNode = () => {
        const { content } = currentStepInfo.value;
        let renderContent;
        if (isFunction(content)) {
          renderContent = content(hWithParams(contentProps.value));
        } else if (context.slots.content) {
          renderContent = context.slots.content(hWithParams(contentProps.value));
        } else if (content) {
          renderContent = h(content, contentProps.value);
        }
        return renderContent;
      };
      const renderPopover = () => {
        return (
          <TPopover {...(stepProps.value as PopoverProps)}>
            {{
              triggerElement: () =>
                isPopover.value && <div ref={referenceLayerRef} class={[...popoverClass.value]}></div>,
              content: () => (isPopover.value && renderContentNode() ? renderContentNode() : renderStepContent()),
            }}
          </TPopover>
        );
      };
      const renderPopup = () => {
        return (
          <TPopup {...(stepProps.value as PopupProps)}>
            {{
              default: () => (isPopover.value && renderContentNode() ? renderContentNode() : renderStepContent()),
            }}
          </TPopup>
        );
      };
      const renderCurrentCustomHighlightContentNode = () => {
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
      };
      return (
        <>
          {actived.value && (
            <Teleport to="body">
              <div
                ref={overlayLayerRef}
                class={`${guideClass.value}__overlay`}
                style={{ zIndex: `${zIndex.value - 2}` }}
              ></div>
              <div
                ref={highlightLayerRef}
                class={[...highlightClass.value, ...maskClass.value]}
                style={{ zIndex: `${zIndex.value - 1}` }}
              >
                {showCustomHighlightContent.value && renderCurrentCustomHighlightContentNode()}
              </div>
              <div ref={popoverWrapperRef} class={wrapperClass.value} style={{ zIndex: zIndex.value }}>
                {isPopover.value ? renderPopover() : renderPopup()}
              </div>
            </Teleport>
          )}
        </>
      );
    };
  },
});
