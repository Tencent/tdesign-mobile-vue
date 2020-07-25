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

    <t-cell-group title="自定义图标和数量">
      <t-cell value-align="left">
        <t-rate v-model="current4" :count="6" clearable show-text allow-half>
          <template v-slot:icon>
            <t-icon name="apple" />
          </template>
        </t-rate>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      current1: 2,
      current2: 1.5,
      current3: 3,
      current4: 2,
      texts: ['很差', '差', '一般', '好评', '优秀'],
    };
  },
};
</script>
