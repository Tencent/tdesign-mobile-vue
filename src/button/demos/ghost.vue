<template>
  <div class="row">
    <t-button size="large" ghost theme="primary">幽灵按钮</t-button>
    <t-button size="large" ghost theme="danger">幽灵按钮</t-button>
    <t-button size="large" ghost>幽灵按钮</t-button>
  </div>
</template>

<style scoped lang="less">
.row {
  display: flex;
  padding: 16px;
  background-color: #181818;
}

.t-button + .t-button {
  margin-left: 16px;
}
</style>
