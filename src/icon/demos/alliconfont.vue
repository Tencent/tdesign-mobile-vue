<template>
  <div class="tdesign-demo-iconfont">
    <p>
      使用 Iconfont 图标需要单独引入 Iconfont 图标组件：<code>import TIcon from '@/src/icon/iconfont';</code><br>
    </p><br>
    <div class="tdesign-demo-row">
      <t-icon name="loading"/>
      <t-icon name="close" @click="onIconClose"/>
      <t-icon name="help-circle-filled"/>
    </div><br>
    <div class="tdesign-demo-row">
      <t-icon name="help-circle-filled" size="small"/>
      <t-icon name="help-circle-filled" />
      <t-icon name="help-circle-filled" size="middle"/>
      <t-icon name="help-circle-filled" size="large"/>
      <t-icon name="help-circle-filled" size="25px"/>
      <t-icon name="help-circle-filled" size="2em"/>
    </div><br>
    <div class="tdesign-demo-row">
      <t-icon name="help-circle-filled" style="color: red"/>
      <t-icon name="help-circle-filled" style="color: green"/>
      <t-icon name="help-circle-filled" style="color: orange"/>
    </div>
  </div>
</template>

<script lang="ts">
import TIcon from '@/icon/iconfont';
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const onIconClose = () => console.log('icon was clicked.');
    return { TIcon, onIconClose };
  },
});
</script>
