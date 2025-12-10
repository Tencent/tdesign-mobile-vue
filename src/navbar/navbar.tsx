import { defineComponent, computed, CSSProperties } from 'vue';
import { ChevronLeftIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import props from './props';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-navbar`,
  props,
  emits: ['left-click', 'right-click'],
  setup(props, { slots }) {
    const classPrefix = usePrefixClass();
    const navbarClass = usePrefixClass('navbar');
    const renderTNodeJSX = useTNodeJSX();

    const animationSuffix = computed(() => (props.animation ? '-animation' : ''));
    const navClass = computed(() => [
      navbarClass.value,
      {
        [`${navbarClass.value}--fixed`]: props.fixed,
        [`${classPrefix.value}-safe-area-top`]: props.safeAreaInsetTop,
      },
      props.visible
        ? `${navbarClass.value}--visible${animationSuffix.value}`
        : `${navbarClass.value}--hide${animationSuffix.value}`,
    ]);

    const styles = computed<CSSProperties>(() => ({
      zIndex: props.zIndex,
    }));

    const handleLeftClick = () => {
      props.onLeftClick?.();
    };

    const handleRightClick = () => {
      props.onRightClick?.();
    };

    return () => {
      const { fixed, placeholder, titleMaxLength, title, leftArrow } = props;

      const renderRight = () => {
        const rightContent = renderTNodeJSX('right');
        if (!rightContent) {
          return null;
        }
        return (
          <div class={`${navbarClass.value}__right`} onClick={handleRightClick}>
            {rightContent}
          </div>
        );
      };

      const renderLeftArrow = () => {
        if (leftArrow) {
          return <ChevronLeftIcon class={`${navbarClass.value}__left-arrow`} />;
        }
        return null;
      };

      const renderCapsuleContent = () => {
        const capsuleContent = renderTNodeJSX('capsule');
        if (!capsuleContent) {
          return null;
        }
        return <div class={`${navbarClass.value}__capsule`}>{capsuleContent}</div>;
      };

      const renderLeft = () => {
        return (
          <div class={`${navbarClass.value}__left`} onClick={handleLeftClick}>
            {renderLeftArrow()}
            {renderTNodeJSX('left')}
            {renderCapsuleContent()}
          </div>
        );
      };

      const renderCenter = () => {
        const isStringTitle = typeof title === 'string' && !slots.title;
        let titleContent = renderTNodeJSX('title');
        if (!titleContent) {
          return null;
        }
        if (titleMaxLength != null && title) {
          if (titleMaxLength <= 0) {
            console.warn('titleMaxLength must be greater than 0');
          } else {
            titleContent = title.length <= titleMaxLength ? title : `${(title as string).slice(0, titleMaxLength)}...`;
          }
        }

        const finalTitle = isStringTitle ? (
          <span class={`${navbarClass.value}__center-title`}>{titleContent}</span>
        ) : (
          titleContent
        );
        return <div class={`${navbarClass.value}__center`}>{finalTitle}</div>;
      };

      const renderPlaceholder = () => {
        if (fixed && placeholder) {
          return <div class={`${navbarClass.value}__placeholder`}></div>;
        }
        return null;
      };

      return (
        <div class={navClass.value} style={styles.value}>
          {renderPlaceholder()}
          <div class={`${navbarClass.value}__content`}>
            {renderLeft()}
            {renderCenter()}
            {renderRight()}
          </div>
        </div>
      );
    };
  },
});
