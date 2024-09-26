<template>
  <t-popup v-model="open" placement="bottom" @visible-change="onVisibleChange">
    <div :class="`${cascaderClass}`">
      <div :class="`${cascaderClass}__title`">
        <t-node v-if="!(typeof titleTNode === 'string')" :content="titleTNode" />
        <template v-else>{{ title }}</template>
      </div>
      <div :class="`${cascaderClass}__close-btn`" @click="onCloseBtn">
        <t-node v-if="closeBtnTNode" :content="closeBtnTNode" />
      </div>
      <div :class="`${cascaderClass}__content`">
        <div v-if="steps && steps.length">
          <div v-if="theme === 'step'" :class="`${cascaderClass}__steps`">
            <div
              v-for="(item, index) in steps"
              :key="index"
              :class="`${cascaderClass}__step`"
              @click="onStepClick(index)"
            >
              <div
                :class="[
                  `${cascaderClass}__step-dot`,
                  {
                    [`${cascaderClass}__step-dot--active`]: item !== placeholder,
                    [`${cascaderClass}__step-dot--last`]: index === steps.length - 1,
                  },
                ]"
              ></div>
              <div
                :class="[
                  `${cascaderClass}__step-label`,
                  {
                    [`${cascaderClass}__step-label--active`]: index === stepIndex,
                  },
                ]"
              >
                <t-node
                  v-if="placeholderTNode && !(typeof placeholderTNode === 'string') && item === placeholder"
                  :content="placeholderTNode"
                />
                <template v-else>{{ item }}</template>
              </div>
              <chevron-right-icon :class="`${cascaderClass}__step-arrow`" size="22" />
            </div>
          </div>
          <div v-if="open && theme === 'tab'">
            <t-tabs id="tabs" :value="stepIndex" :space-evenly="false" @change="onTabChange">
              <t-tab-panel v-for="(item, index) in steps" :key="index" :value="index" :label="item" />
            </t-tabs>
          </div>
        </div>
        <div v-if="subTitles && subTitles[stepIndex]" :class="`${cascaderClass}__options-title`">
          {{ subTitles[stepIndex] }}
        </div>
        <div
          :class="`${cascaderClass}__options-container`"
          :style="`width: ${items.length + 1}00vw; transform: translateX(-${stepIndex}00vw);`"
        >
          <div v-for="(options, index) in items" :key="index" :class="`${cascaderClass}__options`">
            <transition appear name="slide">
              <div :class="`cascader-radio-group-${index}`">
                <t-radio-group
                  :value="selectedValue[index] || ''"
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
  h,
} from 'vue';
import TPopup from '../popup';
import { Tabs as TTabs, TabPanel as TTabPanel } from '../tabs';
import { RadioValue, RadioGroup as TRadioGroup } from '../radio';
import config from '../config';
import TdCascaderProps from './props';
import { useVModel, renderTNode, TNode } from '../shared';
import { TreeOptionData } from '../common';
import { usePrefixClass, useConfig } from '../hooks/useClass';

const { prefix } = config;

interface ChildrenInfoType {
  value: RadioValue;
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
}

