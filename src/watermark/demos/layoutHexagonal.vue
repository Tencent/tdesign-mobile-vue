<template>
  <t-watermark
    :watermark-content="{
      text: '文字水印',
    }"
    :width="120"
    :height="60"
    :y="120"
    :x="80"
    layout="hexagonal"
  >
    <div style="height: 300px" />
  </t-watermark>
</template>
