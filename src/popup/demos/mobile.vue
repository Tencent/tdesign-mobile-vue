<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Popup 弹窗层</h1>
    <p class="summary">由其他控件触发，屏幕滑出或弹出一块自定义内容区域</p>
    <tdesign-demo-block title="类型" summary="弹出层出现为止可能为顶部、底部、中部、左侧或右侧">
      <div class="button-demo" style="margin: 0 16px">
        <t-button block variant="outline" size="large" @click="top = true">顶部弹出</t-button>
        <t-button block variant="outline" size="large" @click="bottom = true">底部弹出</t-button>
        <t-button block variant="outline" size="large" @click="center = true">中部弹出</t-button>
        <t-button block variant="outline" size="large" @click="left = true">左侧弹出</t-button>
        <t-button block variant="outline" size="large" @click="right = true">右侧弹出</t-button>
      </div>
    </tdesign-demo-block>
  </div>

  <t-popup v-model="left" placement="left">
    <div style="width: 200px; height: 100%; background: #fff"></div>
  </t-popup>

  <t-popup v-model="right" placement="right">
    <div style="width: 200px; height: 100%; background: #fff"></div>
  </t-popup>

  <t-popup v-model="top" placement="top">
    <div style="height: 200px; background: #fff"></div>
  </t-popup>

  <t-popup v-model="bottom" placement="bottom">
    <div style="height: 200px; background: #fff"></div>
  </t-popup>

  <t-popup v-model="center" placement="center" to="body">
    <div style="width: 200px; height: 200px; background: #fff"></div>
  </t-popup>

  <t-popup v-model="bottom1" placement="bottom" transition-name="slide-fade">
    <div style="height: 200px; background: #fff"></div>
  </t-popup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const top = ref(false);
    const bottom = ref(false);
    const left = ref(false);
    const right = ref(false);
    const center = ref(false);
    const bottom1 = ref(false);

    return {
      top,
      bottom,
      left,
      right,
      center,
      bottom1,
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

@keyframes slideFadeIn {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideFadeOut {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}

.slide-fade-enter-active {
  animation: slideFadeIn 1.5s;
}

.slide-fade-leave-active {
  animation: slideFadeOut 1.5s;
}
</style>
