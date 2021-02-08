<template>
  <div>
    <div class="tdesign-demo-block">
      <t-check-group ref="checkGroup" v-model="checkBoxs">
        <t-checkbox
          name="1"
          title="复选框1">
        </t-checkbox>
        <t-checkbox
          name="2"
          title="复选框2">
        </t-checkbox>
        <t-checkbox
          name="3"
          title="复选框3">
        </t-checkbox>
      </t-check-group>
    </div>
    <div class="tdesign-demo-block">
      <t-button theme="primary" size="small" @click="toggleSelect(true)">全选</t-button>
      <t-button theme="primary" size="small" @click="toggleSelect(false)">取消</t-button>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, watch } from 'vue';
export default defineComponent({
  setup() {
    const checkGroup = ref(null);
    const checkBoxs = ref(['1']);

    watch(() => checkBoxs.value, (val) => {
      console.log(Array.from(val));
    });

    return {
      checkBoxs,
      checkGroup,
      toggleSelect: (check) => checkGroup.value.toggleAll(check),
    };
  },
});
</script>
