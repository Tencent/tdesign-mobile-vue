import { provide, computed, defineComponent, toRefs } from 'vue';
import config from '../config';
import props from './checkbox-group-props';
import Checkbox from './checkbox';
import { CheckboxGroupValue, TdCheckboxGroupProps, TdCheckboxProps } from './type';
import { useDefault } from '../shared';
import { getOptions, setCheckAllStatus } from './hooks';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export interface Child {
  value: string | number;
}

export default defineComponent({
  name: `${prefix}-checkbox-group`,
  components: {
    Checkbox,
  },
  props,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props: any, context) {
    const checkboxGroupClass = usePrefixClass('checkbox-group');
    const renderTNodeJSX = useTNodeJSX();
    const { isArray } = Array;
    const [innerValue, setInnerValue] = useDefault<CheckboxGroupValue, TdCheckboxGroupProps>(
      props,
      context.emit,
      'value',
      'change',
    );
    const optionList = getOptions(props, context.slots);
    const checkedSet = computed(() => {
      if (isArray(innerValue.value)) {
        return new Set(innerValue.value);
      }
      return new Set();
    });
    const checkAllStatus = setCheckAllStatus(optionList, innerValue, checkedSet);
    const maxExceeded = computed(() => {
      return props.max !== undefined && innerValue.value.length === props.max;
    });

    const onCheckedChange = (p: { checked: boolean; checkAll: boolean; e: Event; option: TdCheckboxProps }) => {
      const { checked, checkAll, e } = p;
      if (checkAll) {
        onCheckAllChange(checked, { e });
      } else {
        handleCheckboxChange(p);
      }
    };

    const handleCheckboxChange = (data: { checked: boolean; e: Event; option: TdCheckboxProps }) => {
      const currentValue = data.option.value;
      if (isArray(innerValue.value)) {
        if (currentValue === undefined) {
          return;
        }
        const val = [...innerValue.value];
        if (data.checked) {
          val.push(currentValue);
        } else {
          const i = val.indexOf(currentValue);
          val.splice(i, 1);
        }
        setInnerValue(val, {
          e: data.e,
          current: data.option.value,
          type: data.checked ? 'check' : 'uncheck',
        });
      } else {
        console.warn(`TDesign CheckboxGroup Warn: \`value\` must be an array, instead of ${typeof innerValue.value}`);
      }
    };
    const getAllCheckboxValue = (): CheckboxGroupValue => {
      const val = new Set<NonNullable<TdCheckboxProps['value']>>();
      for (let i = 0, len = optionList.value.length; i < len; i++) {
        const item = optionList.value[i];
        if (item.checkAll) continue;
        if (item.value === undefined) continue;
        val.add(item.value);
        if (maxExceeded.value) break;
      }
      return [...val];
    };
    const onCheckAllChange = (checked: boolean, context: { e: Event; source?: 't-checkbox' }) => {
      const value = checked ? getAllCheckboxValue() : [];
      setInnerValue(value, {
        e: context.e,
        type: checked ? 'check' : 'uncheck',
        current: undefined,
      });
    };

    provide('checkboxGroup', {
      ...toRefs(props),
      innerValue,
      checkAllStatus,
      checkedSet,
      onCheckedChange,
    });
    return () => {
      const checkboxNode = () => {
        return (
          <span>
            {optionList.value.map((item, idx) => (
              <checkbox
                key={idx}
                name={item.name || ''}
                label={item.label || item.text || ''}
                value={item.value}
                check-all={item.checkAll}
                block={item.block || true}
                checked={item.checked || false}
                content={item.content || ''}
                content-disabled={item.contentDisabled || false}
                icon={item.icon || 'circle'}
                indeterminate={item.indeterminate || false}
                disabled={item.disabled}
                max-content-row={item.maxContentRow || 5}
                max-label-row={item.maxLabelRow || 3}
                readonly={item.readonly || false}
                placement={item.placement || 'left'}
              />
            ))}
          </span>
        );
      };
      return (
        <div class={`${checkboxGroupClass.value}`}>
          {!(props.options && props.options.length) ? renderTNodeJSX('default') : checkboxNode()}
        </div>
      );
    };
  },
});
