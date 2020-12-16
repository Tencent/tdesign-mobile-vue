<template>
  <div ref="wrapDOM" :class="className">
    <div ref="headDOM" :class="`${baseClass}__header`" @click="e => onChange(e, 'header')">
      <div :class="`${baseClass}__title`">
        <slot name="title">{{title}}</slot>
      </div>
      <div :class="`${baseClass}__header-right`" @click="onChange">
        <div v-if="extra || $slots.extra" :class="`${baseClass}__header-extra`">
          <slot name="extra">{{extra}}</slot>
        </div>
        <t-icon :class="`${baseClass}__header-icon`" :name="rightIcon" />
      </div>
    </div>
    <div ref="bodyDOM" :class="`${baseClass}__body`">
      <div v-for="(c, i) in contList" :key="i" :class="contentClassName(c)">
        <slot name="default">
          <template v-if="typeof c === 'object'">
            <div :class="`${baseClass}-list__label`" :style="listLabelStyle">{{c.label}}</div>
            <div :class="`${baseClass}-list__content`">{{c.content}}</div>
          </template>
          <template v-else >{{c}}</template>
        </slot>
      </div>
    </div>
    <!-- <transition name="collapse">
    </transition> -->
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
import { ICollapseProps, ICollapseState, ICollapsePanelProps, CollapsePanelProps, CollapseIcon } from './collapse.interface';
import config from '../config';
import TIcon from '../icon';
import { findIndex, isFalsy, toArray } from './util';
const { prefix } = config;
const name = `${prefix}-collapse-panel`;
function getExpandIconName(isActive: boolean) {
  return isActive ? CollapseIcon.active : CollapseIcon.inactive;
  // CollapseIcon.right;
  //
}
export default defineComponent({
  name,
  components: { TIcon },
  props: CollapsePanelProps,
  emits: ['click'],
  setup(props: ICollapsePanelProps, context: SetupContext) {
    // 从父组件取属性、状态和控制函数
    const collapseProps = inject('collapseProps') as ICollapseProps;
    const collapseState = inject('collapseState') as ICollapseState;
    const onPanelChange = inject('onPanelChange') as Function;

    // 内容转为数组统一处理
    const contList = computed(() => (toArray(props.content)));
    const className = computed(() => ({
      [`${name}`]: true,
      [`${name}--active`]: isActive.value,
      [`${name}--disabled`]: props.disabled,
    }));
    const labelWidth = computed(() => props.labelWidth || collapseProps.labelWidth);
    const contentClassName = computed(() => (c: number | string | object) => [`${name}__content`, typeof c === 'object' ? `${name}-list__item` : '']);
    const listLabelStyle = computed(() => (!isFalsy(labelWidth.value) ? { width: `${labelWidth.value}px` } : {}));
    // 是否展开态
    const isActive = computed(() => findIndex(props.name, collapseState.curValue) > -1);
    const state = reactive({
      baseClass: name,
      // 右侧按钮是否展开
      rightIcon: getExpandIconName(isActive.value),
    });

    // 切换自身展开态
    const onChange = (e: any = null, from = '') => {
      e?.stopPropagation();
      if (props.disabled) {
        return;
      }
      context.emit('click', props.name);
      if (/^header$/i.test(from) && !props.headerClickable) {
        return;
      }
      onPanelChange(props.name);
    };

    // 设置折叠/展开高度过渡
    const bodyDOM = ref();
    const wrapDOM = ref();
    const headDOM = ref();
    const updatePanelState = () => {
      if (!wrapDOM.value) {
        console.log('[collapse] 组件尚未挂载', wrapDOM.value);
        return;
      }
      const { height: headHeight } = headDOM.value.getBoundingClientRect();
      state.rightIcon = getExpandIconName(isActive.value);
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
      contList,
      headDOM,
      bodyDOM,
      wrapDOM,
      className,
      contentClassName,
      listLabelStyle,
      onChange,
    };
  },
});
</script>
