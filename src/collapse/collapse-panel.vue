<template>
  <div ref="wrapDOM" :class="className">
    <div ref="headDOM" :class="`${baseClass}__header`" @click="(e) => onChange(e, 'header')">
      <div :class="`${baseClass}__title`">
        <slot name="header">{{ header }}</slot>
      </div>
      <div :class="`${baseClass}__header-right`" @click="onChange">
        <div v-if="headerRightContent || $slots.headerRightContent" :class="`${baseClass}__header-extra`">
          <slot name="headerRightContent">{{ headerRightContent }}</slot>
        </div>
        <component :is="rightIcon" :class="`${baseClass}__header-icon`"> </component>
      </div>
    </div>
    <div v-if="!destroyOnCollapse || isActive" ref="bodyDOM" :class="`${baseClass}__body`">
      <div :class="`${baseClass}__content`">
        <div v-if="$slots.default">
          <slot></slot>
        </div>
        <div v-else>
          {{ defaultContent || content }}
        </div>
      </div>
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
import { CollapseStateType, onChangeEvent } from './collapse.interface';
import CollapsePanelProps from './collapse-panel-props';
import { TdCollapseProps, TdCollapsePanelProps } from './type';
import config from '../config';
import { findIndex } from './util';
import { useEmitEvent } from '../shared';

const { prefix } = config;
const name = `${prefix}-collapse-panel`;
export default defineComponent({
  name,
  components: { ChevronDownIcon, ChevronUpIcon },
  props: CollapsePanelProps,
  emits: ['click'],
  setup(props: TdCollapsePanelProps, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    // 从父组件取属性、状态和控制函数
    const collapseProps = inject('collapseProps') as TdCollapseProps;
    const collapseState = inject('collapseState') as CollapseStateType;
    const onPanelChange = inject('onPanelChange') as onChangeEvent;

    // 是否禁用
    const isDisabled = computed(() => props.disabled || collapseProps.disabled);
    const className = computed(() => ({
      [`${name}`]: true,
      [`${name}--active`]: isActive.value,
      [`${name}--disabled`]: isDisabled.value,
    }));

    // 是否展开态
    const isActive = computed(() => findIndex(props.value, collapseState.curValue) > -1);
    const state = reactive({
      baseClass: name,
    });

    const showExpandIcon = computed(() =>
      props.expandIcon === undefined ? collapseProps.expandIcon : props.expandIcon,
    );
    const rightIcon = computed(() => showExpandIcon.value && (isActive.value ? ChevronDownIcon : ChevronUpIcon));

    // 切换自身展开态
    const onChange = (e: any = null, from = '') => {
      e?.stopPropagation();
      if (props.disabled) {
        return;
      }
      emitEvent('click', props.value);
      if (/^header$/i.test(from) && !props.expandOnRowClick) {
        return;
      }
      onPanelChange(props.value);
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
      if (collapseProps.defaultExpandAll) {
        // 展开未展开的
        !isActive.value && onChange();
      }
      updatePanelState();
    });
    return {
      ...toRefs(state),
      headDOM,
      rightIcon,
      bodyDOM,
      wrapDOM,
      className,
      isActive,
      onChange,
      defaultContent: props.default,
    };
  },
});
</script>
