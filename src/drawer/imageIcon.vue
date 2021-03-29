<template>
  <img :src="img" alt="">
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    img: {
      type: String,
      default: '',
    },
  }
})
</script>
