<template>
  <t-rate v-model="value" allow-half />
</template>

<script>
export default {
  data() {
    return {
      value: 3.5,
    };
  },
};
</script>
