import { SearchIcon as TSearchIcon, CloseCircleFilledIcon as TIconClear } from 'tdesign-icons-vue-next';
import { ref, toRefs, computed, defineComponent, nextTick, h } from 'vue';
import { useFocus } from '@vueuse/core';
import config from '../config';
import { preventDefault } from '../shared/dom';
import searchProps from './props';
import useVModel from '../hooks/useVModel';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';
import useLengthLimit from '../hooks/useLengthLimit';
import { TdSearchProps } from './type';
import { ENTER_REG } from '../_common/js/common';
import TCell from '../cell/cell';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-search`,
  props: searchProps,
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const classPrefix = usePrefixClass();
    const searchClass = usePrefixClass('search');

    const isShowResultList = ref(false);
    const inputRef = ref<HTMLInputElement>();
    const { focused } = useFocus(inputRef, { initialValue: props.focus });

    const { value, modelValue } = toRefs(props);
    const [searchValue, setSearchValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const boxClasses = computed(() => [
      `${searchClass.value}__input-box`,
      `${searchClass.value}__input-box--${props.shape}`,
      {
        [`${classPrefix.value}-is-focused`]: focused.value,
      },
    ]);

    const inputClasses = computed(() => [
      `${classPrefix.value}-input__keyword`,
      { [`${searchClass.value}--center`]: props.center },
    ]);

    const limitParams = computed(() => ({
      value: [undefined, null].includes(searchValue.value) ? undefined : String(searchValue.value),
      maxlength: Number(props.maxlength),
      maxcharacter: props.maxcharacter,
      allowInputOverMax: false,
    }));

    const { getValueByLimitNumber } = useLengthLimit(limitParams);

    const setInputValue = (v: TdSearchProps['value']) => {
      const input = inputRef.value;
      const sV = String(v);
      if (!input) {
        return;
      }
      if (input.value !== sV) {
        input.value = sV;
      }
    };

    const inputValueChangeHandle = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      setSearchValue(getValueByLimitNumber(value));
      nextTick(() => setInputValue(searchValue.value));
    };

    const handleInput = (e: Event) => {
      isShowResultList.value = true;
      if (e instanceof InputEvent) {
        // 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
        const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
        if (e.isComposing || checkInputType) return;
      }
      inputValueChangeHandle(e);
    };

    const handleClear = (e: MouseEvent) => {
      setSearchValue('');
      focused.value = true;
      props.onClear?.({ e });
    };

    const handleFocus = (e: FocusEvent) => {
      props.onFocus?.({ value: searchValue.value, e });
    };

    const handleBlur = (e: FocusEvent) => {
      props.onBlur?.({ value: searchValue.value, e });
    };

    const handleCompositionend = (e: CompositionEvent) => {
      inputValueChangeHandle(e);
    };

    const handleAction = (e: MouseEvent) => {
      props.onActionClick?.({ e });
    };

    const handleSearch = (e: KeyboardEvent) => {
      // 如果按的是 enter 键, 13是 enter
      if (ENTER_REG.test(e.code) || ENTER_REG.test(e.key)) {
        preventDefault(e, false);
        inputRef.value?.blur();
        props.onSubmit?.({ value: searchValue.value, e });
      }
    };

    return () => {
      const readerLeftIcon = () => {
        const leftIcon = renderTNodeJSX('leftIcon');
        if (leftIcon === 'search') {
          return <TSearchIcon size="24px" />;
        }
        return renderTNodeJSX('leftIcon');
      };
      const readerClear = () => {
        if (
          props.clearable &&
          searchValue.value &&
          (props.clearTrigger === 'always' || (props.clearTrigger === 'focus' && focused.value))
        ) {
          return (
            <div class={`${searchClass.value}__clear`} onClick={handleClear}>
              <TIconClear size="24" />
            </div>
          );
        }
        return null;
      };
      const readerAction = () => {
        const action = renderTNodeJSX('action');
        if (action) {
          return (
            <div class={`${searchClass.value}__search-action ${classPrefix.value}-class-action`} onClick={handleAction}>
              {action}
            </div>
          );
        }
        return null;
      };

      const onSelectResultItem = (params: { item: string }) => {
        isShowResultList.value = false;
        setSearchValue(params.item);
      };

      const highlightSearchValue = (item: string, searchValue: string) => {
        const parts = item.split(new RegExp(`(${searchValue})`, 'gi'));
        return parts.map((part, index) =>
          part.toLowerCase() === searchValue.toLowerCase() ? (
            <span key={index} class={`${searchClass.value}__result-item--highLight`}>
              {part}
            </span>
          ) : (
            part
          ),
        );
      };

      const listNodes = (params: { item: string; index: number }) => {
        return h(
          TCell,
          {
            key: params.index,
            class: `${searchClass.value}__result-item`,
            onClick: () => onSelectResultItem({ item: params.item }),
          },
          {
            title: () => highlightSearchValue(params.item, searchValue.value),
          },
        );
      };

      const extraProps = {
        enterkeyhint: 'search',
      };

      return (
        <div>
          <div class={`${searchClass.value}`}>
            <div class={boxClasses.value}>
              {readerLeftIcon()}
              <input
                ref={inputRef}
                value={searchValue.value}
                type="search"
                class={inputClasses.value}
                style={{ '--td-search-cursor-color': props.cursorColor }}
                autofocus={props.focus}
                placeholder={props.placeholder}
                readonly={props.readonly}
                disabled={props.disabled}
                onKeypress={handleSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={handleInput}
                onCompositionend={handleCompositionend}
                {...extraProps}
              />
              {readerClear()}
            </div>
            {readerAction()}
          </div>
          {isShowResultList.value && (
            <div class={`${searchClass.value}__result-list`}>
              {props.resultList.map((item, index) => listNodes({ item, index }))}
            </div>
          )}
        </div>
      );
    };
  },
});
