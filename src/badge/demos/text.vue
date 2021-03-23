<template>
	<div>
    <div class="badge-wrap">
			<t-badge content="NEW" class="badge-item">
			<t-button size="small">NEW</t-button>
			</t-badge>
			<t-badge content="···" class="badge-item">
			<t-button size="small">省略号</t-button>
			</t-badge>
    </div>
    <div class="badge-wrap">
      <t-cell-group>
        <t-cell value-align="left">
          <span>单行标题</span>
					<div class="badge-tag-wrap">
						<t-badge content="NEW" shape="round" class="badge-tag"/>
						<t-badge content="NEW" shape="round" class="badge-tag"/>
						<t-badge content="NEW" shape="circle" class="badge-tag"/>
						<t-badge content="NEW" shape="circle" class="badge-tag"/>
					</div>
        </t-cell>
      </t-cell-group>
    </div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="less" scoped>
.badge-wrap {
  padding: 10px 0;

  .badge-item {
    margin-right: 20px;
  }
}
.list-item-badge {
  float: right;
  vertical-align: middle;
}
.badge-tag-wrap {
  float: right;
	margin-right: 10px;
}
.badge-tag {
  margin-right: 8px;
}
</style>
