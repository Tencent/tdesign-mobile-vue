<template>
  <div>
    <t-checkbox name="checkbox1" value="1" label="多选" @change="changeFn"></t-checkbox>
    <t-checkbox name="checkbox1" value="2" label="多选" @change="changeFn"></t-checkbox>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const changeFn = (check: boolean, context: { e: Event }) => {
      console.log('check: ', check);
      console.log('context: ', context);
    };
    return {
      changeFn,
    };
  },
});
</script>
