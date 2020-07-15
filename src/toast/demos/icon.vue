<template>
  <div class="tdesign-demo-block">
    <t-button theme="success" @click="onClick('tick', '成功')">成功</t-button>
    <t-button theme="danger" @click="onClick('error', '失败')" >失败</t-button>
    <t-button theme="primary" @click="onClick('loading_gradient', '加载')" >加载</t-button>
    <t-button theme="primary" @click="onClick('books', '自定义图标')" >自定义图标</t-button>
  </div>
</template>

<script>
import Toast from '../index';
export default {
  methods: {
    onClick(icon, message) {
      Toast({
        message,
        icon,
      });
    },
  },
};
</script>
