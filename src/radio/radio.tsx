import { inject, computed, defineComponent, Ref } from 'vue';
import { CheckIcon, CheckCircleFilledIcon } from 'tdesign-icons-vue-next';
import { useDefault } from '../shared';
import config from '../config';
import props from './props';
import { TdRadioGroupProps, TdRadioProps } from './type';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';
import { useContent, useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-radio`,
  props,
  emits: ['update:checked', 'update:modelValue', 'change'],
  setup(props, context) {
    const renderTNodeContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const radioClass = usePrefixClass('radio');

    const [innerChecked, setInnerChecked] = useDefault<boolean, TdRadioProps>(props, context.emit, 'checked', 'change');

    const rootGroupProps = inject('rootGroupProps', {}) as TdRadioGroupProps;
    const rootGroupValue = inject('rootGroupValue', {}) as Ref;
    const rootGroupChange = inject('rootGroupChange', undefined);

    // extend radioGroup disabled props
    const groupDisabled = computed(() => rootGroupProps?.disabled);
    const isDisabled = useFormDisabled(groupDisabled);

    const radioChecked = computed(() => innerChecked.value || (props.value && props.value === rootGroupValue?.value));

    const finalBorderless = computed(() => {
      if (props.borderless == null && 'borderless' in rootGroupProps) return rootGroupProps.borderless;
      return props.borderless;
    });
    const finalPlacement = computed(() => {
      if (props.placement == null && 'placement' in rootGroupProps) return rootGroupProps.placement;
      return props.placement || 'left';
    });

    const finalAllowUncheck = computed(() => Boolean(props.allowUncheck || rootGroupProps?.allowUncheck));

    // input props attribute
    const inputProps = computed(() => ({
      name: rootGroupProps.name || props.name,
      checked: radioChecked.value,
      disabled: isDisabled.value,
      value: props.value,
    }));

    const iconContent = computed(() => {
      if (props.icon?.length === 2) {
        const iconIndex = radioChecked.value ? 0 : 1;
        return props.icon[iconIndex];
      }
      return null;
    });

    const radioClasses = computed(() => [
      `${radioClass.value}`,
      `${radioClass.value}--${finalPlacement.value}`,
      {
        [`${radioClass.value}--block`]: props.block,
      },
    ]);

    const titleClasses = computed(() => [
      `${radioClass.value}__title`,
      {
        [`${radioClass.value}__title--disabled`]: isDisabled.value,
      },
    ]);

    const iconClass = computed(() => [
      `${radioClass.value}__icon`,
      `${radioClass.value}__icon--${finalPlacement.value}`,
      {
        [`${radioClass.value}__icon--checked`]: radioChecked.value,
        [`${radioClass.value}__icon--disabled`]: isDisabled.value,
      },
    ]);

    const radioContentChange = (e: Event) => {
      e.stopPropagation();
      if (props.contentDisabled) {
        return;
      }
      radioOrgChange(e);
    };

    const radioOrgChange = (e: Event) => {
      if (isDisabled.value) {
        return;
      }
      if (rootGroupChange) {
        const value = finalAllowUncheck.value && radioChecked.value ? undefined : props.value;
        rootGroupChange(value, e);
      } else {
        const value = finalAllowUncheck.value ? !radioChecked.value : true;
        setInnerChecked(value, { e });
      }
    };

    const readerIcon = () => {
      if (radioChecked.value) {
        if (props.icon === 'circle') {
          return <CheckCircleFilledIcon class={`${radioClass.value}__icon-wrap`} />;
        }
        if (props.icon === 'line') {
          return <CheckIcon class={`${radioClass.value}__icon-wrap`} />;
        }
        if (props.icon === 'dot') {
          return (
            <div
              class={[
                `${radioClass.value}__icon-${props.icon}`,
                { [`${radioClass.value}__icon-${props.icon}--disabled`]: isDisabled.value },
              ]}
            />
          );
        }
      } else {
        if (props.icon === 'circle' || props.icon === 'dot') {
          return (
            <div
              class={[
                `${radioClass.value}__icon-circle`,
                { [`${radioClass.value}__icon-circle--disabled`]: isDisabled.value },
              ]}
            />
          );
        }
        if (props.icon === 'line') {
          return <div class="placeholder" />;
        }
      }
    };

    return () => {
      const label = renderTNodeContent('default', 'label');
      const content = renderTNodeJSX('content');
      return (
        <div class={radioClasses.value} onClick={radioOrgChange}>
          <input type="radio" class={`${radioClass.value}__original`} {...inputProps.value} />
          <div class={iconClass.value}>
            {readerIcon()}
            {iconContent.value}
          </div>
          <div class={`${radioClass.value}__content`} onClick={radioContentChange}>
            {label && (
              <span class={titleClasses.value} style={`-webkit-line-clamp: ${props.maxLabelRow}`}>
                {label}
              </span>
            )}
            {content && (
              <div
                class={[`${radioClass.value}__description`, { [`${radioClass.value}__description`]: isDisabled.value }]}
                style={`-webkit-line-clamp: ${props.maxContentRow}`}
              >
                {content}
              </div>
            )}
          </div>
          {!finalBorderless.value && (
            <div class={`${radioClass.value}__border ${radioClass.value}__border--${finalPlacement.value}`} />
          )}
        </div>
      );
    };
  },
});
