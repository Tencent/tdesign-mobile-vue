<template>
  <div>
    <div class="progress-demo">
      <t-progress :percentage="88" />
    </div>
    <div class="progress-demo">
      <t-progress :percentage="88" :label="false" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.progress-demo {
  padding: 8px 16px;
  background-color: #fff;
}
</style>
