<template>
  <t-list :async-loading="errloading" @scroll="onLoadMore">
    <t-cell v-for="item in listError" :key="item" align="middle">
      <span class="cell">{{ item }}</span>
    </t-cell>
    <template #footer>
      <t-loading v-if="showError" :indicator="false" @click.stop="onLoadMore">
        <div class="custom-error">请求失败，点击重新<span>加载</span></div>
      </t-loading>
    </template>
  </t-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const listError = ref<any[]>([]);

const errloading = ref('');
const showError = ref(false);

const onLoadMore = () => {
  showError.value = false;
  if (listError.value.length >= 60 || errloading.value) {
    return;
  }

  errloading.value = 'loading';

  setTimeout(() => {
    for (let i = 0; i < 15; i++) {
      listError.value.push(`${listError.value.length + 1}`);
    }
    errloading.value = '';
  }, 1000);
};
</script>
