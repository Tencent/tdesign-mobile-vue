<template>
  <div class="tdesign-mobile-demo">
    <t-swipe-cell>
      <template #content>
        <div style="padding: 10px">使用slot#content</div>
      </template>
      <div style="padding: 10px">直接写组件</div>
      <template #right>
        <div>
          <t-button type="primary" style="height: 100%">收藏</t-button>
        </div>
      </template>
    </t-swipe-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
