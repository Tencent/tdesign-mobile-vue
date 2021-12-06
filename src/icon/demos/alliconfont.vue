<template>
  <div class="t-demo-iconfont">
    <div class="t-demo-row">
      <icon-font name="loading" />
      <icon-font name="close" @click="onIconClose" />
      <icon-font name="check-circle-filled" />
    </div>
    <br />
    <div class="t-demo-row">
      <icon-font name="check-circle-filled" size="small" />
      <icon-font name="check-circle-filled" />
      <icon-font name="check-circle-filled" size="medium" />
      <icon-font name="check-circle-filled" size="large" />
      <icon-font name="check-circle-filled" size="25px" />
      <icon-font name="check-circle-filled" size="2em" />
    </div>
    <br />
    <div class="t-demo-row">
      <icon-font name="check-circle-filled" style="color: red" />
      <icon-font name="check-circle-filled" style="color: green" />
      <icon-font name="check-circle-filled" style="color: orange" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { IconFont } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: { IconFont },
});
</script>
