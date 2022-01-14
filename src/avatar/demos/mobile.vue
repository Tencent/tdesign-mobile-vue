<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Avatar 头像</h1>
    <p class="summary">用于展示用户头像信息，除了纯展示也可点击进入个人详情等操作。</p>
    <tdesign-demo-block title="01 头像类型" summary="头像样式可为默认头像、微信头像圆形、方形、自定义文字">
      <div class="avatar-demo">
        <t-avatar
          image="https://tdesign.gtimg.com/site/avatar.jpg"
          alt="示例图片"
          :hide-on-load-failed="false"
        ></t-avatar>
        <t-avatar :icon="userIcon"></t-avatar>
        <t-avatar>
          <template #icon>
            <t-user-icon />
          </template>
        </t-avatar>
        <t-avatar>A</t-avatar>
        <t-avatar shape="round">A</t-avatar>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 特殊类型" summary="纯展示 从上往下">
      <div class="avatar-group-demo">
        <t-avatar-group cascading="right-up" :max="3">
          <t-avatar shape="circle" size="small" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" size="small" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" size="small" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" size="small" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
        </t-avatar-group>
      </div>
      <div class="avatar-group-demo">
        <t-avatar-group cascading="right-up" :max="3" collapse-avatar="...">
          <t-avatar shape="circle" size="medium" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" size="medium" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" size="medium" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" size="medium" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
        </t-avatar-group>
      </div>
      <div class="avatar-group-demo">
        <t-avatar-group cascading="right-up" :max="3" collapse-avatar="more">
          <t-avatar shape="circle" size="large" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" size="large" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" size="large" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" size="large" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
        </t-avatar-group>
      </div>
      <div class="avatar-group-demo">
        <t-avatar-group cascading="left-up" :max="2">
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
        </t-avatar-group>
      </div>
      <div class="avatar-group-demo">
        <t-avatar-group cascading="left-up" :max="2" collapse-avatar="...">
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
        </t-avatar-group>
      </div>
      <div class="avatar-group-demo">
        <t-avatar-group cascading="left-up" :max="2" :collapse-avatar="userIcon">
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
        </t-avatar-group>
      </div>
      <div class="avatar-group-demo">
        <t-avatar-group cascading="left-up" :max="4" collapse-avatar="...">
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
          <t-avatar shape="circle" image="https://tdesign.gtimg.com/site/avatar.jpg">A</t-avatar>
        </t-avatar-group>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="头像大小尺寸">
      <div class="avatar-demo" style="margin-top: 10px">
        <t-avatar shape="circle" size="large" :badge-props="{ count: 10 }">A</t-avatar>
        <t-avatar shape="circle" size="medium" :badge-props="{ count: 10 }">A</t-avatar>
        <t-avatar shape="circle" size="small" :badge-props="{ count: 10 }">A</t-avatar>
      </div>
      <div class="avatar-demo" style="margin-top: 10px">
        <t-avatar shape="circle" size="large">A</t-avatar>
        <t-avatar shape="circle" size="medium">A</t-avatar>
        <t-avatar shape="circle" size="small">A</t-avatar>
      </div>
      <div class="avatar-demo" style="margin-top: 10px">
        <t-avatar shape="round" size="large" :badge-props="{ count: 10 }">A</t-avatar>
        <t-avatar shape="round" size="medium" :badge-props="{ count: 10 }">A</t-avatar>
        <t-avatar shape="round" size="small" :badge-props="{ count: 10 }">A</t-avatar>
      </div>
      <div class="avatar-demo" style="margin-top: 10px">
        <t-avatar shape="circle" size="large">A</t-avatar>
        <t-avatar shape="circle" size="medium">A</t-avatar>
        <t-avatar shape="circle" size="small">A</t-avatar>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { UserIcon as TUserIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: { TUserIcon },
  setup() {
    const userIcon = () => h(TUserIcon);
    return { userIcon };
  },
});
</script>

<style lang="less" scoped>
.avatar-demo {
  margin-left: 10px;
  .t-avatar {
    margin-right: 20px;
  }
}
.avatar-group-demo {
  margin-left: 10px;
}
</style>
