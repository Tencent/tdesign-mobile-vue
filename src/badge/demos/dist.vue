<template>
  <div class="tdesign-mobile-demo">
    <div class="badge-wrap">
      <t-badge dot class="badge-item">
        <t-button size="small">按钮</t-button>
      </t-badge>
    </div>
    <div class="badge-wrap">
      <t-cell-group>
        <t-cell value-align="left">
          <span>单行标题</span>
          <t-badge dot :offset="[0, 10]" class="list-item-badge" />
        </t-cell>
      </t-cell-group>
    </div>
  </div>
</template>

<style lang="less" scoped>
.badge-wrap {
  padding: 10px 0;
}

.list-item-badge {
  float: left;
  vertical-align: middle;
}
</style>
