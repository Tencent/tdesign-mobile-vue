<template>
  <div class="dialog-body">
    <p>User guide description copy.</p>
    <div class="img-wrapper">
      <img src="https://tdesign.gtimg.com/demo/demo-image-1.png" alt="demo" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.dialog-body {
  .img-wrapper {
    border-radius: var(--td-radius-default);
    overflow: hidden;
    img {
      vertical-align: bottom;
      width: 100%;
    }
  }

  p {
    margin-bottom: 24px;
    color: var(--td-text-color-secondary);
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
}
</style>
