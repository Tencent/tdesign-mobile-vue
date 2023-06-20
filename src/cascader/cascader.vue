<template>
  <t-popup v-model="open" placement="bottom" @visible-change="onVisibleChange">
    <div :class="`${name}`">
      <div :class="`${name}__title`">
        <t-node v-if="!(typeof titleTNode === 'string')" :content="titleTNode" />
        <template v-else>{{ title }}</template>
      </div>
      <div :class="`${name}__close-btn`" @click="onClose">
        <t-node v-if="!(typeof closeBtnTNode === 'boolean')" :content="closeBtnTNode" />
        <close-icon v-else-if="typeof closeBtn === 'boolean' && closeBtn" size="24" />
      </div>
      <div :class="`${name}__content`">
        <div v-if="steps && steps.length">
          <div v-if="theme === 'step'" :class="`${name}__steps`">
            <div v-for="(item, index) in steps" :key="index" :class="`${name}__step`" @click="onStepClick(index)">
              <div
                :class="[
                  `${name}__step-dot`,
                  {
                    't-cascader__step-dot--active': item !== defaultOptionLabel,
                    't-cascader__step-dot--last': index === steps.length - 1,
                  },
                ]"
              ></div>
              <div
                :class="[
                  `${name}__step-label`,
                  {
                    't-cascader__step-label--active': index === stepIndex,
                  },
                ]"
              >
                {{ item }}
              </div>
              <chevron-right-icon :class="`${name}__step-arrow`" size="22" />
            </div>
          </div>
          <div v-if="open && theme === 'tab'">
            <t-tabs id="tabs" :value="stepIndex" :space-evenly="false" @change="onTabChange">
              <t-tab-panel v-for="(item, index) in steps" :key="index" :value="index" :label="item" />
            </t-tabs>
          </div>
        </div>
        <div v-if="subTitles && subTitles[stepIndex]" :class="`${name}__options-title`">
          {{ subTitles[stepIndex] }}
        </div>
        <div
          :class="`${name}__options-container`"
          :style="`width: ${items.length + 1}00vw; transform: translateX(-${stepIndex}00vw);`"
        >
          <div v-for="(options, index) in items" :key="index" :class="`${name}__options`">
            <transition appear name="slide">
              <div :class="`cascader-radio-group-${index}`">
                <t-radio-group
                  :value="selectedValue[index]"
                  :keys="keys"
                  :options="options"
                  placement="right"
                  icon="line"
                  borderless
                  @change="handleSelect($event, index)"
                />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </t-popup>
</template>

