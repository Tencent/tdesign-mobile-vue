<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button theme="primary" @click="visible = true">15px的偏移</t-button>
    </div>
    <t-message
      v-model="visible"
      content="message"
      :offset="{top: '15px', left: '15px', right: '15px'}"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
};
</script>
