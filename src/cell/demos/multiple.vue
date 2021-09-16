<template>
  <div class="cell-base">
    <t-cell title="单行标题" description="一段很长很长的内容文字"></t-cell>
    <t-cell title="单行标题" description="一段很长很长的内容文字" arrow></t-cell>
    <t-cell title="单行标题" description="一段很长很长的内容文字">
      <t-button theme="primary" variant="outline" size="small">小按钮</t-button>
    </t-cell>
    <t-cell
      title="单行标题"
      description="一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字"
    ></t-cell>

    <t-cell title="单行标题" description="一段很长很长的内容文字">
      <template #leftIcon>
        <img
          src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png"
          style="width: 50px; height: 50px; margin-right: 8px;float:left;"
        />
      </template>
    </t-cell>
    <t-cell title="双行标题，长文本自动换行，该选项的描述是一段很长的内容" description="一段很长很长的内容文字"></t-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
