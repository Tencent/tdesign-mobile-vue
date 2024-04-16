import { defineComponent, computed } from 'vue';
import config from '../config';
import LinkProps from './props';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-link`;
export default defineComponent({
  name,
  props: LinkProps,
  setup(props) {
    const linkClass = usePrefixClass('link');
    const renderTNodeJSX = useTNodeJSX();

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
      const content = renderTNodeJSX('default', 'content');
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
          aria-disabled={props.disabled}
          target={props.target}
          href={props.disabled || !props.href ? undefined : props.href}
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
