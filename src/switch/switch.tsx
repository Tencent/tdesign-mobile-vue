import { computed, defineComponent, h, toRefs } from 'vue';
import { isArray, isFunction, isString } from 'lodash-es';
import TLoading from '../loading';
import useToggle from '../hooks/useToggle';
import config from '../config';
import props from './props';
import { SwitchValue, TdSwitchProps } from './type';
import { useFormDisabled } from '../form/hooks';
import useVModel from '../hooks/useVModel';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-switch`,
  props,
  setup(props, context) {
    const switchClass = usePrefixClass('switch');

    const disabled = useFormDisabled();
    const switchValues = props.customValue || [true, false];

    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const { state, toggle } = useToggle<SwitchValue>(switchValues, innerValue.value);
    const checked = computed(() => innerValue.value === switchValues[0]);
    const switchClasses = computed(() => [
      `${switchClass.value}`,
      `${switchClass.value}--${props.size}`,
      {
        [`${switchClass.value}--checked`]: checked.value,
        [`${switchClass.value}--disabled`]: disabled.value || props.loading,
      },
    ]);
    const dotClasses = computed(() => [
      `${switchClass.value}__dot`,
      `${switchClass.value}__dot--${props.size}`,
      {
        [`${switchClass.value}__dot--checked`]: checked.value,
        [`${switchClass.value}__dot--plain`]: props.label?.length !== 2 && props.icon?.length !== 2 && !props.loading,
        [`${switchClass.value}__dot--disabled`]: disabled.value || props.loading,
      },
    ]);
    const labelClasses = computed(() => [
      `${switchClass.value}__label`,
      `${switchClass.value}__label--${props.size}`,
      {
        [`${switchClass.value}__label--checked`]: checked.value,
      },
    ]);
    const iconContent = computed(() => props.icon[checked.value ? 0 : 1]);

    function handleToggle(event: Event) {
      event.preventDefault();
      if (disabled.value || props.loading) {
        return;
      }

      if (state.value === innerValue.value) {
        toggle();
      }

      setInnerValue(state.value);
    }

    const renderContent = () => {
      if (props.loading) {
        return <TLoading class={`${switchClass.value}__loading`} size="16px" />;
      }

      if (isArray(props.label) && props.label.length === 2) {
        const label = checked.value ? props.label[0] : props.label[1];
        if (isString(label)) {
          return label;
        }
        if (isFunction(label)) {
          return label(h);
        }
      }

      if (isFunction(props.label)) {
        return props.label(h, { value: innerValue.value });
      }
      if (context.slots.label) {
        return context.slots.label({ value: innerValue.value });
      }

      return iconContent.value;
    };

    return () => {
      return (
        <div class={switchClasses.value} onClick={handleToggle}>
          <div class={dotClasses.value}>
            <div class={labelClasses.value}>{renderContent()}</div>
          </div>
        </div>
      );
    };
  },
});
