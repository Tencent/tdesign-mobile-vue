<template>
  <div>
    <t-button size="large" theme="primary" block :disabled="disabled">强按钮</t-button>
    <t-button size="large" theme="primary" block variant="outline" :disabled="disabled"> 弱按钮 </t-button>
    <t-button size="large" variant="outline" block :disabled="disabled">次按钮</t-button>
    <t-button size="large" theme="primary" variant="outline" :icon="iconFunc" block :disabled="disabled">
      带图标按钮
    </t-button>
    <t-button size="large" theme="danger" block :disabled="disabled">强警告按钮</t-button>
    <t-button size="large" theme="danger" variant="outline" block :disabled="disabled"> 弱警告按钮 </t-button>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, defineProps, h } from 'vue';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';

const props = defineProps({
  disabled: Boolean,
});

const { disabled } = toRefs(props);
const iconFunc = () => h(TIconApp);
</script>
