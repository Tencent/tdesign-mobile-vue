<template>
  <div>
    <PullDownRefresh v-model="refreshing">
      <div class="w-full" :style="{ backgroundColor: refreshing ? 'pink' : '' }">
        <div v-for="i in 50" :key="i" class="h-50px">{{ i }}</div>
      </div>
    </PullDownRefresh>
  </div>
</template>

<script setup lang="ts">
import { PullDownRefresh } from 'tdesign-mobile-vue';
import { ref } from 'vue';

const refreshing = ref(false);
</script>

<style scoped>
.w-full {
  width: 100%;
}

.h-50px {
  height: 50px;
}
</style>
