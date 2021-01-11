<template>
  <div class="t-navbar-base-demo">
    <t-cell-group title="基础">
      <t-cell >
        <t-navbar>
          Navbar 导航条
        </t-navbar>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="左侧关闭icon">
      <t-cell >
        <t-navbar>
          <template #left>
            <t-icon name="close" @click="onClickLeft"></t-icon>
          </template>
        </t-navbar>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="右侧icon">
      <t-cell >
        <t-navbar>
          <template #right>
            <t-icon name="circle"></t-icon>
          </template>
        </t-navbar>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="事件反馈">
      <t-cell >
        <t-navbar
          @on-click-right="onClickMore">
          <template #left>
            <t-icon name="close" @click="onClickLeft"></t-icon>
          </template>
        </t-navbar>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import Toast from '../../toast/index';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
  methods: {
    onClickMore() {
      Toast('Click More');
      console.log('on click more');
    },
    onClickLeft() {
      Toast('Click close');
      console.log('on click left');
    },
  },
});
</script>
