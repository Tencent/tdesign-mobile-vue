<template>
  <div>
    <div class="tdesign-demo-block">
      <t-navbar @click-text="onClickText" @click-right="onClickMore">
        界面标题
        <template #left>
          <t-icon name="close" @click="onClickLeft"></t-icon>
        </template>
      </t-navbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
  methods: {
    onClickMore() {
      this.$toast('Click More');
      console.log('on click more');
    },
    onClickText() {
      this.$toast('Click Text');
      console.log('on click Text');
    },
    onClickLeft() {
      this.$toast('Click close');
      console.log('on click left');
    },
  },
});
</script>
