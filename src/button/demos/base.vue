<template>
  <div class="button-base">
    <t-button @click="onClick" size="large" block>主按钮</t-button>
    <t-button size="large" disabled block>主按钮-禁用</t-button>
    <t-button theme="line" size="large" block>次要按钮</t-button>
    <t-button theme="line" size="large" disabled block>次要按钮-禁用</t-button>
    <t-button theme="ghost" size="large" block>幽灵按钮</t-button>
    <t-button theme="ghost" size="large" disabled block>幽灵按钮-禁用</t-button>
    <t-button theme="error" size="large" block>错误按钮</t-button>
    <t-button theme="error" size="large" disabled block>错误按钮-禁用</t-button>
    <t-button theme="warning" size="large" block>警告按钮</t-button>
    <t-button theme="warning" size="large" disabled block>警告按钮-禁用</t-button>
    <t-button theme="text" >文本按钮</t-button><br/>
    <t-button theme="text" disabled>文本按钮-禁用</t-button><br/>

    <t-button>中按钮</t-button>
    <t-button size="small" style="margin-left:16px;">小按钮</t-button><br/>
    <t-button theme="line" >中按钮</t-button>
    <t-button theme="line" size="small" style="margin-left:16px;">小按钮</t-button><br/>
    <t-button theme="ghost" >中按钮</t-button>
    <t-button theme="ghost" size="small" style="margin-left:16px;">小按钮</t-button><br/>
    <t-button theme="warning" >中按钮</t-button>
    <t-button theme="warning" size="small" style="margin-left:16px;">小按钮</t-button><br/>

    <t-button theme="text" icon="books">带图标文字按钮</t-button><br/>
    <t-button icon="books"></t-button><br/>
    <t-button icon="books" theme="line" block>带图标的按钮</t-button><br/>
    <t-button :loading="loading" >带图标的按钮-加载</t-button><br/>
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
