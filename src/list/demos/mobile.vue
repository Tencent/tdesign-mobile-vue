<template>
  <div class="tdesign-mobile-demo">
    <div class="list-demo">
      <t-tabs default-value="base" @on-change="onChangeTab">
        <t-tab-panel value="base" label="基础列表">
          <t-list :async-loading="loading" @scroll="(e) => onScroll(e, 0)">
            <t-cell v-for="item in list" :key="item" align="middle">
              <span class="cell">{{ item }}</span>
            </t-cell>
          </t-list>
        </t-tab-panel>
        <t-tab-panel value="error-tip" label="错误提示">
          <t-list :async-loading="errloading" @scroll="onLoadMore">
            <t-cell v-for="item in listError" :key="item" align="middle">
              <span class="cell">{{ item }}</span>
            </t-cell>
            <template #footer>
              <div v-if="showError" class="error" @click.stop="onLoadMore">请求失败，点击重新加载</div>
            </template>
          </t-list>
        </t-tab-panel>
        <t-tab-panel value="pull-refresh" label="下拉刷新">
          <div class="pull-refresh-wrap">
            <t-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <t-list :async-loading="pullloading" @scroll="(e) => onScroll(e, 2)">
                <t-cell v-for="item in listPull" :key="item" align="middle">
                  <span class="cell">{{ item }}</span>
                </t-cell>
              </t-list>
            </t-pull-refresh>
          </div>
        </t-tab-panel>
      </t-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, h } from 'vue';

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

    const onScroll = ({ scrollBottom }: { scrollBottom: number }, type: number) => {
      if (scrollBottom === 0) {
        if (type === 0) {
          onLoad();
        } else if (type === 2) {
          onLoadPull();
        }
      }
    };

    onMounted(() => {
      onLoad();
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
    height: 567px;
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
}
</style>
