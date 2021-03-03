<template>
  <div>
    <t-button @click="bottom = true">1.5s的slide-fade动画</t-button>

    <t-popup
      v-model="bottom"
      position="bottom"
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

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const bottom = ref(false);
    return {
      bottom,
      open: () => console.log('open--------'),
      opened: () => console.log('opened--------'),
      close: () => console.log('close--------'),
      closed: () => console.log('closed--------'),
    };
  },
});
</script>

<style lang="less">
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
