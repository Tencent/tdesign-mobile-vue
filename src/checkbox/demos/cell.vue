<template>
  <div>
    <t-cell-group title="cell组合使用">
      <t-check-group v-model="checkBoxs">
        <t-cell value-align="left">
          <t-checkbox
            name="1"
            title="复选框1">
          </t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="2"
            title="复选框2"></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="3"
            title="复选框3"></t-checkbox>
        </t-cell>
      </t-check-group>
    </t-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkBoxs: ['1'],
    };
  },
  watch: {
    checkBoxs(val) {
      console.log(Array.from(val));
    },
  },
};
</script>
