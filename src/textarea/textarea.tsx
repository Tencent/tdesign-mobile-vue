import { computed, ref, onMounted, defineComponent, toRefs, nextTick, watch } from 'vue';
import { getCharacterLength, useVModel } from '../shared';
import config from '../config';
import TextareaProps from './props';
import { TextareaValue } from './type';
import calcTextareaHeight from '../_common/js/utils/calcTextareaHeight';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;
const name = `${prefix}-textarea`;

export default defineComponent({
  name,
  props: TextareaProps,
  setup(props, context) {
    const textareaClass = usePrefixClass('textarea');
    const renderTNodeJSX = useTNodeJSX();

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
        [`${textareaClass.value}--disabled`]: disabled.value,
        [`${textareaClass.value}--readonly`]: props.readonly,
      },
    ]);

    const disabled = useFormDisabled();
    const textareaRef = ref<HTMLTextAreaElement>();
    const textareaStyle = ref();
    const textareaLength = ref(0);
    const { value, modelValue } = toRefs(props);

    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

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
      // if (e.isComposing || e.inputType === 'insertCompositionText') return;
      textareaValueChangeHandle();
    };

    const textareaValueChangeHandle = () => {
      const textarea = textareaRef.value;

      if (
        !props.allowInputOverMax &&
        props.maxcharacter &&
        props.maxcharacter > 0 &&
        !Number.isNaN(props.maxcharacter)
      ) {
        const { length = 0, characters = '' } = getCharacterLength(textarea.value, props.maxcharacter) as {
          length: number;
          characters: string;
        };
        setInnerValue(characters);
        textareaLength.value = length;
      } else {
        setInnerValue(textarea.value);
        textareaLength.value = textarea.value.length;
      }
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
        return (
          <div class={`${textareaClass.value}__indicator`}>
            {`${textareaLength.value}/${props.maxcharacter || props.maxlength}`}
          </div>
        );
      };

      return (
        <div class={textareaClasses.value}>
          {renaderLabel()}
          <div class={`${textareaClass.value}__wrapper`}>
            <textarea
              ref={textareaRef}
              value={innerValue.value}
              class={textareaInnerClasses.value}
              style={textareaStyle.value}
              name={props.name}
              maxlength={props.maxlength}
              disabled={props.disabled}
              placeholder={props.placeholder}
              readonly={props.readonly}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onInput={handleInput}
              onCompositionend={handleCompositionend}
            />
            {readerIndicator()}
          </div>
        </div>
      );
    };
  },
});
