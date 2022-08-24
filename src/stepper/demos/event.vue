<template>
  <div class="stepper-demo">
    <t-cell title="标题文字（单位）">
      <template #rightIcon>
        <t-stepper
          v-model.number="number"
          :step="1"
          :min="0"
          :max="100"
          @overlimit="onOverlimit"
          @change="onChange"
          @blur="onBlur"
        />
      </template>
    </t-cell>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const number = ref(0);
const onChange = ($event: number) => {
  console.log(`change to ${$event}`);
};
const onBlur = ($event: number) => {
  console.log(`blur to ${$event}`);
};
const onOverlimit = ($type: string) => {
  console.log(`onOverlimit ${$type}`);
};
</script>
