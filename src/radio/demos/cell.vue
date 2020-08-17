<template>
  <div>
    <t-cell-group title="基础单选框">
      <t-radio-group v-model="radio" @change="change">
        <t-cell value-align="left">
          <t-radio name="1" title="单选框1"></t-radio>
        </t-cell>
        <t-cell value-align="left">
          <t-radio name="2" title="单选框2"></t-radio>
        </t-cell>
      </t-radio-group>
    </t-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '1',
    };
  },
  watch: {
    radio(val) {
      console.log(val);
    },
  },
  methods: {
    change(val) {
      console.log(val);
    },
  },
};
</script>
