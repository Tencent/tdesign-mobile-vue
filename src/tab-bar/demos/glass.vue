<template>
  <div class="glass-tab-bar-demo">
    <div class="glass-tab-bar-demo__orb glass-tab-bar-demo__orb--left" />
    <div class="glass-tab-bar-demo__orb glass-tab-bar-demo__orb--right" />
    <t-tab-bar v-model="value" effect="glass" shape="round" theme="tag" :fixed="false" :split="false">
      <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
        {{ item.label }}
        <template #icon>
          <t-icon :name="item.icon" />
        </template>
      </t-tab-bar-item>
    </t-tab-bar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';

const value = ref('home');
const list = [
  { value: 'home', label: '首页', icon: 'home' },
  { value: 'discover', label: '发现', icon: 'search' },
  { value: 'library', label: '收藏', icon: 'folder' },
  { value: 'profile', label: '我的', icon: 'user' },
];
</script>

<style lang="less" scoped>
.glass-tab-bar-demo {
  position: relative;
  box-sizing: border-box;
  padding: 96px 12px 12px;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgb(222 237 255 / 92%), rgb(255 255 255 / 64%)),
    repeating-linear-gradient(90deg, transparent 0 31px, rgb(0 82 217 / 12%) 32px);

  &__orb {
    position: absolute;
    border-radius: 50%;

    &--left {
      top: 12px;
      left: 18px;
      width: 88px;
      height: 88px;
      background: rgb(0 82 217 / 38%);
    }

    &--right {
      top: 28px;
      right: 24px;
      width: 112px;
      height: 64px;
      background: rgb(255 177 61 / 52%);
    }
  }
}
</style>
