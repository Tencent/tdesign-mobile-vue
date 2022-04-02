<template>
  <div class="tdesign-mobile-demo">
    <!-- <h1 class="title">PullDownRefresh 下拉刷新</h1>
    <p class="summary">用于快速刷新页面信息，刷新可以是整页刷新也可以是页面的局部刷新。</p>
    <p class="blank"></p> -->
    <tdesign-demo-block title="" summary="">
      <t-tabs default-value="first" @on-change="onChange">
        <t-tab-panel value="first" label="基础用法">
          <div class="refresh-content">
            <t-pull-down-refresh
              :value="refreshing1"
              class="demo-pull-down-refresh"
              @refresh="handleRefresh(1)"
              @change="handleChangeRefreshing1"
              ><div class="content-text">已下拉{{ refreshCount1 }}次</div></t-pull-down-refresh
            >
          </div>
        </t-tab-panel>
        <t-tab-panel value="second" label="自定义文案">
          <div class="refresh-content">
            <t-pull-down-refresh
              :value="refreshing2"
              :on-change="handleChangeRefreshing2"
              class="demo-pull-down-refresh"
              :loading-texts="['下拉即可刷新...', '释放即可刷新...', '加载中...', '刷新成功']"
              @refresh="handleRefresh(2)"
            >
              <div class="content-text">已下拉{{ refreshCount2 }}次</div></t-pull-down-refresh
            >
          </div>
        </t-tab-panel>
        <t-tab-panel value="third" label="超时事件">
          <div class="refresh-content">
            <t-pull-down-refresh
              v-model="refreshing3"
              class="demo-pull-down-refresh"
              :loading-texts="['下拉即可刷新...', '释放即可刷新...', '加载中...', '刷新成功']"
              :refresh-timeout="2000"
              @refresh="handleRefresh(3)"
              @timeout="handleTimeout"
              ><div class="content-text">已下拉{{ refreshCount3 }}次</div></t-pull-down-refresh
            >
          </div>
        </t-tab-panel>
      </t-tabs>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue';
import { Toast } from '@/components';

export default defineComponent({
  setup(props, context) {
    const refreshing1 = ref(false);
    const refreshCount1 = ref(0);
    const refreshing2 = ref(false);
    const refreshCount2 = ref(0);
    const refreshing3 = ref(false);
    const refreshCount3 = ref(0);
    const handleRefresh = (value: any) => {
      if (value === 1) {
        setTimeout(() => {
          handleChangeRefreshing1(false);
          refreshCount1.value = 1 + refreshCount1.value;
        }, 1000);
      } else if (value === 2) {
        setTimeout(() => {
          handleChangeRefreshing2(false);
          refreshCount2.value = 1 + refreshCount2.value;
        }, 1000);
      } else {
        setTimeout(() => {
          refreshing3.value = false;
          refreshCount3.value = 1 + refreshCount3.value;
        }, 3000);
      }
    };
    const handleTimeout = () => {
      Toast('已超时');
      refreshCount3.value = 1 + refreshCount3.value;
    };
    const handleChangeRefreshing1 = (value: boolean) => {
      refreshing1.value = value;
    };
    const handleChangeRefreshing2 = (value: boolean) => {
      refreshing2.value = value;
    };
    const handleChangeRefreshing3 = (value: boolean) => {
      refreshing3.value = value;
    };
    return {
      refreshing1,
      refreshing2,
      refreshing3,
      refreshCount1,
      refreshCount2,
      refreshCount3,
      handleRefresh,
      handleTimeout,
      handleChangeRefreshing1,
      handleChangeRefreshing2,
      handleChangeRefreshing3,
    };
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
.blank {
  height: 30px;
}
.demo-pull-down-refresh {
  height: calc(100vh - 95px);
}
.refresh-content {
  padding: 0 16px;
  .content-text {
    padding: 20px 0;
  }
}
</style>
