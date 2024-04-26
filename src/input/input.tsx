import { PropType, ref, computed, defineComponent, toRefs, nextTick, watch } from 'vue';
import { CloseCircleFilledIcon as TCloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { useFocus } from '@vueuse/core';
import config from '../config';
import InputProps from './props';
import { InputValue, TdInputProps } from './type';
import { getCharacterLength, useDefault, extendAPI } from '../shared';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '@/hooks/useClass';
import { useTNodeJSX } from '@/hooks/tnode';

const { prefix } = config;
const name = `${prefix}-input`;

export default defineComponent({
  name,
  props: {
    ...InputProps,
    labelAlign: {
      type: String,
      default: 'top',
    },
    pattern: {
      type: String,
    },
    inputmode: {
      type: String as PropType<'search' | 'text' | 'none' | 'url' | 'tel' | 'email' | 'numeric' | 'decimal'>,
      validator(val: string): boolean {
        if (!val) return true;
        return ['search', 'text', 'none', 'url', 'tel', 'email', 'numeric', 'decimal'].includes(val);
      },
    },
  },
  setup(props, context) {
    const readerTNodeJSX = useTNodeJSX();
    const inputClass = usePrefixClass('input');
    const isDisabled = useFormDisabled();

    const inputRef = ref();
    const { autofocus } = toRefs(props);
    const [innerValue] = useDefault<string, TdInputProps>(props, context.emit, 'value', 'change');

    const status = props.status || 'default';

    const { focused } = useFocus(inputRef, { initialValue: props.autofocus });

    const inputClasses = computed(() => [
      `${inputClass.value}__control`,
      {
        [`${inputClass.value}--${props.align}`]: props.align !== 'left',
        [`${inputClass.value}--${status}`]: status,
        [`${inputClass.value}__control--disabled`]: isDisabled.value,
      },
    ]);

    const rootClasses = computed(() => [
      inputClass.value,
      {
        [`${inputClass.value}--layout-${props.layout}`]: props.layout,
        [`${inputClass.value}--center`]: props.labelAlign === 'center',
        [`${inputClass.value}--border`]: !props.borderless,
      },
    ]);

    const setInputValue = (v: InputValue = '') => {
      const input = inputRef.value as HTMLInputElement;
      const sV = String(v);
      if (!input) {
        return;
      }
      if (input.value !== sV) {
        input.value = sV;
      }
    };

    const handleInput = (e: Event) => {
      // 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
      if (e instanceof InputEvent) {
        const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
        if (e.isComposing || checkInputType) return;
      }
      inputValueChangeHandle(e);
    };

    const inputValueChangeHandle = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      const { allowInputOverMax, maxcharacter } = props;
      if (!allowInputOverMax && maxcharacter && maxcharacter > 0 && !Number.isNaN(maxcharacter)) {
        const { length = 0, characters = '' } = getCharacterLength(value, maxcharacter) as {
          length: number;
          characters: string;
        };
        innerValue.value = characters;
      } else {
        innerValue.value = value;
      }
      nextTick(() => setInputValue(innerValue.value));
    };

    const focus = () => {
      focused.value = true;
    };

    const blur = () => {
      focused.value = false;
      // inputRef.value?.blur();
    };

    extendAPI({ focus, blur });

    const handleClear = (e: MouseEvent) => {
      innerValue.value = '';
      focused.value = true;
      props.onClear?.({ e });
    };
    const handleFocus = (e: FocusEvent) => {
      props.onFocus?.(innerValue.value, { e });
    };
    const handleBlur = (e: FocusEvent) => {
      props.onBlur?.(innerValue.value, { e });
    };

    const handleCompositionend = (e: CompositionEvent) => {
      inputValueChangeHandle(e);
    };

    watch(autofocus, (autofocus, prevAutofocus) => {
      if (autofocus === true) {
        nextTick(() => {
          focused.value = true;
        });
      }
    });

    return () => {
      const readerPrefix = () => {
        const prefixIcon = readerTNodeJSX('prefixIcon');
        const label = readerTNodeJSX('label');

        return (
          <div class={`${inputClass.value}__wrap--prefix`}>
            {prefixIcon && <div class={`${inputClass.value}__icon--prefix`}>{prefixIcon}</div>}
            <div class={`${inputClass.value}__label`}>{label}</div>
          </div>
        );
      };
      const readerClearable = () => {
        if (props.clearable && innerValue.value && innerValue.value.length > 0) {
          return (
            <div class={`${inputClass.value}__wrap--clearable-icon`} onClick={handleClear}>
              <TCloseCircleFilledIcon />
            </div>
          );
        }
        return null;
      };
      const readerSuffix = () => {
        const suffix = readerTNodeJSX('suffix');
        if (!suffix) {
          return null;
        }
        return <div class={`${inputClass.value}__wrap--suffix`}>{suffix}</div>;
      };

      const readerSuffixIcon = () => {
        const suffixIcon = readerTNodeJSX('suffixIcon');
        if (!suffixIcon) {
          return null;
        }
        return <div class={`${inputClass.value}__wrap--suffix-icon`}>{suffixIcon}</div>;
      };

      const readerTips = () => {
        const tips = readerTNodeJSX('tips');
        if (!tips) {
          return null;
        }
        return <div class={`${inputClass.value}__tips ${inputClass.value}--${props.align}`}>{tips}</div>;
      };

      return (
        <div class={rootClasses.value}>
          {readerPrefix()}
          <div class={`${inputClass.value}__wrap`}>
            <div class={`${inputClass.value}__content ${inputClass.value}--${status || 'default'}`}>
              <input
                ref={inputRef}
                value={innerValue.value}
                name={props.name}
                class={inputClasses.value}
                type={props.type}
                disabled={isDisabled.value}
                autocomplete={props.autocomplete ? 'On' : 'Off'}
                placeholder={props.placeholder}
                readonly={props.readonly}
                maxlength={props.maxlength || -1}
                pattern={props.pattern}
                inputmode={props.inputmode}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={handleInput}
                onCompositionend={handleCompositionend}
              />
              {readerClearable()}
              {readerSuffix()}
              {readerSuffixIcon()}
            </div>
            {readerTips()}
          </div>
        </div>
      );
    };
  },
});
