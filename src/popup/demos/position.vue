<template>
  <div class="popup-base">

    <t-button theme="primary" @click="top = true">上方</t-button>
    <t-button theme="primary" @click="bottom = true">下方</t-button>
    <t-button theme="primary" @click="left = true">左侧</t-button>
    <t-button theme="primary" @click="right = true">右侧</t-button>
    <t-button theme="primary" @click="center = true">中间</t-button>

    <t-popup v-model="left" position="left">
      <div style="width: 200px; height: 100%; background: #fff;"></div>
    </t-popup>

    <t-popup v-model="right" position="right">
      <div style="width: 200px; height: 100%; background: #fff;"></div>
    </t-popup>

    <t-popup v-model="top" position="top">
      <div style="height: 200px; background: #fff;"></div>
    </t-popup>

    <t-popup v-model="bottom" position="bottom">
      <div style="height: 200px; background: #fff;"></div>
    </t-popup>

    <t-popup v-model="center" position="center">
      <div style="width: 200px; height: 200px; background: #fff;"></div>
    </t-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top: false,
      bottom: false,
      left: false,
      right: false,
      center: false,
    };
  },
};
</script>

<style lang="less">
  .popup-base {
    .t-button {
      &:not(:last-child) {
        margin-right: 16px;
      }
      margin-top: 16px;

    }
  }
</style>
