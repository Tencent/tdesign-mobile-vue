<template>
  <div>
    <t-grid>
      <t-grid-item text="标题文字" :image="imgUrl" :badge-props="{ dot: true }" />
      <t-grid-item text="标题文字" :image="imgUrl" :badge-props="{ count: 3 }" />
      <t-grid-item text="标题五字内" :image="imgUrl" :badge-props="{ count: 'NEW' }" />
      <t-grid-item text="标题五字内" :image="imgUrl" :badge-props="{ count: '...' }" />
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
