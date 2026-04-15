<template>
  <div class="tdesign-mobile-demo">
    <div class="example-segmented">
      <t-segmented v-model="valueWithIcon" block :options="optionsWithIcon" @change="handleChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { HomeIcon, AppIcon, UserIcon } from 'tdesign-icons-vue-next';

const valueWithIcon = ref<string | number>(0);

const optionsWithIcon = [
  { value: 0, label: 'home', icon: () => h(HomeIcon) },
  { value: 1, label: 'category', icon: () => h(AppIcon) },
  { value: 2, label: 'mine', icon: () => h(UserIcon) },
];

const handleChange = (value: string | number, selectedOption: any) => {
  console.log('onChange:', value, selectedOption);
};
</script>

<style scoped>
.tdesign-mobile-demo {
  padding-bottom: 0;
}

.example-segmented {
  background-color: var(--td-bg-color-container);
  padding: 16px;
}
</style>
