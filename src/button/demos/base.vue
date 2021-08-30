<template>
  <div class="tdesign-mobile-demo">
    <h1 class='com-title'>Button 按钮</h1>
    <p class='com-summary'>按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</p>
    <h2 class='com-group-title'>01 类型</h2>
    <t-cell-group title="基础按钮">
        <t-button theme="primary" size="large" @click="onClick">主要按钮</t-button>
        <t-button theme="primary" size="large" disabled>失效状态</t-button>
        <t-button variant="outline" size="large">次要按钮</t-button>
        <t-button variant="outline" size="large" disabled>失效状态</t-button>
        <t-button theme="danger" size="large">警告按钮</t-button>
        <t-button theme="danger" size="large" disabled>失效状态</t-button>
        <t-button theme="danger" variant="outline" size="large">次要警告按钮</t-button>
        <t-button theme="danger" variant="outline" size="large" disabled>失效状态</t-button>
        <t-button theme="primary" variant="outline" size="large" ghost>幽灵按钮</t-button>
        <t-button theme="primary" variant="outline" size="large" ghost disabled>失效状态</t-button>
        <t-button variant="text" block>文字按钮</t-button>
        <t-button variant="text" block disabled>失效状态</t-button>
    </t-cell-group>

    <t-cell-group title="其他尺寸">
      <t-cell>
        <t-button theme="primary">主要按钮</t-button>
        <t-button theme="primary" size="small" style="margin-left: 16px">小按钮</t-button><br />
        <t-button variant="outline">次要按钮</t-button>
        <t-button variant="outline" size="small" style="margin-left: 16px">小按钮</t-button><br />
        <t-button theme="danger">警告按钮</t-button>
        <t-button theme="danger" size="small" style="margin-left: 16px">小按钮</t-button><br />
        <t-button ghost>幽灵按钮</t-button>
        <t-button ghost size="small" style="margin-left: 16px">小按钮</t-button><br />
        <t-button theme="danger" variant="outline">警告按钮</t-button>
        <t-button theme="danger" variant="outline" size="small" style="margin-left: 16px">小按钮</t-button><br />
      </t-cell>
    </t-cell-group>

    <t-cell-group title="图标按钮">
      <t-cell>
        <t-button variant="outline" size="large" :icon="iconFunc">
          <template #rightIcon>
            <TIconStar />
          </template>
          按钮
        </t-button>
      </t-cell>
      <t-cell style="background-color:#fff">
        <t-button theme="primary" variant="text" block style="margin-bottom:0">
          <template #rightIcon>
            <TIconStar />
          </template>
          带图标的文字按钮
        </t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="块状风格" style="background-color:transparent">
      <t-button-group style="margin-bottom: 12px">
        <t-button theme="primary">置底按钮</t-button>
      </t-button-group>
      <t-button-group style="margin-bottom: 12px">
        <t-button theme="primary" disabled>失效状态</t-button>
      </t-button-group>
      <t-button-group style="margin-bottom: 12px">
        <t-button variant="outline">置底按钮</t-button>
        <t-button theme="primary">置底按钮</t-button>
      </t-button-group>
      <t-button-group style="margin-bottom: 12px">
        <t-button variant="outline" disabled>失效状态</t-button>
        <t-button theme="primary" disabled>失效状态</t-button>
      </t-button-group>
      <t-button-group type="menu" style="margin-bottom: 12px">
        <t-button variant="outline">置底按钮</t-button>
        <t-button variant="outline">置底按钮</t-button>
      </t-button-group>
      <t-button-group type="menu" style="margin-bottom: 12px">
        <t-button variant="outline" disabled>置底按钮</t-button>
        <t-button variant="outline" disabled>置底按钮</t-button>
      </t-button-group>
      <t-button-group type="menu" style="margin-bottom: 12px">
        <t-button variant="outline">置底按钮</t-button>
        <t-button variant="outline">置底按钮</t-button>
        <t-button variant="outline">置底按钮</t-button>
      </t-button-group>
      <t-button-group type="menu" style="margin-bottom: 12px">
        <t-button variant="outline" disabled>置底按钮</t-button>
        <t-button variant="outline" disabled>置底按钮</t-button>
        <t-button variant="outline" disabled>置底按钮</t-button>
      </t-button-group>
    </t-cell-group>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import TIconLoading from '@/icon/loading.vue';
import TIconStar from '@/icon/star-filled.vue';

export default defineComponent({
  components: { TIconStar },
  setup() {
    const onClick = () => {
      console.log('ttt');
    };
    const loading = ref(true);
    const iconFunc = () => TIconLoading;
    return { onClick, loading, iconFunc };
  },
});
</script>
