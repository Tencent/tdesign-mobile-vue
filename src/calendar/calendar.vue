<template>
  <div>
    <calendarTemplate v-if="!usePopup">
      <template #confirmBtn>
        <slot name="confirmBtn"></slot>
      </template>
    </calendarTemplate>
    <t-popup v-else :visible="props.visible" placement="bottom" @visible-change="onPopupVisibleChange">
      <calendarTemplate @visible-change="onVisibleChange">
        <template #confirmBtn>
          <slot name="confirmBtn"></slot>
        </template>
      </calendarTemplate>
    </t-popup>
  </div>
</template>

<script lang="ts">
import { defineEmits, defineProps, provide, reactive } from 'vue';

import TPopup from '../popup';
import config from '../config';
import calendarProps from './props';
import calendarTemplate from './template.vue';

const { prefix } = config;
const name = `${prefix}-calendar`;

export default {
  name,
  components: {
    TPopup,
  },
};
</script>

<script setup lang="ts">
const props = defineProps(calendarProps);

provide('templateProps', reactive(props));

const emit = defineEmits(['update:visible']);

const onVisibleChange = (v: boolean) => {
  emit('update:visible', v);
};
const onPopupVisibleChange = (v: boolean) => {
  if (!v) props.onClose?.('overlay');
  emit('update:visible', v);
};
</script>
