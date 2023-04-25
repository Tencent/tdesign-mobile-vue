<template>
  <div :class="[`${name}`, `${name}--${theme}`, `${name}--${size}`]">
    <t-node v-if="content !== 'default' && countDownContent" :content="countDownContent"></t-node>
    <template v-else>
      <template v-for="item in showTimes" :key="item.mark">
        <span :class="`${name}__item`">{{ item.value }}</span>
        <span v-if="item.mark" :class="[`${name}__split`, `${name}__split--${splitWithUnit ? 'text' : 'dot'}`]">{{
          item.mark
        }}</span>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue';
import config from '../config';
import props from './props';
import { useCountDown } from '../shared/useCountDown';
import { renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-count-down`;

export default defineComponent({
  name,
  components: { TNode },
  props,
  setup(props) {
    const { time, showTimes } = useCountDown(props);
    const internalInstance = getCurrentInstance();
    const countDownContent = computed(() => renderTNode(internalInstance, 'content'));

    return {
      name,
      time,
      showTimes,
      countDownContent,
    };
  },
});
</script>
