<template>
  <t-grid :column="4" class="grid-demo">
    <t-grid-item text="分享">
      <template #image>
        <div class="icon-wrapper">
          <ShareIcon size="24" />
        </div>
      </template>
    </t-grid-item>
    <t-grid-item text="收藏">
      <template #image>
        <div class="icon-wrapper">
          <StarIcon size="24" />
        </div>
      </template>
    </t-grid-item>
    <t-grid-item text="保存">
      <template #image>
        <div class="icon-wrapper">
          <DownloadIcon size="24" />
        </div>
      </template>
    </t-grid-item>
    <t-grid-item text="编辑">
      <template #image>
        <div class="icon-wrapper">
          <Edit1Icon size="24" />
        </div>
      </template>
    </t-grid-item>
  </t-grid>
</template>

<script lang="ts" setup>
import { ShareIcon, StarIcon, DownloadIcon, Edit1Icon } from 'tdesign-icons-vue-next';

const imgUrl = 'https://tdesign.gtimg.com/miniprogram/images/example1.png';
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
