<template>
  <div class="tdesign-mobile-home">
    <div class="tdesign-mobile-logo">
      <img src="https://tdesign.gtimg.com/site/TDesign.png" alt="logo" />
      <p>TDesign Mobile Vue是由前端通用 UI 组件库 Oteam 发起，协同公司内有组件库开发经验的同学一起建设的组件库</p>
    </div>
    <t-collapse v-for="doc in docs.filter((x) => x.type === 'component')" :key="doc.title">
      <t-collapse-panel :name="doc.title" :title="doc.title">
        <t-cell-group>
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
    <!-- <div class="tdesign-demo-home-navs" v-for="(navItem, index) in navs" :key="index">
      <router-link class="tdesign-demo-home-navlink" :to="`${navItem.name}`">
        {{ navItem.title }}
      </router-link>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import TIcon from 'tdesign-icons-vue-next';
import siteConfig from '../../docs.config';
import router from '../router';

const { docs } = siteConfig;
const onClick = (comItem: any) => {
  router.push({ path: comItem.name });
};
</script>
