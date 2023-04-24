<template>
  <div>
    <div class="summary">基础标签</div>
    <div class="tag-demo">
      <t-tag variant="light">标签文字 </t-tag>
      <t-tag variant="outline">标签文字</t-tag>
    </div>
    <div class="summary">圆弧标签</div>
    <div class="tag-demo">
      <t-tag variant="light" shape="round">标签文字</t-tag>
      <t-tag variant="outline" shape="round">标签文字</t-tag>
      <t-tag variant="outline" shape="mark">标签文字</t-tag>
    </div>
    <div class="summary">带图标的标签</div>
    <div class="tag-demo">
      <t-tag variant="light">
        <template #icon>
          <Icon name="discount" />
        </template>
        标签文字
      </t-tag>
      <t-tag variant="outline">
        <template #icon>
          <Icon name="discount" />
        </template>
        标签文字
      </t-tag>
    </div>
    <div class="summary">超长文本省略标签</div>
    <div class="tag-demo">
      <t-tag max-width="130px" variant="light">听说超长可以省略听说超长</t-tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from 'tdesign-icons-vue-next';
</script>
