<template>
  <div class="tdesign-demo-button-base">
    <t-cell-group title="基础按钮">
      <t-cell value-align="left">
        <t-button @click="onClick" @touchstart="onTouchStart" size="large">主按钮</t-button>
        <t-button size="large" disabled>主按钮-禁用</t-button>
        <t-button theme="line" size="large" >次要按钮</t-button>
        <t-button theme="line" size="large" disabled>次要按钮-禁用</t-button>
        <t-button theme="ghost" size="large" >幽灵按钮</t-button>
        <t-button theme="ghost" size="large" disabled >幽灵按钮-禁用</t-button>
        <t-button theme="error" size="large" >错误按钮</t-button>
        <t-button theme="error" size="large" disabled >错误按钮-禁用</t-button>
        <t-button theme="warning" size="large" >警告按钮</t-button>
        <t-button theme="warning" size="large" disabled >警告按钮-禁用</t-button>
        <t-button theme="text" >文本按钮</t-button><br/>
        <t-button theme="text" disabled>文本按钮-禁用</t-button><br/>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="其他尺寸">
      <t-cell value-align="left">
        <t-button>中按钮</t-button>
        <t-button size="small" style="margin-left:16px;">小按钮</t-button><br/>
        <t-button theme="line" >中按钮</t-button>
        <t-button theme="line" size="small" style="margin-left:16px;">小按钮</t-button><br/>
        <t-button theme="ghost" >中按钮</t-button>
        <t-button theme="ghost" size="small" style="margin-left:16px;">小按钮</t-button><br/>
        <t-button theme="warning" >中按钮</t-button>
        <t-button theme="warning" size="small" style="margin-left:16px;">小按钮</t-button><br/>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="图标按钮">
      <t-cell value-align="left">
        <t-button theme="text" icon="books">带图标文字按钮</t-button><br/>
        <t-button theme="line" icon="books">带图标的按钮</t-button><br/>
        <t-button icon="books"></t-button><br/>
      </t-cell>
    </t-cell-group>

    <t-cell value-align="left">
      <t-button :loading="loading" >带图标的按钮-加载</t-button><br/>
    </t-cell>

    <t-button theme="line" icon="books" block>文本按钮</t-button><br/>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    const onClick = () => {
      console.log('ttt');
    };
    const onTouchStart = () => {
      console.log('touch start');
    };
    const loading = ref(true);
    return { onClick, onTouchStart, loading };
  },
};
</script>
