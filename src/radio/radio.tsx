import { inject, computed, defineComponent, getCurrentInstance, Ref, toRefs } from 'vue';
import { CheckIcon, CheckCircleFilledIcon } from 'tdesign-icons-vue-next';

import { NOOP, useVModel } from '../shared';
import config from '../config';
import props from './props';
import { RadioValue, TdRadioGroupProps } from './type';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';
import { useContent, useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-radio`,
  props,
  setup(props) {
    const renderTNodeContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const radioClass = usePrefixClass('radio');

    const { checked, modelValue, block } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    const rootGroupProps = inject('rootGroupProps', {}) as TdRadioGroupProps;
    const rootGroupValue = inject('rootGroupValue', {}) as Ref;
    const rootGroupChange = inject('rootGroupChange', NOOP) as (val: RadioValue, e: Event) => void;

    // extend radioGroup disabled props
    const groupDisabled = computed(() => rootGroupProps?.disabled);
    const formDisabled = useFormDisabled(groupDisabled);

    const isDisabled = computed(() => {
      if (formDisabled.value == null && 'disabled' in rootGroupProps) return rootGroupProps.disabled;
      return formDisabled.value;
    });
    const radioChecked = computed(() => innerChecked.value || props.value === rootGroupValue?.value);
    const finalBorderless = computed(() => {
      if (props.borderless == null && 'borderless' in rootGroupProps) return rootGroupProps.borderless;
      return props.borderless;
    });
    const finalPlacement = computed(() => {
      if (props.placement == null && 'placement' in rootGroupProps) return rootGroupProps.placement;
      return props.placement || 'left';
    });

    const finalAllowUncheck = computed(() => {
      if (props.allowUncheck == null && 'allowUncheck' in rootGroupProps) return rootGroupProps.allowUncheck;
      return props.allowUncheck;
    });

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
        [`${radioClass.value}--block`]: block.value,
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
        rootGroupChange(finalAllowUncheck.value && radioChecked.value ? '' : props.value, e);
      } else {
        if (!finalAllowUncheck.value && radioChecked.value) return;
        setInnerChecked(!radioChecked.value, { e });
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
