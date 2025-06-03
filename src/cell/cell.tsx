import { computed, defineComponent } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import { Hover } from '../shared';
import config from '../config';
import props from './props';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';
import { useContent, useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-cell`,
  directives: { Hover },
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();
    const disabled = useFormDisabled();
    const cellClass = usePrefixClass('cell');

    const cellClasses = computed(() => [
      `${cellClass.value}`,
      {
        [`${cellClass.value}--borderless`]: !props.bordered,
      },
    ]);

    const hoverDisabled = computed(() => !props.hover || disabled.value);

    const handleClick = (e: MouseEvent) => {
      if (!disabled.value) {
        props.onClick?.({ e });
      }
    };

    const renderImage = () => {
      if (typeof props.image === 'string') {
        return <img src={props.image} class={`${cellClass.value}__left-image`} />;
      }
      const image = renderTNodeJSX('image');

      return image;
    };

    const renderLeft = () => {
      const leftIcon = renderTNodeJSX('leftIcon');
      return (
        <div class={`${cellClass.value}__left`}>
          {leftIcon && <div class={`${cellClass.value}__left-icon`}>{leftIcon}</div>}
          {renderImage()}
        </div>
      );
    };
    const renderTitle = () => {
      const title = renderTNodeJSX('title');
      if (!title) {
        return null;
      }
      const description = renderTNodeJSX('description');
      return (
        <div class={`${cellClass.value}__title`}>
          <div class={`${cellClass.value}__title-text`}>
            {title}
            {props.required && <span class={`${cellClass.value}--required`}>&nbsp;*</span>}
          </div>
          {description && <div class={`${cellClass.value}__description`}>{description}</div>}
        </div>
      );
    };
    const renderRight = () => {
      const rightIcon = props.arrow ? <ChevronRightIcon /> : renderTNodeJSX('rightIcon');
      if (!rightIcon) {
        return null;
      }
      return (
        <div class={[`${cellClass.value}__right`, `${cellClass.value}__right--${props.align}`]}>
          <div class={`${cellClass.value}__right-icon`}>{rightIcon}</div>
        </div>
      );
    };

    return () => {
      const note = renderTNodeContent('default', 'note');
      return (
        <div
          v-hover={{ className: `${cellClass.value}--hover`, disabledHover: hoverDisabled.value }}
          class={cellClasses.value}
          onClick={handleClick}
        >
          {renderLeft()}
          {renderTitle()}
          {note && <div class={`${cellClass.value}__note`}>{note}</div>}
          {renderRight()}
        </div>
      );
    };
  },
});
