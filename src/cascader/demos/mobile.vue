<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Cascader 级联选择器</h1>
    <p class="summary">用于多层级数据选择，主要为树形结构，可展示更多的数据</p>
    <tdesign-demo-block title="01 基本用法" summary="基本用法">
      <t-input :value="address.address1" label="地址" placeholder="选择地址" readonly @click="show.show1 = true" />
      <t-popup v-model="show.show1" placement="bottom">
        <t-cascader
          v-model="address.address1"
          title="选择地址"
          :options="options"
          @change="onChange"
          @cancel="show.show1 = false"
          @confirm="onConfirm"
        />
      </t-popup>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 关闭icon" summary="可自定义的icon">
      <t-input :value="address.address2" label="地址" placeholder="选择地址" readonly @click="show.show2 = true" />
      <t-popup v-model="show.show2" placement="bottom">
        <t-cascader
          v-model="address.address2"
          title="自定义的关闭icon"
          :options="options"
          @change="onChange"
          @cancel="show.show2 = false"
          @confirm="onConfirm"
        >
          <template #closeIcon>
            <check-icon />
          </template>
        </t-cascader>
      </t-popup>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 标题" summary="可自定义的标题">
      <t-input :value="address.address3" label="地址" placeholder="选择地址" readonly @click="show.show3 = true" />
      <t-popup v-model="show.show3" placement="bottom">
        <t-cascader
          v-model="address.address3"
          :options="options"
          @change="onChange"
          @cancel="show.show3 = false"
          @confirm="onConfirm"
        >
          <template #title> <check-icon />一个自定义的title </template>
        </t-cascader>
      </t-popup>
    </tdesign-demo-block>
    <tdesign-demo-block title="04 禁用选项" summary="禁用可选项">
      <t-input :value="address.address4" label="地址" placeholder="选择地址" readonly @click="show.show4 = true" />
      <t-popup v-model="show.show4" placement="bottom">
        <t-cascader
          v-model="address.address4"
          :options="provinces"
          @change="onChange"
          @cancel="show.show4 = false"
          @confirm="onConfirm"
        >
        </t-cascader>
      </t-popup>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { CheckIcon } from 'tdesign-icons-vue-next';
import { TdCascaderItems } from '../type';

const citys: TdCascaderItems = [
  {
    label: '上海市',
    value: '上海市',
    children: [
      {
        label: '普陀区',
        value: '普陀区',
      },
      {
        label: '长宁区',
        value: '长宁区',
      },
    ],
  },
  {
    label: '北京市',
    value: '北京市',
    children: [
      {
        label: '朝阳区',
        value: '朝阳区',
      },
      {
        label: '丰台区',
        value: '丰台区',
      },
    ],
  },
];

const provinces: TdCascaderItems = [
  {
    label: '浙江省',
    value: '浙江省',
    disabled: true,
  },
  {
    label: '江苏省',
    value: '江苏省',
  },
];

export default defineComponent({
  components: { CheckIcon },
  setup() {
    const show = reactive({
      show1: false,
      show2: false,
      show3: false,
      show4: false,
    });

    const address = reactive({
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
    });

    const onChange = (value: TdCascaderItems) => {
      console.log(value);
      show.show1 = false;
      show.show2 = false;
      show.show3 = false;
      show.show4 = false;
    };

    const onConfirm = () => {
      console.log('confirm');
    };

    return {
      onChange,
      onConfirm,
      show,
      address,
      options: ref(citys),
      provinces: ref(provinces),
    };
  },
});
</script>
