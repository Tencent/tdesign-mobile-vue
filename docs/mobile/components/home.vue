<template>
  <div class="spfx-home">
    <h1>
      <span>{{ title }}</span>
    </h1>
    <div class="navs" v-for="(navItem, index) in navs" :key="index">
      <router-link :to="`${navItem.name}`">{{ navItem.title }}</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import config from '../mobile.config';
import { ref } from 'vue';
export default {
  setup() {
    const navs = ref(config.navs.components.docs);
    const title = ref(config.navs.components.title);
    return { title, navs };
  },
};
</script>
