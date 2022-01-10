<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Avatar 头像</h1>
    <p class="summary">用于展示用户头像信息，除了纯展示也可点击进入个人详情等操作。</p>
    <tdesign-demo-block title="01 头像类型" summary="头像样式可为默认头像、微信头像圆形、方形、自定义文字">
      <div class="avatar-demo">
        <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" alt="示例图片" :hideOnLoadFailed="false"></t-avatar>
        <t-avatar>
          <template #icon>
            <user-icon/>
          </template>
        </t-avatar>
        <t-avatar>U</t-avatar>
        <t-avatar shape="round">U</t-avatar>
        <t-avatar>U</t-avatar>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 特殊类型" summary="纯展示 从上往下">
      <div class="avatar-demo">
        <t-avatar shape="circle">U</t-avatar>
        <t-avatar shape="round">U</t-avatar>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="头像大小尺寸及消息提醒">
      <div class="avatar-demo" style="margin-top:10px;">
        <t-avatar shape="circle" size='large'>U</t-avatar>
        <t-avatar shape="circle" size='medium'>U</t-avatar>
        <t-avatar shape="circle" size='small'>U</t-avatar>
      </div>
      <div class="avatar-demo" style="margin-top:10px;">
        <t-avatar shape="circle" size='large'>U</t-avatar>
        <t-avatar shape="circle" size='medium'>U</t-avatar>
        <t-avatar shape="circle" size='small'>U</t-avatar>
      </div>
      <div class="avatar-demo" style="margin-top:10px;">
        <t-avatar shape="round" size='large'>U</t-avatar>
        <t-avatar shape="round" size='medium'>U</t-avatar>
        <t-avatar shape="round" size='small'>U</t-avatar>
      </div>
      <div class="avatar-demo" style="margin-top:10px;">
        <t-avatar shape="circle" size='64px'>A</t-avatar>
        <t-avatar shape="circle" size='48px'>A</t-avatar>
        <t-avatar shape="circle" size='32px'>A</t-avatar>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
    components: { UserIcon }
});
</script>

<style lang="less" scoped>
  .avatar-demo{
    margin-left: 10px;
    .t-avatar {
      margin-right: 20px;
    }
    .avatar-desc {
      text-align: center;
      font-size: 12px;
    }
  }
</style>
