<template>
  <div class="flex align-center margin-right">
    <t-button size="large" theme="primary">按钮 44</t-button>
    <t-button theme="primary">按钮 40</t-button>
    <t-button size="small" theme="primary">按钮 36</t-button>
  </div>
  <div class="flex align-center margin-right">
    <t-button size="large" theme="primary" shape="round">
      <template #icon>
        <t-icon-app />
      </template>
      按钮
    </t-button>
    <t-button :icon="iconFunc" shape="round" theme="primary">按钮</t-button>
    <t-button size="small" :icon="iconFunc" shape="round" theme="primary">按钮</t-button>
  </div>
  <div class="flex align-center margin-right">
    <t-button size="large" :icon="iconFunc" shape="square" theme="primary"></t-button>
    <t-button :icon="iconFunc" shape="square" theme="primary"></t-button>
    <t-button size="small" :icon="iconFunc" shape="square" theme="primary"></t-button>
  </div>
  <div class="flex align-center margin-right">
    <t-button size="large" :icon="iconFunc" shape="circle" theme="primary"></t-button>
    <t-button :icon="iconFunc" shape="circle" theme="primary"></t-button>
    <t-button size="small" :icon="iconFunc" shape="circle" theme="primary"></t-button>
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';

const iconFunc = () => h(TIconApp);
</script>
