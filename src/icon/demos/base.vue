<template>
  <div class="t-demo-iconfont">
    <div class="t-demo-row">
      <p>How do you feel today?</p>
      <icon name="sneer" @click="onIconClose" />
      <icon name="unhappy" />
      <icon name="excited" />
      <icon name="surprised" />
      <icon name="giggle" />
    </div>
    <br />
    <div class="t-demo-row">
      <p>What's your favourite food?</p>
      <icon name="tangerinr" color="orange" />
      <icon name="bamboo-shoot" color="green" />
      <icon name="apple" color="red" />
      <icon name="milk" color="#0052D9" />
      <icon name="peach" color="pink" />
    </div>
    <br />
    <div class="t-demo-row">
      <p>How much icons does TDesign Icon includes?</p>
      <icon name="numbers-1" style="color: red" />
      <icon name="numbers-2" style="color: green" />
      <icon name="numbers-0" style="color: orange" />
      <icon name="numbers-3" style="color: #0052d9" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next';

const onIconClose = () => {
  console.log('icon was clicked.');
};
</script>

<style lang="less">
.t-demo-iconfont {
  .t-icon {
    margin-right: 24px;
  }
}
</style>
