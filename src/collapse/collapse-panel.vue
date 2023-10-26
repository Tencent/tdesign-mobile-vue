<template>
  <div ref="wrapRef" :class="rootClass" :style="{ height: wrapperHeight }">
    <div ref="headRef" :class="`${name}__title`" @click="handleClick">
      <t-cell
        :class="[`${name}__header`, `${name}__header--${placement}`, { [`${name}__header--expanded`]: isActive }]"
      >
        <template v-if="leftIcon" #leftIcon>
          <t-node :content="leftIcon" />
        </template>
        <template #title>
          <t-node :content="headerContent" />
        </template>
        <template #note>
          <t-node :content="noteContent" />
        </template>
        <template #rightIcon>
          <component :is="rightIcon" :class="`${name}__header-icon`" />
        </template>
      </t-cell>
    </div>
    <div ref="bodyRef" :class="`${name}__content`">
      <t-node :content="panelContent" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, nextTick, watch, onMounted, inject, defineComponent, getCurrentInstance } from 'vue';
import { ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next';
import isFunction from 'lodash/isFunction';
import TCell from '../cell';
import props from './collapse-panel-props';
import config from '../config';
import { findIndex } from './util';
import { renderTNode, renderContent, TNode } from '../shared';
import { CollapseProvide } from './collapse.vue';

const { prefix } = config;
const name = `${prefix}-collapse-panel`;
export default defineComponent({
  name,
  components: { TNode, TCell },
  props,
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const parent = inject<CollapseProvide>('collapse');
    const isTrue = (val: any) => typeof val === 'boolean' && val;

    const rightIcon = computed(() => {
      if (props.expandIcon === false) return;
      if (isFunction(props.expandIcon) || context.slots.expandIcon) {
        return renderTNode(internalInstance, 'expandIcon');
      }
      if (isTrue(props.expandIcon) || isTrue(parent?.expandIcon.value)) {
        if (props.placement === 'bottom') {
          return isActive.value ? ChevronUpIcon : ChevronDownIcon;
        }
        return isActive.value ? ChevronDownIcon : ChevronUpIcon;
      }

      return null;
    });
    const disabled = computed(() => parent?.disabled.value || props.disabled);
    const rootClass = computed(() => ({
      [`${name}`]: true,
      [`${name}--${props.placement}`]: true,
      [`${name}--active`]: isActive.value,
      [`${name}--disabled`]: disabled.value,
    }));
    const isActive = computed(() => findIndex(props.value, parent?.activeValue.value) > -1);
    const updatePanelValue = (args?: any) => {
      if (props.value != null) {
        parent?.onPanelChange(props.value, args);
      }
    };
    const handleClick = (e: MouseEvent) => {
      e?.stopPropagation();
      if (disabled.value) {
        return;
      }
      updatePanelValue({ e });
    };

    // tnode
    const panelContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const headerContent = computed(() => renderTNode(internalInstance, 'header'));
    const noteContent = computed(() => renderTNode(internalInstance, 'headerRightContent'));
    const leftIcon = computed(() => renderTNode(internalInstance, 'headerLeftIcon'));

    // 设置折叠/展开高度过渡
    const bodyRef = ref();
    const wrapRef = ref();
    const headRef = ref();
    const wrapperHeight = ref('');
    const updatePanelState = () => {
      nextTick(() => {
        if (!wrapRef.value) {
          return;
        }
        const { height: headHeight } = headRef.value.getBoundingClientRect();
        if (!isActive.value) {
          wrapperHeight.value = `${headHeight}px`;
          return;
        }
        const { height: bodyHeight } = bodyRef.value.getBoundingClientRect();
        const height = headHeight + bodyHeight;
        wrapperHeight.value = `${height}px`;
      });
    };

    watch(
      isActive,
      () => {
        nextTick(() => updatePanelState());
      },
      {
        immediate: true,
      },
    );

    watch(panelContent, () => {
      nextTick(() => updatePanelState());
    });

    onMounted(() => {
      if (parent?.defaultExpandAll) {
        updatePanelValue();
      }
    });

    return {
      name,
      rightIcon,
      headRef,
      bodyRef,
      wrapRef,
      rootClass,
      isActive,
      handleClick,
      leftIcon,
      panelContent,
      headerContent,
      noteContent,
      wrapperHeight,
    };
  },
});
</script>
