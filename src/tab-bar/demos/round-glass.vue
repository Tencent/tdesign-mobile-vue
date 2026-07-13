<template>
  <div class="tab-bar-glass-demo">
    <div class="tab-bar-glass-demo__bg" />

    <!--
      液态玻璃（对标 iOS 26）：
      - 组件内置的 __glass 折射层通过 CSS 变量接收"玻璃背后的画面"，用 SVG 位移贴图（边缘凸镜）+ 色散做真折射；
      - 折射为 opt-in：不传 --td-tab-bar-glass-image / --td-tab-bar-glass-refract 时，自动退化为 backdrop-filter 磨砂，兼容任意背景。
      注：真机像素级对齐需 App 把页面背景与 image-size/pos 对齐；此处 demo 为近似演示。
    -->
    <t-tab-bar v-model="value" shape="round-glass" theme="tag" :fixed="false" :split="false" :style="glassVars">
      <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
        <template #icon>
          <t-icon :name="item.icon" />
        </template>
      </t-tab-bar-item>
    </t-tab-bar>

    <svg class="tab-bar-glass-demo__defs" aria-hidden="true">
      <filter
        id="t-tab-bar-liquid-lens"
        x="-15%"
        y="-15%"
        width="130%"
        height="130%"
        color-interpolation-filters="sRGB"
      >
        <!-- 离线烘焙的"边缘凸镜"位移贴图：中心中性、四周向内弯折 -->
        <feImage
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABACAIAAADkhTlJAAABKUlEQVR42u3dwQqCQBiFUQvfu7c2LXXaVGRiUC2mS+cgQ8v4mQ9FUHelHEpzVW7r4zEv161j2l5f/Hixbh1Pf+l+NMsV1srGPv9+k3+21d/d5Osd3trvkKttJkOA3IBHQ4DcgM+GALkBD4YAAgYqBNwbAuQGfDQEEDAgYEDA8CcBd4YAuQG7Cw0uoQFnYOCtgE+GAAIGKgTsaSQIDtgD/RAc8GwIkGpvBCBgQMCAgEHAgIABAQMCBgEDAgYEDAIGBAwIGBAwCBgQMCBgQMAgYEDAgIBBwEAS74WG6IB9mQGCA/ZtJAgO2NcJQcBAjYB7Q4DcgI+GAM7AQIWAO0MAl9CAgAEBg4CBXw/YXWgIDngwBBAwUCFgTyNBcMCjIUBuwB7oh1jeiQXBLqU6qU1hLRa9AAAAAElFTkSuQmCC"
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          result="map"
        />
        <!-- 色散：红通道位移量(46)大于绿蓝(34)，边缘产生 RGB 分离 -->
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="46"
          xChannelSelector="R"
          yChannelSelector="G"
          result="dr"
        />
        <feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="drR" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="34"
          xChannelSelector="R"
          yChannelSelector="G"
          result="dg"
        />
        <feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="dgGB" />
        <feComposite in="drR" in2="dgGB" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
      </filter>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';

const value = ref('label_1');
const list = ref([
  { value: 'label_1', label: '首页', icon: 'home' },
  { value: 'label_2', label: '应用', icon: 'app' },
  { value: 'label_3', label: '聊天', icon: 'chat' },
  { value: 'label_4', label: '我的', icon: 'user' },
]);

// 把"玻璃背后的画面"交给组件的折射层（与下方 __bg 同一渐变），并开启位移折射滤镜
const glassVars = {
  '--td-tab-bar-glass-image': 'linear-gradient(135deg, #ff8fb1, #ff5f7e 28%, #6f6cf0 66%, #1ec8ff)',
  '--td-tab-bar-glass-refract': "blur(3px) url('#t-tab-bar-liquid-lens')",
};
</script>

<style lang="less" scoped>
.tab-bar-glass-demo {
  position: relative;
  padding: 24px 0;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #ff8fb1, #ff5f7e 28%, #6f6cf0 66%, #1ec8ff);
  }

  &__defs {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
  }
}
</style>
