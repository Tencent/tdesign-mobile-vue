<template>
  <tdesign-demo-block summary="通过直接传入内容或者使用 slot#content 来渲染">
    <t-swipe-cell>
      <template #content>
        <div style="padding: 10px">使用slot#content</div>
      </template>
      <div style="padding: 10px">直接写组件</div>
      <template #right>
        <div>
          <t-button type="primary" style="height: 100%">收藏</t-button>
        </div>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts"></script>