<script lang="ts">
import { CloseIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import {
  defineComponent,
  toRefs,
  getCurrentInstance,
  computed,
  ref,
  toRaw,
  reactive,
  watch,
  onMounted,
  Ref,
} from 'vue';
import TPopup from '../popup';
import { Tabs as TTabs, TabPanel as TTabPanel } from '../tabs';
import { RadioGroup as TRadioGroup } from '../radio';
import config from '../config';
import TdCascaderProps from './props';
import { useEmitEvent, useVModel, renderTNode, TNode } from '../shared';
import { TreeOptionData } from '../common';

const { prefix } = config;
const name = `${prefix}-cascader`;
const defaultOptionLabel = '选择选项';

interface KeysType {
  value?: string;
  label?: string;
  children?: string;
}

export default defineComponent({
  name,
  components: {
    CloseIcon,
    ChevronRightIcon,
    TNode,
    TPopup,
    TTabs,
    TTabPanel,
    TRadioGroup,
  },
  props: TdCascaderProps,
  emits: ['change', 'close', 'pick', 'update:modelValue', 'update:value', 'update:visible'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const { visible, value, modelValue, subTitles, options, keys } = toRefs(props);
    const open = ref(visible.value || false);
    const [cascaderValue, setCascaderValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const title = computed(() => props.title || '标题');

    const stepIndex = ref(0);
    const selectedIndexes = reactive<string[] | number[]>([]);
    const selectedValue = reactive<string[]>([]);
    const items: Array<Array<TreeOptionData>> = reactive([options.value ?? []]);
    const steps = reactive([defaultOptionLabel]);

    onMounted(() => {
      initWithValue();
    });

    const internalInstance = getCurrentInstance();
    const closeBtnTNode = computed(() => {
      return renderTNode(internalInstance, 'closeBtn');
    });
    const titleTNode = computed(() => renderTNode(internalInstance, 'title'));

    const initWithValue = () => {
      if (value.value != null) {
        steps.pop();
        const path = getIndexesByValue(options.value, value.value);
        path?.forEach((e: number) => {
          // @ts-ignore
          selectedIndexes.push(e);
        });
        watchSelectedIndexes();
      }
    };

    const watchSelectedIndexes = () => {
      if (options.value && options.value.length > 0) {
        for (let i = 0, size = selectedIndexes.length; i < size; i += 1) {
          const index = selectedIndexes[i];
          const next = items[i]?.[index];
          selectedValue.push(next[keys.value?.value ?? 'value']);
          steps.push(next[keys.value?.label ?? 'label']);
          if (next[(keys as Ref<KeysType>).value?.children ?? 'children']) {
            items.push(next[(keys as Ref<KeysType>).value?.children ?? 'children']);
          }
        }
      }
      if (steps.length < items.length) {
        steps.push(defaultOptionLabel);
      }
      stepIndex.value = items.length - 1;
    };

    const getIndexesByValue = (options: any, value: any) => {
      for (let i = 0; i < options.length; i++) {
        if (options[i][keys.value?.value ?? 'value'] === value) {
          return [i];
        }
        if (options[i][(keys as Ref<KeysType>).value?.children ?? 'children']) {
          const res: any = getIndexesByValue(options[i][(keys as Ref<KeysType>).value?.children ?? 'children'], value);
          if (res) {
            return [i, ...res];
          }
        }
      }
    };

    const handleSelect = (e: string | number, level: number) => {
      const value = e;
      const index = items[level].findIndex((item: any) => item[keys.value?.value ?? 'value'] === value);
      const item = items[level][index];
      selectedIndexes[level] = index;
      selectedIndexes.length = level + 1;
      steps[level] = item[keys.value?.label ?? 'label'] as string;

      if (item.disabled) {
        return;
      }

      emitEvent('pick', { value: item[keys.value?.value ?? 'value'], index });

      if (item[(keys as Ref<KeysType>).value?.children ?? 'children']?.length) {
        items[level + 1] = item[(keys as Ref<KeysType>).value?.children ?? 'children'];
        items.length = level + 2;
        stepIndex.value += 1;
        steps[level + 1] = '选择选项';
        steps.length = level + 2;
      } else {
        setCascaderValue(item[keys.value?.value ?? 'value']);
        emitEvent(
          'change',
          item[keys.value?.value ?? 'value'],
          items.map((item, index) => toRaw(item?.[selectedIndexes[index]])),
        );
        close('finish');
      }
    };

    watch(open, () => {
      emitEvent('update:visible', open.value);
    });

    watch(visible, () => {
      open.value = visible.value;
    });

    const close = (trigger: string) => {
      emitEvent('close', { trigger });
    };

    const onVisibleChange = (visible: boolean) => {
      close('overlay');
    };

    const onClose = () => {
      open.value = false;
      close('close-btn');
    };

    const onStepClick = (index: number) => {
      stepIndex.value = index;
    };

    const onTabChange = (value: number | string) => {
      stepIndex.value = Number(value);
    };

    return {
      open,
      defaultOptionLabel,
      onVisibleChange,
      onStepClick,
      onTabChange,
      handleSelect,
      closeBtnTNode,
      titleTNode,
      stepIndex,
      name,
      title,
      subTitles,
      cascaderValue,
      steps,
      selectedValue,
      selectedIndexes,
      items,
      setCascaderValue,
      emitEvent,
      onClose,
    };
  },
});
</script>
