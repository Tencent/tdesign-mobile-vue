<template>
  <t-cell-group title="单元格点击时触发" bordered>
    <t-cell @click="onClick">
      <template #title>
        <div>自定义标题</div>
      </template>
      <div>内容是长长长长长长长长长长长长长长长长长长长长长的</div>
    </t-cell>
    <t-cell @click="onClick">
      <template #title>
        <div>自定义标题</div>
      </template>
      <div>内容是短的</div>
    </t-cell>
  </t-cell-group>
</template>

<script lang="ts" setup>
import Message from '../../message';

const onClick = () => {
  Message.info('cell click');
};
</script>
