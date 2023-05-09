<template>
  <tdesign-demo-block summary="带二次确认的操作">
    <t-swipe-cell :opened="opened" @change="handleChange">
      <t-cell title="带二次确认的操作" note="辅助信息"></t-cell>
      <template #left>
        <div class="btn edit-btn" @click="handleEdit">编辑</div>
        <div class="btn delete-btn" @click="handleDelete('left')">删除</div>
      </template>
      <template #right>
        <div class="btn edit-btn" @click="handleEdit">编辑</div>
        <div class="btn delete-btn" @click="handleDelete('right')">删除</div>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';
import Toast from '../../toast/index';
import { SwipeActionItem } from '../type';
import DialogPlugin from '@/dialog';

const opened = ref([false, true]);
const waiting = ref(false);

const handleChange = (d: string) => {
  opened.value[dir.value === 'left' ? 0 : 1] = d === 'right';
  if (
    waiting.value &&
    (!opened.value || (typeof opened.value === 'object' && !opened.value[dir.value === 'left' ? 0 : 1]))
  ) {
    nextTick(() => {
      opened.value[dir.value === 'left' ? 0 : 1] = true;
    });
  }
};

const handleEdit = () => {};
const dir = ref('right');

const handleDelete = (val: string) => {
  dir.value = val;
  waiting.value = true;
  DialogPlugin.confirm({
    content: '确认删除?',
    preventScrollThrough: true,
    confirmBtn: {
      content: '确认',
      variant: 'text',
    },
    cancelBtn: {
      content: '取消',
      variant: 'text',
    },
    onConfirm,
    onCancel,
  });
};
const onConfirm = () => {
  Toast.success('删除成功');
  waiting.value = false;

  opened.value[dir.value === 'left' ? 0 : 1] = false;
};
const onCancel = () => {
  waiting.value = false;
  Toast.success('取消删除');
  opened.value[dir.value === 'left' ? 0 : 1] = true;
};
</script>
