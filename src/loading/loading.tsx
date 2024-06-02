import { defineComponent, computed, ref, watch, h, setBlockTracking } from 'vue';
import TGradientIcon from './icon/gradient';
import SpinnerIcon from './icon/spinner';

import config from '../config';
import props from './props';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-loading`,
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();
    const loadingClass = usePrefixClass('loading');

    const delayShowLoading = ref(false);

    const countDelay = () => {
      delayShowLoading.value = false;
      const timer = setTimeout(() => {
        delayShowLoading.value = true;
        clearTimeout(timer);
      }, props.delay);
    };

    const realLoading = computed(() => (!props.delay || delayShowLoading.value) && props.loading);

    watch(
      () => props.loading,
      (value) => {
        if (value) {
          props.delay && countDelay();
        }
      },
      {
        immediate: true,
      },
    );

    const rootClass = computed(() => [
      loadingClass.value,
      { [`${loadingClass.value}--vertical`]: props.layout === 'vertical' },
    ]);

    const textClass = computed(() => [
      `${loadingClass.value}__text`,
      {
        [`${loadingClass.value}__text--only`]: !props.indicator,
      },
    ]);

    const rootStyle = computed(() => {
      const style = [];
      if (props.inheritColor) {
        style.push('color: inherit');
      }
      if (props.size) {
        style.push(`font-size: ${props.size};`);
      }
      return style.join(';');
    });

    const defaultIndicator = {
      circular: TGradientIcon,
      spinner: SpinnerIcon,
    };

    const dotsLoading = computed(() => {
      setBlockTracking(-1);
      const node = (
        <div
          class={`${loadingClass.value}__dots`}
          style={{
            animationPlayState: props.pause ? 'paused' : '',
            animationDirection: props.reverse ? 'reverse' : '',
            animationDuration: `${props.duration}ms`,
            width: props.size,
            height: props.size,
          }}
        >
          {Array.from({ length: 3 }).map((val, i) => {
            return (
              <div
                class={`${loadingClass.value}__dot`}
                style={
                  props.duration
                    ? `animation-duration: ${props.duration / 1000}s; animation-delay: ${(props.duration * i) / 3000}s`
                    : ''
                }
              ></div>
            );
          })}
        </div>
      );
      setBlockTracking(1);
      return node;
    });

    const defaultLoading = computed(() => {
      setBlockTracking(-1);
      const TIndicator = defaultIndicator[props.theme || 'circular'];
      const node = (
        <TIndicator
          style={{
            animationPlayState: props.pause ? 'paused' : '',
            animationDirection: props.reverse ? 'reverse' : '',
            animationDuration: `${props.duration}ms`,
            width: props.size,
            height: props.size,
          }}
        />
      );

      setBlockTracking(1);
      return node;
    });

    return () => {
      const indicator = renderTNodeJSX('indicator', {
        defaultNode: props.theme === 'dots' ? dotsLoading.value : defaultLoading.value,
      });
      const text = renderTNodeJSX('text');
      const TNodeContent = renderTNodeContent('default', 'content');
      return (
        <div class={rootClass.value} style={rootStyle.value}>
          {realLoading.value && indicator}
          {text && realLoading.value && <span class={textClass.value}>{text}</span>}
          {TNodeContent}
        </div>
      );
    };
  },
});
