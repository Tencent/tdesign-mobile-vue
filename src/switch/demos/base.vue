<template>
  <div>
    <t-switch v-model="checked" :active-value="activeValue" :text="text"
              :inactive-value="inactiveValue" @change="onChange" >
    </t-switch>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-switch-base-demo`;

export default {
  name,
  setup() {
    const text = ref('描述信息');
    const checked = ref('Y');
    const activeValue = ref('Y');
    const inactiveValue = ref('N');
    function onChange($event:string|number|boolean) {
      console.log(`change to ${$event}`);
    }
    return {
      text,
      checked,
      activeValue,
      inactiveValue,
      onChange,
    };
  },
};
</script>
