<template>
  <div>
    <t-calendar
      v-model:visible="visible"
      :min-date="minDate"
      :max-date="maxDate"
      :value="value"
      type="range"
      @confirm="handleConfirm"
    ></t-calendar>
    <t-cell arrow @click="visible = true">
      <template #title>
        <div class="date-range-container">
          <span class="start-date">{{ formatDate(value[0]) }}</span>
          <span class="arrow-icon">→</span>
          <span class="end-date">{{ formatDate(value[1]) }}</span>
        </div>
      </template>
    </t-cell>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);

const handleConfirm = (val: any) => {
  console.log(val);
  if (Array.isArray(val)) {
    value.value = val;
  }
};
const minDate = new Date(2022, 1, 1);
const maxDate = new Date(2022, 2, 15);
const today = new Date(2022, 1, 19);
const tomorrow = new Date(2022, 1, 21);
const value = ref([today, tomorrow]);

const formatDate = (date: Date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
</script>

<style scoped>
.date-range-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.start-date,
.end-date {
  font-size: 14px;
  font-weight: bold;
}

.arrow-icon {
  margin: 0 8px;
  color: #999;
}
</style>
