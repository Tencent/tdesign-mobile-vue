<template>
  <div class="popup-base">
    <t-button theme="primary" @click="top = true">上方</t-button>
    <t-button theme="primary" @click="bottom = true">下方</t-button>
    <t-button theme="primary" @click="left = true">左侧</t-button>
    <t-button theme="primary" @click="right = true">右侧</t-button>
    <t-button theme="primary" @click="center = true">中间</t-button>

    <t-popup v-model="left" position="left">
      <div style="width: 200px; height: 100%; background: #fff"></div>
    </t-popup>

    <t-popup v-model="right" position="right">
      <div style="width: 200px; height: 100%; background: #fff"></div>
    </t-popup>

    <t-popup v-model="top" position="top">
      <div style="height: 200px; background: #fff"></div>
    </t-popup>

    <t-popup v-model="bottom" position="bottom">
      <div style="height: 200px; background: #fff"></div>
    </t-popup>

    <t-popup v-model="center" position="center">
      <div style="width: 200px; height: 200px; background: #fff"></div>
    </t-popup>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const top = ref(false);
    const bottom = ref(false);
    const left = ref(false);
    const right = ref(false);
    const center = ref(false);

    return {
      top,
      bottom,
      left,
      right,
      center,
    };
  },
});
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
