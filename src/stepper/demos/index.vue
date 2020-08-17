<template>
  <div class="cell-base">

    <t-cell-group title="基础步进器">
      <t-stepper label="标题文字" v-model.number="number" :step="1" :min="0" :max="100"/>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {
      number: 10,
    };
  },
};
</script>
