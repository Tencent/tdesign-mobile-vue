<template>
  <div>
    <div class="tdesign-demo-block">
      <t-rate v-model="value" />
    </div>

    <div class="tdesign-demo-block">
      <!-- 允许清除 -->
      <t-rate v-model="value1" clearable />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 2,
      value1: 3,
    };
  },
};
</script>
