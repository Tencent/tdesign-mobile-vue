<template>
  <t-pull-down-refresh v-model="refreshing" @refresh="onRefresh">
    <t-list :async-loading="pullloading" @scroll="onScroll">
      <t-cell v-for="item in listPull" :key="item" align="middle">
        <span class="cell">{{ item }}</span>
      </t-cell>
    </t-list>
  </t-pull-down-refresh>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const MAX_DATA_LEN = 60;

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

const listPull = ref([] as Array<any>);
const pullloading = ref('');
const refreshing = ref(false);

const onLoadPull = (isRefresh?: Boolean) => {
  if ((listPull.value.length >= MAX_DATA_LEN && !isRefresh) || pullloading.value) {
    return;
  }
  pullloading.value = 'loading';
  loadData(listPull, isRefresh).then(() => {
    pullloading.value = '';
    refreshing.value = false;
  });
};

const onScroll = (scrollBottom: number) => {
  if (scrollBottom < 50) {
    onLoadPull();
  }
};

const onRefresh = () => {
  refreshing.value = true;
  onLoadPull(true);
};
</script>
