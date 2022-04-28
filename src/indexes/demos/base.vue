<template>
  <div class="component-wrap">
    <t-indexes :list="state.letter" @select="onSelect"> </t-indexes>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Toast } from 'tdesign-mobile-vue';

export default defineComponent({
  setup() {
    const state = reactive({
      letter: [
        {
          title: 'A开头',
          index: 'A',
          children: [
            { title: '阿坝' },
            { title: '阿拉善' },
            { title: '阿里' },
            { title: '安康' },
            { title: '安庆' },
            { title: '鞍山' },
            { title: '安顺' },
            { title: '安阳' },
            { title: '澳门' },
          ],
        },
        {
          title: 'B开头',
          index: 'B',
          children: [
            { title: '北京' },
            { title: '白银' },
            { title: '保定' },
            { title: '宝鸡' },
            { title: '保山' },
            { title: '包头' },
            { title: '巴中' },
            { title: '北海' },
            { title: '蚌埠' },
            { title: '本溪' },
            { title: '毕节' },
            { title: '滨州' },
            { title: '百色' },
            { title: '亳州' },
          ],
        },
      ],
    });

    const onSelect = (indexes: { groupIndex: string; childrenIndex: number }) => {
      Toast(indexes);
    };

    return {
      state,
      onSelect,
    };
  },
});
</script>
<style lang="less">
.component-wrap {
  height: calc(100vh - 50px);
}
</style>
