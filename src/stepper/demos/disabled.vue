<template>
  <div class="cell-base">

    <t-cell-group title="禁用状态">
      <t-stepper label="失效" v-model.number="number" :step="1" :min="0" :max="100"
                 disabled/>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {
      number: 0,
    };
  },
};
</script>
