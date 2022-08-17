<template>
  <div class="tdesign-mobile-demo">
    <div class="list-demo">
      <div v-if="currentTab === 'info'">
        <h1 class="title">List 列表</h1>
        <p class="summary">
          瀑布流滚动加载，用于展示同一类型信息的长列表。当列表即将滚动到底部时，会触发事件并加载更多列表项。
        </p>
        <tdesign-demo-block title="01 类型" summary="基础列表">
          <t-button size="large" variant="outline" @click="onChangeTab('base')"> 基础列表 </t-button>
          <t-button size="large" variant="outline" @click="onChangeTab('pull-refresh')"> 下拉刷新 </t-button>
          <t-button size="large" variant="outline" @click="onChangeTab('error-tip')"> 错误提示 </t-button>
        </tdesign-demo-block>
      </div>
      <div v-if="currentTab === 'base'">
        <t-list :async-loading="loading" @scroll="(value) => onScroll(value)">
          <t-cell v-for="item in list" :key="item" align="middle">
            <span class="cell">{{ item }}</span>
          </t-cell>
        </t-list>
      </div>
      <div v-if="currentTab === 'error-tip'">
        <t-list :async-loading="errloading" @scroll="onLoadMore">
          <t-cell v-for="item in listError" :key="item" align="middle">
            <span class="cell">{{ item }}</span>
          </t-cell>
          <template #footer>
            <t-loading v-if="showError" :indicator="false" @click.stop="onLoadMore">
              <div class="custom-error">请求失败，点击重新<span>加载</span></div>
            </t-loading>
          </template>
        </t-list>
      </div>
      <div v-if="currentTab === 'pull-refresh'">
        <div class="pull-refresh-wrap">
          <t-pull-down-refresh v-model="refreshing" @refresh="onRefresh">
            <t-list :async-loading="pullloading" @scroll="(value) => onScroll(value, 'listPull')">
              <t-cell v-for="item in listPull" :key="item" align="middle">
                <span class="cell">{{ item }}</span>
              </t-cell>
            </t-list>
          </t-pull-down-refresh>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, h, onUnmounted } from 'vue';

const MAX_DATA_LEN = 60;

const loadData = (data: any, isRefresh?: Boolean) => {
  const ONCE_LOAD_NUM = 15;

  return new Promise((resolve) => {
    setTimeout(() => {
      const temp = [];
      for (let i = 0; i < ONCE_LOAD_NUM; i++) {
        if (isRefresh) {
          temp.push(`${i + 1}`);
        } else {
          temp.push(`${data.value.length + 1 + i}`);
        }
      }

      if (isRefresh) {
        data.value = temp;
      } else {
        data.value.push(...temp);
      }

      resolve(data);
    }, 1000);
  });
};

export default defineComponent({
  setup(props, { emit }) {
    const currentTab = ref('info');
    const list = ref([] as Array<any>);
    const listPull = ref([] as Array<any>);
    const listError = ref([] as Array<any>);

    const loading = ref('');
    const errloading = ref('');
    const pullloading = ref('');
    const refreshing = ref(false);
    const showError = ref(false);

    const onLoad = (isRefresh?: Boolean) => {
      if ((list.value.length >= MAX_DATA_LEN && !isRefresh) || loading.value) {
        return;
      }
      loading.value = 'loading';
      loadData(list, isRefresh).then(() => {
        loading.value = '';
        refreshing.value = false;
      });
    };

    const onLoadPull = (isRefresh?: Boolean) => {
      if ((listPull.value.length >= MAX_DATA_LEN && !isRefresh) || pullloading.value) {
        return;
      }
      pullloading.value = 'loading';
      loadData(listPull, isRefresh).then(() => {
        pullloading.value = '';
        refreshing.value = false;
      });
    };

    const onLoadError = () => {
      errloading.value = 'loading';

      setTimeout(() => {
        for (let i = 0; i < 8; i++) {
          listError.value.push(`${listError.value.length + 1}`);
        }
        showError.value = true;
        errloading.value = '';
      }, 1000);
    };

    const onScroll = (scrollBottom: number, type?: string) => {
      if (scrollBottom === 0) {
        type === 'listPull' ? onLoadPull() : onLoad();
      }
    };

    onMounted(() => {
      onLoad();
      window.onpopstate = function (event) {
        currentTab.value = 'info';
      };
    });

    onUnmounted(() => {
      window.onpopstate = null;
    });

    const onChangeTab = (val: any) => {
      list.value = [];
      listError.value = [];
      showError.value = false;

      if (val === 'base') {
        onLoad();
      } else if (val === 'error-tip') {
        onLoadError();
      } else if (val === 'pull-refresh') {
        onLoadPull();
      }
      currentTab.value = val;
      history.pushState({}, '', '?tab=demo');
    };

    const onLoadMore = () => {
      showError.value = false;
      if (listError.value.length >= 60 || errloading.value) {
        return;
      }

      errloading.value = 'loading';

      setTimeout(() => {
        for (let i = 0; i < 15; i++) {
          listError.value.push(`${listError.value.length + 1}`);
        }
        errloading.value = '';
      }, 1000);
    };

    const loadingPullData = computed(() => Boolean(pullloading.value));

    const onRefresh = () => {
      refreshing.value = true;
      onLoadPull(true);
    };

    return {
      list,
      listError,
      listPull,
      refreshing,
      onLoad,
      onScroll,
      onChangeTab,
      loading,
      pullloading,
      errloading,
      loadingPullData,
      showError,
      onLoadMore,
      onRefresh,
      currentTab,
    };
  },
  data() {
    return {};
  },
});
</script>

<style lang="less">
.list-demo {
  .t-list {
    .cell {
      width: 100%;
      text-align: center;
    }
    .error {
      text-align: center;
      color: #969799;
      font-size: 14px;
      margin-top: 8px;
    }
  }
  .custom-error {
    font-size: 14px;
    color: #969799;
    text-align: center;
    padding-top: 16px;
    cursor: default;

    span {
      color: #0052d9;
      cursor: pointer;
    }
  }
  .t-button {
    background: #ffffff;
    margin: 0 16px 16px 16px;
    width: calc(100% - 32px);
  }
}
</style>
