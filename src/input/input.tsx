import { PropType, ref, computed, defineComponent, nextTick, watch, inject } from 'vue';
import {
  BrowseIcon as TBrowseIcon,
  BrowseOffIcon as TBrowseOffIcon,
  CloseCircleFilledIcon as TCloseCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import config from '../config';
import InputProps from './props';
import { InputValue, TdInputProps } from './type';
import { useDefault, extendAPI } from '../shared';
import { getCharacterLength, limitUnicodeMaxLength } from '../_common/js/utils/helper';
import { FormItemInjectionKey } from '../form/const';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-input`,
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
    const renderTNodeJSX = useTNodeJSX();
    const inputClass = usePrefixClass('input');
    const isDisabled = useFormDisabled();

    const inputRef = ref();
    const [innerValue] = useDefault<string, TdInputProps>(props, context.emit, 'value', 'change');

    const status = props.status || 'default';
    const renderType = ref(props.type);
    const focused = ref(false);
    const formItem = inject(FormItemInjectionKey, undefined);

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
    const showClear = computed(() => {
      if (isDisabled.value || props.readonly === true) return false;

      if (props.clearable && innerValue.value && innerValue.value.length > 0) {
        return props.clearTrigger === 'always' || (props.clearTrigger === 'focus' && focused.value);
      }
      return false;
    });

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

    // 文本超出数量限制时，是否允许继续输入
    const getValueByLimitNumber = (inputValue: string) => {
      const { allowInputOverMax, maxlength, maxcharacter } = props;
      if (!(maxlength || maxcharacter) || allowInputOverMax || !inputValue) return inputValue;
      if (maxlength) {
        // input value could be unicode 😊
        return limitUnicodeMaxLength(inputValue, Number(maxlength));
      }
      if (maxcharacter) {
        const r = getCharacterLength(inputValue, maxcharacter);
        if (isObject(r)) {
          return r.characters;
        }
      }
    };

    const inputValueChangeHandle = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      innerValue.value = getValueByLimitNumber(value);
      nextTick(() => setInputValue(innerValue.value));
    };

    const focus = () => {
      focused.value = true;
      inputRef.value?.focus();
    };

    const blur = () => {
      focused.value = false;
      inputRef.value?.blur();
    };

    extendAPI({ focus, blur });

    const handleClear = (e: TouchEvent) => {
      e.preventDefault();
      innerValue.value = '';
      focus();
      props.onClear?.({ e });
    };

    const handleFocus = (e: FocusEvent) => {
      focused.value = true;
      props.onFocus?.(innerValue.value, { e });
    };

    const handleBlur = (e: FocusEvent) => {
      focused.value = false;
      // 失焦时处理 format
      if (isFunction(props.format)) {
        innerValue.value = props.format(innerValue.value);
        nextTick(() => {
          setInputValue(innerValue.value);
          props.onBlur?.(innerValue.value, { e });
          formItem?.handleBlur();
        });
        return;
      }

      props.onBlur?.(innerValue.value, { e });
      formItem?.handleBlur();
    };

    const handleCompositionend = (e: CompositionEvent) => {
      inputValueChangeHandle(e);
    };

    const handlePwdIconClick = () => {
      if (isDisabled.value) return;

      renderType.value = renderType.value === 'password' ? 'text' : 'password';
    };

    watch(
      () => props.autofocus,
      (v) => {
        if (v === true) {
          nextTick(() => {
            focus();
          });
        }
      },
      { immediate: true },
    );

    watch(
      () => props.type,
      (v) => {
        renderType.value = v;
      },
      { immediate: true },
    );

    return () => {
      const renderPrefix = () => {
        const prefixIcon = renderTNodeJSX('prefixIcon');
        const label = renderTNodeJSX('label');

        return (
          <div class={`${inputClass.value}__wrap--prefix`}>
            {prefixIcon && <div class={`${inputClass.value}__icon--prefix`}>{prefixIcon}</div>}
            <div class={`${inputClass.value}__label`}>{label}</div>
          </div>
        );
      };
      const renderClearable = () => {
        if (showClear.value) {
          return (
            <div class={`${inputClass.value}__wrap--clearable-icon`} onTouchend={handleClear}>
              <TCloseCircleFilledIcon />
            </div>
          );
        }

        return null;
      };
      const renderSuffix = () => {
        const suffix = renderTNodeJSX('suffix');
        if (!suffix) {
          return null;
        }
        return <div class={`${inputClass.value}__wrap--suffix`}>{suffix}</div>;
      };

      const renderSuffixIcon = () => {
        let suffixIcon = renderTNodeJSX('suffixIcon');
        if (props.type === 'password') {
          if (renderType.value === 'password') {
            suffixIcon = <TBrowseOffIcon onClick={handlePwdIconClick} />;
          } else if (renderType.value === 'text') {
            suffixIcon = <TBrowseIcon onClick={handlePwdIconClick} />;
          }
        }

        if (!suffixIcon) {
          return null;
        }
        return <div class={`${inputClass.value}__wrap--suffix-icon`}>{suffixIcon}</div>;
      };

      const renderTips = () => {
        const tips = renderTNodeJSX('tips');
        if (!tips) {
          return null;
        }
        return <div class={`${inputClass.value}__tips ${inputClass.value}--${props.align}`}>{tips}</div>;
      };

      // 参考： https://github.com/Tencent/tdesign-vue-next/issues/4413
      // 不传给 input 原生元素 maxlength，浏览器默认行为会按照 unicode 进行限制，与 maxLength API 违背
      const inputAttrs = {
        ref: inputRef,
        value: innerValue.value,
        name: props.name,
        type: renderType.value,
        disabled: isDisabled.value,
        autocomplete: props.autocomplete ? 'On' : 'Off',
        placeholder: props.placeholder,
        readonly: props.readonly,
        // maxlength: props.maxlength,
        pattern: props.pattern,
        inputmode: props.inputmode,
        spellcheck: props.spellCheck,
        enterkeyhint: props.enterkeyhint,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onInput: handleInput,
        onCompositionend: handleCompositionend,
      };

      return (
        <div class={rootClasses.value}>
          {renderPrefix()}
          <div class={`${inputClass.value}__wrap`}>
            <div class={`${inputClass.value}__content ${inputClass.value}--${status || 'default'}`}>
              <input class={inputClasses.value} {...inputAttrs} />
              {renderClearable()}
              {renderSuffix()}
              {renderSuffixIcon()}
            </div>
            {renderTips()}
          </div>
        </div>
      );
    };
  },
});
