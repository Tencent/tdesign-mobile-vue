
<template>
  <div class="container">
    <t-tag
      v-for="(tag,index) in closableTags"
      :closable="true"
      :disabled="tag.disabled"
      :key="tag"
      theme="primary"
      :size="tag.size"
      @close="onClickClose(index)"
    >{{tag.name}}</t-tag>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
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
        name: '失效标签',
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
};
</script>
<style>
  .t-tag + .t-tag {
    margin-left: 8px;
  }
  .container{
    background-color: #fff;
    padding: 16px;
  }
</style>
