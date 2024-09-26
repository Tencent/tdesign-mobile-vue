import { defineComponent, computed, toRefs } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import CheckTagProps from './check-tag-props';
import { usePrefixClass } from '../hooks/useClass';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { useVModel } from '../shared';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-check-tag`,
  props: CheckTagProps,
  setup(props) {
    const tagClass = usePrefixClass('tag');
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    const contentIsArray = computed(() => {
      if (Array.isArray(props.content) && props.content.length === 2) {
        return true;
      }
      return false;
    });

    const tagClasses = computed(() => [
      `${tagClass.value}`,
      `${tagClass.value}--checkable`,
      `${tagClass.value}--${props.shape}`,
      `${tagClass.value}--${innerChecked.value ? 'primary' : 'default'}`,
      `${tagClass.value}--${props.size}`,
      `${tagClass.value}--${props.variant}`,
      {
        [`${tagClass.value}--closable`]: props.closable,
        [`${tagClass.value}--disabled`]: props.disabled,
        [`${tagClass.value}--checked`]: !props.disabled && innerChecked.value,
      },
    ]);

    const handleClick = (e: MouseEvent) => {
      if (!props.disabled) {
        props.onClick?.({ e });
        setInnerChecked(!innerChecked.value);
      }
    };

    const handleClose = (e: MouseEvent): void => {
      e.stopPropagation();
      if (!props.disabled) {
        props.onClose?.({ e });
      }
    };

    return () => {
      const icon = renderTNodeJSX('icon');

      const readerText = () => {
        if (contentIsArray.value) {
          return innerChecked.value ? props.content[0] : props.content[1];
        }

        const content = renderContent('default', 'content');

        return content;
      };

      return (
        <span class={tagClasses.value} aria-disabled={props.disabled} role="button" onClick={handleClick}>
          {icon && <span class={`${tagClass.value}__icon`}>{icon}</span>}
          <span class={`${tagClass.value}__text`}>{readerText()}</span>
          {props.closable && (
            <span class={`${tagClass.value}__icon-close`} onClick={handleClose}>
              <CloseIcon />
            </span>
          )}
        </span>
      );
    };
  },
});
