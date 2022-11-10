<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">SwipeCell 滑动单元格</h1>
    <p class="summary">用来承载列表中的更多操作，通过左右滑动来展示，按钮的宽度固定高度根据列表高度而变化。</p>
    <left-one-menu />
    <left-two-menu />
    <left-more-menu />
    <left-card />
    <right-menu />
    <bind />
    <content />
    <disabled />
    <btns />
    <event />
  </div>
</template>

<script setup lang="ts">
import bind from './bind.vue';
import btns from './btns.vue';
import content from './content.vue';
import disabled from './disabled.vue';
import event from './event.vue';
import leftCard from './left-card.vue';
import leftMoreMenu from './left-more-menu.vue';
import leftOneMenu from './left-one-menu.vue';
import leftTwoMenu from './left-two-menu.vue';
import rightMenu from './right-menu.vue';
</script>
