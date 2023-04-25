<template>
  <div class="row">
    <t-button theme="primary" size="large">填充按钮</t-button>
    <t-button theme="primary" size="large" :icon="searchIcon" shape="square" aria-label="搜索"></t-button>
    <t-button theme="primary" size="large" shape="round">填充按钮</t-button>
    <t-button theme="primary" size="large" :icon="searchIcon" shape="circle" aria-label="搜索"></t-button>
  </div>

  <t-button theme="primary" size="large" block class="rectangle-button">填充按钮</t-button>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { SearchIcon } from 'tdesign-icons-vue-next';

const searchIcon = () => h(SearchIcon, { size: '24px' });
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  margin: 0 16px 16px;
}

.rectangle-button {
  border-radius: 0;
}
</style>
