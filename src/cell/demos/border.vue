<template>
	<div class="cell-base">
		<t-cell-group title="显示组边框" border>
			<t-cell>
				<template #title>
					<div>自定义标题</div>
				</template>
				<div>内容是长长长长长长长长长长长长长长长长长长长长长的</div>
			</t-cell>
			<t-cell>
				<template #title>
					<div>自定义标题</div>
				</template>
				<div>内容是短的</div>
			</t-cell>
		</t-cell-group>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
