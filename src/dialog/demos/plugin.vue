<template>
  <t-button content="命令行操作" block theme="primary" size="large" variant="outline" @click="onClick" />
</template>

<script lang="ts">
export default {
  methods: {
    onClick() {
      this.$dialog.confirm({
        title: '对话框标题',
        content: '告知当前状态、信息和解决方法，等内容。描述尽可能控制在三行内。',
        confirmBtn: '确认',
      });
    },
  },
};
</script>
