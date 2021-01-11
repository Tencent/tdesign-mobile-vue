<template>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item
        v-model="treeValue1"
        title="单选树形菜单"
        :options="optionsT"
        options-layout="tree"
      />
      <t-dropdown-item
        v-model="treeValue2"
        title="多选树形菜单"
        :options="optionsT2"
        options-layout="tree"
        select-mode="multi"
      />
    </t-dropdown-menu>
    <p>
      单选树形菜单 选中路径:
      <strong>{{JSON.stringify(treeValue1)}}</strong>
    </p>
    <p>
      多选树形菜单 选中路径:
      <strong>{{JSON.stringify(treeValue2)}}</strong>
    </p>
  </demo-container>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import DemoContainer from './demo-container.vue';

export default defineComponent({
  components: {
    DemoContainer,
  },
  setup() {
    const tree = [{
      title: '北京市',
      value: 'beijing',
      options: [{
        title: '北京市',
        value: 'beijing',
        options: [
          { title: '东城区', value: 'dongcheng' },
          { title: '西城区', value: 'xicheng' },
          { title: '朝阳区', value: 'chaoyang' },
          { title: '丰台区', value: 'fengtai' },
          { title: '石景山区', value: 'shijingshan' },
          { title: '海淀区', value: 'haidian' },
          { title: '门头沟区', value: 'mentougou' },
          { title: '房山区', value: 'fangshan' },
          { title: '通州区', value: 'tongzhou' },
          { title: '顺义区', value: 'shunyi' },
        ],
      }],
    }, {
      title: '天津市',
      value: 'tianjin',
      options: [{
        title: '天津市',
        value: 'tianjin',
        options: [
          { title: '和平区', value: 'heping' },
          { title: '河东区', value: 'hedong' },
          { title: '河西区', value: 'hexi' },
        ],
      }],
    }, {
      title: '河北省',
      value: 'hebei',
      options: [
        {
          title: '石家庄市',
          value: 'shijiazhuang',
          options: [
            { title: '长安区', value: 'changan' },
            { title: '桥西区', value: 'qiaoxi' },
            { title: '新华区', value: 'xinhua' },
            { title: '井陉矿区', value: 'jingjingkuang' },
            { title: '裕华区', value: 'yuhua' },
            { title: '藁城区', value: 'gaocheng' },
          ],
        },
        {
          title: '唐山市',
          value: 'tangshan',
          options: [
            { title: '曹妃甸区', value: 'caofeidian' },
            { title: '丰南区', value: 'fengnan' },
            { title: '丰润区', value: 'fengrun' },
            { title: '古冶区', value: 'guye' },
            { title: '开平区', value: 'kaiping' },
            { title: '乐亭区', value: 'laoting' },
          ],
        },
      ],
    }];
    const optionsT = ref(tree);
    const optionsT2 = ref(JSON.parse(JSON.stringify(tree)));
    const treeValue1 = ref(null);
    const treeValue2 = ref(['tianjin', 'tianjin', ['hedong', 'hexi']]);
    return {
      name,
      optionsT,
      optionsT2,
      treeValue1,
      treeValue2,
    };
  },
});
</script>
