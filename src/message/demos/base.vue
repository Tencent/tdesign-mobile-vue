<template>
  <div class="message-base">
    <div class="tdesign-demo-block">
      <t-cell-group title="带图标消息通知">
        <t-cell value-align="left">
          <t-button theme="primary" @click="visible = true">普通</t-button>
          <t-button theme="success" @click="visible1 = true">成功</t-button>
          <t-button theme="warning" @click="visible2 = true">警示</t-button>
          <t-button theme="danger" @click="visible3 = true">错误</t-button>
        </t-cell>
      </t-cell-group>
    </div>
    <t-cell-group title="纯文本消息">
      <t-cell value-align="left"  class="tdesign-text-message-btn">
        <t-button theme="primary" @click="visible7 = true">纯文本</t-button>
        <t-button theme="success" @click="visible8 = true">纯文本</t-button>
        <t-button theme="warning" @click="visible9 = true">纯文本</t-button>
        <t-button theme="danger" @click="visible10 = true">纯文本</t-button>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="自定义配置">
      <t-cell value-align="left">
        <t-button theme="primary" @click="visible5 = true">自定义显示时间</t-button>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="对齐方式">
      <t-cell value-align="left">
        <t-button theme="primary" @click="visible6 = true">居中</t-button>
      </t-cell>
    </t-cell-group>
   
    <t-cell-group title="快捷调用">
      <t-cell value-align="left">
        <t-button theme="primary" @click="onClick('info')">普通</t-button>
        <t-button theme="success" @click="onClick('success')">成功</t-button>
        <t-button theme="warning" @click="onClick('warning')">警示</t-button>
        <t-button theme="danger" @click="onClick('error')">错误</t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="偏移">
      <t-cell value-align="left">
        <t-button theme="primary" @click="visible11 = true">普通</t-button>
      </t-cell>
    </t-cell-group>


    <t-message v-model="visible" content="普通消息"></t-message>
    <t-message v-model="visible1" content="成功消息" theme="success"></t-message>
    <t-message v-model="visible2" content="警示消息" theme="warning"></t-message>
    <t-message v-model="visible3" content="错误消息" theme="error"></t-message>
    <t-message v-model="visible5" content="5000ms后消失" :duration="5000"></t-message>
    <t-message v-model="visible6" content="居中对齐" align="center"></t-message>
    <t-message v-model="visible7" >纯文本，不带icon</t-message>
    <t-message v-model="visible8" theme="success">纯文本，不带icon</t-message>
    <t-message v-model="visible9" theme="warning">纯文本，不带icon</t-message>
    <t-message v-model="visible10" theme="error">纯文本，不带icon</t-message>
    <t-message v-model="visible11" >偏移</t-message>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Message from '../index';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);
    const visible4 = ref(false);
    const visible5 = ref(false);
    const visible6 = ref(false);
    const visible7 = ref(false);
    const visible8 = ref(false);
    const visible9 = ref(false);
    const visible10 = ref(false);
    const visible11 = ref(false);
    

    return {
      visible,
      visible1,
      visible2,
      visible3,
      visible4,
      visible5,
      visible6,
      visible7,
      visible8,
      visible9,
      visible10,
      visible11,
      onClick: (type) => Message[type](type),
    };
  },
});
</script>

<style lang="less">
.message-base {
  .t-button:not(:last-child) {
    margin-right: 20px;
  }
}
.tdesign-text-message-btn{
  .t-button:not(:last-child){
    margin-right: 20px;
    margin-bottom: 12px;
  }
}
</style>
