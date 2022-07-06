<template>
  <div class="button-demo flex">
    <t-button size="large" shape="square" theme="primary" loading :disabled="disabled"></t-button>
    <t-button size="large" theme="primary" loading :disabled="disabled">加载中...</t-button>
    <t-button size="large" theme="primary" :loading="loading" :disabled="disabled" @click="mockSubmit">
      {{ loading ? 'loading' : 'Click me!' }}
    </t-button>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, defineProps, ref } from 'vue';

const loading = ref(false);
const mockSubmit = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2e3);
};

const props = defineProps({
  disabled: Boolean,
});

const { disabled } = toRefs(props);
</script>
