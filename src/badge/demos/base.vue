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
      <t-cell value-align="left">
        <span>单行标题</span>
        <t-badge dot :offset="[10, 0]" class="list-item-badge"/>
      </t-cell>
      <t-cell value-align="left">
        <span>单行标题</span>
        <t-badge :count="16" :offset="[10, 0]" class="list-item-badge"/>
      </t-cell>
      <t-cell value-align="left">
        <span>单行标题</span>
        <div class="badge-tag-wrap">
          <t-badge content="NEW" :offset="[10, 0]" shape="round" class="badge-tag"/>
          <t-badge content="NEW" :offset="[10, 0]" shape="round" class="badge-tag"/>
          <t-badge content="NEW" :offset="[10, 0]" shape="round" class="badge-tag"/>
          <t-badge content="NEW" :offset="[10, 0]" shape="round" class="badge-tag"/>
        </div>
      </t-cell>
      <t-cell value-align="left">
        <span>单行标题</span>
        <t-badge content="NEW" :offset="[-5, -15]" shape="ribbon" class="list-item-badge"/>
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

  .custom {
    background-color: '#fff';
    color: '#999';
    box-shadow: '0 0 0 1px #d9d9d9 inset';
  }
}
.list-item-badge {
  float: right;
  vertical-align: middle;
}
.badge-tag-wrap {
  float: right;
  margin-right: 10px;
}
.badge-tag {
  width: 50px;
  height: 20px;
}
</style>
