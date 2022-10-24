<template>
  <t-list :async-loading="loading" @scroll="onScroll">
    <t-cell v-for="item in list" :key="item" align="middle">
      <span class="cell">{{ item }}</span>
    </t-cell>
  </t-list>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const loadData = (data: any, isRefresh?: Boolean) => {
  const ONCE_LOAD_NUM = 20;

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

const list = ref<any[]>([]);
const loading = ref('');

const onLoad = (isRefresh?: Boolean) => {
  if ((list.value.length >= 60 && !isRefresh) || loading.value) {
    return;
  }
  loading.value = 'loading';
  loadData(list, isRefresh).then(() => {
    loading.value = '';
  });
};

const onScroll = (scrollBottom: number) => {
  if (scrollBottom < 50) {
    onLoad();
  }
};

onMounted(() => {
  onLoad();
});
</script>
