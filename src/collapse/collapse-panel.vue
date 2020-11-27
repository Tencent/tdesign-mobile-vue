<template>
  <div :class="classes">
    <div :class="headerClassName">
      <div :class="titleClassName">{{title}}</div>
      <div :class="headerRightClassName" @click="onChange">
        <div v-if="extra" :class="extraClassName">{{extra}}</div>
        <t-icon :class="headerIconClassName" :name="rightIcon" />
      </div>
    </div>
    <div :class="bodyClassName">
      <div :class="bodyInnerClassName" v-for="(c, i) in contList" :key="i">
        <div v-if="typeof c === 'object'" :class="listItemClassName">
          <div :class="listLabelClassName" :style="listLabelStyle">{{c.label}}</div>
          <div :class="listContentClassName">{{c.content}}</div>
        </div>
        <div v-else :class="contentClassName">{{c}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  // ref,
  // reactive,
  // toRefs,
  computed,
  // watch,
  // onMounted,
  inject,
  SetupContext,
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
  setup(props: ICollapsePanelProps, context: SetupContext) {
    // 从父组件取属性、状态和控制函数
    const wrapProps = inject('collapseProps') as ICollapseProps;
    const collapsePanelChange = inject('collapsePanelChange') as Function;

    // 内容转为数组统一处理
    const contList = computed(() => (Array.isArray(props.content) ? props.content : [props.content]));

    const isActive = computed(() => isIncluded(props.name, wrapProps.value));
    console.log('isActive', wrapProps.value, isActive.value);
    // 右侧按钮是否展开
    const rightIcon = computed(() => {
      console.log('rightIcon', isActive.value);
      return isActive.value ? CollapseIcon.inactive : CollapseIcon.active;
      // return props.active ? CollapseIcon.inactive : CollapseIcon.active;
      // const isFolded = contentList.includes(props.name);
      // console.log('isFolded', isFolded);
      // return isFolded ? CollapseIcon.inactive : CollapseIcon.active;
    });
    // 切换自身展开态
    const onChange: Function = () => {
      console.log('onChange', { ...props }, props.name, context);
      collapsePanelChange(props.name);
      // context.emit('update:active', !props.active);
      // context.emit('change', !props.active);
    };
    return {
      rightIcon,
      contList,
      headerClassName: computed(() => `${name}__header`),
      headerRightClassName: computed(() => `${name}__header-right`),
      headerIconClassName: computed(() => `${name}__header-icon`),
      bodyClassName: computed(() => `${name}__body`),
      bodyInnerClassName: computed(() => `${name}__body-inner`),
      titleClassName: computed(() => `${name}__title`),
      extraClassName: computed(() => `${name}__extra`),
      contentClassName: computed(() => `${name}__content`),
      listItemClassName: computed(() => `${name}-list__item`),
      listLabelClassName: computed(() => `${name}-list__title`),
      listLabelStyle: computed(() => ({
        ...wrapProps.labelWidth ? { width: `${wrapProps.labelWidth}px` } : {},
      })),
      listContentClassName: computed(() => `${name}-list__content`),
      onChange,
    };
  },
});
</script>
