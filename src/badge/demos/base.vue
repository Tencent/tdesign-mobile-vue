<template>
  <div>
    <div class="badge-wrap">
      <t-badge :count="12" class="badge-item">
        <t-button>按钮</t-button>
      </t-badge>
      <t-badge :count="999" color="green" class="badge-item">
        <t-button>绿色</t-button>
      </t-badge>
      <t-badge :count="1" color="#f52fff" class="badge-item">
        <t-button>自定义颜色</t-button>
      </t-badge>
    </div>
    <div class="badge-wrap">
      <t-badge :count="1" text="NEW" class="badge-item">
        <t-button>文字</t-button>
      </t-badge>
      <t-badge :count="1" text="新消息" class="badge-item">
        <t-button>文字</t-button>
      </t-badge>
      <t-badge :count="1" text="···" class="badge-item">
        <t-button>省略号</t-button>
      </t-badge>
    </div>
    <div class="badge-wrap">
      <t-badge dot class="badge-item">
        <t-button>dot</t-button>
      </t-badge>
      <t-badge :count="12" :overflowCount="9" class="badge-item">
        <t-button>按钮</t-button>
      </t-badge>
      <t-badge :count="1112" :overflowCount="999" class="badge-item">
        <t-button>按钮</t-button>
      </t-badge>
    </div>
    <div class="badge-wrap">
      <t-badge dot class="badge-item"></t-badge>
      <t-badge :count="1" class="badge-item"></t-badge>
      <t-badge text="···" class="badge-item"></t-badge>
      <t-badge text="新消息" class="badge-item"></t-badge>
    </div>
    <div class="badge-wrap">
      <t-badge :count="12" size="default" class="badge-item">
        <t-button>默认大小</t-button>
      </t-badge>
      <t-badge :count="12" size="small" class="badge-item">
        <t-button>small</t-button>
      </t-badge>
      <t-badge :count="12" size="large" class="badge-item">
        <t-button>large</t-button>
      </t-badge>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="less" scoped>
.badge-wrap {
  padding: 20px 0;

  .badge-item {
    margin: 0 20px;
  }
}
</style>
