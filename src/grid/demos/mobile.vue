<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Grid 宫格</h1>
    <p class="summary">用于功能入口布局，将页面或特定区域切分成若干等大的区块，形成若干功能入口。</p>
    <tdesign-demo-block title="01 基础宫格" summary=" ">
      <div class="grid-demo">
        <t-grid>
          <t-grid-item text="标题文字" :image="imgUrl" />
          <t-grid-item text="标题文字" :image="imgUrl" />
          <t-grid-item text="标题文字" :image="imgUrl" />
          <t-grid-item text="标题五字内" :image="imgUrl" />
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
    </tdesign-demo-block>
    <tdesign-demo-block title="02 带说明宫格" summary=" ">
      <div class="grid-demo">
        <t-grid :column="3">
          <t-grid-item text="标题文字" :image="imgUrl" description="说明文字" />
          <t-grid-item text="标题文字" :image="imgUrl" description="说明文字" />
          <t-grid-item text="标题最多六字" :image="imgUrl" description="说明最多六字" />
        </t-grid>
      </div>
      <div class="grid-demo">
        <t-grid :column="2">
          <t-grid-item text="标题文字" layout="horizontal" :image="imgUrl" description="说明文字" />
          <t-grid-item text="标题文字" layout="horizontal" :image="imgUrl" description="说明文字" />
        </t-grid>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 带徽标宫格" summary=" ">
      <div class="grid-demo">
        <t-grid>
          <t-grid-item text="标题文字" :image="imgUrl" :badge-props="{ dot: true }" />
          <t-grid-item text="标题文字" :image="imgUrl" :badge-props="{ count: 3 }" />
          <t-grid-item text="标题五字内" :image="imgUrl" :badge-props="{ count: 'NEW' }" />
          <t-grid-item text="标题五字内" :image="imgUrl" :badge-props="{ count: '···' }" />
        </t-grid>
      </div>
    </tdesign-demo-block>
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
