<template>
  <div class="tdesign-mobile-demo">
    <div class="badge-demo">
      <t-badge content="NEW" class="badge-item">
        <t-button size="small">NEW</t-button>
      </t-badge>
      <t-badge content="···" class="badge-item">
        <t-button size="small">省略号</t-button>
      </t-badge>
    </div>
    <div>
      <t-cell-group>
        <t-cell title="单行标题">
          <div class="badge-tag-wrap">
            <t-badge content="NEW" shape="round" class="badge-tag" />
            <t-badge content="NEW" shape="circle" class="badge-tag" />
          </div>
        </t-cell>
      </t-cell-group>
    </div>
  </div>
</template>

<style lang="less" scoped>
.badge-item {
  margin-right: 25px;
}

.badge-tag {
  margin-right: 8px;
}
</style>
