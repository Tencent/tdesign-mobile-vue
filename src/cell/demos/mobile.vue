<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Cell 单元格</h1>
    <p class="summary">一行内容/功能的垂直排列方式。一行项目左侧为主要内容展示区域，右侧可增加更多操作内容</p>
    <tdesign-demo-block title="01 类型" summary="单行单元格">
      <t-cell-group>
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
        <t-cell title="单行标题">
          <template #leftIcon>
            <AppIcon />
          </template>
        </t-cell>
      </t-cell-group>
    </tdesign-demo-block>
    <tdesign-demo-block summary="多行单元格">
      <t-cell-group>
        <t-cell title="多行标题" description="一段很长很长的内容文字"></t-cell>
        <t-cell title="多行带图标" description="一段很长很长的内容文字" arrow>
          <template #leftIcon>
            <AppIcon />
          </template>
        </t-cell>
        <t-cell title="多行带头像" description="一段很长很长的内容文字">
          <template #leftIcon>
            <t-avatar shape="circle" image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png" />
          </template>
        </t-cell>
        <t-cell title="多行带图片" description="一段很长很长的内容文字">
          <template #leftIcon>
            <img src="https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png" style="width: 54px; height: 54px" />
          </template>
        </t-cell>
        <t-cell
          title="多行标题"
          description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容"
        ></t-cell>
        <t-cell
          title="多行高度不定，长文本自动换行，该选项的描述是一段很长的内容"
          description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容"
        ></t-cell>
      </t-cell-group>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ChevronRightIcon as TIconChevronRight, AppIcon } from 'tdesign-icons-vue-next';
import TSwitch from '../../switch';
import TBadge from '../../badge';
</script>
