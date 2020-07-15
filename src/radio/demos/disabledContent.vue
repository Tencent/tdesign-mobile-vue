
<template>
  <div>
    <t-radio-group v-model="radio" @change="change">
      <t-radio name="1" title="单选框1" content-disabled></t-radio>
      <t-radio name="2" title="单选框2" content-disabled></t-radio>
    </t-radio-group>
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
