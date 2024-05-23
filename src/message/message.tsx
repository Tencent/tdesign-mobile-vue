import {
  h,
  ref,
  computed,
  watch,
  defineComponent,
  getCurrentInstance,
  toRefs,
  reactive,
  nextTick,
  onMounted,
  Transition,
} from 'vue';
import { CheckCircleFilledIcon, CloseIcon, InfoCircleFilledIcon } from 'tdesign-icons-vue-next';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

import Link from '../link';
import messageProps from './props';
import { DrawMarquee, TdMessageProps } from './type';
import config from '../config';
import { renderContent, renderTNode, TNode, useVModel } from '../shared';

const { prefix } = config;
const name = `${prefix}-message`;

const iconDefault = {
  info: h(InfoCircleFilledIcon),
  success: h(CheckCircleFilledIcon),
  warning: h(InfoCircleFilledIcon),
  error: h(InfoCircleFilledIcon),
};

const closeBtnDefault = h(CloseIcon);

export default defineComponent({
  name,
  components: { TNode },
  props: messageProps,
  emits: ['durationEnd', 'closeBtnClick', 'update:value'],
  setup(props, context) {
    const internalInstance = getCurrentInstance();

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
      [name]: true,
      [`${name}--${props.theme}`]: true,
      [`${name}-align--${props.align}`]: !!props.align,
    }));

    const textWrapClasses = computed(() => ({
      [`${name}__text-wrap`]: true,
      [`${name}__text-nowrap`]: props.marquee,
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

    const prefixIconContent = computed(() =>
      renderTNode(internalInstance, 'icon', { defaultNode: iconDefault?.[props.theme || 'info'] }),
    );
    // content
    const computedContent = computed(() => renderContent(internalInstance, 'default', 'content'));

    // closeBtn
    const closeBtnContent = computed(() => renderTNode(internalInstance, 'closeBtn', { defaultNode: closeBtnDefault }));

    // link
    const linkContent = computed(() => {
      if (typeof props.link === 'function' || context.slots?.link) {
        return renderTNode(internalInstance, 'link');
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
      if (!props?.marquee || (isObject(props?.marquee) && (props?.marquee as DrawMarquee))?.loop === 0) {
        return;
      }

      const { loop, speed, delay } = state.scroll;

      state.scroll = {
        marquee: true,
        // 负数统一当作循环播放
        loop: Math.max(
          props.marquee === true || (props.marquee as DrawMarquee)?.loop == null
            ? loop
            : (props.marquee as DrawMarquee)?.loop,
          -1,
        ),
        // 速度必须为正数
        speed: Math.max(
          props.marquee === true || (props.marquee as DrawMarquee)?.speed == null
            ? speed
            : (props.marquee as DrawMarquee)?.speed,
          1,
        ),
        // 延迟不可为负数
        delay: Math.max(
          props.marquee === true || (props.marquee as DrawMarquee)?.delay == null
            ? delay
            : (props.marquee as DrawMarquee)?.delay,
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

    const onCloseBtnClick = () => {
      props.onCloseBtnClick?.();
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
      const renderPrefixIconContent = computed(() =>
        prefixIconContent.value ? <div class={`${name}__icon--left`}>{prefixIconContent.value}</div> : '',
      );

      const renderTextWrapDOM = computed(() => (
        <div ref={textWrapDOM} class={textWrapClasses.value}>
          <div
            ref={textDOM}
            class={`${name}__text`}
            style={state.scroll.marquee ? animateStyle.value : ''}
            onTransitionend={handleTransitionend}
          >
            {computedContent.value ?? ''}
          </div>
        </div>
      ));

      const renderLinkContent = computed(() =>
        linkContent.value ? (
          <div class={`${name}__link`} onClick={onLinkClick}>
            {linkContent.value}
          </div>
        ) : (
          ''
        ),
      );

      const renderCloseBtnContent = computed(() =>
        closeBtnContent.value ? (
          <div class={[`${name}__close-wrap`, `${name}__icon--right`]} onClick={onCloseBtnClick}>
            {closeBtnContent.value}
          </div>
        ) : (
          ''
        ),
      );

      const renderMessageContent = computed(() =>
        currentVisible.value ? (
          <div ref="root" class={rootClasses.value} style={rootStyles.value}>
            {renderPrefixIconContent.value}
            {renderTextWrapDOM.value}
            {renderLinkContent.value}
            {renderCloseBtnContent.value}
          </div>
        ) : (
          ''
        ),
      );

      return <Transition name="message">{renderMessageContent.value}</Transition>;
    };
  },
});
