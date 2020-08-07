<template>
  <div :class="`${name}`">
    <t-cell-group title="单选/多选下拉菜单">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item title="单选菜单" :options="options1N" v-model="value1S" />
          <t-dropdown-item title="多选菜单" :options="options1C" selectMode="multi" v-model="value1M" />
        </t-dropdown-menu>
        <p>
          目前暂时无法快速修改所有子组件的主色调样式（标题小箭头、按键、内部图标），所以暂时不提供
          <strong>active-color</strong> 属性来修改选中颜色。
        </p>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="分栏多选菜单/自定义内容">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item
            title="两栏菜单"
            :options="options2N"
            selectMode="multi"
            optionsLayout="columns"
            optionsColumns="2"
            @open="log('[menu open] menu item 2N')"
            @opened="log('[menu opened] menu item 2N')"
            @close="log('[menu close] menu item 2N')"
            @closed="log('[menu closed] menu item 2N')"
          />
          <t-dropdown-item
            title="三栏菜单"
            :options="options2C"
            selectMode="multi"
            optionsLayout="columns"
            optionsColumns="3"
            @open="log('[menu open] menu item 2C')"
            @opened="log('[menu opened] menu item 2C')"
            @close="log('[menu close] menu item 2C')"
            @closed="log('[menu closed] menu item 2C')"
          />
          <t-dropdown-item title="自定义内容">
            <t-cell-group>
              <t-cell label="开关 1">
                <t-switch text="描述信息"></t-switch>
              </t-cell>
              <t-cell label="开关 2">
                <t-switch text="描述信息"></t-switch>
              </t-cell>
              <t-cell label="开关 3">
                <t-switch disabled text="描述信息"></t-switch>
              </t-cell>
            </t-cell-group>
          </t-dropdown-item>
        </t-dropdown-menu>
        <p>
          同时指定了
          <strong>options</strong> 属性和内部自定义内容时，将优先展示自定义内容。
        </p>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="树形单选/多选菜单">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item
            title="树形单选"
            :options="options3T"
            optionsLayout="tree"
            @change="log('[value change] tree - single select:', $event)"
          />
          <t-dropdown-item
            title="树形多选"
            :options="options3T2"
            optionsLayout="tree"
            selectMode="multi"
            v-model="treeValue"
            @change="log('[value change] tree - multi select:', $event)"
          />
        </t-dropdown-menu>
        <p>
          <strong>注意：树形数据的所有分支深度必须一致。</strong>
        </p>
        <p>
          否则，多选模式中某一分支内可能同时包含叶子节点和子菜单节点。
          <br />导致菜单内需要混合
          <strong>radio</strong> 和
          <strong>check-box</strong> 组件，无法通过
          <strong>radio-group</strong> 和
          <strong>check-group</strong> 实现这一层级的选单。
        </p>
        <div></div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="禁用选项">
      <t-cell value-align="left">
        <t-dropdown-menu>
          <t-dropdown-item title="单选菜单" disabled />
          <t-dropdown-item title="多选菜单" disabled selectMode="multi" />
        </t-dropdown-menu>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';

import config from '../../config';
const { prefix } = config;
const name = `${prefix}-dropdown-menu-demo`;

export default defineComponent({
  name,
  setup() {
    const emptyArr = new Array(20).fill(null);
    const numberArr = emptyArr.map((_, i) => ({
      title: `选项 ${i + 1}`,
      value: `option_${i + 1}`,
      disabled: (i - 2) % 4 === 0,
    }));
    const charArr = emptyArr.map((_, i) => {
      const char = String.fromCharCode(65 + i);
      return {
        title: `选项 ${char}`,
        value: `options_${char}`,
        disabled: (i - 1) % 5 === 0,
      };
    });
    const tree = [{
      title: '北京市',
      value: 'beijing',
      options: [{
        title: '北京市',
        value: 'beijing',
        options: [
          {
            title: '东城区',
            value: 'dongcheng',
          },
          {
            title: '西城区',
            value: 'xicheng',
          },
          {
            title: '朝阳区',
            value: 'chaoyang',
          },
          {
            title: '丰台区',
            value: 'fengtai',
          },
          {
            title: '石景山区',
            value: 'shijingshan',
          },
          {
            title: '海淀区',
            value: 'haidian',
          },
          {
            title: '门头沟区',
            value: 'mentougou',
          },
          {
            title: '房山区',
            value: 'fangshan',
          },
          {
            title: '通州区',
            value: 'tongzhou',
          },
          {
            title: '顺义区',
            value: 'shunyi',
          },
        ],
      }],
    }, {
      title: '天津市',
      value: 'tianjin',
      options: [{
        title: '天津市',
        value: 'tianjin',
        options: [
          {
            title: '和平区',
            value: 'heping',
          },
          {
            title: '河东区',
            value: 'hedong',
          },
          {
            title: '河西区',
            value: 'hexi',
          },
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
            {
              title: '长安区',
              value: 'changan',
            },
            {
              title: '桥西区',
              value: 'qiaoxi',
            },
            {
              title: '新华区',
              value: 'xinhua',
            },
            {
              title: '井陉矿区',
              value: 'jingjingkuang',
            },
            {
              title: '裕华区',
              value: 'yuhua',
            },
            {
              title: '藁城区',
              value: 'gaocheng',
            },
          ],
        },
        {
          title: '唐山市',
          value: 'tangshan',
          options: [
            {
              title: '曹妃甸区',
              value: 'caofeidian',
            },
            {
              title: '丰南区',
              value: 'fengnan',
            },
            {
              title: '丰润区',
              value: 'fengrun',
            },
            {
              title: '古冶区',
              value: 'guye',
            },
            {
              title: '开平区',
              value: 'kaiping',
            },
            {
              title: '乐亭区',
              value: 'laoting',
            },
          ],
        },
      ],
    }];
    const options1N = ref(numberArr);
    const options1C = ref(charArr);
    const options2N = ref(numberArr);
    const options2C = ref(charArr);
    const options3T = ref(tree);
    const options3T2 = ref(JSON.parse(JSON.stringify(tree)));
    const value1S = ref('option_2');
    const value1M = ref(['options_A', 'options_C']);
    const treeValue = ref(['tianjin', 'tianjin', ['hedong', 'hexi']]);
    watch(() => value1S.value, (val: any) => {
      console.log('单选菜单 选中项:', val);
    });
    watch(() => value1M.value, (val: any) => {
      console.log('多选菜单 选中项:', val);
    });
    return {
      name,
      log: (...args: []) => {
        console.log(...args);
      },
      options1N,
      options1C,
      options2N,
      options2C,
      options3T,
      options3T2,
      value1S,
      value1M,
      treeValue,
    };
  },
});
</script>
<style lang="less" scoped>
.t-dropdown-menu-demo {
  position: relative;
  background: #fff;
  transform: translate(0, 0);
}
p {
  font-size: 14px;
  line-height: 1.4;
  margin: 1em .5em;
}
</style>
