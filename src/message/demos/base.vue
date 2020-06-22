<template>
  <div class="message-base">
    <div class="tdesign-demo-block">
      <t-cell-group title="消息类型">
        <t-cell value-align="left">
          <t-button theme="primary" @click="visible = true">普通</t-button>
          <t-button theme="success" @click="visible1 = true">成功</t-button>
          <t-button theme="warning" @click="visible2 = true">警示</t-button>
          <t-button theme="danger" @click="visible3 = true">错误</t-button>
        </t-cell>
      </t-cell-group>
    </div>
    <t-cell-group title="自定义配置">
      <t-cell value-align="left">
        <t-button theme="primary" @click="visible4 = true">自定义偏移量</t-button>
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
        <t-button theme="primary" @click="onClick('info')">info</t-button>
        <t-button theme="success" @click="onClick('success')">success</t-button>
        <t-button theme="warning" @click="onClick('warning')">warning</t-button>
        <t-button theme="danger" @click="onClick('error')">error</t-button>
      </t-cell>
    </t-cell-group>
    <t-message v-model="visible" content="普通消息"></t-message>
    <t-message v-model="visible1" content="成功消息" theme="success"></t-message>
    <t-message v-model="visible2" content="警示消息" theme="warning"></t-message>
    <t-message v-model="visible3" content="错误消息" theme="error"></t-message>
    <t-message v-model="visible4" content="message" :offset="{top: 0, left: 0, right: 0}"></t-message>
    <t-message v-model="visible5" content="5000ms后消失" :duration="5000"></t-message>
    <t-message v-model="visible6" content="居中对齐" align="center"></t-message>
  </div>
</template>

<script>
import Message from '../message';
export default {
  data() {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
    };
  },
  methods: {
    onClick(type) {
      Message[type](type);
    },
  },
};
</script>
