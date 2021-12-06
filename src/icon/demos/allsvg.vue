<template>
  <div class="tdesign-demo-svg">
    <p>
      图标尺寸单位支持多种，'small', 'middle', 'large', '35px', '3em' 等。<br />
      图标颜色使用 CSS 控制，如：style="color: red"，或者 style="fill: red"。
    </p>
    <br />
    <div class="tdesign-demo-row">
      <t-icon name="loading" />
      <t-icon name="close" @click="onIconClose" />
      <t-icon name="help-circle-filled" />
    </div>
    <br />
    <div class="tdesign-demo-row">
      <t-icon name="help-circle-filled" size="small" />
      <t-icon name="help-circle-filled" />
      <t-icon name="help-circle-filled" size="middle" />
      <t-icon name="help-circle-filled" size="large" />
      <t-icon name="help-circle-filled" size="25px" />
      <t-icon name="help-circle-filled" size="2em" />
    </div>
    <br />
    <div class="tdesign-demo-row">
      <t-icon name="help-circle-filled" style="color: red" />
      <t-icon name="help-circle-filled" style="color: green" />
      <t-icon name="help-circle-filled" style="color: orange" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const onIconClose = () => console.log('icon was clicked.');
    return { onIconClose };
  },
});
</script>
