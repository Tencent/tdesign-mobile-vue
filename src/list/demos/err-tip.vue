<template>
  <t-list :async-loading="loading" @scroll="onLoadMore">
    <t-cell v-for="item in list" :key="item" align="middle">
      <span class="cell">{{ item }}</span>
    </t-cell>
    <template #footer>
      <div v-if="showError" class="error" @click.stop="onLoadMore">请求失败，点击重新加载</div>
    </template>
  </t-list>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, h } from 'vue';

export default defineComponent({
  setup() {
    const list = ref([] as Array<any>);
    const loading = ref(false);
    const showError = ref(false);

    const onLoad = () => {
      loading.value = true;

      setTimeout(() => {
        for (let i = 0; i < 8; i++) {
          list.value.push(`${list.value.length + 1}`);
        }
        showError.value = true;
        loading.value = false;
      }, 1000);
    };

    onMounted(() => {
      onLoad();
    });

    const onLoadMore = () => {
      showError.value = false;
      if (list.value.length >= 60 || loading.value) {
        return;
      }

      loading.value = true;

      setTimeout(() => {
        for (let i = 0; i < 15; i++) {
          list.value.push(`${list.value.length + 1}`);
        }
        loading.value = false;
      }, 1000);
    };

    return {
      list,
      loading,
      showError,
      onLoadMore,
    };
  },
  data() {
    return {};
  },
});
</script>
