<template>
  <div>
    <div class="progress-demo progress-demo--margin">
      <t-progress :percentage="0" />
    </div>
    <div class="progress-demo progress-demo--margin">
      <t-progress :percentage="88" />
    </div>
    <div class="progress-demo progress-demo--margin">
      <t-progress :percentage="100" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.progress-demo {
  padding: 8px 16px;
  background-color: #fff;
}
.progress-demo--margin:not(:last-child) {
  margin-bottom: 16px;
}
</style>
