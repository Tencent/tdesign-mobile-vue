<template>
  <div :class="classes" :style="style" @click="onClick">
    <t-button
      size="large"
      theme="primary"
      :shape="props.text ? 'round' : 'circle'"
      :class="[`${name}__button`]"
      v-bind="buttonProps"
      :icon="() => iconTNode"
    >
      {{ text }}
    </t-button>
  </div>
</template>

<script lang="ts">
import { computed, defineProps, defineEmits, getCurrentInstance } from 'vue';

import { renderTNode, useEmitEvent } from '../shared';
import fabProps from './props';
import config from '../config';
import TButton from '../button';

const { prefix } = config;
const name = `${prefix}-fab`;

export default {
  name,
};
</script>

<script lang="ts" setup>
const props = defineProps(fabProps);
const emit = defineEmits(['click']);

const internalInstance = getCurrentInstance();
const iconTNode = computed(() => renderTNode(internalInstance, 'icon'));
const emitEvent = useEmitEvent(props, emit);

const classes = computed(() => ({
  [`${name}`]: true,
}));

const onClick = (e: MouseEvent) => emitEvent('click', { e });
</script>
