import { CloseIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import { defineComponent, toRefs, computed, ref, toRaw, reactive, watch, onMounted, Transition } from 'vue';
import { get as lodashGet } from 'lodash-es';
import TPopup from '../popup';
import { Tabs } from '../tabs';
import { RadioValue, RadioGroup as TRadioGroup } from '../radio';
import config from '../config';
import props from './props';
import { TreeOptionData } from '../common';
import { useConfig } from '../config-provider/useConfig';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import { CascaderTriggerSource } from './type';

const { prefix } = config;
const name = `${prefix}-cascader`;

interface ChildrenInfoType {
  value: string | number | boolean;
  level: number;
}

const childrenInfo: ChildrenInfoType = {
  value: '',
  level: 0,
};

interface KeysType {
  value?: string;
  label?: string;
  children?: string;
  disabled?: string;
}

export default defineComponent({
  name,
  props,
  emits: ['update:visible', 'update:value', 'update:modelValue'],
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const cascaderClass = usePrefixClass('cascader');
    const { globalConfig } = useConfig('cascader');

    const { visible, value, modelValue } = toRefs(props);
    const [cascaderValue, setCascaderValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const open = ref(visible.value || false);
    const placeholder = computed(() => props.placeholder || globalConfig.value.placeholder);

    const stepIndex = ref(0);
    const selectedIndexes = reactive<number[]>([]);
    const selectedValue = reactive<Array<string | number>>([]);
    const items: Array<Array<TreeOptionData>> = reactive([props.options ?? []]);
    const steps = reactive([placeholder.value]);

    const initWithValue = () => {
      if (cascaderValue.value != null) {
        steps.length = 0;
        selectedValue.length = 0;
        selectedIndexes.splice(0, selectedIndexes.length);

        const path = getIndexesByValue(props.options, cascaderValue.value);
        path?.forEach((e: number) => {
          // @ts-ignore
          selectedIndexes.push(e);
        });
        watchSelectedIndexes();
      }
    };

    const watchSelectedIndexes = () => {
      if (props.options && props.options.length > 0) {
        items.splice(0, items.length, ...[props.options]);

        const keys = props.keys as KeysType;
        for (let i = 0, size = selectedIndexes.length; i < size; i += 1) {
          const index = selectedIndexes[i];
          const next = items[i]?.[index];
          selectedValue.push(lodashGet(next, keys?.value ?? 'value'));
          steps.push(lodashGet(next, keys?.label ?? 'label'));
          if (lodashGet(next, keys?.children ?? 'children')) {
            items.push(lodashGet(next, keys?.children ?? 'children'));
          }
        }
      }

      if (steps.length < items.length) {
        steps.push(placeholder.value);
      }
      stepIndex.value = items.length - 1;
    };

    const getIndexesByValue = (options: any, value: any) => {
      const keys = props.keys as KeysType;
      for (let i = 0; i < options.length; i++) {
        if (lodashGet(options[i], keys?.value ?? 'value') === value) {
          return [i];
        }
        if (lodashGet(options[i], keys?.children ?? 'children')) {
          const res: any = getIndexesByValue(lodashGet(options[i], keys?.children ?? 'children'), value);
          if (res) {
            return [i, ...res];
          }
        }
      }
    };

    const chooseSelect = (value: RadioValue, level: number, index: number, item: any) => {
      const keys = props.keys as KeysType;
      selectedIndexes[level] = index;
      selectedIndexes.length = level + 1;
      selectedValue[level] = typeof value === 'number' ? value : String(value);
      selectedValue.length = level + 1;
      steps[level] = lodashGet(item, keys?.label ?? 'label');
      if (lodashGet(item, keys?.children ?? 'children')?.length) {
        items[level + 1] = lodashGet(item, keys?.children ?? 'children');
        items.length = level + 2;
        stepIndex.value += 1;
        steps[level + 1] = placeholder.value;
        steps.length = level + 2;
      } else if (lodashGet(item, keys?.children ?? 'children')?.length === 0) {
        childrenInfo.value = value;
        childrenInfo.level = level;
      } else {
        setCascaderValue(
          lodashGet(item, keys?.value ?? 'value'),
          items.map((item, index) => toRaw(item?.[selectedIndexes[index]])),
        );
        close('finish');
      }
    };

    const cancelSelect = (value: RadioValue, level: number, index: number, item: any) => {
      const keys = props.keys as KeysType;
      selectedIndexes[level] = index;
      selectedIndexes.length = level;
      selectedValue.length = level;
      steps[level] = String(placeholder.value);
      steps[level + 1] = placeholder.value;
      steps.length = level + 1;

      if (lodashGet(item, keys?.children ?? 'children')?.length) {
        items[level + 1] = lodashGet(item, keys?.children ?? 'children');
      } else if (lodashGet(item, keys?.children ?? 'children')?.length === 0) {
        childrenInfo.value = value;
        childrenInfo.level = level;
      }
    };

    const handleSelect = (value: RadioValue, level: number, fromHandler = true) => {
      const keys = props.keys as KeysType;
      const index = items[level].findIndex((item: any) => lodashGet(item, keys?.value ?? 'value') === value);
      const item = items[level][index];
      if (lodashGet(item, keys?.disabled ?? 'disabled')) {
        return;
      }

      if (fromHandler) {
        props.onPick?.({
          value: lodashGet(item, keys?.value ?? 'value'),
          label: lodashGet(item, keys?.label ?? 'label'),
          level,
          index,
        });
      }

      if (props.checkStrictly && selectedValue.includes(String(value)) && fromHandler) {
        cancelSelect(value, level, index, item);
      } else {
        chooseSelect(value, level, index, item);
      }
    };

    const close = (trigger: CascaderTriggerSource) => {
      props.onClose?.(trigger);
    };

    const handleVisibleChange = (visible: boolean, e: any) => {
      if (e?.trigger !== 'overlay') return;
      close('overlay');
    };

    const updateCascaderValue = () => {
      setCascaderValue(
        selectedValue[selectedValue.length - 1],
        items
          .filter((item, index) => !!item && selectedIndexes.length > index)
          .map((item, index) => toRaw(item?.[selectedIndexes[index]])),
      );
    };

    const onClose = () => {
      open.value = false;
      close('close-btn');
    };

    const onCloseBtn = () => {
      if (props.checkStrictly) {
        updateCascaderValue();
        onClose();
      } else {
        onClose();
      }
    };

    const onStepClick = (index: number) => {
      stepIndex.value = index;
    };

    const onTabChange = (value: number | string) => {
      stepIndex.value = Number(value);
    };

    watch(open, () => {
      context.emit('update:visible', open.value);
    });

    watch(visible, () => {
      open.value = visible.value;
      if (visible.value) {
        initWithValue();
      }
    });

    watch(
      () => props.options,
      () => {
        initWithValue();

        if (open.value) {
          handleSelect(childrenInfo.value, childrenInfo.level, false);
        }
      },
      {
        deep: true,
      },
    );

    watch(placeholder, (newValue, oldValue) => {
      const index = steps.indexOf(oldValue);
      if (index !== -1) {
        steps[index] = newValue;
      }
    });

    onMounted(() => {
      initWithValue();
    });

    return () => {
      const title = renderTNodeJSX('title') || globalConfig.value.title;
      const closeBtn = renderTNodeJSX('closeBtn', { defaultNode: <CloseIcon size="24px" /> });
      const PlaceholderNode = renderTNodeJSX('placeholder');

      const readerStep = () => {
        return (
          <div class={`${cascaderClass.value}__steps`}>
            {steps.map((step, index) => {
              return (
                <div
                  class={`${cascaderClass.value}__step`}
                  onClick={() => {
                    onStepClick(index);
                  }}
                >
                  <div
                    class={[
                      `${cascaderClass.value}__step-dot`,
                      {
                        [`${cascaderClass.value}__step-dot--active`]: step !== placeholder.value,
                        [`${cascaderClass.value}__step-dot--last`]: index === steps.length - 1,
                      },
                    ]}
                  />
                  <div
                    class={[
                      `${cascaderClass.value}__step-label`,
                      {
                        [`${cascaderClass.value}__step-label--active`]: index === stepIndex.value,
                      },
                    ]}
                  >
                    {PlaceholderNode && !(typeof PlaceholderNode === 'string') && step === placeholder.value
                      ? PlaceholderNode
                      : step}
                  </div>
                  <ChevronRightIcon class={`${cascaderClass.value}__step-arrow`} size="22" />
                </div>
              );
            })}
          </div>
        );
      };

      const renderTabStep = () => {
        const _steps = steps.map((item, index) => ({ value: index, label: item }));
        return <Tabs value={stepIndex.value} spaceEvenly={false} list={_steps} onChange={onTabChange} />;
      };

      const readerSteps = () => {
        if (steps.length === 0) {
          return null;
        }
        if (props.theme === 'step') {
          return readerStep();
        }

        if (open.value && props.theme === 'tab') {
          return renderTabStep();
        }
      };
      return (
        <TPopup v-model={open.value} placement="bottom" onVisibleChange={handleVisibleChange}>
          <div class={`${cascaderClass.value}`}>
            <div class={`${cascaderClass.value}__title`}>{title}</div>
            <div class={`${cascaderClass.value}__close-btn`} onClick={onCloseBtn}>
              {closeBtn}
            </div>
            {renderTNodeJSX('header')}
            <div class={`${cascaderClass.value}__content`}>
              {readerSteps()}
              {renderTNodeJSX('middleContent')}
              {props.subTitles && props.subTitles[stepIndex.value] && (
                <div class={`${cascaderClass.value}__options-title`}>{props.subTitles[stepIndex.value]}</div>
              )}
              <div
                class={`${cascaderClass.value}__options-container`}
                style={`width: ${items.length + 1}00vw; transform: translateX(-${stepIndex.value}00vw);`}
              >
                {items.map((options, index) => {
                  return (
                    <div class={`${cascaderClass.value}__options`}>
                      <Transition appear name="slide">
                        <div class={`${cascaderClass.value}-radio-group-${index}`}>
                          <TRadioGroup
                            value={selectedValue[index] || ''}
                            keys={props.keys}
                            options={options}
                            placement="right"
                            icon="line"
                            borderless
                            onChange={(
                              value: RadioValue,
                              context: {
                                e: Event;
                              },
                            ) => {
                              handleSelect(value, index);
                            }}
                          />
                        </div>
                      </Transition>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TPopup>
      );
    };
  },
});
