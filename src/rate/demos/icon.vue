<template>
  <t-rate v-model="value" clearable show-text allow-half>
    <template v-slot:icon>
      <t-icon icon="apple" />
    </template>
  </t-rate>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
    };
  },
};
</script>
