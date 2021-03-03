<template>
  <div class="dropdown-menu-wrap">
    <t-cell-group title="下拉菜单样式" >
      <t-cell>
        <t-dropdown-menu>
          <t-dropdown-item v-model="valueS" title="菜单名称" :options="optionsN" />
          <t-dropdown-item v-model="valueS" title="菜单名称" :options="optionsC" />
        </t-dropdown-menu>
      </t-cell>
      <t-cell>
        <t-dropdown-menu>
          <t-dropdown-item v-model="valueS" disabled title="菜单名称" :options="optionsN" />
          <t-dropdown-item v-model="valueS" disabled title="菜单名称" :options="optionsC" />
        </t-dropdown-menu>
      </t-cell>
      <t-cell>
        <t-dropdown-menu>
          <t-dropdown-item
            v-model="valueM"
            title="单列"
            :options="optionsN"
            select-mode="multi"
            options-columns="1"
          />
          <t-dropdown-item
            v-model="valueM1"
            title="双列"
            :options="optionsN"
            select-mode="multi"
            options-layout="columns"
            options-columns="2"
          />
          <t-dropdown-item
            v-model="valueM2"
            title="三列"
            :options="optionsC"
            select-mode="multi"
            options-layout="columns"
            options-columns="3"
          />
        </t-dropdown-menu>
        <p>
          单列菜单 选中项:
          <strong>{{valueM1.join(', ')}}</strong>
        </p>
        <p>
          两栏菜单 选中项:
          <strong>{{valueM1.join(', ')}}</strong>
        </p>
        <p>
          三栏菜单 选中项:
          <strong>{{valueM2.join(', ')}}</strong>
        </p>
      </demo-container>
    </t-cell>
  </t-cell-group>
  <t-cell-group title="树形下拉">
    <t-cell value-align="left">
      <demo-container>
        <t-dropdown-menu>
          <t-dropdown-item
            v-model="treeValue1"
            title="单选树形菜单"
            :options="optionsT"
            options-layout="tree"
            disabled
          />
          <t-dropdown-item
            v-model="treeValue2"
            title="多选树形菜单"
            :options="optionsT2"
            options-layout="tree"
            select-mode="multi"
            disabled
          />
        </t-dropdown-menu>
      </t-cell>
    </t-cell-group>
  </div>


</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import DemoContainer from './demo-container.vue';

export default defineComponent({
  components: {
    DemoContainer,
  },
  setup() {
    const emptyArr = new Array(20).fill(null);
    const numberArr = emptyArr.map((_, i) => ({
      title: `选项 ${i + 1}`,
      value: `option_${i + 1}`,
    }));
    const charArr = emptyArr.map((_, i) => {
      const char = String.fromCharCode(65 + i);
      return {
        title: `选项 ${char}`,
        value: `options_${char}`,
      };
    });
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
    const optionsN = ref(numberArr);
    const optionsC = ref(charArr);
    const valueS = ref('option_2');
    const valueM = ref(['options_A', 'options_C']);
    const valueM1 = ref(['options_A', 'options_C']);
    const valueM2 = ref(['options_A', 'options_C']);

    return {
      name,
      optionsN,
      optionsC,
      valueS,
      valueM,
      valueM1,
      valueM2,
      optionsT,
      optionsT2,
      treeValue1,
      treeValue2
    };
  },
});
</script>

<style lang="less" scoped>
  .dropdown-menu-wrap{
    background: #f5f5f5;
    .t-cell{
      padding: 0;

      // background: #f5f5f5;
      &:not(:last-child){
        margin-bottom: 16px;
        &::after{
          display: none;
        }
      }

    }
  }
</style>
