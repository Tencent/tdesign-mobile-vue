<template>
  <t-cell-group>
    <t-cell arrow description="一段很长很长的内容文字" title="单行标题" />
    <t-cell arrow description="一段很长很长的内容文字" required title="单行标题" />
    <t-cell arrow description="一段很长很长的内容文字" title="单行标题">
      <template #note>
        <t-badge :count="16" />
      </template>
    </t-cell>
    <t-cell description="一段很长很长的内容文字" title="单行标题">
      <template #note>
        <t-switch :default-value="true" />
      </template>
    </t-cell>
    <t-cell arrow description="一段很长很长的内容文字" note="辅助信息" title="单行标题" />
    <t-cell arrow description="一段很长很长的内容文字" title="单行标题">
      <template #leftIcon>
        <AppIcon />
      </template>
    </t-cell>
    <t-cell description="一段很长很长的内容文字，长文本自动换行，该选项的描述是一段很长的内容" title="单行标题" />
    <t-cell :right-icon="chevronRightIcon" description="一段很长很长的内容文字" title="单行标题">
      <template #leftIcon>
        <t-avatar :image="avatarUrl" shape="circle" />
      </template>
    </t-cell>
    <t-cell :image="imgUrl" description="一段很长很长的内容文字" title="单行标题" />
  </t-cell-group>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { AppIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';

const chevronRightIcon = () => h(ChevronRightIcon);
const avatarUrl = 'https://tdesign.gtimg.com/mobile/demos/avatar1.png';
const imgUrl = 'https://tdesign.gtimg.com/mobile/demos/example4.png';
</script>
