<template>
  <div>
    <t-grid :column="3">
      <t-grid-item text="标题文字" :image="imgUrl" description="说明文字" />
      <t-grid-item text="标题文字" :image="imgUrl" description="说明文字" />
      <t-grid-item text="标题最多六字" :image="imgUrl" description="说明最多六字" />
    </t-grid>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      imgUrl: 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png',
    };
  },
});
</script>
