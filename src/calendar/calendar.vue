<template>
  <div>
    <calendarTemplate v-if="!usePopup">
      <template #confirmBtn>
        <slot name="confirmBtn"></slot>
      </template>
    </calendarTemplate>
    <t-popup v-else v-model="popup" placement="bottom">
      <calendarTemplate @visible-change="onVisibleChange">
        <template #confirmBtn>
          <slot name="confirmBtn"></slot>
        </template>
      </calendarTemplate>
    </t-popup>
  </div>
</template>

<script lang="ts">
import { defineEmits, defineProps, provide, watch, ref } from 'vue';
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
provide('templateProps', { ...props });

const usePopup = ref<boolean>(props.usePopup);
const popup = ref<boolean>(props.visible);
const emit = defineEmits(['update:visible']);
let isNotAutoClose = false;

const onVisibleChange = () => {
  popup.value = false;
};

watch(
  () => props.visible,
  (val) => {
    isNotAutoClose = true;
    popup.value = val;
  },
);
watch(
  () => popup.value,
  (val) => {
    if (props.autoClose || isNotAutoClose) {
      isNotAutoClose = false;
      emit('update:visible', val);
    } else {
      popup.value = true;
    }
  },
);
</script>
