<template>
  <div style="display: flex; flex-direction: column">
    <t-qrcode value="https://tdesign.tencent.com/" status="active" />

    <p class="tdesign-mobile-demo-block__summary">expired</p>
    <t-qrcode value="https://tdesign.tencent.com/" status="loading" />

    <p class="tdesign-mobile-demo-block__summary">loading</p>
    <t-qrcode value="https://tdesign.tencent.com/" status="expired" :on-refresh="() => console.log('Click Refresh')" />

    <p class="tdesign-mobile-demo-block__summary">scanned</p>
    <t-qrcode value="https://tdesign.tencent.com/" status="scanned" />
  </div>
</template>
