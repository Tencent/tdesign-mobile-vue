<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Grid 宫格</h1>
    <p class="summary">用于功能入口布局，将页面或特定区域切分成若干等大的区块，形成若干功能入口。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础宫格">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带描述宫格">
      <descDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带边框宫格">
      <borderedDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带徽标宫格">
      <badgeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="可滑动宫格">
      <scrollDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式" summary="可传图标的宫格">
      <iconDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="卡片宫格">
      <cardDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import descDemo from './desc.vue';
import borderedDemo from './bordered.vue';
import badgeDemo from './badge.vue';
import scrollDemo from './scroll.vue';
import iconDemo from './icon.vue';
import cardDemo from './card.vue';
</script>
