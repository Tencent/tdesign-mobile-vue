<template>
  <div id="app">
    <div class="spfx-page-doc spfx-wrapper">
      <div class="spfx-doc">
        <div class="spfx-fixed-side">
          <div class="spfx-sidenav">
            <div
              class="spfx-sidenav-group"
              v-for="(item, navIndex) in docs"
              :key="navIndex"
            >
              <span class="spfx-sidenav-group__title">{{ item.title }}</span>
              <div class="spfx-sidenav-group__children">
                <div
                  class="spfx-sidenav-item"
                  v-for="(linkItem, linkIndex) in item.children"
                  :key="linkIndex"
                >
                  <router-link
                    class="spfx-main-link spfx-doc-link"
                    :active-class="'spfx-doc-link--active'"
                    :to="'/components/' + linkItem.name"
                  >{{ linkItem.title }}</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="spfx-doc-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import config from './mobile.config';
import { ref } from 'vue';
export default {
  setup() {
    const docs = ref(config.navs.components.docs);
    return { docs };
  },
};
</script>
