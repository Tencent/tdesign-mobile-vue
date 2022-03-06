<template>
  <div>
    <p>正确</p>
    <div class="tdesign-demo-block">
      <t-button theme="primary">主要按钮</t-button>
      <t-button variant="outline" >次要按钮</t-button>
    </div>

    <br/>
    <p>错误</p>
    <div class="tdesign-demo-block">
      <t-button theme="primary">主要按钮</t-button>
      <t-button theme="primary">次要按钮</t-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
