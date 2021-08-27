<template>
  <div class="tdesign-mobile-demo">
    <h1 class='com-title'>Cell 单元格</h1>
    <p class='com-summary'>一行内容/功能的垂直排列方式。一行项目左侧为主要内容展示区域，右侧可增加更多操作内容</p>
    <h2 class='com-group-title'>01 类型</h2>
    <t-cell-group title="单行单元格">
      <t-cell title="单行标题" />
      <t-cell title="单行标题" required />
      <t-cell title="单行标题" note="辅助信息" arrow></t-cell>
      <t-cell title="单行标题" arrow></t-cell>
      <t-cell title="单行标题" arrow>
        <template #note>
          <t-badge :count="2"></t-badge>
        </template>
      </t-cell>
      <t-cell title="单行标题">
        <template #note>
          <t-switch></t-switch>
        </template>
      </t-cell>
      <t-cell>
        <template #leftIcon>
          <TIconUserFilled />
        </template>
        <template #title>
          <span>单行标题</span>
        </template>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="多行单元格">
      <t-cell title="多行标题" description="一段很长很长的内容文字"></t-cell>
      <t-cell title="多行带图标" description="一段很长很长的内容文字" arrow>
        <template #leftIcon>
          <TIconUserFilled />
        </template>
      </t-cell>
      <t-cell title="多行带图片" description="一段很长很长的内容文字">
        <template #leftIcon>
          <img
            src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png"
            style="width: 50px; height: 50px; margin-right: 8px; float: left"
          />
        </template>
      </t-cell>
      <t-cell title="多行标题" description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容"></t-cell>
      <t-cell title="多行高度不定，长文本自动换行，该选项的描述是一段很长的内容" description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容"></t-cell>
    </t-cell-group>
  </div>
</template>

<script>
import TIconChevronRight from '@/icon/chevron-right.vue';
import TIconUserFilled from '@/icon/user-filled.vue';
import { defineComponent } from 'vue';
import Message from '../../message';
import TSwitch from '../../switch';
import TBadge from '../../badge';

export default defineComponent({
  components: { TIconChevronRight, TIconUserFilled, TSwitch, TBadge },
  setup() {
  },
});
</script>
