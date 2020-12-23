<template>
  <div>
    <t-check-group v-model="checkBoxs">
      <t-checkbox
        name="1"
        title="选择框1">
        <template #icon="props">
          <img class="my-icon" :src="props.checked ? activeIcon : inactiveIcon" />
        </template>
      </t-checkbox>
      <t-checkbox
        name="2"
        title="选择框2">
        <template #icon="props">
          <img class="my-icon" :src="props.checked ? activeIcon : inactiveIcon" />
        </template>
      </t-checkbox>
    </t-check-group>
  </div>
</template>
<script>
import activeIcon from './user-active.png';
import inactiveIcon from './user-inactive.png';

export default {
  data() {
    return {
      activeIcon,
      inactiveIcon,
      checkBoxs: ['1'],
    };
  },
  watch: {
    checkBoxs(val) {
      console.log(Array.from(val));
    },
  },
};
</script>
