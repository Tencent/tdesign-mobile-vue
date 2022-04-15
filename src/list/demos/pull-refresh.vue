<template>
  <t-pull-down-refresh v-model="refreshing" @refresh="onRefresh">
    <t-list @scroll="(e) => onScroll(e, 2)">
      <t-cell v-for="item in list" :key="item" align="middle">
        <span class="cell">{{ item }}</span>
      </t-cell>
    </t-list>
  </t-pull-down-refresh>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

const MAX_DATA_LEN = 60;
const loadData = (data: any, isRefresh?: Boolean) => {
  const ONCE_LOAD_NUM = 15;

  return new Promise((resolve) => {
    setTimeout(() => {
      const temp = [];
      for (let i = 0; i < ONCE_LOAD_NUM; i++) {
        if (isRefresh) {
          temp.push(`${i + 1}`);
        } else {
          temp.push(`${data.value.length + 1 + i}`);
        }
      }

      if (isRefresh) {
        data.value = temp;
      } else {
        data.value.push(...temp);
      }

      resolve(data);
    }, 1000);
  });
};
export default defineComponent({
  setup() {
    const list = ref([] as Array<any>);
    const loading = ref(false);
    const refreshing = ref(false);

    const onLoad = (isRefresh?: Boolean) => {
      if ((list.value.length >= MAX_DATA_LEN && !isRefresh) || loading.value) {
        return;
      }
      loading.value = true;
      loadData(list, isRefresh).then(() => {
        loading.value = false;
      });
    };

    const onScroll = ({ scrollBottom }: { scrollBottom: number }) => {
      if (scrollBottom === 0) {
        onLoad();
      }
    };

    const onLoadPull = (isRefresh?: Boolean) => {
      if (list.value.length >= MAX_DATA_LEN && !isRefresh) {
        return;
      }
      loadData(list, isRefresh).then(() => {
        refreshing.value = false;
      });
    };

    const onRefresh = () => {
      refreshing.value = true;
      onLoadPull(true);
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
      onLoadPull,
    };
  },
});
</script>
