<template>
  <t-pull-down-refresh v-model="refreshing" @refresh="onRefresh">
    <t-list :async-loading="pullloading" @scroll="(e) => onScroll(e, 2)">
      <t-cell v-for="item in listPull" :key="item" align="middle">
        <span class="cell">{{ item }}</span>
      </t-cell>
    </t-list>
  </t-pull-down-refresh>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const list = ref([] as Array<any>);
    const loading = ref(false);
    const refreshing = ref(false);

    const onLoad = (isRefresh?: boolean) => {
      if (list.value.length >= 60 || loading.value) {
        return;
      }
      loading.value = true;
      setTimeout(() => {
        const temp = [];
        for (let i = 0; i < 15; i++) {
          if (isRefresh) {
            temp.push(`${i + 1}`);
          } else {
            temp.push(`${list.value.length + 1}`);
          }
        }
        if (isRefresh) {
          list.value = temp;
        } else {
          list.value.push(...temp);
        }
        loading.value = false;
        refreshing.value = false;
      }, 1000);
    };

    const onScroll = ({ scrollBottom }: { scrollBottom: number }) => {
      if (scrollBottom === 0) {
        onLoad();
      }
    };

    const onRefresh = () => {
      refreshing.value = true;
      onLoad(true);
    };

    onMounted(() => {
      onLoad();
    });

    return {
      list,
      loading,
      refreshing,
      onLoad,
      onScroll,
      onRefresh,
    };
  },
});
</script>
