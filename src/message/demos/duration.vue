<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button theme="primary" @click="visible = true">5000ms</t-button>
    </div>
    <t-message v-model="visible" content="5000ms后消失" :duration="5000" />
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
