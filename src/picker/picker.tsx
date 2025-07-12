import { computed, defineComponent, toRefs, ref, watch, provide } from 'vue';
import { isBoolean, isFunction, isString, get as lodashGet } from 'lodash-es';
import config from '../config';
import PickerProps from './props';
import { KeysType } from '../common';
import { PickerValue, PickerColumn, PickerColumnItem } from './type';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import PickerItem from './picker-item';
import { getPickerColumns } from './utils';
import { usePrefixClass, useConfig } from '../hooks/useClass';

const { prefix } = config;

const getIndexFromColumns = (column: PickerColumn, value: PickerValue, keys?: KeysType) => {
  if (!value) return 0;
  return column?.findIndex((item: PickerColumnItem) => lodashGet(item, keys?.value ?? 'value') === value);
};

export default defineComponent({
  name: `${prefix}-picker`,
  components: { PickerItem },
  props: PickerProps,
  emits: ['change', 'cancel', 'pick', 'update:modelValue', 'update:value'],
  setup(props, { slots }) {
    const pickerClass = usePrefixClass('picker');
    const { globalConfig } = useConfig('picker');
    const renderTNodeJSX = useTNodeJSX();

    const { value, modelValue } = toRefs(props);
    const [pickerValue = ref([]), setPickerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const keys = computed((): KeysType => props.keys);
    const getDefaultText = (prop: string | boolean, defaultText: string): string => {
      if (isString(prop)) return prop;
      if (isBoolean(prop) && prop) return defaultText;
      return '';
    };
    const confirmButtonText = computed(() => getDefaultText(props.confirmBtn, globalConfig.value.confirm));
    const cancelButtonText = computed(() => getDefaultText(props.cancelBtn, globalConfig.value.cancel));
    const curValueArray = ref(pickerValue.value?.map((item: PickerValue) => item) || []);

    const realColumns = computed(() => {
      if (isFunction(props.columns)) {
        const _columns = props.columns(curValueArray.value);
        return getPickerColumns(_columns);
      }
      return getPickerColumns(props.columns);
    });

    const curIndexArray = realColumns.value.map((item: PickerColumn, index: number) => {
      return getIndexFromColumns(item, pickerValue.value?.[index], keys.value);
    });
    const pickerItemInstanceArray = ref<any[]>([]);
    // 获取pickerItem实例，用于更新每个item的value和index
    const setPickerItemRef = (item: any, index: number) => {
      pickerItemInstanceArray.value[index] = item;
    };

    const handleConfirm = (e: MouseEvent) => {
      const target = realColumns.value.map((item, index) => {
        return item[curIndexArray[index]];
      });
      const label = target.map((item: PickerColumnItem) => lodashGet(item, keys.value?.label ?? 'label'));
      const value = target.map((item: PickerColumnItem) => lodashGet(item, keys.value?.value ?? 'value'));
      setPickerValue(value);
      props.onConfirm?.(value, { index: curIndexArray, label, e });
    };
    const handleCancel = (e: MouseEvent) => {
      pickerItemInstanceArray.value.forEach((item: any, index: number) => {
        item?.setIndex(curIndexArray[index]);
      });
      props.onCancel?.({ e });
    };
    const handlePick = (context: any, column: number) => {
      const { index } = context;
      curIndexArray[column] = index;
      curValueArray.value[column] = lodashGet(realColumns.value?.[column][index], keys.value?.value ?? 'value');
      props.onPick?.(curValueArray.value, { index, column });
    };
    watch(pickerValue, () => {
      curValueArray.value = pickerValue.value.map((item: PickerValue) => item);
    });

    watch([realColumns, curValueArray], () => {
      realColumns.value.forEach((col: PickerColumn, idx: number) => {
        const index = col.findIndex(
          (item: PickerColumnItem) => lodashGet(item, keys.value?.value ?? 'value') === curValueArray.value[idx],
        );
        curIndexArray[idx] = index > -1 ? index : 0;
        pickerItemInstanceArray.value[idx]?.setIndex(curIndexArray[idx]);
      });
    });
    provide('picker', { ...toRefs(props) });

    return () => {
      return (
        <div class={`${pickerClass.value}`}>
          <div class={`${pickerClass.value}__toolbar`}>
            {cancelButtonText.value && (
              <div class={`${pickerClass.value}__cancel`} onClick={handleCancel}>
                {cancelButtonText.value}
              </div>
            )}
            <div class={`${pickerClass.value}__title`}>{props.title}</div>
            {confirmButtonText.value && (
              <div class={`${pickerClass.value}__confirm`} onClick={handleConfirm}>
                {confirmButtonText.value}
              </div>
            )}
          </div>
          {renderTNodeJSX('header')}
          <div class={`${pickerClass.value}__main`}>
            {realColumns.value.map((item, index) => (
              <div key={index} class={`${pickerClass.value}-item__group`}>
                <picker-item
                  v-slots={{ option: slots.option || props.option }}
                  ref={(item: any) => setPickerItemRef(item, index)}
                  options={item}
                  value={pickerValue.value?.[index]}
                  render-label={props.renderLabel}
                  onPick={($event: any) => handlePick($event, index)}
                  swipeDuration={props.swipeDuration}
                />
              </div>
            ))}
            <div class={`${pickerClass.value}__mask ${pickerClass.value}__mask--top`} />
            <div class={`${pickerClass.value}__mask ${pickerClass.value}__mask--bottom`} />
            <div class={`${pickerClass.value}__indicator`} />
          </div>
          {renderTNodeJSX('footer')}
        </div>
      );
    };
  },
});
