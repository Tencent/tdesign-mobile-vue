<!--
 * @Author: Colahan
 * @Date: 2020-11-24 16:16:16
 * @FilePath: /tdesign-mobile-vue/src/indexes/indexes.vue
-->
<template>
  <div :class="state.componentName" :data-index="state.index">{{state.title}}</div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;

interface IndexesAnchorProps{
  index?: string,
  title?: string,
}

export default defineComponent({
  props: {
    index: String,
    title: String,
  },
  setup(props: IndexesAnchorProps) {
    const state: object = reactive({
      componentName: `${prefix}-indexes__anchor`,
      index: props?.index || '',
      title: props?.title ? props?.title : props?.index,
    });
    return {
      state,
    };
  },
});
</script>
