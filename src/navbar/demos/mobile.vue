<template>
  <div class="t-navbar-base-demo">
    <p class="divide-line"></p>
    <t-navbar :right-show="false">界面标题</t-navbar>
    <p class="divide-line"></p>
    <t-navbar :right-show="false">
      <template #left>
        <t-icon size="24px" name="close" />
      </template>
      界面标题
      <template #right>
        <t-icon size="24px" name="app" />
      </template>
    </t-navbar>
    <p class="divide-line"></p>
    <t-navbar>
      界面标题
      <template #right>
        <t-icon size="24px" name="app" />
      </template>
    </t-navbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import Toast from '../../toast/index';

export default defineComponent({
  components: { TIcon },
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

<style lang="less" scoped>
.divide-line {
  width: 100%;
  height: 24px;
  background: #f9f9f9;
}
</style>
