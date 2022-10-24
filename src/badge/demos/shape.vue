<template>
  <div class="tdesign-mobile-demo">
    <div class="badge-demo">
      <t-badge :count="12" class="badge-item">
        <t-button size="small">circle</t-button>
      </t-badge>
      <t-badge :count="12" shape="round" class="badge-item">
        <t-button size="small">round</t-button>
      </t-badge>
    </div>
    <div class="">
      <t-cell-group title="列表带徽标" bordered>
        <t-cell title="单行标题">
          <template #note>
            <t-badge dot />
          </template>
        </t-cell>
        <t-cell title="单行标题">
          <template #note>
            <t-badge content="NEW" :offset="[5, 0]" shape="ribbon" />
          </template>
        </t-cell>
      </t-cell-group>
    </div>
  </div>
</template>

<style lang="less" scoped>
.badge-item {
  margin-right: 25px;
}
</style>
