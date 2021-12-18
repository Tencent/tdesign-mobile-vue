<template>
  <div>
    <t-radio-group v-model:value="radio" @change="groupChangeFn">
        <t-radio name="radio1" value="1" label="单选" :icon="circleFilledIcons" :onChange="onChangeFn"></t-radio>
        <t-radio name="radio1" value="2" label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" :icon="circleFilledIcons" :onChange="onChangeFn"></t-radio>
        <t-radio name="radio1" value="3" label="单选" content="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" :icon="circleFilledIcons" :onChange="onChangeFn"></t-radio>
      </t-radio-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, h, watch } from 'vue';
import { CheckCircleFilledIcon, CircleIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  setup() {
    const radio = ref('1');
    const TIconCircleFilled = h(CheckCircleFilledIcon);
    const TIconCircle = h(CircleIcon);

    watch(
      () => radio.value,
      (val) => {
        console.log(val);
      },
    );

    const onChangeFn = (checked: boolean, context: { e: Event }) => {
      console.log(checked, context);
    };

    const groupChangeFn = (name: string) => {
      console.log('testChange', name);
    };

    return {
      radio,
      circleFilledIcons:  [TIconCircleFilled, TIconCircle],
      onChangeFn,
      groupChangeFn
    };
  },
});
</script>
