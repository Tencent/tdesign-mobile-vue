import { SearchIcon as TSearchIcon, CloseCircleFilledIcon as TIconClear } from 'tdesign-icons-vue-next';
import { ref, computed, defineComponent, nextTick, h, Fragment } from 'vue';
import { useFocus } from '@vueuse/core';
import config from '../config';
import { preventDefault } from '../shared/dom';
import searchProps from './props';
import { useDefault } from '../shared/useDefault';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';
import { TdSearchProps } from './type';
import { ENTER_REG } from '../_common/js/common';
import { getCharacterLength } from '../shared';
import TCell from '../cell/cell';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-search`,
  props: searchProps,
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const searchClass = usePrefixClass('search');

    const isShowResultList = ref(false);
    const isShowAction = ref(false);
    const inputRef = ref<HTMLInputElement>();
    const { focused } = useFocus(inputRef, { initialValue: props.focus });
    const [searchValue] = useDefault<TdSearchProps['value'], TdSearchProps>(props, context.emit, 'value', 'change');

    const boxClasses = computed(() => [
      `${searchClass.value}__input-box`,
      `${searchClass.value}__input-box--${props.shape}`,
      {
        [`${prefix}-is-focused`]: focused.value,
      },
    ]);

    const inputClasses = computed(() => [
      `${prefix}-input__keyword`,
      { [`${searchClass.value}--center`]: props.center },
    ]);

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
      const { maxcharacter } = props;
      if (maxcharacter && maxcharacter > 0 && !Number.isNaN(maxcharacter)) {
        const { characters = '' } = getCharacterLength(value, maxcharacter) as {
          characters: string;
        };
        searchValue.value = characters;
      } else {
        searchValue.value = value;
      }
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
      searchValue.value = '';
      focused.value = true;
      props.onClear?.({ e });
    };

    const handleFocus = (e: FocusEvent) => {
      isShowAction.value = true;
      props.onFocus?.({ value: searchValue.value, e });
    };

    const handleBlur = (e: FocusEvent) => {
      isShowAction.value = false;
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
        if (props.clearable && searchValue.value) {
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
        if (action && isShowAction.value) {
          return (
            <button class={`${searchClass.value}__search-action ${prefix}-class-action`} onClick={handleAction}>
              {action}
            </button>
          );
        }
        return null;
      };

      const onSelectResultItem = (params: { item: string }) => {
        isShowResultList.value = false;
        searchValue.value = params.item;
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

      return (
        <div>
          <div class={`${searchClass.value}`}>
            <div class={boxClasses.value}>
              {readerLeftIcon()}
              <input
                ref={inputRef}
                maxlength={props.maxLength || -1}
                value={searchValue.value}
                type="search"
                class={inputClasses.value}
                autofocus={props.focus}
                placeholder={props.placeholder}
                readonly={props.readonly}
                disabled={props.disabled}
                onKeypress={handleSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={handleInput}
                onCompositionend={handleCompositionend}
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
