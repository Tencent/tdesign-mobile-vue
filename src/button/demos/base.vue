<template>
  <div class="button-base">
    <t-button @click="onClick" block>主按钮</t-button>
    <t-button disabled block>主按钮-禁用</t-button>
    <t-button theme="line" block>次要按钮</t-button>
    <t-button theme="line" disabled block>次要按钮-禁用</t-button>
    <t-button theme="ghost" block>幽灵按钮</t-button>
    <t-button theme="ghost" disabled block>幽灵按钮-禁用</t-button>
    <t-button theme="warning" block>警告按钮</t-button>
    <t-button theme="warning" disabled block>警告按钮-禁用</t-button>
    <t-button theme="text">文本按钮</t-button><br/>
    <t-button theme="text" disabled>文本按钮-禁用</t-button><br/>

    <t-button size="small">中按钮</t-button>
    <t-button size="mini" style="margin-left:16px;">小按钮</t-button><br/>
    <t-button theme="line" size="small">中按钮</t-button>
    <t-button theme="line" size="mini" style="margin-left:16px;">小按钮</t-button><br/>
    <t-button theme="ghost" size="small">中按钮</t-button>
    <t-button theme="ghost" size="mini" style="margin-left:16px;">小按钮</t-button><br/>
    <t-button theme="warning" size="small">中按钮</t-button>
    <t-button theme="warning" size="mini" style="margin-left:16px;">小按钮</t-button><br/>

    <t-button theme="text" icon="books">带图标文字按钮</t-button><br/>
    <t-button icon="books" theme="line" block>带图标的按钮</t-button><br/>
    <t-button :loading="loading" >带图标的按钮-加载</t-button><br/>
    <t-button size="small">带图标的按钮-小</t-button>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    const onClick = () => {
      console.log('ttt');
    };
    const loading = ref(true);
    return { onClick, loading };
  },
};
</script>
