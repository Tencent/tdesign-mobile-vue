<template>
  <div class="tdesign-demo-block">
    <t-picker title="游戏" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
      <t-picker-item :options="gamePlatOptions" @change="onColumnChange" />
      <t-picker-item :options="gameLevelOptions" @change="onColumnChange" />
      <t-picker-item :options="gameOptions" @change="onColumnChange" />
    </t-picker>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const curRoleIndex = ref(0);
    const gamePlatOptions = ref(['端游', '手游', 'PS4', 'NS']);
    const gameLevelOptions = ref(['3A大作', '精品游戏', '动作游戏', '冒险游戏', '射击游戏']);

    const gameOptions = ref(['塞尔达传说', '只狼', '荒野大嫖客', '王者荣耀', '和平精英']);

    const onColumnChange = (e: any) => {
      console.log('column:change', e);
    };

    const onRoleChange = (e: any) => {
      console.log('column:change', e);
      curRoleIndex.value = e.index;
    };

    const onChange = (e: any) => {
      console.log('picker:change', e);
    };

    const onConfirm = (e: any) => {
      console.log('picker:confirm', e);
    };

    const onCancel = () => {
      console.log('取消');
    };

    return {
      gamePlatOptions,
      gameLevelOptions,
      gameOptions,
      onColumnChange,
      onRoleChange,
      onChange,
      onConfirm,
      onCancel,
    };
  },
});
</script>