export default defineComponent({
  name: `${prefix}-cascader`,
  components: {
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
    const { globalConfig } = useConfig('cascader');
    const cascaderClass = usePrefixClass('cascader');

    const { visible, value, modelValue, subTitles, options, keys, checkStrictly } = toRefs(props);
    const open = ref(visible.value || false);
    const [cascaderValue, setCascaderValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const title = computed(() => props.title || globalConfig.value.title);
    const placeholder = computed(() => props.placeholder || globalConfig.value.placeholder);

    const stepIndex = ref(0);
    const selectedIndexes = reactive<string[] | number[]>([]);
    const selectedValue = reactive<string[]>([]);
    const items: Array<Array<TreeOptionData>> = reactive([options.value ?? []]);
    const steps = reactive([placeholder.value]);

    watch(placeholder, (newValue, oldValue) => {
      const index = steps.indexOf(oldValue);
      if (index !== -1) {
        steps[index] = newValue;
      }
    });

    onMounted(() => {
      initWithValue();
    });

    const internalInstance = getCurrentInstance();
    const closeBtnTNode = computed(() => {
      return renderTNode(internalInstance, 'closeBtn', {
        defaultNode: h(CloseIcon, { size: '24px' }),
      });
    });
    const titleTNode = computed(() => renderTNode(internalInstance, 'title'));
    const placeholderTNode = computed(() => renderTNode(internalInstance, 'placeholder'));

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
          selectedValue.push(next[(keys as Ref<KeysType>).value?.value ?? 'value']);
          steps.push(next[(keys as Ref<KeysType>).value?.label ?? 'label']);
          if (next[(keys as Ref<KeysType>).value?.children ?? 'children']) {
            items.push(next[(keys as Ref<KeysType>).value?.children ?? 'children']);
          }
        }
      }
      if (steps.length < items.length) {
        steps.push(placeholder.value);
      }
      stepIndex.value = items.length - 1;
    };

    const getIndexesByValue = (options: any, value: any) => {
      for (let i = 0; i < options.length; i++) {
        if (options[i][(keys as Ref<KeysType>).value?.value ?? 'value'] === value) {
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

    const chooseSelect = (e: RadioValue, level: number, index: number, item: any) => {
      selectedIndexes[level] = index;
      selectedIndexes.length = level + 1;
      selectedValue[level] = String(e);
      selectedValue.length = level + 1;
      steps[level] = item[(keys as Ref<KeysType>).value?.label ?? 'label'] as string;

      if (item[(keys as Ref<KeysType>).value?.children ?? 'children']?.length) {
        items[level + 1] = item[(keys as Ref<KeysType>).value?.children ?? 'children'];
        items.length = level + 2;
        stepIndex.value += 1;
        steps[level + 1] = placeholder.value;
        steps.length = level + 2;
      } else if (item[(keys as Ref<KeysType>).value?.children ?? 'children']?.length === 0) {
        childrenInfo.value = e;
        childrenInfo.level = level;
      } else {
        setCascaderValue(
          item[(keys as Ref<KeysType>).value?.value ?? 'value'],
          items.map((item, index) => toRaw(item?.[selectedIndexes[index]])),
        );
        close('finish');
      }
    };

    const cancelSelect = (e: RadioValue, level: number, index: number, item: any) => {
      selectedIndexes[level] = index;
      selectedIndexes.length = level;
      selectedValue.length = level;
      steps[level] = String(placeholder.value);
      steps[level + 1] = placeholder.value;
      steps.length = level + 1;

      if (item[(keys as Ref<KeysType>).value?.children ?? 'children']?.length) {
        items[level + 1] = item[(keys as Ref<KeysType>).value?.children ?? 'children'];
      } else if (item[(keys as Ref<KeysType>).value?.children ?? 'children']?.length === 0) {
        childrenInfo.value = e;
        childrenInfo.level = level;
      }
    };

    const handleSelect = (e: RadioValue, level: number) => {
      const value = e;
      const index = items[level].findIndex(
        (item: any) => item[(keys as Ref<KeysType>).value?.value ?? 'value'] === value,
      );
      const item = items[level][index];
      if (item.disabled) {
        return;
      }
      props.onPick?.({ level, value: item[(keys as Ref<KeysType>).value?.value ?? 'value'], index });

      if (checkStrictly.value && selectedValue.includes(String(value))) {
        cancelSelect(e, level, index, item);
      } else {
        chooseSelect(e, level, index, item);
      }
    };

    watch(open, () => {
      context.emit('update:visible', open.value);
    });

    watch(visible, () => {
      open.value = visible.value;
    });

    watch(
      () => props.options,
      () => {
        if (open.value) {
          handleSelect(childrenInfo.value, childrenInfo.level);
        }
      },
      {
        deep: true,
      },
    );

    const close = (trigger: string) => {
      props.onClose?.({ trigger });
    };

    const onVisibleChange = (visible: boolean, e: any) => {
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
      if (checkStrictly.value) {
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

    return {
      cascaderClass,
      open,
      placeholder,
      onVisibleChange,
      onStepClick,
      onTabChange,
      handleSelect,
      closeBtnTNode,
      titleTNode,
      placeholderTNode,
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
      onClose,
      onCloseBtn,
    };
  },
});
</script>
