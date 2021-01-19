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
import { ref, defineComponent, watch } from 'vue';

export default defineComponent({
  setup() {
    const activeIcon = ref('https://sola.gtimg.cn/aoi/sola/20201228145929_WkFqkMzJ1x.png');
    const inactiveIcon = ref('https://sola.gtimg.cn/aoi/sola/20201228145929_J7ntvZWBWD.png');
    const checkBoxs = ref(['1']);

    watch(() => checkBoxs.value, (val) => {
      console.log(val);
    });

    return {
      activeIcon,
      inactiveIcon,
      checkBoxs,
    };
  },
});
</script>
