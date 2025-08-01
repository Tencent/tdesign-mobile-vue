import { computed, ref, onMounted, defineComponent, toRefs, nextTick, watch, inject } from 'vue';
import useLengthLimit from '../hooks/useLengthLimit';
import config from '../config';
import props from './props';
import { TextareaValue } from './type';
import calcTextareaHeight from '../_common/js/utils/calcTextareaHeight';
import { FormItemInjectionKey } from '../form/const';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';
import useVModel from '../hooks/useVModel';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-textarea`,
  props,
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const isDisabled = useFormDisabled();
    const formItem = inject(FormItemInjectionKey, undefined);

    const textareaClass = usePrefixClass('textarea');

    const textareaClasses = computed(() => [
      `${textareaClass.value}`,
      {
        [`${textareaClass.value}--layout-${props.layout}`]: props.layout,
        [`${textareaClass.value}--border`]: props.bordered,
      },
    ]);
    const textareaInnerClasses = computed(() => [
      `${textareaClass.value}__wrapper-inner`,
      {
        [`${textareaClass.value}--disabled`]: isDisabled.value,
        [`${textareaClass.value}--readonly`]: props.readonly,
      },
    ]);

    const textareaRef = ref<HTMLTextAreaElement>();
    const textareaStyle = ref();
    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const limitParams = computed(() => ({
      value: [undefined, null].includes(innerValue.value) ? undefined : String(innerValue.value),
      maxlength: Number(props.maxlength),
      maxcharacter: props.maxcharacter,
      allowInputOverMax: props.allowInputOverMax,
    }));

    const { limitNumber, getValueByLimitNumber } = useLengthLimit(limitParams);

    const setInputValue = (v: TextareaValue = '') => {
      const input = textareaRef.value;
      const sV = String(v);
      if (!input) {
        return;
      }
      if (input.value !== sV) {
        input.value = sV;
      }
    };

    const adjustTextareaHeight = () => {
      if (props.autosize === true) {
        textareaStyle.value = calcTextareaHeight(textareaRef.value);
      } else if (props.autosize === false) {
        textareaStyle.value = calcTextareaHeight(textareaRef.value, 1, 1);
      } else if (typeof props.autosize === 'object') {
        const { minRows, maxRows } = props.autosize;
        textareaStyle.value = calcTextareaHeight(textareaRef.value, minRows, maxRows);
      } else if (context.attrs.rows) {
        textareaStyle.value = { height: 'auto', minHeight: 'auto' };
      }
    };

    const handleInput = (e: Event) => {
      if (e instanceof InputEvent) {
        if (e.isComposing || e.inputType === 'insertCompositionText') return;
      }
      textareaValueChangeHandle();
    };

    const textareaValueChangeHandle = () => {
      const textarea = textareaRef.value;

      setInnerValue(getValueByLimitNumber(textarea.value));

      nextTick(() => setInputValue(innerValue.value));
      adjustTextareaHeight();
    };

    const handleCompositionend = (e: InputEvent | CompositionEvent) => {
      textareaValueChangeHandle();
    };

    const handleFocus = (e: FocusEvent) => {
      props.onFocus?.(innerValue.value, { e });
    };
    const handleBlur = (e: FocusEvent) => {
      formItem?.handleBlur();
      props.onBlur?.(innerValue.value, { e });
    };

    onMounted(() => {
      if (props.autofocus) {
        textareaRef.value?.focus();
      }
      textareaValueChangeHandle();
      adjustTextareaHeight();
    });

    watch(innerValue, () => {
      nextTick(() => {
        adjustTextareaHeight();
      });
    });
    watch(
      () => props.autosize,
      () => {
        adjustTextareaHeight();
      },
    );

    return () => {
      const renaderLabel = () => {
        const label = renderTNodeJSX('label');
        return label ? <div class={`${textareaClass.value}__label`}>{label}</div> : null;
      };
      const readerIndicator = () => {
        const isShowIndicator = props.indicator && (props.maxcharacter || props.maxlength);
        if (!isShowIndicator) {
          return null;
        }
        return <div class={`${textareaClass.value}__indicator`}> {limitNumber.value}</div>;
      };

      const textareaAttrs = {
        ref: textareaRef,
        class: textareaInnerClasses.value,
        style: textareaStyle.value,
        value: innerValue.value,
        name: props.name,
        // maxlength: props.maxlength,
        disabled: isDisabled.value,
        placeholder: props.placeholder,
        readonly: props.readonly,
        autofocus: props.autofocus,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onInput: handleInput,
        onCompositionend: handleCompositionend,
      };

      return (
        <div class={textareaClasses.value}>
          {renaderLabel()}
          <div class={`${textareaClass.value}__wrapper`}>
            <textarea {...textareaAttrs} />
            {readerIndicator()}
          </div>
        </div>
      );
    };
  },
});
