<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Skeleton 骨架屏</h1>
    <p class="summary">当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。</p>
    <tdesign-demo-block title="01 类型" summary="基础">
      <div class="skeleton-demo">
        <t-skeleton />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="头像组合">
      <div class="skeleton-demo">
        <t-skeleton theme="avatar-text"></t-skeleton>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="图片组合">
      <div class="skeleton-demo pic-compose">
        <t-skeleton :row-col="rowCols" class="item"></t-skeleton>
        <t-skeleton :row-col="rowCols" class="item"></t-skeleton>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 类型" summary="渐变加载动画">
      <div class="skeleton-demo">
        <t-skeleton animation="gradient" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="闪烁加载动画">
      <div class="skeleton-demo">
        <t-skeleton animation="flashed" />
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      rowCols: [
        {
          height: '171px',
          borderRadius: '8px',
        },
        1,
        {
          width: '80%',
        },
        [
          {
            width: '60%',
          },
          {
            width: '20%',
          },
        ],
      ],
    };
  },
});
</script>
<style scoped lang="less">
.skeleton-demo {
  margin: 0 16px;
}

.pic-compose {
  display: flex;
  justify-content: space-between;
  .item {
    width: 47%;
  }
}
</style>
