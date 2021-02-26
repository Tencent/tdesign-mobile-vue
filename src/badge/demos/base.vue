<template>
  <div>
    <t-cell-group title="按钮带徽标">
      <div class="badge-wrap">
        <t-badge :count="16" class="badge-item">
          <t-button size="small">小按钮</t-button>
        </t-badge>
        <t-badge dot class="badge-item">
          <t-button size="small">小按钮</t-button>
        </t-badge>
        <t-badge content="NEW" class="badge-item">
          <t-button size="small">小按钮</t-button>
        </t-badge>
        <t-badge content="···" class="badge-item">
          <t-button size="small">小按钮</t-button>
        </t-badge>
      </div>
    </t-cell-group>
    <t-cell-group title="列表带徽标">
      <t-cell label="单行标题">
        <t-badge dot />
      </t-cell>
      <t-cell label="单行标题">
        <t-badge :count="16"/>
      </t-cell>
      <t-cell label="单行标题">
        <t-badge content="NEW" shape="round" class="cell-badge"/>
        <t-badge content="NEW" shape="round" class="cell-badge"/>
        <t-badge content="NEW" shape="round" class="cell-badge"/>
      </t-cell>
      <t-cell label="单行标题">
        <t-badge content="NEW" :offset="[5, 0]" shape="ribbon" />
      </t-cell>
    </t-cell-group>
    <!-- <t-cell-group title="文本加图标标签栏">
      <t-tab-bar>
        <t-tab-bar-item
          v-for="(item, i) in list_1"
          :key="item.name || i"
          :icon="item.icon"
          :name="item.name"
        >
          {{ item.text }}
        </t-tab-bar-item>
      </t-tab-bar>
    </t-cell-group> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref(null);
    const list_1 = [
      {
        name: 'label_1',
        text: '标签一',
        icon: 'location-filled',
      },
      {
        name: 'label_2',
        text: '标签二',
        icon: 'check-circle-filled',
      },
    ];

    return {list_1}
  }
});
</script>

<style lang="less" scoped>
.badge-wrap {
  padding: 20px 0;

  .badge-item {
    margin: 0 10px;
  }
}
.cell-badge {
  margin-left: 10px;
}
</style>
