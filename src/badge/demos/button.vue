<template>
  <div class="tdesign-mobile-demo">
    <div class="badge-demo">
      <div class="badge-item">
        <t-badge dot>
          <t-button size="small" variant="outline">小按钮</t-button>
        </t-badge>
      </div>
      <div class="badge-item">
        <t-badge count="16">
          <t-button size="small" variant="outline">小按钮</t-button>
        </t-badge>
      </div>
      <div class="badge-item">
        <t-badge count="NEW">
          <t-button size="small" variant="outline">小按钮</t-button>
        </t-badge>
      </div>
      <div class="badge-item">
        <t-badge count="···">
          <t-button size="small" variant="outline">小按钮</t-button>
        </t-badge>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.badge-item {
  width: auto;
  margin-right: 10px;
}
</style>
