<template>
  <div ref="wrapDOM" :class="className">
    <div ref="headDOM" :class="`${classPrefix}__header`" @click="(e) => onChange(e, 'header')">
      <div :class="`${classPrefix}__title`">
        <slot name="title">{{ header }}</slot>
      </div>
      <div :class="`${classPrefix}__header-right`" @click="onChange">
        <div v-if="headerRightContent || $slots.extra" :class="`${classPrefix}__header-extra`">
          <slot name="headerRightContent">{{ headerRightContent }}</slot>
        </div>
        <component :is="rightIcon" :class="`${classPrefix}__header-icon`"> </component>
      </div>
    </div>
    <div ref="bodyDOM" :class="`${classPrefix}__body`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  toRefs,
  computed,
  nextTick,
  watch,
  onMounted,
  inject,
  SetupContext,
  defineComponent,
} from 'vue';
import { ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next';
import {
  CollapsePropsType,
  CollapseStateType,
  CollapsePanelPropsType,
  CollapsePanelProps,
  onChangeEvent,
} from './collapse.interface';
import props from './collapse-panel-props';
import config from '../config';
import { findIndex, isFalsy, toArray } from './util';
import { useEmitEvent } from '../shared';
import { CollapseProvide } from './collapse.vue';

const { prefix } = config;
const name = `${prefix}-collapse-panel`;
export default defineComponent({
  name,
  components: { ChevronDownIcon, ChevronUpIcon },
  props,
  emits: ['click'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const parent = inject<CollapseProvide>('collapse');
    const rightIcon = computed(() => (isActive.value ? ChevronDownIcon : ChevronUpIcon));
    const className = computed(() => ({
      [`${name}`]: true,
      [`${name}--active`]: isActive.value,
      [`${name}--disabled`]: props.disabled,
    }));
    const isActive = computed(() => findIndex(props.value, parent?.activeValue) > -1);
    const onChange = (e: any = null, from = '') => {
      e?.stopPropagation();
      if (props.disabled) {
        return;
      }
      emitEvent('click', props.value);
      if (props.value) {
        parent?.onPanelChange(props.value);
      }
    };

    // 设置折叠/展开高度过渡
    const bodyDOM = ref();
    const wrapDOM = ref();
    const headDOM = ref();
    const updatePanelState = () => {
      if (!wrapDOM.value) {
        // console.log('[collapse] 组件尚未挂载', wrapDOM.value);
        return;
      }
      const { height: headHeight } = headDOM.value.getBoundingClientRect();
      if (!isActive.value) {
        wrapDOM.value.style.height = `${headHeight}px`;
        return;
      }
      const { height: bodyHeight } = bodyDOM.value.getBoundingClientRect();
      const height = headHeight + bodyHeight;
      wrapDOM.value.style.height = `${height}px`;
    };

    watch(isActive, () => {
      nextTick(() => {
        updatePanelState();
      });
    });
    onMounted(() => {
      if (parent?.defaultExpandAll) {
        !isActive.value && onChange();
      }
      updatePanelState();
    });
    return {
      classPrefix: name,
      headDOM,
      rightIcon,
      bodyDOM,
      wrapDOM,
      className,
      onChange,
    };
  },
});
</script>
