<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="onClick('top')">顶部Top</t-button>
    <t-button theme="primary" @click="onClick('middle')" >中间Middle</t-button>
    <t-button theme="primary" @click="onClick('bottom')" >底部Bottom</t-button>
  </div>
</template>

<script>
import Toast from '../index';
export default {
  methods: {
    onClick(position) {
      Toast({
        position,
        icon: 'tick',
      });
    },
  },
};
</script>
