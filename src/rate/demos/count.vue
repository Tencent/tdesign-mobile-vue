<template>
  <t-rate v-model="value" :count="6" allow-half clearable />
</template>

<script>
export default {
  data() {
    return {
      value: 6,
    };
  },
};
</script>
