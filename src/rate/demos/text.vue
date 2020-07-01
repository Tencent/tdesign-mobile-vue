<template>
  <div>
    <div class="tdesign-demo-block">
      <t-rate v-model="value" clearable show-text allow-half />
    </div>
    <div class="tdesign-demo-block">
      <t-rate v-model="value1" clearable show-text allow-half text-color="#FA0" />
    </div>
    <div class="tdesign-demo-block">
      <t-rate v-model="value2" clearable show-text :texts="texts" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      value1: 2.5,
      value2: 3,
      texts: ['很差', '差', '一般', '好评', '优秀'],
    };
  },
};
</script>
