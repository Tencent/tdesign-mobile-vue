<template>
  <div class="tag-base tdesign-demo-tag">
    <t-cell-group title="展示型标签">
      <t-cell value-align="left">
        <t-tag theme="default">默认</t-tag>
        <t-tag theme="primary">重要</t-tag>
        <t-tag theme="danger">危险</t-tag>
        <t-tag theme="warning">警告</t-tag>
        <t-tag theme="success">成功</t-tag>
        <t-tag theme="info">信息</t-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group>
      <t-cell value-align="left">
        <t-tag theme="primary" effect="dark">深色</t-tag>
        <t-tag theme="primary" effect="light">浅色</t-tag>
        <t-tag theme="primary" effect="plain">朴素</t-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group>
      <t-cell value-align="left">
        <t-tag size="large" theme="primary">大号</t-tag>
        <t-tag size="medium" theme="primary">中号</t-tag>
        <t-tag size="small" theme="primary">小号</t-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group>
      <t-cell value-align="left">
        <t-tag size="large" theme="primary" shape="circle">圆角</t-tag>
        <t-tag size="medium" theme="primary" shape="circle">圆角</t-tag>
        <t-tag size="small" theme="primary" shape="circle">圆角</t-tag>
      </t-cell>
    </t-cell-group>
    <!-- <t-cell-group>
      <t-cell>
        <t-tag size="large" theme="primary" shape="square">大圆角</t-tag>
        <t-tag size="medium" theme="primary" shape="round">大圆角</t-tag>
        <t-tag size="small" theme="primary" shape="mark">大圆角</t-tag>
      </t-cell>
    </t-cell-group> -->
    <t-cell-group title="点击型标签">
      <t-cell value-align="left">
        <t-check-tag
          v-for="(fruit, index) in fruits"
          :key="fruit.name"
          size="large"
          :checked="fruit.checked"
          :disabled="fruit.disabled"
          @click="onClickFruit(index)"
        >{{fruit.name}}</t-check-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group>
      <t-cell value-align="left">
        <t-check-tag
          v-for="(fruit, index) in fruits2"
          :key="fruit.name"
          :checked="fruit.checked"
          :disabled="fruit.disabled"
          @click="onClickFruit2(index)"
        >{{fruit.name}}</t-check-tag>
      </t-cell>
    </t-cell-group>
    <t-cell-group>
      <t-cell value-align="left">
        <t-tag
          v-for="(tag,index) in closableTags"
          :key="tag"
          closable
          :disabled="tag.disabled"
          theme="primary"
          :size="tag.size"
          @close="onClickClose(index)"
        >{{tag.name}}</t-tag>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-tag-base-demo`;

export default defineComponent({
  name,
  setup() {
    const fruits = ref([
      {
        name: '苹果',
        checked: true,
      },
      {
        name: '香蕉',
        checked: false,
      },
      {
        name: '桃子',
        checked: false,
      },
      {
        name: '火龙果',
        checked: false,
        disabled: true,
      },
    ]);

    const fruits2 = ref([
      {
        name: '苹果',
        checked: true,
      },
      {
        name: '香蕉',
        checked: false,
      },
      {
        name: '桃子',
        checked: false,
      },
      {
        name: '火龙果',
        checked: false,
        disabled: true,
      },
    ]);

    const closableTags = ref([
      {
        name: '可关闭',
        size: 'large',
      },
      {
        name: '可关闭',
      },
      {
        name: '可关闭',
        size: 'small',
      },
      {
        name: '失效标签',
        size: 'small',
        disabled: true,
      },
    ]);

    function onClickClose(index: number) {
      closableTags.value.splice(index, 1);
    }

    function onClickFruit(index: number) {
      fruits.value[index].checked = !fruits.value[index].checked;
    }

    function onClickFruit2(index: number) {
      fruits2.value[index].checked = !fruits2.value[index].checked;
    }

    return {
      fruits,
      fruits2,
      closableTags,
      onClickFruit,
      onClickFruit2,
      onClickClose,
    };
  },
});
</script>
<style lang="less" >
.tag-base {
  background: #fbfbfb;
  .t-tag + .t-tag {
    margin-left: 8px;
  }
  .intro {
    font-size: 14px;
    color: #555;
  }
  .t-cell--value {
    text-align: left;
  }
}
</style>
