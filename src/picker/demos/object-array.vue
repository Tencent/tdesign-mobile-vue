<template>
  <div class="tdesign-demo-block">
    <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
      <t-picker-item :options="rolesObjOptions" option-key="name" @change="onColumnChange" />
    </t-picker>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const rolesObjs = [
      { name: '战士', value: 'warrior' },
      { name: '法师', value: 'mage' },
      { name: '射手', value: 'shooter' },
      { name: '刺客', value: 'ssassin' },
      { name: '坦克', value: 'tank' },
      { name: '辅助', value: 'auxiliary' },
    ];
    const curRoleIndex = ref(0);
    const rolesObjOptions = ref(rolesObjs);

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
      rolesObjOptions,
      onColumnChange,
      onRoleChange,
      onChange,
      onConfirm,
      onCancel,
    };
  },
});
</script>
