<template>
  <td-doc-layout>
    <td-header slot="header" platform="mobile" framework="vue"></td-header>
    <td-doc-aside ref="tdDocAside" title="Vue Next for Mobile">
      <td-select ref="tdSelect" :value="version" slot="extra"></td-select>
    </td-doc-aside>

    <router-view :style="contentStyle" @loaded="contentLoaded" :docType="docType" />
  </td-doc-layout>
</template>

<script>
import siteConfig from '../docs.config';
import { sortDocs, filterVersions } from './utils';
import { defineComponent } from 'vue';
import packageJson from '../../package.json';

const registryUrl = 'https://mirrors.tencent.com/npm/tdesign-mobile-vue';
const currentVersion = packageJson.version.replace(/\./g, '_');

const docs = sortDocs(siteConfig.docs);

const { docs: routerList } = JSON.parse(JSON.stringify({ docs: docs }).replace(/component:.+/g, ''));

export default defineComponent({
  data() {
    return {
      docType: '',
      loaded: false,
      version: currentVersion,
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
    this.$refs.tdSelect.onchange = ({ detail }) => {
      const { value: version } = detail;
      if (version === currentVersion) return;

      const historyUrl = `https://${version}-tdesign-mobile-vue.surge.sh`;
      window.open(historyUrl, '_blank');
    };

    this.initHistoryVersions();
  },

  watch: {
    $route(route) {
      if (!route.meta.docType) return;
      this.docType = route.meta.docType;
    },
  },

  methods: {
    initHistoryVersions() {
      fetch(registryUrl)
        .then((res) => res.json())
        .then((res) => {
          const options = [];
          const versions = filterVersions(Object.keys(res.versions).filter((v) => !v.includes('alpha')));

          versions.forEach((v) => {
            const nums = v.split('.');
            if (nums[0] === '0' && nums[1] < 7) return false;

            options.unshift({ label: v, value: v.replace(/\./g, '_') });
          });
          this.$refs.tdSelect.options = options;
        });
    },
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
