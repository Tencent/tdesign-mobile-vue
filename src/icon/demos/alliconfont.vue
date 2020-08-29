<template>
  <div class="tdesign-demo-iconfont">
    <p>
      使用 Iconfont 图标需要单独引入 Iconfont 图标组件：<code>import TIcon from '@/src/icon/iconfont';</code><br>
    </p><br>
    <div class="tdesign-demo-row">
      <t-icon name="loading"/>
      <t-icon name="close" @click.native="onIconClose"/>
      <t-icon name="help_fill"/>
    </div><br>
    <div class="tdesign-demo-row">
      <t-icon name="help_fill" size="small"/>
      <t-icon name="help_fill" />
      <t-icon name="help_fill" size="middle"/>
      <t-icon name="help_fill" size="large"/>
      <t-icon name="help_fill" size="25px"/>
      <t-icon name="help_fill" size="2em"/>
    </div><br>
    <div class="tdesign-demo-row">
      <t-icon name="help_fill" style="color: red"/>
      <t-icon name="help_fill" style="color: green"/>
      <t-icon name="help_fill" style="color: orange"/>
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
