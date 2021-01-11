<template>
  <div class="rate-base">
    <t-cell-group title="评分">
      <t-cell value-align="left">
        <t-rate v-model="current" clearable />
      </t-cell>
    </t-cell-group>

    <t-cell-group title="允许半选">
      <t-cell value-align="left">
        <t-rate v-model="current1" clearable allow-half />
      </t-cell>
    </t-cell-group>

    <t-cell-group title="带辅助文本">
      <t-cell value-align="left">
        <t-rate v-model="current2" clearable show-text />
      </t-cell>
    </t-cell-group>

    <t-cell-group title="自定义辅助文本">
      <t-cell value-align="left">
        <t-rate v-model="current3" clearable show-text :texts="texts" />
      </t-cell>
    </t-cell-group>

    <t-cell-group title="自定义数量">
      <t-cell value-align="left">
        <t-rate v-model="current4" :count="6" size="large" clearable show-text allow-half />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const current = ref(0);
    const current1 = ref(2);
    const current2 = ref(1.5);
    const current3 = ref(3);
    const current4 = ref(2);
    const texts = ref(['很差', '差', '一般', '好评', '优秀']);

    return {
      current,
      current1,
      current2,
      current3,
      current4,
      texts,
    };
  },
});
</script>
