<template>
  <t-tag
    v-for="(tag, index) in closableTags"
    :key="tag"
    closable
    theme="primary"
    :icon="tag.icon"
    :size="tag.size"
    @close="onClickClose(index)"
    >{{ tag.name }}</t-tag
  >
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';

const closableTags = ref([
  {
    name: '标签',
    size: 'medium',
  },
  {
    name: '标签',
    size: 'medium',
    icon: () => h(AppIcon),
  },
]);

function onClickClose(index: number) {
  console.log(index);
  closableTags.value.splice(index, 1);
}
</script>
