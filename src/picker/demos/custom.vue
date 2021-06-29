<template>
  <div class="tdesign-demo-block">
    <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
      <t-picker-column
        :options="roleOptions"
        :formatter="(val) => val"
        @change="onColumnChange"
      />
    </t-picker>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const roles = ['战士', '法师', '射手', '刺客', '坦克', '辅助'];
    const curRoleIndex = ref(0);
    const roleOptions = ref(roles);
    const gameOptions = ref([
      '端游',
      '手游',
      'PS4',
      'NS',
    ]);
    const gameLevelOptions = ref([
      '3A大作',
      '精品游戏',
      '动作游戏',
      '冒险游戏',
      '射击游戏',
    ]);

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
      roleOptions,
      gameOptions,
      gameLevelOptions,
      onColumnChange,
      onRoleChange,
      onChange,
      onConfirm,
      onCancel,
    };
  },
});
</script>
