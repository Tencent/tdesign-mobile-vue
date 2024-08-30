import { computed, defineComponent, toRefs, ref, watch } from 'vue';
import isString from 'lodash/isString';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import config from '../config';
import PickerProps from './props';
import { PickerValue, PickerColumn, PickerColumnItem } from './type';
import { useVModel } from '../shared';
import { useTNodeJSX } from '../hooks/tnode';
import PickerItem from './picker-item';
import { useConfig } from '../config-provider/useConfig';
import { getPickerColumns } from './utils';

const { prefix } = config;
const name = `${prefix}-picker`;

const getIndexFromColumns = (column: PickerColumn, value: PickerValue) => {
  if (!value) return 0;
  return column?.findIndex((item: PickerColumnItem) => item?.value === value);
};

export default defineComponent({
  name,
  components: { PickerItem },
  props: PickerProps,
  emits: ['change', 'cancel', 'pick', 'update:modelValue', 'update:value'],
  setup(props) {
    const { globalConfig } = useConfig('picker');
    const renderTNodeJSX = useTNodeJSX();

    const { value, modelValue } = toRefs(props);
    const [pickerValue = ref([]), setPickerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

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
      return getIndexFromColumns(item, pickerValue.value?.[index]);
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
      const label = target.map((item: PickerColumnItem) => item.label);
      const value = target.map((item: PickerColumnItem) => item.value);
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
      curValueArray.value[column] = realColumns.value?.[column][index]?.value;

      props.onPick?.(curValueArray.value, { index, column });
    };

    watch(pickerValue, () => {
      curValueArray.value = pickerValue.value.map((item: PickerValue) => item);
    });

    watch([realColumns, curValueArray], () => {
      realColumns.value.forEach((col: PickerColumn, idx: number) => {
        const index = col.findIndex((item: PickerColumnItem) => item.value === curValueArray.value[idx]);
        curIndexArray[idx] = index > -1 ? index : 0;
        pickerItemInstanceArray.value[idx]?.setIndex(curIndexArray[idx]);
      });
    });

    return () => {
      const header = renderTNodeJSX('header');
      return (
        <div class={`${name}`}>
          <div class={`${name}__toolbar`}>
            {cancelButtonText.value && (
              <div class={`${name}__cancel`} onClick={handleCancel}>
                {cancelButtonText.value}
              </div>
            )}
            <div class={`${name}__title`}>{props.title}</div>
            {confirmButtonText.value && (
              <div class={`${name}__confirm`} onClick={handleConfirm}>
                {confirmButtonText.value}
              </div>
            )}
          </div>
          {header}
          <div class={`${name}__main`}>
            {realColumns.value.map((item, index) => (
              <div key={index} class={`${name}-item__group`}>
                <picker-item
                  ref={(item: any) => setPickerItemRef(item, index)}
                  options={item}
                  value={pickerValue.value?.[index]}
                  render-label={props.renderLabel}
                  onPick={($event: any) => handlePick($event, index)}
                />
              </div>
            ))}
            <div class={`${name}__mask ${name}__mask--top`} />
            <div class={`${name}__mask ${name}__mask--bottom`} />
            <div class={`${name}__indicator`} />
          </div>
        </div>
      );
    };
  },
});
