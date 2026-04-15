<template>
  <div class="tdesign-mobile-demo">
    <div class="example-segmented">
      <t-segmented :options="['选项一', '选项二', '选项三']" default-value="选项一" />
    </div>

    <div class="example-segmented">
      <t-segmented v-model="valueWithIcon" :options="optionsWithIcon" @change="handleChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { HomeIcon, AppIcon, UserIcon } from 'tdesign-icons-vue-next';

const valueWithIcon = ref<string | number>(1);

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

.example-segmented + .example-segmented {
  margin-top: 16px;
}
</style>
