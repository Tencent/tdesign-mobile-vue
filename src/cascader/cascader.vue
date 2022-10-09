<template>
  <div :class="`${name}__wrapper`">
    <div :class="`${name}__title`">
      <div>
        <t-node v-if="!(typeof titleTNode === 'string')" :content="titleTNode"></t-node>
        <div v-else>{{ title }}</div>
      </div>
      <div :class="`${name}__close_icon`" @click="onCancel({ e: $event })">
        <t-node v-if="!(typeof closeBtnTNode === 'boolean')" :content="closeBtnTNode"></t-node>
        <close-icon v-else-if="typeof closeIcon === 'boolean' && closeIcon" />
      </div>
    </div>
    <div :class="`${name}__content`">
      <div :class="`${name}__indexes`">
        <t-steps v-model="stepState.stepIndex" layout="vertical" :readonly="false" :class="`${name}__steps`">
          <t-step
            v-for="(label, index) in stepState.stepLabels"
            :key="index"
            :title="label || '选择选项'"
            @click="onClickTab(index, $event)"
          >
          </t-step>
        </t-steps>
      </div>
      <t-divider></t-divider>
      <div :class="`${name}__options_title`">选项标题</div>
      <div :class="`${name}__options_content`">
        <div v-for="(options, idx) in stepState.stepOptionsPath" :key="idx" style="width: 100%">
          <transition appear name="slide">
            <div v-show="stepState.stepIndex === idx" style="width: 100%">
              <cascader-item
                v-for="(item, index) in options"
                :key="item.value"
                v-bind="item"
                :active="item.active"
                @click="onPick(item, index, { e: $event })"
              />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CloseIcon } from 'tdesign-icons-vue-next';
import { defineComponent, toRefs, getCurrentInstance, SetupContext, computed, reactive } from 'vue';
import { TdCascaderItems, TdCascaderItem, TdCascaderItemValueType } from './type';
import config from '@/config';
import CascaderProps from './props';
import { useEmitEvent, useVModel, renderTNode, TNode } from '@/shared';
import CascaderItem from './cascader-item.vue';

const { prefix } = config;
const name = `${prefix}-cascader`;
type cascaderChangeContext = { e: MouseEvent };
type cascaderCancelContext = { e: MouseEvent };
type cascaderPickContext = { e: MouseEvent };
type cascaderClickTabContext = { e: MouseEvent };

export default defineComponent({
  name,
  components: { CloseIcon, CascaderItem, TNode },
  props: CascaderProps,
  emits: ['change', 'cancel', 'pick', 'click-tab', 'update:modelValue', 'update:value'],
  setup(props: any, context: SetupContext) {
    const cancelButtonText = computed(() => props.cancelBtn || '取消');
    const emitEvent = useEmitEvent(props, context.emit);
    const { value, modelValue } = toRefs(props);
    const [cascaderValue, setCascaderValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const title = computed(() => props.title || '标题');
    const closeIcon = computed(() => props.closeIcon || false);
    const isLazy = computed(() => (props.lazy && props.lazyLoad) || false);

    const treeOptions = computed(() => props.options as TdCascaderItems);
    const stepState = reactive({
      stepIndex: 0,
      stepValues: [] as TdCascaderItems,
      stepLabels: [null] as Array<string | null>,
      stepIndexes: [] as Array<number>,
      stepOptions: treeOptions.value,
      stepOptionsPath: [treeOptions.value] as Array<TdCascaderItems>,
      treeOptions: [] as Array<TdCascaderItems>,
    });

    const onChange = (value: TdCascaderItemValueType, options: TdCascaderItems, context: cascaderChangeContext) => {
      setCascaderValue(value);
      emitEvent('change', value, options, context);
    };

    const onCancel = (context: cascaderCancelContext) => {
      emitEvent('cancel', { e: context.e });
    };

    const onClickTab = (index: number, context: cascaderClickTabContext) => {
      if (index >= stepState.stepIndexes.length) return;
      stepState.stepOptions = stepState.stepOptionsPath[index];
      emitEvent('click-tab', { e: context.e });
    };

    const internalInstance = getCurrentInstance();
    const closeBtnTNode = computed(() => {
      return renderTNode(internalInstance, 'closeIcon');
    });
    const titleTNode = computed(() => renderTNode(internalInstance, 'title'));

    const onPick = (item: TdCascaderItem, index: number, context: cascaderPickContext) => {
      if (!(index >= 0 && index < stepState.stepOptions.length)) {
        return;
      }
      if (item.disabled) {
        return;
      }
      stepState.stepOptions.forEach((el, idx) => {
        if (idx !== index) {
          stepState.stepOptions[idx].active = false;
        } else {
          stepState.stepOptions[idx].active = true;
        }
      });
      stepState.stepValues[stepState.stepIndex] = item;
      stepState.stepValues.splice(stepState.stepIndex + 1);
      stepState.stepLabels[stepState.stepIndex] = item.label;
      stepState.stepLabels.splice(stepState.stepIndex + 1);
      stepState.stepIndexes[stepState.stepIndex] = index;
      stepState.stepIndexes.splice(stepState.stepIndex + 1);
      if (Array.isArray(item.children) && item.children?.length > 0) {
        stepState.stepOptions = item.children;
        for (let i = stepState.stepIndex + 1; i < stepState.stepOptionsPath.length; i++) {
          stepState.stepOptionsPath[i].forEach((el, idx) => {
            el.active = false;
          });
        }
        stepState.stepOptionsPath[stepState.stepIndex + 1] = stepState.stepOptions;
        stepState.stepOptionsPath.splice(stepState.stepIndex + 2);
        stepState.stepIndex += 1;
        stepState.stepLabels.push(null);
      } else {
        const stepValues = stepState.stepValues.filter((item) => item);
        emitEvent('pick', item, stepValues, { e: context.e });
        onChange(item.value, stepValues, { e: new MouseEvent('click') });
      }
    };

    return {
      closeBtnTNode,
      titleTNode,
      stepState,
      cancelButtonText,
      treeOptions,
      name,
      title,
      closeIcon,
      cascaderValue,
      setCascaderValue,
      emitEvent,
      onCancel,
      onChange,
      onPick,
      onClickTab,
    };
  },
});
</script>
