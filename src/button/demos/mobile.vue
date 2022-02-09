<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Button 按钮</h1>
    <p class="summary">按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</p>
    <tdesign-demo-block title="01 类型" summary="基础按钮">
      <div class="button-demo" style="margin: 0 16px 0">
        <t-button theme="primary" shape="round" @click="onClick">强按钮</t-button>
        <t-button theme="primary" variant="outline">弱按钮</t-button>
        <t-button variant="outline">次按钮</t-button>
        <t-button theme="primary" variant="outline" :icon="iconFunc">带图标按钮</t-button>
        <t-button theme="danger">警告按钮</t-button>
        <t-button theme="danger" variant="outline">弱警告按钮</t-button>
        <t-button theme="primary" variant="text">文字按钮</t-button>
      </div>
      <div class="button-demo" style="background: #a6a6a6; padding: 16px 16px 0 16px">
        <t-button variant="outline" ghost>幽灵按钮</t-button>
      </div>
      <t-button theme="primary" block style="margin: 8px 0">通栏按钮</t-button>
      <t-button-group>
        <t-button variant="outline">次按钮</t-button>
        <t-button theme="primary">主按钮</t-button>
      </t-button-group>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="按钮禁用态">
      <div class="button-demo" style="margin: 0 16px">
        <t-button theme="primary" disabled @click="onClick">强按钮</t-button>
        <t-button theme="primary" variant="outline" disabled>弱按钮</t-button>
        <t-button variant="outline" disabled>次按钮</t-button>
        <t-button theme="primary" variant="outline" :icon="iconFunc" disabled>带图标按钮</t-button>
        <t-button theme="danger" disabled>警告按钮</t-button>
        <t-button theme="danger" variant="outline" disabled>弱警告按钮</t-button>
        <t-button theme="primary" variant="text" disabled>文字按钮</t-button>
      </div>
      <div class="button-demo" style="background: #a6a6a6; padding: 16px 16px 0 16px">
        <t-button variant="outline" disabled ghost>幽灵按钮</t-button>
      </div>
      <t-button theme="primary" block disabled style="margin: 8px 0">通栏按钮</t-button>
      <t-button-group style="margin-top: 8px">
        <t-button variant="outline" disabled>次按钮</t-button>
        <t-button theme="primary" disabled>主按钮</t-button>
      </t-button-group>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="文字按钮尺寸">
      <div class="button-demo" style="margin: 0 16px">
        <t-button theme="primary" size="large">按钮 44</t-button>
        <t-button theme="primary" style="width: 240px">按钮 40</t-button><br />
        <t-button theme="primary" size="small" style="width: 90px">按钮 36</t-button>
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, h } from 'vue';
import { StarIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  setup() {
    const onClick = () => {
      console.log('强按钮');
    };
    const loading = ref(true);
    const iconFunc = () => h(StarIcon);
    return { onClick, loading, iconFunc };
  },
});
</script>
<style lang="less" scoped>
.button-demo {
  .t-button {
    width: 100%;
  }
}
</style>
