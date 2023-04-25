<template>
  <div class="tag-container">
    <div class="tag-block">
      <t-tag size="extra-large" variant="light">加大尺寸</t-tag>
      <t-tag size="large" variant="light">大尺寸</t-tag>
      <t-tag size="medium" variant="light">中尺寸</t-tag>
      <t-tag size="small" variant="light">小尺寸</t-tag>
    </div>

    <div class="tag-block tag-block1">
      <t-tag size="extra-large" variant="light" closable>加大尺寸</t-tag>
      <t-tag size="large" variant="light" closable>大尺寸</t-tag>
      <t-tag size="medium" variant="light" closable>中尺寸</t-tag>
      <t-tag size="small" variant="light" closable>小尺寸</t-tag>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tag-container {
  width: 100%;
}
.tag-block {
  display: flex;
}
.tag-block1 {
  display: flex;
  justify-content: space-between;
}

.tag-block1 {
  > span {
    margin: 0;
  }
}
</style>
