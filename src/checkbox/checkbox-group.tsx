import { provide, computed, defineComponent, toRefs } from 'vue';
import { get as lodashGet } from 'lodash-es';
import config from '../config';
import props from './checkbox-group-props';
import { KeysType } from '../common';
import log from '../_common/js/log';
import Checkbox from './checkbox';
import { CheckboxGroupValue, TdCheckboxGroupProps, TdCheckboxProps } from './type';
import useVModel from '../hooks/useVModel';
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

    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const keys = computed((): KeysType => props.keys);

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
      if (isArray(innerValue.value) || !innerValue.value) {
        if (currentValue === undefined) {
          return;
        }
        const val = innerValue.value ? [...innerValue.value] : [];
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
        log.warn('CheckboxGroup', `\`value\` must be an array, instead of ${typeof innerValue.value}`);
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
      maxExceeded,
      onCheckedChange,
    });
    return () => {
      const checkboxNode = () => {
        return (
          <span>
            {optionList.value.map((item, idx) => (
              <Checkbox
                {...item}
                key={`${lodashGet(item, keys.value?.value ?? 'value', '')}${idx}`}
                label={lodashGet(item, keys.value?.label ?? 'label', item.text || '')}
                value={lodashGet(item, keys.value?.value ?? 'value')}
                disabled={lodashGet(item, keys.value?.disabled ?? 'disabled')}
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
