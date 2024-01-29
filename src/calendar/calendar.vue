<template>
  <div>
    <calendarTemplate v-if="!usePopup" ref="calendarTemplateRef">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #confirmBtn>
        <slot name="confirmBtn"></slot>
      </template>
    </calendarTemplate>
    <t-popup v-else :visible="props.visible" placement="bottom" @visible-change="onPopupVisibleChange">
      <calendarTemplate ref="calendarTemplateRef" @visible-change="onVisibleChange">
        <template #title>
          <slot name="title"></slot>
        </template>
        <template #confirmBtn>
          <slot name="confirmBtn"></slot>
        </template>
      </calendarTemplate>
    </t-popup>
  </div>
</template>

<script lang="ts">
import { defineEmits, defineProps, provide, watch, ref, reactive, nextTick, onMounted } from 'vue';

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
const calendarTemplateRef = ref();

provide('templateProps', reactive(props));

const emit = defineEmits(['update:visible']);

const selectedValueIntoView = () => {
  const type = props.type === 'range' ? 'start' : 'selected';
  const { templateRef } = calendarTemplateRef.value;
  const scrollContainer = templateRef.querySelector(`.${name}__months`);
  const selectedDate = templateRef.querySelector(`.${name}__dates-item--${type}`)?.parentNode?.previousElementSibling;
  if (selectedDate) {
    scrollContainer.scrollTop = selectedDate.offsetTop - scrollContainer.offsetTop;
  }
};

const onVisibleChange = (v: boolean) => {
  emit('update:visible', v);
};
const onPopupVisibleChange = (v: boolean) => {
  if (!v) {
    props.onClose?.('overlay');
  } else {
    nextTick(() => {
      selectedValueIntoView();
    });
  }
  emit('update:visible', v);
};

onMounted(() => {
  if (!props.usePopup) selectedValueIntoView();
});

watch(
  () => props.value,
  (val) => {
    calendarTemplateRef.value.valueRef = val;
  },
);
</script>
