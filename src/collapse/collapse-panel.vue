<template>
  <div ref="$wrap" :class="className">
    <div ref="$head" :class="`${classPrefix}__header`" @click="handleClick">
      <div :class="`${classPrefix}__title`">
        <slot name="header">{{ header }}</slot>
      </div>
      <div :class="`${classPrefix}__header-right`">
        <div v-if="headerRightContent || $slots.extra" :class="`${classPrefix}__header-extra`">
          <slot name="headerRightContent">{{ headerRightContent }}</slot>
        </div>
        <component :is="rightIcon" :class="`${classPrefix}__header-icon`" />
      </div>
    </div>
    <div ref="$body" :class="`${classPrefix}__body`">
      <t-node :content="panelContent"></t-node>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  nextTick,
  watch,
  onMounted,
  inject,
  SetupContext,
  defineComponent,
  getCurrentInstance,
} from 'vue';
import { ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next';
import props from './collapse-panel-props';
import config from '../config';
import { findIndex } from './util';
import { renderTNode, renderContent, TNode } from '../shared';
import { CollapseProvide } from './collapse.vue';

const { prefix } = config;
const name = `${prefix}-collapse-panel`;
export default defineComponent({
  name,
  components: { ChevronDownIcon, ChevronUpIcon, TNode },
  props,
  setup(props, context: SetupContext) {
    const internalInstance = getCurrentInstance();
    const parent = inject<CollapseProvide>('collapse');
    const isTrue = (val: any) => typeof val === 'boolean' && val;

    const rightIcon = computed(() => {
      if (props.expandIcon === false) return;
      if (isTrue(props.expandIcon) || isTrue(parent?.expandIcon.value)) {
        console.log(isTrue(parent?.expandIcon.value));

        return isActive.value ? ChevronDownIcon : ChevronUpIcon;
      }
      return renderTNode(internalInstance, 'expand-icon')[0];
    });
    const disabled = computed(() => parent?.disabled.value || props.disabled);
    const className = computed(() => ({
      [`${name}`]: true,
      [`${name}--active`]: isActive.value,
      [`${name}--disabled`]: disabled.value,
    }));
    const isActive = computed(() => findIndex(props.value, parent?.activeValue.value) > -1);
    const updatePanelValue = () => {
      if (props.value != null) {
        parent?.onPanelChange(props.value);
      }
    };
    const handleClick = (e: MouseEvent) => {
      e?.stopPropagation();
      if (disabled.value) {
        return;
      }
      updatePanelValue();
    };
    const panelContent = renderContent(internalInstance, 'default', 'content');

    // 设置折叠/展开高度过渡
    const $body = ref();
    const $wrap = ref();
    const $head = ref();
    const updatePanelState = () => {
      if (!$wrap.value) {
        // console.log('[collapse] 组件尚未挂载', $wrap.value);
        return;
      }
      const { height: headHeight } = $head.value.getBoundingClientRect();
      if (!isActive.value) {
        $wrap.value.style.height = `${headHeight}px`;
        return;
      }
      const { height: bodyHeight } = $body.value.getBoundingClientRect();
      const height = headHeight + bodyHeight;
      $wrap.value.style.height = `${height}px`;
    };

    watch(isActive, () => {
      nextTick(() => {
        updatePanelState();
      });
    });

    onMounted(() => {
      if (parent?.defaultExpandAll) {
        updatePanelValue();
      }
      updatePanelState();
    });

    return {
      classPrefix: name,
      rightIcon,
      $head,
      $body,
      $wrap,
      className,
      handleClick,
      panelContent,
    };
  },
});
</script>
