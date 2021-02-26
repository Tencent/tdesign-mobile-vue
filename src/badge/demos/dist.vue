<template>
	<div>
		<div class="badge-wrap">
			<t-badge dot class="badge-item">
				<t-button size="small">按钮</t-button>
			</t-badge>
		</div>
		<div class="badge-wrap">
			<t-cell-group>
				<t-cell value-align="left">
					<span>单行标题</span>
					<t-badge dot :offset="[10, 0]" class="list-item-badge"/>
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
    margin: 0 20px;
  }
}
.list-item-badge {
  float: right;
  vertical-align: middle;
}
</style>
