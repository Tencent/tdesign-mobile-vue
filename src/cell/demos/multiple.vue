<template>
  <t-cell-group>
    <t-cell title="单行标题" description="一段很长很长的内容文字" arrow />
    <t-cell title="单行标题" description="一段很长很长的内容文字" arrow required />
    <t-cell title="单行标题" description="一段很长很长的内容文字" arrow>
      <template #note>
        <t-badge :count="16" />
      </template>
    </t-cell>
    <t-cell title="单行标题" description="一段很长很长的内容文字">
      <template #note>
        <t-switch :default-value="true" />
      </template>
    </t-cell>
    <t-cell title="单行标题" description="一段很长很长的内容文字" note="辅助信息" arrow />
    <t-cell title="单行标题" description="一段很长很长的内容文字" arrow>
      <template #leftIcon>
        <LockOnIcon />
      </template>
    </t-cell>
    <t-cell title="单行标题" description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容" />
    <t-cell
      title="多行高度不定，长文本自动换行，该选项的描述是一段很长的内容"
      description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容"
    />
    <t-cell title="多行带头像" description="一段很长很长的内容文字" :right-icon="chevronRightIcon">
      <template #leftIcon>
        <t-avatar shape="circle" :image="avatarUrl" />
      </template>
    </t-cell>
    <t-cell title="多行带图片" description="一段很长很长的内容文字" :image="imgUrl" />
  </t-cell-group>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { ChevronRightIcon, LockOnIcon } from 'tdesign-icons-vue-next';

const chevronRightIcon = () => h(ChevronRightIcon);
const avatarUrl = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';
const imgUrl = 'https://tdesign.gtimg.com/miniprogram/images/example1.png';
</script>
