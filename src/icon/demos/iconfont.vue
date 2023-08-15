<template>
  <div class="t-demo-iconfont">
    <div class="t-demo-row">
      <p>How do you feel today?</p>
      <icon-font name="sneer" />
      <icon-font name="unhappy" />
      <icon-font name="excited" />
      <icon-font name="surprised" />
      <icon-font name="giggle" />
    </div>
    <br />
    <div class="t-demo-row">
      <p>What's your favourite food?</p>
      <icon-font name="tangerinr" style="color: orange" />
      <icon-font name="bamboo-shoot" style="color: green" />
      <icon-font name="apple" style="color: red" />
      <icon-font name="milk" style="color: #0052d9" />
      <icon-font name="peach" style="color: pink" />
    </div>
    <br />
    <div class="t-demo-row">
      <p>How much icons does TDesign Icon includes?</p>
      <icon-font name="numbers-1" style="color: red" />
      <icon-font name="numbers-2" style="color: green" />
      <icon-font name="numbers-0" style="color: orange" />
      <icon-font name="numbers-3" style="color: #0052d9" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconFont } from 'tdesign-icons-vue-next';

const onIconClose = () => {
  console.log('icon was clicked.');
};
</script>
