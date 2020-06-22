<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button theme="primary" @click="visible = true">居中对齐</t-button>
    </div>
    <t-message v-model="visible" content="居中对齐" align="center" />
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
