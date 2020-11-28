<template>
  <div ref="wrapDOM" :class="className">
    <div ref="headDOM" :class="`${baseClass}__header`" @click="e => onChange(e, 'header')">
      <div :class="`${baseClass}__title`">{{title}}</div>
      <div :class="`${baseClass}__header-right`" @click="onChange">
        <div v-if="extra" :class="`${baseClass}__header-extra`">{{extra}}</div>
        <t-icon :class="`${baseClass}__header-icon`" :name="rightIcon" />
      </div>
    </div>
    <div ref="bodyDOM" :class="`${baseClass}__body`" :style="bodyStyle">
      <div :class="contentClassName(c)" v-for="(c, i) in contList" :key="i">
        <template v-if="typeof c === 'object'">
          <div :class="`${baseClass}-list__title`" :style="listLabelStyle">{{c.label}}</div>
          <div :class="`${baseClass}-list__content`">{{c.content}}</div>
        </template>
        <template v-else >{{c}}</template>
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
  // SetupContext,
  defineComponent,
} from 'vue';
import { ICollapseProps, ICollapsePanelProps, CollapsePanelProps, CollapseIcon } from './collapse.interface';
import config from '../config';
import TIcon from '../icon';
import { isIncluded } from './util.ts';
const { prefix } = config;
const name = `${prefix}-collapse-panel`;

export default defineComponent({
  name,
  components: { TIcon },
  props: CollapsePanelProps,
  setup(props: ICollapsePanelProps) {
    // 从父组件取属性、状态和控制函数
    const wrapProps = inject('collapseProps') as ICollapseProps;
    const collapsePanelChange = inject('collapsePanelChange') as Function;

    const state = reactive({
      baseClass: name,
      // 右侧按钮是否展开
      rightIcon: CollapseIcon.inactive,
    });

    // 内容转为数组统一处理
    const contList = computed(() => (Array.isArray(props.content) ? props.content : [props.content]));
    const className = computed(() => [
      `${name}`,
      isActive.value ? `${name}--active` : '',
      props.disabled ? `${name}--disabled` : '',
    ]);
    const contentClassName = computed(() => c => [`${name}__content`, typeof c === 'object' ? `${name}-list__item` : '']);
    const listLabelStyle = computed(() => ({
      ...wrapProps.labelWidth ? { width: `${wrapProps.labelWidth}px` } : {},
    }));
    const bodyStyle = computed(() => ({
      ...wrapProps.labelWidth ? { width: `${wrapProps.labelWidth}px` } : {},
    }));
    // 是否展开态
    const isActive = computed(() => isIncluded(props.name, wrapProps.value));

    // 切换自身展开态
    const onChange: Function = (e, from = '') => {
      e.stopPropagation();
      if (props.disabled) {
        return;
      }
      console.log('props.headerClickable', from, props.headerClickable);
      if (/^header$/i.test(from) && !props.headerClickable) {
        return;
      }
      collapsePanelChange(props.name);
    };

    // 设置折叠/展开高度过渡
    const bodyDOM = ref();
    const wrapDOM = ref();
    const headDOM = ref();
    const updatePanelState: Function = () => {
      if (!wrapDOM.value) {
        console.log('[collapse] 组件尚未挂载', wrapDOM.value);
        return;
      }
      // console.log('headDOM', headDOM, headDOM.value);
      const { height: headHeight } = headDOM.value.getBoundingClientRect();
      if (!isActive.value) {
        state.rightIcon = CollapseIcon.inactive;
        wrapDOM.value.style.height = `${headHeight}px`;
        return;
      }
      state.rightIcon = CollapseIcon.active;
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
      bodyStyle,
      onChange,
    };
  },
});
</script>
