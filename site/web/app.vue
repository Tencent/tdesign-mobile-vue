<template>
  <td-doc-layout>
    <td-header slot="header" platform="mobile" framework="vue">
      <div slot="search" style="display: flex; align-items: center">
        <td-ai-button style="margin-right: 8px" framework="mobile-vue" :demoRequestBody="demoRequestBody" />
        <td-doc-search ref="tdDocSearch" />
      </div>
    </td-header>
    <td-doc-aside ref="tdDocAside" title="Vue Next for Mobile">
      <td-select ref="tdSelect" :value="version" slot="extra"></td-select>
    </td-doc-aside>

    <router-view :style="contentStyle" @loaded="contentLoaded" :docType="docType" />
  </td-doc-layout>
</template>

<script>
import { defineComponent } from 'vue';
import packageJson from '../../package.json';
import siteConfig from '../docs.config';
import { filterVersions, sortDocs } from './utils';
import { htmlContent, mainJsContent, styleContent, packageJSONContent } from './components/codeSandbox/content';

const registryUrl =
  'https://service-edbzjd6y-1257786608.hk.apigw.tencentcs.com/release/npm/versions/tdesign-mobile-vue';
const currentVersion = packageJson.version.replace(/\./g, '_');

const { docs, enDocs } = JSON.parse(JSON.stringify(siteConfig).replace(/component:.+/g, ''));

const docsMap = {
  zh: sortDocs(docs),
  en: sortDocs(enDocs),
};

const demoRequestBody = JSON.stringify({
  files: {
    'package.json': {
      content: packageJSONContent(`tdesign-mobile-vue-demo`),
    },
    'index.html': {
      content: htmlContent,
    },
    'src/main.js': {
      content: mainJsContent,
    },
    'src/index.css': {
      content: styleContent,
    },
  },
});

export default defineComponent({
  data() {
    return {
      docType: '',
      loaded: false,
      version: currentVersion,
      demoRequestBody,
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
    this.$refs.tdDocSearch.docsearchInfo = { indexName: 'tdesign_doc_vue_mobile' };
    this.$refs.tdDocAside.routerList = docsMap[this.$route?.meta?.lang || 'zh'];
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
    this.initThemeGenerator();
  },

  watch: {
    $route(route) {
      this.$refs.tdDocAside.routerList = docsMap[route.meta.lang || 'zh'];
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
          const versions = filterVersions(Object.keys(res.versions));

          versions.forEach((v) => {
            options.unshift({ label: v, value: v.replace(/\./g, '_') });
          });

          if (this.version !== options[0].value) {
            this.version = options[0].value;
          }

          this.$refs.tdSelect.options = options;
        });
    },
    initThemeGenerator() {
      const generator = document.createElement('td-theme-generator');
      generator.setAttribute('device', 'mobile');
      document.body.appendChild(generator);
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
