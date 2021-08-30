<template>
  <div class='tdesign-mobile-demo'>
    <h1 class='title'>Tag 标签</h1>
    <p class='summary'>用于标记表示主体属性、类型、状态等，由底部图形和标签文字组成</p>
    <tdesign-demo-block title='01 类型' summary='徽标主要分红点、数字、文字和角标提醒'>
      <div class='badge-demo'>
        <div class='badge-item'>
          <t-badge :count='16'>消息</t-badge>
        </div>
        <div class='badge-item'>
          <t-badge dot>消息</t-badge>
        </div>
        <div class='badge-item'>
          <t-badge content='NEW'>消息</t-badge>
        </div>
        <div class='badge-item'>
          <t-badge content='···'>消息</t-badge>
        </div>
      </div>
      <div class='badge-demo'>
        <div class='badge-item'>
          <t-badge :count='16'>
            <t-button size='small' variant='outline'>小按钮</t-button>
          </t-badge>
        </div>
        <div class='badge-item'>
          <t-badge dot>
            <t-button size='small' variant='outline'>小按钮</t-button>
          </t-badge>
        </div>
        <div class='badge-item'>
          <t-badge content='NEW'>
            <t-button size='small' variant='outline'>小按钮</t-button>
          </t-badge>
        </div>
        <div class='badge-item'>
          <t-badge content='···'>
            <t-button size='small' variant='outline'>小按钮</t-button>
          </t-badge>
        </div>
      </div>
      <t-cell-group style='overflow: hidden'>
        <t-cell title='单行标题' arrow>
          <template #note>
            <t-badge dot></t-badge>
          </template>
        </t-cell>
        <t-cell title='单行标题' arrow>
          <template #note>
            <t-badge :count='16'></t-badge>
          </template>
        </t-cell>
        <t-cell title='单行标题' arrow>
          <template #note>
            <t-badge content='NEW' shape='round' />
            <t-badge content='NEW' />
          </template>
        </t-cell>
        <t-cell title='单行标题'>
          <template #note>
            <t-badge content='NEW' :offset='[5, 0]' shape='ribbon' />
          </template>
        </t-cell>
      </t-cell-group>
    </tdesign-demo-block>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      iconUrl: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/static_source_business/7bd23b57-07c1-493b-a482-de78f9874a4f.svg',
    };
  },
});
</script>
