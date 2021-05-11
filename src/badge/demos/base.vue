<template>
  <div>
    <t-cell-group title="按钮带徽标">
      <div class="badge-wrap">
        <t-badge :count="16" class="badge-item">
          <t-button size="small" variant="outline">小按钮</t-button>
        </t-badge>
        <t-badge dot class="badge-item">
          <t-button size="small" variant="outline">小按钮</t-button>
        </t-badge>
        <t-badge content="NEW" class="badge-item">
          <t-button size="small" variant="outline">小按钮</t-button>
        </t-badge>
        <t-badge content="···" class="badge-item">
          <t-button size="small" variant="outline">小按钮</t-button>
        </t-badge>
      </div>
    </t-cell-group>
    <t-cell-group title="列表带徽标" style="overflow: hidden">
      <t-cell label="单行标题" link>
        <div class="cell-badge-wrap">
          <t-badge dot />
        </div>
      </t-cell>
      <t-cell label="单行标题" link>
        <div class="cell-badge-wrap">
          <t-badge :count="16"/>
        </div>
      </t-cell>
      <t-cell label="单行标题" link>
        <div class="cell-badge-wrap">
          <t-badge content="NEW" shape="round" class="cell-badge"/>
          <t-badge content="NEW" shape="round" class="cell-badge"/>
          <t-badge content="NEW" class="cell-badge"/>
          <t-badge content="NEW" class="cell-badge"/>
        </div>
      </t-cell>
      <t-cell label="单行标题">
        <t-badge content="NEW" :offset="[5, 0]" shape="ribbon" />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      iconUrl: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
    };
  },
});
</script>

<style lang="less" scoped>
.badge-wrap {
  padding: 20px 16px;

  .badge-item {
    margin-right: 10px;
  }
}
.cell-badge {
  margin-left: 8px;
}
.cell-badge-wrap {
  padding-bottom: 4px;
}
</style>
