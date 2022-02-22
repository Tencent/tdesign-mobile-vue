<template>
  <td-doc-layout>
    <td-header slot="header" platform="mobile" framework="vue"></td-header>
    <td-doc-aside ref="tdDocAside" title="Vue Next for Mobile"></td-doc-aside>

    <router-view :style="contentStyle" @loaded="contentLoaded" :docType="docType" />
  </td-doc-layout>
</template>

<script>
import siteConfig from '../docs.config';

import { defineComponent } from 'vue';

const { docs: routerList } = JSON.parse(JSON.stringify(siteConfig).replace(/component:.+/g, ''));

export default defineComponent({
  data() {
    return {
      docType: '',
      loaded: false,
    };
  },

  computed: {
    contentStyle() {
      const { loaded } = this;
      return { visibility: loaded ? 'visible' : 'hidden' };
    },
  },

  mounted() {
    this.docType = this.$route.meta.docType;
    this.$refs.tdDocAside.routerList = routerList;
    this.$refs.tdDocAside.onchange = ({ detail }) => {
      if (this.$route.path === detail) return;
      this.loaded = false;
      this.$router.push({ path: detail });
      window.scrollTo(0, 0);
    };
  },

  watch: {
    $route(route) {
      if (!route.meta.docType) return;
      this.docType = route.meta.docType;
    },
  },

  methods: {
    contentLoaded(callback) {
      requestAnimationFrame(() => {
        this.loaded = true;
        callback();
      });
    },
  },
});
</script>

<style lang="less">
div[slot='action'] {
  display: inline-flex;
  column-gap: 8px;
}

.action-online {
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: all 0.2s linear;
  cursor: pointer;
  border-radius: 3px;
  color: var(--text-secondary);

  &:hover {
    color: var(--text-primary);
    background-color: var(--bg-color-demo-hover, rgb(243, 243, 243));
  }
}
</style>
