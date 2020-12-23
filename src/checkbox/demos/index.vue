
<template>
  <div>
    <t-checkbox
      v-model="checked1"
      name="1"
      title="复选框1">
    </t-checkbox>
    <t-checkbox
      v-model="checked2"
      name="1"
      title="复选框2">
    </t-checkbox>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked1: '1',
      checked2: '2',
    };
  },
};
</script>
