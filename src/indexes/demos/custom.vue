<template>
  <div class="component-wrap">
    <t-indexes :index-list="indexList" @change="change">
      <template v-for="item in list" :key="item.index">
        <t-indexes-anchor :index="item.index">
          <div :class="['capsule', item.index === curIndex ? 'capsule--active' : '']">{{ item.index }}</div>
        </t-indexes-anchor>
        <t-cell-group>
          <t-cell v-for="(val, i) in item.children" :key="i" :title="val" />
        </t-cell-group>
      </template>
    </t-indexes>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

const children = new Array(5).fill('列表内容');
const curIndex: Ref<number | string> = ref('');
const list = [
  {
    index: 1,
    children,
  },
  {
    index: 3,
    children,
  },
  {
    index: 5,
    children,
  },
  {
    index: 7,
    children,
  },
  {
    index: 8,
    children,
  },
  {
    index: 10,
    children,
  },
  {
    index: '#',
    children,
  },
];
const indexList = list.map((item) => item.index);

const change = (index: number | string) => {
  curIndex.value = index;
};
</script>
<style lang="less">
:root[theme-mode='light'] {
  --capsule-bg: #f3f3f3;
  --capsule-active-bg: #fff;
  --capsule-active-border-color: #e7e7e7;
  --capsule-wrap-bg: #fff;
}

:root[theme-mode='dark'] {
  --capsule-bg: #2c2c2c;
  --capsule-active-bg: #242424;
  --capsule-active-border-color: #383838;
  --capsule-wrap-bg: #242424;
}

.component-wrap {
  height: calc(100vh - 50px);
  background-color: var(--capsule-wrap-bg);
}

.capsule {
  margin: 0 8px;
  padding: 0 16px;
  height: 30px;
  border-radius: 15px;
  background-color: var(--capsule-bg);
  padding-left: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
  box-sizing: border-box;
}

.capsule--active {
  background: var(--capsule-active-bg);
  border: 1px solid var(--capsule-active-border-color);
}
</style>
