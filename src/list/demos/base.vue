<template>
  <t-list :async-loading="loading" @scroll="onScroll">
    <t-cell v-for="item in list" :key="item" align="middle">
      <span class="cell">{{ item }}</span>
    </t-cell>
  </t-list>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const list = ref([] as Array<any>);
    const loading = ref(false);

    const onLoad = () => {
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

    const onScroll = ({ scrollBottom }: { scrollBottom: number }) => {
      if (scrollBottom === 0) {
        onLoad();
      }
    };

    onMounted(() => {
      onLoad();
    });

    return {
      list,
      loading,
      onLoad,
      onScroll,
    };
  },
});
</script>
