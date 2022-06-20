<template>
  <div>
    <t-cell-group>
      <t-cell title="多行标题" description="一段很长很长的内容文字"></t-cell>
      <t-cell title="多行带图标" description="一段很长很长的内容文字" arrow>
        <template #leftIcon>
          <AppIcon />
        </template>
      </t-cell>
      <t-cell title="多行带头像" description="一段很长很长的内容文字" :right-icon="chevronRightIcon">
        <template #leftIcon>
          <t-avatar shape="circle" :image="avatarUrl" />
        </template>
      </t-cell>
      <t-cell title="多行带图片" description="一段很长很长的内容文字" :image="imgUrl" />
      <t-cell
        title="多行标题"
        description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容"
      ></t-cell>
      <t-cell
        title="多行高度不定，长文本自动换行，该选项的描述是一段很长的内容"
        description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容"
      ></t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { ChevronRightIcon, AppIcon } from 'tdesign-icons-vue-next';

const chevronRightIcon = () => h(ChevronRightIcon);
const avatarUrl = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';
const imgUrl = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';
</script>
