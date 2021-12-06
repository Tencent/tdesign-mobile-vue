<template>
  <div class="tdesign-mobile-demo">
    <div class="tag-demo">
      <t-tag
        v-for="(tag, index) in closableTags"
        :key="tag"
        :closable="true"
        :disabled="tag.disabled"
        theme="primary"
        :size="tag.size"
        @close="onClickClose(index)"
        >{{ tag.name }}
      </t-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const closableTags = ref([
      {
        name: '可关闭',
        size: 'large',
      },
      {
        name: '可关闭',
      },
      {
        name: '可关闭',
        size: 'small',
      },
      {
        name: '失效标签',
        size: 'small',
        disabled: true,
      },
    ]);

    function onClickClose(index: number) {
      closableTags.value.splice(index, 1);
    }

    return {
      closableTags,
      onClickClose,
    };
  },
});
</script>
