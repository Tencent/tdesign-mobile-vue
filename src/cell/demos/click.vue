<template>
	<t-cell-group title="单元格点击时触发" border>
      <t-cell value-align="right" @click="onClick">
        <template #label>
          <div>自定义标题</div>
        </template>
        <div>内容是长长长长长长长长长长长长长长长长长长长长长的</div>
      </t-cell>
      <t-cell value-align="right" @click="onClick">
        <template #label>
          <div>自定义标题</div>
        </template>
        <div>内容是短的</div>
      </t-cell>
    </t-cell-group>
</template>

<script>
import { defineComponent } from 'vue';
import Message from '../../message';

export default defineComponent({
  setup() {
    const onClick = () => {
      Message.info('cell click');
    };
    return {
      onClick,
    };
  },
});
</script>
