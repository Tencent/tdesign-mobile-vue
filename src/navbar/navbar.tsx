import { defineComponent, computed, getCurrentInstance } from 'vue';
import { ChevronLeftIcon as TChevronLeftIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import props from './props';
import { usePrefixClass } from '@/hooks/useClass';
import { useTNodeJSX } from '@/hooks/tnode';

const { prefix } = config;
const name = `${prefix}-navbar`;

export default defineComponent({
  name,
  components: { TChevronLeftIcon },
  props,
  emits: ['left-click', 'right-click'],
  setup(props, { slots }) {
    const navbarClass = usePrefixClass('navbar');
    const renderTNodeJSX = useTNodeJSX();
    const internalInstance = getCurrentInstance();

    const animationSuffix = props.animation ? '-animation' : '';
    const navClass = computed(() => [
      navbarClass.value,
      {
        [`${navbarClass.value}--fixed`]: props.fixed,
      },
      props.visible
        ? `${navbarClass.value}--visible${animationSuffix}`
        : `${navbarClass.value}--hide${animationSuffix}`,
    ]);

    const handleLeftClick = () => {
      props.onLeftClick?.();
    };

    const handleRightClick = () => {
      props.onRightClick?.();
    };

    return () => {
      const { fixed, titleMaxLength, title, leftArrow } = props;
      const navStyle = `position: ${fixed ? 'fixed' : 'relative'};`;

      const renderRightContent = () => {
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

      const renderCapsuleContent = () => {
        const capsuleContent = renderTNodeJSX('capsule');
        if (!capsuleContent) {
          return null;
        }
        return <div class={`${navbarClass.value}__capsule`}>{capsuleContent}</div>;
      };

      const renderTitleContent = () => {
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

        return isStringTitle ? <span class={`${navbarClass.value}__center-title`}>{titleContent}</span> : titleContent;
      };
      return (
        <div class={navClass.value} style={navStyle}>
          {fixed && <div class={`${navbarClass.value}____placeholder`}></div>}
          <div class={`${navbarClass.value}__content`}>
            <div class={`${navbarClass.value}__left`} onClick={handleLeftClick}>
              {leftArrow && <t-chevron-left-icon class={`${navbarClass.value}__left-arrow`} />}
              {renderTNodeJSX('left')}
              {renderCapsuleContent()}
            </div>
            <div class={`${navbarClass.value}__center`}>{renderTitleContent()}</div>
            {renderRightContent()}
          </div>
        </div>
      );
    };
  },
});
