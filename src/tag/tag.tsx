import { computed, defineComponent } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import config from '../config';
import TagProps from './props';

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
    const baseClass = name;
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const tagStyle = computed(() => {
      return props.maxWidth
        ? { maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth }
        : {};
    });

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--${props.theme}`,
      `${baseClass}--${props.shape}`,
      `${baseClass}--${props.variant}`,
      `${baseClass}--${props.size}`,
      {
        [`${prefix}-is-closable ${baseClass}--closable`]: props.closable,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: props.disabled,
      },
    ]);

    const onClickClose = (e: MouseEvent): void => {
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
          class={classes.value}
          style={tagStyle.value}
          aria-disabled={props.disabled}
          role="button"
          onClick={handleClick}
        >
          <span class={`${baseClass}__icon`}>{icon}</span>
          <span class={`${baseClass}__text`}>{tagContent}</span>
          {props.closable && (
            <span class={`${baseClass}__icon-close`} onClick={onClickClose}>
              <close-icon />
            </span>
          )}
        </span>
      );
    };
  },
});
