<template>
  <div>
    <div class="tdesign-demo-block">
      <t-navbar title="标题" home-icon @home-click="onClickHome">
        <template #right-icon>
          <t-ellipsis-icon @click="onClickRight" />
        </template>
      </t-navbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EllipsisIcon as TEllipsisIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: { TEllipsisIcon },
  setup() {
    const onClickHome = () => {
      console.log('on click home');
    };
    const onClickRight = () => {
      console.log('on click right');
    };

    return {
      onClickHome,
      onClickRight,
    };
  },
});
</script>
