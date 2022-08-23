<template>
  <div class="popup-demo">
    <div class="button-group">
      <t-button block variant="outline" size="large" @click="bottom = true">自定义动画</t-button>
    </div>
    <t-popup
      v-model="bottom"
      placement="bottom"
      transition-name="slide-fade"
      @open="open"
      @opened="opened"
      @close="close"
      @closed="closed"
    >
      <div style="height: 200px; background: #fff"></div>
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const bottom = ref(false);
const open = () => console.log('open--------');
const opened = () => console.log('opened--------');
const close = () => console.log('close--------');
const closed = () => console.log('closed--------');
</script>

<style lang="less">
.popup-demo {
  .button-group {
    padding: 0 16px;
    .t-button {
      margin-bottom: 16px;
    }
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
