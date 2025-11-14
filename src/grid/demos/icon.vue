<template>
  <t-grid :column="4" class="grid-demo">
    <t-grid-item text="分享">
      <template #image>
        <div class="icon-wrapper">
          <ShareIcon :style="{ color: 'var(--td-text-color-primary)' }" size="24" />
        </div>
      </template>
    </t-grid-item>
    <t-grid-item :icon="starIcon" text="收藏" />
    <t-grid-item :icon="downloadIcon" text="保存" />
    <t-grid-item :icon="edit1Icon" text="编辑" />
  </t-grid>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { DownloadIcon, Edit1Icon, ShareIcon, StarIcon } from 'tdesign-icons-vue-next';

const imgUrl = 'https://tdesign.gtimg.com/mobile/demos/example1.png';

const starIcon = () => h(StarIcon, { size: '24px', style: { color: 'var(--td-text-color-primary)' } });
const downloadIcon = () => h(DownloadIcon, { size: '24px', style: { color: 'var(--td-text-color-primary)' } });
const edit1Icon = () => h(Edit1Icon, { size: '24px', style: { color: 'var(--td-text-color-primary)' } });
</script>
<style lang="less">
:root[theme-mode='light'] {
  --grid-demo-icon-bg: #eeeeee;
}

:root[theme-mode='dark'] {
  --grid-demo-icon-bg: #383838;
}

.icon-wrapper {
  background: var(--grid-demo-icon-bg);
  border-radius: 6px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
