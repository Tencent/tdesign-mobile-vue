<template>
  <template v-if="!time">
    <t-node :content="contentLayout"></t-node>
  </template>
  <span :class="`${name} ${name}--${theme} ${name}--${size} ${!hasChinese ? '' : `${name}--split-with-unit`}`">
    <template v-if="time">
      <template v-for="item in showTimes" :key="item.mark">
        <span :class="`${name}__digit`">{{ item.value }}</span>
        <span v-if="item.mark" :class="`${name}__unit`">{{ item.mark }}</span>
      </template>
    </template>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue';
import config from '../config';
import CountDownProps from './props';
import { useCountDown } from '../shared/useCountDown';
import { renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-countdown`;

export default defineComponent({
  name,
  components: { TNode },
  props: {
    ...CountDownProps,
  },
  setup(props) {
    const { time, showTimes } = useCountDown(props);
    const internalInstance = getCurrentInstance();
    const hasChinese = /.*[\u4e00-\u9fa5]+.*$/?.test?.(props?.format);
    const contentLayout = computed(() => renderTNode(internalInstance, 'content'));
    // return
    return {
      name,
      time,
      showTimes,
      hasChinese,
      contentLayout,
    };
  },
});
</script>
