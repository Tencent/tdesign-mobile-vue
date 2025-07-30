import { defineComponent, computed } from 'vue';
import config from '../config';
import props from './props';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
export default defineComponent({
  name: `${prefix}-link`,
  props,
  setup(props) {
    const linkClass = usePrefixClass('link');
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();
    const isDisabled = useFormDisabled();

    const linkClasses = computed(() => [
      linkClass.value,
      `${linkClass.value}--${props.theme || 'default'}`,
      `${linkClass.value}--${props.size || 'medium'}`,
      {
        [`${linkClass.value}--disabled`]: props.disabled,
        [`${linkClass.value}--underline`]: props.underline,
        [`${linkClass.value}--hover`]: props.hover && !props.disabled,
      },
    ]);

    const handleClick = (e: MouseEvent) => {
      if (props.disabled) return;
      props.onClick?.(e);
    };

    const renderContent = () => {
      const content = renderTNodeContent('default', 'content');
      return content ? <span class={[`${linkClass.value}__content`]}>{content}</span> : null;
    };

    const renderPrefixIcon = () => {
      const prefixIcon = renderTNodeJSX('prefixIcon');
      return prefixIcon ? <span class={[`${linkClass.value}__prefix-icon`]}>{prefixIcon}</span> : null;
    };

    const renderSuffixIcon = () => {
      const suffixIcon = renderTNodeJSX('suffixIcon');
      return suffixIcon ? <span class={[`${linkClass.value}__suffix-icon`]}>{suffixIcon}</span> : null;
    };

    return () => {
      return (
        <a
          class={linkClasses.value}
          aria-disabled={isDisabled.value}
          target={props.target}
          href={isDisabled.value || !props.href ? undefined : props.href}
          onClick={handleClick}
        >
          {renderPrefixIcon()}
          {renderContent()}
          {renderSuffixIcon()}
        </a>
      );
    };
  },
});
