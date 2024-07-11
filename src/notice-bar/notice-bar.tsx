import { reactive, ref, toRefs, computed, onMounted, nextTick, defineComponent, watch } from 'vue';
import { InfoCircleFilledIcon, CheckCircleFilledIcon } from 'tdesign-icons-vue-next';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import { Swiper as TSwiper, SwiperItem as TSwiperItem } from '../swiper';
import props from './props';
import { NoticeBarTrigger, NoticeBarMarquee } from './type';
import config from '../config';
import { useVModel } from '../shared';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const iconDefault = {
  info: <InfoCircleFilledIcon />,
  success: <CheckCircleFilledIcon />,
  warning: <InfoCircleFilledIcon />,
  error: <InfoCircleFilledIcon />,
};
export default defineComponent({
  name: `${prefix}-notice-bar`,
  props,
  setup(props) {
    const noticeBarClass = usePrefixClass('notice-bar');
    const renderTNodeJSX = useTNodeJSX();
    // 初始化数据
    const state = reactive({
      duration: 0,
      offset: 0,
      listWidth: 0,
      itemWidth: 0,
      timer: null,
      nextTimer: null,
      scroll: {
        marquee: false,
        speed: 50,
        loop: -1, // 值为 -1 表示循环播放，值为 0 表示不循环播放
        delay: 0,
      },
    });

    const rootClasses = computed(() => [`${noticeBarClass.value}`, `${noticeBarClass.value}--${props.theme}`]);

    // click
    function handleClick(trigger: NoticeBarTrigger) {
      props.onClick?.(trigger);
    }
    // 动画 i
    const animateStyle = computed(() => ({
      transform: state.offset ? `translateX(${state.offset}px)` : '',
      transitionDuration: `${state.duration}s`,
      transitionTimingFunction: 'linear',
    }));

    const listDOM = ref();
    const itemDOM = ref();

    const { visible, modelValue } = toRefs(props);
    const [isShow, setStatusValue] = useVModel(visible, modelValue, props.defaultVisible);
    function handleScrolling() {
      if (!props?.marquee || (isObject(props?.marquee) && (props?.marquee as NoticeBarMarquee))?.loop === 0) {
        return;
      }
      // 初始化动画参数
      if (typeof props.marquee === 'boolean') {
        state.scroll = { ...state.scroll, marquee: props.marquee };
      }
      if (isObject(props.marquee)) {
        const marquee = props.marquee as NoticeBarMarquee;
        state.scroll = {
          marquee: true,
          loop: typeof marquee?.loop === 'undefined' ? state.scroll.loop : marquee.loop,
          speed: marquee.speed ?? state.scroll.speed,
          delay: marquee.delay ?? state.scroll.delay,
        };
      }

      // 设置动画
      setTimeout(() => {
        const listDOMWidth = listDOM.value?.getBoundingClientRect().width;
        const itemDOMWidth = itemDOM.value?.getBoundingClientRect().width;
        if (itemDOMWidth >= listDOMWidth) {
          state.offset = -itemDOMWidth;
          state.duration = itemDOMWidth / state.scroll.speed;
          state.listWidth = listDOMWidth;
          state.itemWidth = itemDOMWidth;
        }
      }, state.scroll.delay);
    }
    // 动画结束后，初始化动画
    function handleTransitionend() {
      // 触发再次滚的
      state.scroll.loop = --state.scroll.loop;
      if (state.scroll.loop === 0) {
        state.scroll = {
          ...state.scroll,
          marquee: false,
        };
        return;
      }
      state.offset = state.listWidth;
      state.duration = 0;

      setTimeout(() => {
        state.offset = -state.itemWidth;
        state.duration = (state.itemWidth + state.listWidth) / state.scroll.speed;
      }, 0);
    }
    onMounted(() => {
      nextTick(() => {
        if (isShow.value) {
          handleScrolling();
        }
      });
    });
    watch(
      () => isShow.value,
      () => {
        nextTick(() => {
          if (isShow.value) {
            state.offset = state.listWidth;
            state.duration = 0;
            handleScrolling();
          }
        });
      },
    );

    return () => {
      if (isShow.value) {
        // prefixIcon
        const renderPrefixIcon = () => {
          const prefixIconContent = renderTNodeJSX('prefixIcon', { defaultNode: iconDefault[props.theme || 'info'] });
          if (props.prefixIcon && prefixIconContent) {
            return (
              <div class={`${noticeBarClass.value}__prefix-icon`} onClick={() => handleClick('prefix-icon')}>
                {prefixIconContent}
              </div>
            );
          }
        };
        // content
        const renderContent = () => {
          const renderShowContent = () => {
            const showContent = renderTNodeJSX('content');
            if (!showContent) {
              return null;
            }
            return showContent;
          };
          const renderOperationContent = () => {
            const operationContent = renderTNodeJSX('operation');
            if (!operationContent) {
              return null;
            }
            return (
              <span
                class={`${noticeBarClass.value}__operation`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleClick('operation');
                }}
              >
                {operationContent}
              </span>
            );
          };
          return (
            <div ref={listDOM} class={`${noticeBarClass.value}__content-wrap`} onClick={() => handleClick('content')}>
              {props.direction === 'vertical' && isArray(props.content) ? (
                <div>
                  <TSwiper
                    autoplay
                    loop
                    direction="vertical"
                    duration={2000}
                    height={22}
                    class={`${noticeBarClass.value}__content--vertical`}
                  >
                    {props.content.map((item, index) => (
                      <TSwiperItem key={index}>
                        <div class={`${noticeBarClass.value}__content--vertical-item`}>{item}</div>
                      </TSwiperItem>
                    ))}
                  </TSwiper>
                </div>
              ) : (
                <div
                  ref={itemDOM}
                  class={[
                    `${noticeBarClass.value}__content`,
                    !state.scroll.marquee ? `${noticeBarClass.value}__content-wrapable` : '',
                  ]}
                  style={state.scroll.marquee ? animateStyle.value : ''}
                  onTransitionend={handleTransitionend}
                >
                  {renderShowContent()}
                  {renderOperationContent()}
                </div>
              )}
            </div>
          );
        };
        const renderSuffixIconContent = () => {
          const suffixIconContent = renderTNodeJSX('suffixIcon');
          if (!suffixIconContent) {
            return null;
          }
          return (
            <div class={`${noticeBarClass.value}__suffix-icon`} onClick={() => handleClick('suffix-icon')}>
              {suffixIconContent}
            </div>
          );
        };
        return (
          <div class={rootClasses.value}>
            {renderPrefixIcon()}
            {renderContent()}
            {renderSuffixIconContent()}
          </div>
        );
      }
      return null;
    };
  },
});
