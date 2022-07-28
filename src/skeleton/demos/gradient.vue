<template>
  <t-skeleton animation="gradient" theme="paragraph" :loading="loading" />
</template>
<script lang="ts" setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  loading: Boolean,
});

const { loading } = toRefs(props);
</script>
