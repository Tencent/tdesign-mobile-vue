<template>
  <div class="rate-base">
    <div>
      <t-rate v-model="current" clearable showText allowHalf />
    </div>

    <div>
      <t-rate v-model="current1" clearable showText :texts="texts" />
    </div>

    <div>
      <t-rate v-model="current2" :count="6" clearable showText allowHalf>
        <template v-slot:icon>
          <t-icon icon="apple" />
        </template>
      </t-rate>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 3,
      current1: 2,
      current2: 1.5,
      texts: ['很差', '差', '一般', '好评', '优秀']
    };
  },
  methods: {
    onChange(val) {
      console.log(val);
      this.current = val;
    }
  }
};
</script>
