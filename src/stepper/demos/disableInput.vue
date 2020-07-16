<template>
  <div class="cell-base">

    <t-cell-group title="禁止输入">
      <t-stepper label="禁止输入" v-model.number="number" :step="1" :min="0" :max="100"
                 disableInput/>
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
