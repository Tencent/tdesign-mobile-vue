<template>
  <div class="cell-base">
    <t-cell-group title="基本使用">
      <t-cell label="文本标题" value="文本内容" @click="onClick" />
      <t-cell label="文本标题">
        <div>内容是短的</div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="左对齐">
      <t-cell value-align="left">
        <template #label>
          <div>自定义标题</div>
        </template>
        <div>内容是长长长长长长长长长长长长长长长长长长长长长的</div>
      </t-cell>
      <t-cell value-align="left">
        <template #label>
          <div>自定义标题</div>
        </template>
        <div>内容是短的</div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="右对齐">
      <t-cell value-align="right">
        <template #label>
          <div>自定义标题</div>
        </template>
        <div>内容是长长长长长长长长长长长长长长长长长长长长长的</div>
      </t-cell>
      <t-cell value-align="right">
        <template #label>
          <div>自定义标题</div>
        </template>
        <div>内容是短的</div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="显示组边框" border="true">
      <t-cell value-align="right">
        <template #label>
          <div>自定义标题</div>
        </template>
        <div>内容是长长长长长长长长长长长长长长长长长长长长长的</div>
      </t-cell>
      <t-cell value-align="right">
        <template #label>
          <div>自定义标题</div>
        </template>
        <div>内容是短的</div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="单元格点击时触发" border="true">
      <t-cell value-align="right" click>
        <template #label>
          <div>自定义标题</div>
        </template>
        <div>内容是长长长长长长长长长长长长长长长长长长长长长的</div>
      </t-cell>
      <t-cell value-align="right">
        <template #label>
          <div>自定义标题</div>
        </template>
        <div>内容是短的</div>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const onClick = () => {
      console.log('cell click');
    };
    return {
      onClick,
    };
  },
});
</script>
