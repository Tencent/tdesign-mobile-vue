import { computed, defineComponent } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import config from '../config';
import TagProps from './props';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-tag`;

export default defineComponent({
  name,
  components: {
    CloseIcon,
  },
  props: TagProps,
  emits: ['close', 'click'],
  setup(props) {
    const tagClass = usePrefixClass('tag');
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const tagStyle = computed(() => {
      return props.maxWidth
        ? { maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth }
        : {};
    });

    const tagClasses = computed(() => [
      `${tagClass.value}`,
      `${tagClass.value}--${props.theme}`,
      `${tagClass.value}--${props.shape}`,
      `${tagClass.value}--${props.variant}`,
      `${tagClass.value}--${props.size}`,
      {
        [`${tagClass.value}--closable`]: props.closable,
        [`${tagClass.value}--disabled`]: props.disabled,
      },
    ]);

    const handleClose = (e: MouseEvent): void => {
      e.stopPropagation();
      if (!props.disabled) {
        props.onClose?.({ e });
      }
    };

    const handleClick = (e: MouseEvent): void => {
      if (!props.disabled) {
        props.onClick?.({ e });
      }
    };

    return () => {
      // 标签内容
      const tagContent = renderContent('default', 'content');
      // 图标
      const icon = renderTNodeJSX('icon');
      return (
        <span
          class={tagClasses.value}
          style={tagStyle.value}
          aria-disabled={props.disabled}
          role="button"
          onClick={handleClick}
        >
          {icon && <span class={`${tagClass.value}__icon`}>{icon}</span>}
          <span class={`${tagClass.value}__text`}>{tagContent}</span>
          {props.closable && (
            <span class={`${tagClass.value}__icon-close`} onClick={handleClose}>
              <close-icon />
            </span>
          )}
        </span>
      );
    };
  },
});
