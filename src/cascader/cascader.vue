<template>
  <div :class="`${name}__wrapper`">
    <div :class="`${name}__title`">
      <t-node v-if="!(typeof titleTNode === 'string')" :content="titleTNode" />
      <template v-else>{{ title }}</template>
    </div>
    <div :class="`${name}__close-btn`" @click="onCancel">
      <t-node v-if="!(typeof closeBtnTNode === 'boolean')" :content="closeBtnTNode" />
      <close-icon v-else-if="typeof closeIcon === 'boolean' && closeIcon" size="24" />
    </div>
    <div :class="`${name}__content`">
      <cascader-steps :value="stepIndex" :items="steps" @update:value="onStepsChange" />
      <div :class="`${name}__options-title`">选项标题</div>
      <div :class="`${name}__options-content`">
        <div v-for="(options, index) in items" :key="index" style="width: 100%">
          <transition appear name="slide">
            <div v-show="stepIndex === index" style="width: 100%">
              <cascader-item
                v-for="(item, idx) in options"
                :key="item.value"
                v-bind="item"
                :active="selectedIndexes[index] === idx"
                @click="onPick(item, idx, index, $event)"
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
import { defineComponent, toRefs, getCurrentInstance, computed, ref, toRaw, reactive } from 'vue';
import { TdCascaderItems, TdCascaderItem } from './type';
import CascaderSteps from './steps.vue';
import config from '../config';
import CascaderProps from './props';
import { useEmitEvent, useVModel, renderTNode, TNode } from '../shared';
import CascaderItem from './cascader-item.vue';

const { prefix } = config;
const name = `${prefix}-cascader`;

export default defineComponent({
  name,
  components: { CloseIcon, CascaderItem, TNode, CascaderSteps },
  props: CascaderProps,
  emits: ['change', 'cancel', 'pick', 'click-tab', 'update:modelValue', 'update:value'],
  setup(props: any, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const { value, modelValue } = toRefs(props);
    const [cascaderValue, setCascaderValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const title = computed(() => props.title || '标题');
    const closeIcon = computed(() => props.closeIcon || false);
    const stepIndex = ref(0);
    const selectedIndexes = reactive<number[]>([]);
    const items = reactive<TdCascaderItems[]>([props.options]);
    const steps = reactive(['选择选项']);
    const onCancel = (e: MouseEvent) => {
      emitEvent('cancel', { e });
    };

    const onStepsChange = (index: number) => {
      stepIndex.value = index;
      emitEvent('click-tab', index);
    };

    const internalInstance = getCurrentInstance();
    const closeBtnTNode = computed(() => {
      return renderTNode(internalInstance, 'closeIcon');
    });
    const titleTNode = computed(() => renderTNode(internalInstance, 'title'));

    const onPick = (item: TdCascaderItem, index: number, level: number, e: MouseEvent) => {
      if (item.disabled) {
        return;
      }
      selectedIndexes[level] = index;
      selectedIndexes.length = level + 1;
      steps[level] = item.label;

      emitEvent('pick', item.value, index, { e });

      if (item?.children?.length) {
        items[level + 1] = item.children;
        items.length = level + 2;
        stepIndex.value += 1;
        steps[level + 1] = '选择选项';
        steps.length = level + 2;
      } else {
        setCascaderValue(item.value);
        emitEvent(
          'change',
          item.value,
          items.map((item, index) => toRaw(item[selectedIndexes[index]])),
          { e },
        );
      }
    };

    return {
      closeBtnTNode,
      titleTNode,
      stepIndex,
      name,
      title,
      closeIcon,
      cascaderValue,
      steps,
      selectedIndexes,
      items,
      setCascaderValue,
      emitEvent,
      onCancel,
      onPick,
      onStepsChange,
    };
  },
});
</script>
