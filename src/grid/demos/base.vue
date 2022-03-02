<template>
  <div class="grid-demo">
    <t-grid>
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="最多四字" :image="imgUrl" />
    </t-grid>
  </div>
  <div class="grid-demo">
    <t-grid :column="5">
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="最多四字" :image="imgUrl" />
    </t-grid>
  </div>
  <div class="grid-demo">
    <t-grid :column="3">
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题最多六字" :image="imgUrl" />
    </t-grid>
  </div>
  <div class="grid-demo short-width">
    <t-grid :column="5">
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题文字" :image="imgUrl" />
      <t-grid-item text="标题文字" :image="imgUrl" />
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
<style scoped lang="less">
.grid-demo {
  margin: 0 16px 8px;

  &.short-width {
    margin: 0 26px 8px;
  }
}
</style>
