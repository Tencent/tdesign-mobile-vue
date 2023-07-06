<template>
  <div class="tdesign-mobile-home">
    <div class="tdesign-mobile-logo">
      <img src="https://tdesign.gtimg.com/site/TDesign.png" alt="logo" />
      <p>TDesign 适配 Vue 的移动端组件库</p>
    </div>
    <t-collapse
      v-for="(doc, index) in docs.filter((x) => x.type === 'component')"
      :key="doc.title"
      :expand-icon="false"
    >
      <t-collapse-panel
        :value="index"
        :header="doc.title"
        :expand-icon="() => h(iconDefault[doc.titleEn], { size: '24px' })"
      >
        <t-cell-group class="collapse__content">
          <t-cell
            v-for="comItem in doc.children.filter((x) => x.name !== 'icon')"
            :key="comItem.name"
            style="height: 56px"
            :title="comItem.title"
            arrow
            @click="onClick(comItem)"
          ></t-cell>
        </t-cell-group>
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>
<script lang="ts" setup>
import { h } from 'vue';
import { AppIcon, BulletpointIcon, ViewModuleIcon, ImageIcon, ChatIcon } from 'tdesign-icons-vue-next';
import { docs } from '../../docs.config';
import router from '../router';

const iconDefault = {
  Base: AppIcon,
  Navigation: ViewModuleIcon,
  Form: BulletpointIcon,
  'Data Display': ImageIcon,
  FeedBack: ChatIcon,
};

const onClick = (comItem: any) => {
  router.push({ path: comItem.name });
};
</script>

<style lang="less" scoped>
.tdesign-mobile-home {
  .collapse__content {
    --td-cell-horizontal-padding: 0;
    --td-cell-right-icon-font-size: 16px;
  }
}
</style>
