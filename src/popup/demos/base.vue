<template>
  <div class="popup-base">
    <t-cell-group title="弹出位置">
      <t-cell value-align="left">
        <div style="text-align: center">
          <t-button theme="primary" @click="top = true">上方</t-button>
          <t-button theme="primary" @click="bottom = true">下方</t-button>
          <t-button theme="primary" @click="left = true">左侧</t-button>
          <t-button theme="primary" @click="right = true">右侧</t-button>
        </div>
        <div style="text-align: center">
          <t-button theme="primary" @click="center = true">中间</t-button>
        </div>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="自定义内容区的动画">
      <t-cell value-align="left">
        <t-button @click="bottom1 = true">1.5s的slide-fade动画</t-button>
      </t-cell>
    </t-cell-group>

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

    <t-popup v-model="bottom1" position="bottom" transition-name="slide-fade">
      <div style="height: 200px; background: #fff;"></div>
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
      bottom1: false,
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
