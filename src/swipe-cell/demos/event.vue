<template>
  <tdesign-demo-block summary="带二次确认的操作">
    <t-swipe-cell ref="cellRef" :opened="opened" @change="handleChange">
      <t-cell title="带二次确认的操作" note="辅助信息"></t-cell>
      <template #left>
        <div class="btn edit-btn" @click="handleEdit">编辑</div>
        <div class="btn delete-btn" @click="handleDelete('left')">删除</div>
      </template>
      <template #right>
        <div class="btn edit-btn" @click="handleEdit">编辑</div>
        <div class="btn delete-btn" @click="handleDelete('right')">删除</div>
      </template>
      <template #sure-delete>
        <div class="sure-delete" @click="handleSureConfirm">确认删除？</div>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Toast from '../../toast/index';
import SwipeCell from '..';

const opened = ref([false, true]);
const cellRef = ref<InstanceType<typeof SwipeCell>>();

const handleChange = (d: string) => {
  if (d) {
    opened.value[d === 'left' ? 0 : 1] = true;
  } else {
    opened.value[0] = false;
    opened.value[1] = false;
  }
  dir.value = d;
};

const handleSureConfirm = () => {
  Toast.success(`删除成功${dir.value}`);
  opened.value[dir.value === 'left' ? 0 : 1] = false;
};

const handleEdit = () => {};
const dir = ref('right');

const handleDelete = (val: string) => {
  cellRef.value?.showSure('sure-delete');
};
</script>

<style lang="less" scoped>
.sure-delete {
  width: 100%;
  height: 100%;
  background-color: #e34d59;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-family: 'PingFang SC';
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
