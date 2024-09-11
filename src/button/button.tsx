import { computed, defineComponent } from 'vue';
import TLoading from '../loading';
import { Hover } from '../shared';
import ButtonProps from './props';
import config from '../config';
import { useFormDisabled } from '../form/hooks';
import { TdButtonProps } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { useContent, useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-button`,
  directives: { Hover },
  props: ButtonProps,
  setup(props) {
    const buttonClass = usePrefixClass('button');
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();
    const isDisabled = useFormDisabled();

    const hoverDisabled = computed(() => isDisabled.value || props.loading);

    const buttonClasses = computed(() => [
      `${buttonClass.value}`,
      `${buttonClass.value}--size-${props.size}`,
      `${buttonClass.value}--${props.variant}`,
      {
        [`${buttonClass.value}--${props.theme}`]: props.theme,
        [`${buttonClass.value}--${props.shape}`]: props.shape,
        [`${buttonClass.value}--ghost`]: props.ghost,
        [`${buttonClass.value}--block`]: props.block,
        [`${buttonClass.value}--disabled`]: isDisabled.value,
        [`${buttonClass.value}--loading`]: props.loading,
      },
    ]);

    const handleClick = (e: MouseEvent) => {
      if (!props.loading && !isDisabled.value) {
        props.onClick?.(e);
      } else {
        e.stopPropagation();
      }
    };

    return () => {
      const suffix = renderTNodeJSX('suffix');

      const readerIcon = () => {
        if (props.loading) {
          return <TLoading inherit-color {...(props.loadingProps as TdButtonProps['loadingProps'])} />;
        }

        return renderTNodeJSX('icon');
      };

      const readerContent = () => {
        const content = renderTNodeContent('default', 'content');
        return <span class={`${buttonClass.value}__content`}>{content}</span>;
      };
      return (
        <button
          class={buttonClasses.value}
          role="button"
          type={props.type}
          disabled={isDisabled.value}
          aria-disabled={isDisabled.value}
          onClick={handleClick}
          v-hover={{ className: `${buttonClass.value}--hover`, disabledHover: hoverDisabled.value }}
        >
          {readerIcon()}
          {readerContent()}
          {suffix}
        </button>
      );
    };
  },
});
