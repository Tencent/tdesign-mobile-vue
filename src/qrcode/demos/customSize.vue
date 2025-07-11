<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex; flex-direction: row; gap: 8px">
      <t-button :disabled="size <= minSize" @click="size -= 10">
        <template #icon>
          <MinusIcon />
        </template>
        Smaller
      </t-button>
      <t-button :disabled="size >= maxSize" @click="size += 10">
        <template #icon>
          <AddIcon />
        </template>
        Larger
      </t-button>
    </div>
    <t-qrcode
      level="H"
      :size="size"
      :icon-size="size / 4"
      value="https://tdesign.tencent.com/"
      icon="https://tdesign.gtimg.com/site/tdesign-logo.png"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MinusIcon, AddIcon } from 'tdesign-icons-vue-next';

const minSize = 40;
const maxSize = 300;

const size = ref(160);
</script>
