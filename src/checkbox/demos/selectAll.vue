<template>
  <div>
    <div class="tdesign-demo-block">
      <t-check-group v-model="checkBoxs" ref="checkGroup">
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
      <t-button theme="success" size="small" @click="toggleSelect(false)">取消</t-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkBoxs: ['1'],
    };
  },
  watch: {
    checkBoxs(val) {
      console.log(Array.from(val));
    },
  },
  methods: {
    toggleSelect(check) {
      this.$refs.checkGroup.toggleAll(check);
    },
  },
};
</script>
