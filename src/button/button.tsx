import { computed, defineComponent, h, withDirectives } from 'vue';
import TLoading from '../loading';
import { Hover } from '../shared';
import ButtonProps from './props';
import { useFormDisabled } from '../form/hooks';
import { TdButtonProps } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { useContent, useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TButton',
  directives: { Hover },
  props: ButtonProps,
  setup(props, { attrs }) {
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

    const renderTag = computed(() => (!props.tag && props.href ? 'a' : props.tag || 'button'));
    const isNativeButton = computed(() => renderTag.value === 'button');
    const isAriaDisabled = computed(() => props.loading || (!isNativeButton.value && isDisabled.value));
    const shouldInterceptClick = computed(() => props.loading || (!isNativeButton.value && isDisabled.value));

    const tabIndex = computed(() => {
      if (!isDisabled.value) return '0';
      return isNativeButton.value ? undefined : '-1';
    });

    const handleDisabledClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const renderIcon = () => {
      if (props.loading) {
        return <TLoading inherit-color {...(props.loadingProps as TdButtonProps['loadingProps'])} />;
      }

      return renderTNodeJSX('icon');
    };

    const renderContent = () => {
      const content = renderTNodeContent('default', 'content');
      return <span class={`${buttonClass.value}__content`}>{content}</span>;
    };

    return () => {
      const suffix = renderTNodeJSX('suffix');

      return withDirectives(
        h(
          renderTag.value,
          {
            ...attrs,
            class: buttonClasses.value,
            role: isNativeButton.value ? undefined : 'button',
            type: isNativeButton.value ? props.type : undefined,
            disabled: isNativeButton.value ? isDisabled.value : undefined,
            'aria-disabled': isAriaDisabled.value || undefined,
            href: props.href || undefined,
            tabindex: tabIndex.value,
            form: isNativeButton.value ? props.form : undefined,
            onClick: shouldInterceptClick.value ? handleDisabledClick : props.onClick,
          },
          [renderIcon(), renderContent(), suffix],
        ),
        [[Hover, { className: `${buttonClass.value}--hover`, disabledHover: hoverDisabled.value }]],
      );
    };
  },
});
