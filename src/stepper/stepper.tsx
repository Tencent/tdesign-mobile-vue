import { toRefs, computed, defineComponent } from 'vue';
import { AddIcon, RemoveIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import props from './props';
import { useDefault, formatNumber } from '../shared';
import { TdStepperProps } from './type';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
export default defineComponent({
  name: `${prefix}-stepper`,
  props,
  setup(props, context) {
    const stepperClass = usePrefixClass('stepper');

    const [stepperValue] = useDefault<TdStepperProps['value'], TdStepperProps>(props, context.emit, 'value', 'change');
    const disabled = useFormDisabled();
    const { min, max, step, integer } = toRefs(props);
    const inputStyle = computed(() => (props.inputWidth ? { width: `${props.inputWidth}px` } : ''));

    const isDisabled = (type: 'minus' | 'plus') => {
      if (disabled.value) return true;
      if (type === 'minus' && Number(stepperValue.value) <= min.value) {
        return true;
      }
      if (type === 'plus' && Number(stepperValue.value) >= max.value) {
        return true;
      }
      return false;
    };

    const getLen = (num: number) => {
      const numStr = num.toString();
      return numStr.indexOf('.') === -1 ? 0 : numStr.split('.')[1].length;
    };

    /**
     * 精确加法
     */
    const add = (a: number, b: number) => {
      const maxLen = Math.max(getLen(a), getLen(b));
      const base = 10 ** maxLen;
      return Math.round(a * base + b * base) / base;
    };

    const formatValue = (value: number) => {
      return Math.max(Math.min(max.value, value, Number.MAX_SAFE_INTEGER), min.value, Number.MIN_SAFE_INTEGER).toFixed(
        Math.max(getLen(step.value), getLen(value)),
      );
    };

    const updateValue = (value: TdStepperProps['value']) => {
      stepperValue.value = formatNumber(`${value}`, !integer.value);
    };

    const plusValue = () => {
      if (isDisabled('plus')) {
        props.onOverlimit?.('plus');
        return;
      }
      updateValue(formatValue(add(Number(stepperValue.value), step.value)));
    };

    const minusValue = () => {
      if (isDisabled('minus')) {
        props.onOverlimit?.('minus');
        return;
      }
      updateValue(formatValue(add(Number(stepperValue.value), -step.value)));
    };

    const handleInput = (e: Event) => {
      const value = formatNumber((e.target as HTMLTextAreaElement).value, !integer.value);
      stepperValue.value = value;
    };

    const handleChange = () => {
      const formattedValue = formatValue(Number(stepperValue.value));
      updateValue(formattedValue);
    };

    const handleFocus = () => {
      props.onFocus?.(Number(stepperValue.value));
    };

    const handleBlur = () => {
      props.onBlur?.(Number(stepperValue.value));
    };

    return () => {
      return (
        <div class={[`${stepperClass.value}`, `${stepperClass.value}--${props.size}`]}>
          <div
            class={[
              `${stepperClass.value}__minus`,
              `${stepperClass.value}__minus--${props.theme}`,
              `${stepperClass.value}__icon--${props.size}`,
              `${
                disabled.value || Number(stepperValue.value) <= props.min
                  ? `${stepperClass.value}--${props.theme}-disabled`
                  : ''
              }`,
            ]}
            onClick={minusValue}
          >
            <RemoveIcon class={`${stepperClass.value}__minus-icon`} />
          </div>
          <input
            v-model={stepperValue}
            class={[
              `${stepperClass.value}__input`,
              `${stepperClass.value}__input--${props.theme}`,
              `${stepperClass.value}__input--${props.size}`,
              `${disabled.value ? `${stepperClass.value}--${props.theme}-disabled` : ''}`,
            ]}
            type={integer.value ? 'tel' : 'text'}
            inputmode={integer.value ? 'numeric' : 'decimal'}
            style={inputStyle.value}
            disabled={props.disableInput || disabled.value}
            readonly={props.disableInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={handleInput}
            onChange={handleChange}
          />
          <div
            class={[
              `${stepperClass.value}__plus`,
              `${stepperClass.value}__plus--${props.theme}`,
              `${stepperClass.value}__icon--${props.size}`,
              `${
                disabled.value || Number(stepperValue.value) >= props.max
                  ? `${stepperClass.value}--${props.theme}-disabled`
                  : ''
              }`,
            ]}
            onClick={plusValue}
          >
            <AddIcon class={`${stepperClass.value}__plus-icon`} />
          </div>
        </div>
      );
    };
  },
});
