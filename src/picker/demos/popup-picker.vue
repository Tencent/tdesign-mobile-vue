<template>
  <div class="tdesign-demo-block">
    <t-button theme="primary" @click="visible = true" style="margin-left: 20px;">
      结合Popup组件</t-button>
    <t-popup v-model="visible">
      <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column
          :options="roleOptions"
          @change="onColumnChange" />
      </t-picker>
    </t-popup>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const roles = ['战士', '法师', '射手', '刺客', '坦克', '辅助'];
    const curRoleIndex = ref(0);
    const roleOptions = ref(roles);
    const visible = ref(false);

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
      visible.value = false;
    };

    const onCancel = () => {
      console.log('取消');
      visible.value = false;
    };

    return {
      roleOptions,
      visible,
      onColumnChange,
      onRoleChange,
      onChange,
      onConfirm,
      onCancel,
    };
  },
});
</script>

