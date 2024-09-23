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
    const readerTNodeJSX = useTNodeJSX();
    const readerTNodeContent = useContent();
    const disabled = useFormDisabled();
    const cellClass = usePrefixClass('cell');

    const cellClasses = computed(() => [
      `${cellClass.value}`,
      `${cellClass.value}--${props.align}`,
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

    const readerImage = () => {
      if (typeof props.image === 'string') {
        return <img src={props.image} class={`${cellClass.value}__left-image`} />;
      }
      const image = readerTNodeJSX('image');

      return image;
    };

    const readerLeft = () => {
      const leftIcon = readerTNodeJSX('leftIcon');
      return (
        <div class={`${cellClass.value}__left`}>
          {leftIcon && <div class={`${cellClass.value}__left-icon`}>{leftIcon}</div>}
          {readerImage()}
        </div>
      );
    };
    const readerTitle = () => {
      const title = readerTNodeJSX('title');
      if (!title) {
        return null;
      }
      const description = readerTNodeJSX('description');
      return (
        <div class={`${cellClass.value}__title`}>
          {title}
          {props.required && <span class={`${cellClass.value}--required`}>&nbsp;*</span>}
          {description && <div class={`${cellClass.value}__description`}>{description}</div>}
        </div>
      );
    };
    const readerRight = () => {
      const rightIcon = props.arrow ? <ChevronRightIcon /> : readerTNodeJSX('rightIcon');
      if (!rightIcon) {
        return null;
      }
      return (
        <div class={`${cellClass.value}__right`}>
          <div class={`${cellClass.value}__right-icon`}>{rightIcon}</div>
        </div>
      );
    };

    return () => {
      const note = readerTNodeContent('default', 'note');
      return (
        <div
          v-hover={{ className: `${cellClass.value}--hover`, disabledHover: hoverDisabled.value }}
          class={cellClasses.value}
          onClick={handleClick}
        >
          {readerLeft()}
          {readerTitle()}
          {note && <div class={`${cellClass.value}__note`}>{note}</div>}
          {readerRight()}
        </div>
      );
    };
  },
});
