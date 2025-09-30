<template>
  <div class="tdesign-mobile-demo-block__summary" style="margin: 8px 0 16px 16px">Rectangular Grid 矩形布局</div>
  <t-watermark
    :watermark-content="{
      text: '文字水印',
    }"
    :width="68"
    :height="52"
    :y="56"
    :x="56"
  >
    <div style="height: 300px" />
  </t-watermark>

  <div class="tdesign-mobile-demo-block__summary" style="margin: 24px 0 16px 16px">Hexagonal Grid 六边形网格</div>
  <t-watermark
    :watermark-content="{
      text: '文字水印',
    }"
    :width="68"
    :height="52"
    :y="56"
    :x="56"
    layout="hexagonal"
  >
    <div style="height: 300px" />
  </t-watermark>
</template>
