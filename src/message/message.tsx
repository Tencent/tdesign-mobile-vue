import { h, ref, computed, watch, defineComponent, toRefs, reactive, nextTick, onMounted, Transition } from 'vue';
import { CheckCircleFilledIcon, CloseIcon, InfoCircleFilledIcon } from 'tdesign-icons-vue-next';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

import Link from '../link';
import props from './props';
import { MessageMarquee, TdMessageProps } from './type';
import config from '../config';
import { useVModel } from '../shared';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX, useContent } from '../hooks/tnode';

const { prefix } = config;
const iconDefault = {
  info: h(InfoCircleFilledIcon),
  success: h(CheckCircleFilledIcon),
  warning: h(InfoCircleFilledIcon),
  error: h(InfoCircleFilledIcon),
};
const closeBtnDefault = h(CloseIcon);

export default defineComponent({
  name: `${prefix}-message`,
  props,
  setup(props, context) {
    const messageClass = usePrefixClass('message');
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    // 初始化动画相关数据
    const state = reactive({
      duration: 0,
      offset: 0,
      listWidth: 0,
      itemWidth: 0,
      scroll: {
        marquee: false,
        speed: 50,
        loop: -1, // 值为 -1 表示循环播放，值为 0 表示不循环播放
        delay: 300,
      },
    });

    const { visible, modelValue } = toRefs(props);
    const [currentVisible, setVisible] = useVModel(visible, modelValue, props.defaultVisible);

    const rootClasses = computed(() => ({
      [`${messageClass.value}`]: true,
      [`${messageClass.value}--${props.theme}`]: true,
      [`${messageClass.value}-align--${props.align}`]: !!props.align,
    }));

    const textWrapClasses = computed(() => ({
      [`${messageClass.value}__text-wrap`]: true,
      [`${messageClass.value}__text-nowrap`]: props.marquee,
    }));

    const changeNumToStr = (arr: TdMessageProps['offset'] = []) => {
      return arr.map(function (item) {
        return typeof item === 'number' ? `${item}px` : item;
      });
    };

    const getMessageStylesOffset = (offset: TdMessageProps['offset']) => {
      const arr = changeNumToStr(offset);
      return {
        top: arr[0],
        right: arr[1],
        left: arr[1],
      };
    };

    const rootStyles = computed(() => {
      const { offset } = props;
      const offsetStyle: any = offset ? getMessageStylesOffset(offset) : [];
      return {
        zIndex: props.zIndex,
        ...offsetStyle,
      };
    });

    // link
    const linkContent = computed(() => {
      if (typeof props.link === 'function' || context.slots?.link) {
        return renderTNodeJSX('link');
      }

      if (isObject(props.link) || isString(props.link)) {
        const _link = isObject(props.link) ? { ...props.link } : { content: props.link };
        return h(Link, { theme: 'primary', ..._link });
      }
      return null;
    });

    // 动画
    const animateStyle = computed(() => ({
      transform: state.offset ? `translateX(${state.offset}px)` : '',
      transitionDuration: `${state.duration}s`,
      transitionTimingFunction: 'linear',
    }));

    const textWrapDOM = ref();
    const textDOM = ref();

    const handleScrolling = () => {
      if (!props?.marquee || (isObject(props?.marquee) && (props?.marquee as MessageMarquee))?.loop === 0) {
        return;
      }

      const { loop, speed, delay } = state.scroll;

      state.scroll = {
        marquee: true,
        // 负数统一当作循环播放
        loop: Math.max(
          props.marquee === true || (props.marquee as MessageMarquee)?.loop == null
            ? loop
            : (props.marquee as MessageMarquee)?.loop,
          -1,
        ),
        // 速度必须为正数
        speed: Math.max(
          props.marquee === true || (props.marquee as MessageMarquee)?.speed == null
            ? speed
            : (props.marquee as MessageMarquee)?.speed,
          1,
        ),
        // 延迟不可为负数
        delay: Math.max(
          props.marquee === true || (props.marquee as MessageMarquee)?.delay == null
            ? delay
            : (props.marquee as MessageMarquee)?.delay,
          0,
        ),
      };
      state.offset = 0;

      // 设置动画
      setTimeout(() => {
        const textWrapDOMWidth = textWrapDOM.value?.getBoundingClientRect().width;
        const textDOMWidth = textDOM.value?.getBoundingClientRect().width;
        state.offset = -textDOMWidth;
        state.duration = textDOMWidth / state.scroll.speed;
        state.listWidth = textWrapDOMWidth;
        state.itemWidth = textDOMWidth;
      }, state.scroll.delay);
    };

    // 动画结束后，初始化动画
    const handleTransitionend = () => {
      resetTransition();

      if (state.scroll.loop === -1) {
        return;
      }

      state.scroll.loop = --state.scroll.loop;

      if (state.scroll.loop === 0) {
        state.scroll.marquee = false;
      }
    };

    const resetTransition = () => {
      state.duration = 0;
      state.offset = state.listWidth;

      setTimeout(() => {
        state.offset = -state.itemWidth;
        state.duration = (state.itemWidth + state.listWidth) / state.scroll.speed;
      }, 0);
    };

    const onLinkClick = (e: MouseEvent) => {
      props.onLinkClick?.({ e });
    };

    const onCloseBtnClick = (e: MouseEvent) => {
      props.onCloseBtnClick?.({ e });
      setVisible(false);
    };

    const handleDuration = () => {
      if (props.duration > 0) {
        setTimeout(() => {
          props.onDurationEnd?.();
          setVisible(false);
        }, props.duration);
      }
    };

    onMounted(() => {
      nextTick(() => {
        if (currentVisible.value) {
          handleScrolling();
        }
      });
    });

    watch(
      () => currentVisible.value,
      (val) => {
        if (val === false) return;
        setVisible(true);
        handleDuration();
        nextTick(handleScrolling);
      },
    );

    return () => {
      const prefixIconContent = renderTNodeJSX('icon', { defaultNode: iconDefault?.[props.theme || 'info'] });
      const computedContent = renderContent('default', 'content');
      const closeBtnContent = renderTNodeJSX('closeBtn', { defaultNode: closeBtnDefault });

      return (
        <Transition name="message">
          {currentVisible.value && (
            <div ref="root" class={rootClasses.value} style={rootStyles.value}>
              {prefixIconContent && <div class={`${messageClass.value}__icon--left`}>{prefixIconContent}</div>}
              <div ref={textWrapDOM} class={textWrapClasses.value}>
                <div
                  ref={textDOM}
                  class={`${messageClass.value}__text`}
                  style={state.scroll.marquee ? animateStyle.value : ''}
                  onTransitionend={handleTransitionend}
                >
                  {computedContent}
                </div>
              </div>
              {linkContent.value && (
                <div class={`${messageClass.value}__link`} onClick={onLinkClick}>
                  {linkContent.value}
                </div>
              )}
              {closeBtnContent && (
                <div
                  class={[`${messageClass.value}__close-wrap`, `${messageClass.value}__icon--right`]}
                  onClick={onCloseBtnClick}
                >
                  {closeBtnContent}
                </div>
              )}
            </div>
          )}
        </Transition>
      );
    };
  },
});
