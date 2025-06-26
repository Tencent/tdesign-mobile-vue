<template>
  <t-grid :column="4" class="grid-demo">
    <t-grid-item text="分享">
      <template #image>
        <div class="icon-wrapper">
          <ShareIcon size="24" />
        </div>
      </template>
    </t-grid-item>
    <t-grid-item text="收藏" :icon="starIcon" />
    <t-grid-item text="保存" :icon="downloadIcon" />
    <t-grid-item text="编辑" :icon="edit1Icon" />
  </t-grid>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { ShareIcon, StarIcon, DownloadIcon, Edit1Icon } from 'tdesign-icons-vue-next';

const imgUrl = 'https://tdesign.gtimg.com/mobile/demos/example1.png';

const starIcon = () => h(StarIcon, { size: '24px' });
const downloadIcon = () => h(DownloadIcon, { size: '24px' });
const edit1Icon = () => h(Edit1Icon, { size: '24px' });
</script>
<style scoped lang="less">
.icon-wrapper {
  background: #eee;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
