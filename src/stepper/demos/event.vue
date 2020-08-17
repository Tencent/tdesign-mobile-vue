<template>
  <div class="cell-base">

    <t-cell-group title="绑定事件">
      <t-stepper label="标题文字" v-model.number="number" :step="1" :min="0" :max="100"
                 :input-width="70" @change="onChange"/>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const onChange = ($event: number) => {
      console.log(`change to ${$event}`);
    };
    return {
      number: 10,
      onChange,
    };
  },
};
</script>
