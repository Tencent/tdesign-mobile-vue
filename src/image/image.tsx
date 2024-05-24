import { ref, computed, defineComponent, watchEffect } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { CloseIcon } from 'tdesign-icons-vue-next';

import Loading from '@/loading';
import config from '@/config';
import { useTNodeJSX } from '@/hooks/tnode';
import { usePrefixClass } from '@/hooks/useClass';

import ImageProps from './props';

const { prefix } = config;
const name = `${prefix}-image`;

export default defineComponent({
  name,
  components: { CloseIcon, Loading },
  props: ImageProps,
  setup(props, context) {
    const imageClass = usePrefixClass('image');
    const renderTNodeJSX = useTNodeJSX();

    // 默认loading和error状态展示，slot支持Node和Function
    const closeIcon = <CloseIcon size="22px" />;
    const LoadingIcon = <Loading theme="dots" inheritColor={true} />;

    // 记录图片的loading、error状态
    const isLoading = ref(true);
    const isError = ref(false);

    // 图片自定义样式
    const imageStyles = computed(() => ({
      objectFit: props.fit,
      objectPosition: props.position,
    }));
    const imageClasses = computed(() => ({
      [`${imageClass.value}`]: true,
      [`${imageClass.value}--${props.shape}`]: true,
    }));

    // 图片懒加载
    const imageDOM = ref();
    const realSrc = ref('');

    watchEffect(() => {
      realSrc.value = props.lazy ? '' : props.src;
    });

    const { stop } = useIntersectionObserver(imageDOM, ([{ isIntersecting }], observerElement) => {
      if (isIntersecting && props.lazy) {
        // 停止监听
        stop();
        realSrc.value = props.src;
      }
    });

    // 图片加载完成回调
    const handleImgLoadCompleted = (e: Event) => {
      props.onLoad?.({ e });
      isLoading.value = false;
    };

    // 图片加载失败回调
    const handleImgLoadError = (e: Event) => {
      if (realSrc.value === '') {
        return;
      }
      props.onError?.({ e });
      isLoading.value = false;
      isError.value = true;
    };

    return () => {
      const statusContent = () => {
        if (context.slots?.loading && isLoading.value) {
          return renderTNodeJSX('loading');
        }
        if (!context.slots?.loading && isLoading.value) {
          return LoadingIcon;
        }
        if (context.slots?.error && isError.value) {
          return renderTNodeJSX('error');
        }
        if (!context.slots?.error && isError.value) {
          return closeIcon;
        }
        return '';
      };

      return (
        <div class={imageClasses.value}>
          {(isLoading.value || isError.value) && <div class={`${name}__mask`}>{statusContent()}</div>}
          <picture>
            {props.srcset &&
              Object.entries(props.srcset).map((item, index) => <source key={index} type={item[0]} srcset={item[1]} />)}
            <img
              ref="imageDOM"
              class={`${name}__img`}
              style={imageStyles.value}
              src={realSrc.value}
              alt={props.alt}
              onLoad={handleImgLoadCompleted}
              onError={handleImgLoadError}
            />
          </picture>
        </div>
      );
    };
  },
});
