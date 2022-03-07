<template>
  <div :class="classes" @click="clickBackBtn">
    <icon v-if="!showIconTNode" :name="icon" />
    <t-node v-else :content="showIconTNode" />
    <span v-if="text" :class="`${name}__text`">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, SetupContext, getCurrentInstance } from 'vue';
import { Icon } from 'tdesign-icons-vue-next';
import { useElementBounding } from '@vueuse/core';
import { useEmitEvent, renderTNode, TNode } from '../shared';
import BackTopProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-back-top`;
export default defineComponent({
  name,
  components: { TNode, Icon },
  props: BackTopProps,
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const el = computed(() => {
      return props.target && props.target();
    });
    const { top } = useElementBounding(el);
    const classes = computed(() => {
      return {
        [`${name}`]: true,
        [`${prefix}-is-fixed`]: props.fixed,
        [`${name}--${props.theme}`]: true,
      };
    });

    // 根据icon的类型，展示不同的t-node
    const internalInstance = getCurrentInstance();
    const showIconTNode = computed(() => {
      if (context.slots?.icon || typeof props.icon === 'function') {
        return renderTNode(internalInstance, 'icon');
      }
      return false;
    });

    const clickBackBtn = () => {
      window.document.documentElement.scrollTop += top.value;
      emitEvent('toTop');
    };

    return {
      name,
      showIconTNode,
      classes,
      el,
      top,
      clickBackBtn,
    };
  },
});
</script>
