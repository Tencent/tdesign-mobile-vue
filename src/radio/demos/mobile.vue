<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Radio 单选框</h1>
    <p class="summary">用于在预设的一组选项中执行单项选择，并呈现选择结果。</p>
    <tdesign-demo-block title="01 类型" summary="左侧圆形单选框">
      <t-radio-group v-model="radio">
        <t-cell-group>
          <t-cell title="单选">
            <template #leftIcon>
              <t-radio name="radio1" value="1" :on-change="onChangeFn"></t-radio>
            </template>
          </t-cell>
          <t-cell title="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选">
            <template #leftIcon>
              <t-radio name="radio1" value="2" :on-change="onChangeFn"></t-radio>
            </template>
          </t-cell>
          <t-cell title="单选">
            <template #leftIcon>
              <t-radio name="radio1" value="3" @change="onChangeFn"></t-radio>
            </template>
            <template #description>
              <span>单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选</span>
            </template>
          </t-cell>
        </t-cell-group>
      </t-radio-group>
    </tdesign-demo-block>

    <tdesign-demo-block summary="右侧圆形单选框">
      <t-cell-group>
        <t-cell>
          <template #rightIcon>
            <t-radio :checked="radio2" value="1"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
        <t-cell>
          <template #rightIcon>
            <t-radio :default-checked="true" value="2"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
        <t-cell>
          <template #rightIcon>
            <t-radio value="3"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
      </t-cell-group>
    </tdesign-demo-block>

    <tdesign-demo-block summary="左侧勾形单选框">
      <t-radio-group v-model="radio3">
        <t-cell-group>
          <t-cell>
            <template #leftIcon>
              <t-radio name="radio3" value="1" icon="stroke-line"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
          </t-cell>
          <t-cell>
            <template #leftIcon>
              <t-radio name="radio3" value="2" icon="stroke-line"></t-radio>
            </template>
            <template #title>
              <span>单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选</span>
            </template>
          </t-cell>
          <t-cell>
            <template #leftIcon>
              <t-radio name="radio3" value="3" icon="stroke-line"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
            <template #description>
              <span>单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选</span>
            </template>
          </t-cell>
        </t-cell-group>
      </t-radio-group>
    </tdesign-demo-block>

    <tdesign-demo-block summary="右侧勾形单选框">
      <t-cell-group>
        <t-cell>
          <template #rightIcon>
            <t-radio name="radio4" value="1" icon="stroke-line"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
        <t-cell>
          <template #rightIcon>
            <t-radio checked name="radio4" value="2" icon="stroke-line"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
        <t-cell>
          <template #rightIcon>
            <t-radio name="radio4" value="3" icon="stroke-line"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
        <t-cell title="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选">
          <template #rightIcon>
            <t-radio name="radio4" value="4" icon="stroke-line"></t-radio>
          </template>
        </t-cell>
      </t-cell-group>
    </tdesign-demo-block>

    <tdesign-demo-block title="02 状态" summary="单选框禁用态">
      <t-radio-group v-model="radio4" disabled>
        <t-cell-group>
          <t-cell>
            <template #leftIcon>
              <t-radio name="radio5" value="1"></t-radio>
            </template>
            <template #title>
              <span style="color: rgba(0, 0, 0, 0.26)">单选</span>
            </template>
          </t-cell>
          <t-cell>
            <template #leftIcon>
              <t-radio name="radio5" value="2"></t-radio>
            </template>
            <template #title>
              <span style="color: rgba(0, 0, 0, 0.26)">单选</span>
            </template>
          </t-cell>
        </t-cell-group>
      </t-radio-group>
      <div style="margin-top: 10px">
        <t-radio-group v-model:value="radio5" disabled>
          <t-cell-group>
            <t-cell>
              <template #leftIcon>
                <t-radio name="radio6" value="1" icon="stroke-line"></t-radio>
              </template>
              <template #title>
                <span style="color: rgba(0, 0, 0, 0.26)">单选</span>
              </template>
            </t-cell>
            <t-cell>
              <template #leftIcon>
                <t-radio name="radio6" value="2" icon="stroke-line"></t-radio>
              </template>
              <template #title>
                <span style="color: rgba(0, 0, 0, 0.26)">单选</span>
              </template>
            </t-cell>
          </t-cell-group>
        </t-radio-group>
      </div>
      <div style="margin-top: 10px">
        <t-cell-group>
          <t-cell>
            <template #rightIcon>
              <t-radio name="radio7" value="1" disabled></t-radio>
            </template>
            <template #title>
              <span style="color: rgba(0, 0, 0, 0.26)">单选</span>
            </template>
          </t-cell>
          <t-cell>
            <template #rightIcon>
              <t-radio checked name="radio7" value="2" disabled></t-radio>
            </template>
            <template #title>
              <span style="color: rgba(0, 0, 0, 0.26)">单选</span>
            </template>
          </t-cell>
        </t-cell-group>
      </div>
      <div style="margin-top: 10px">
        <t-cell-group>
          <t-cell>
            <template #rightIcon>
              <t-radio checked name="radio8" value="1" disabled icon="stroke-line"></t-radio>
            </template>
            <template #title>
              <span style="color: rgba(0, 0, 0, 0.26)">单选</span>
            </template>
          </t-cell>
          <t-cell>
            <template #rightIcon>
              <t-radio name="radio8" value="2" disabled icon="stroke-line"></t-radio>
            </template>
            <template #title>
              <span style="color: rgba(0, 0, 0, 0.26)">单选</span>
            </template>
          </t-cell>
        </t-cell-group>
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="03 特殊类型" summary="自定义图标多选框">
      <t-radio-group v-model:value="radio6">
        <t-cell-group>
          <t-cell @click="radio6 = '1'">
            <template #leftIcon>
              <t-radio name="radio9" value="1" :icon="checkRectangle"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
          </t-cell>
          <t-cell @click="radio6 = '2'">
            <template #leftIcon>
              <t-radio name="radio9" value="2" :icon="checkRectangle"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
          </t-cell>
        </t-cell-group>
      </t-radio-group>
    </tdesign-demo-block>

    <tdesign-demo-block title="04 规格" summary="单选框尺寸规格">
      <t-cell>
        <template #leftIcon>
          <t-radio name="radio10" value="1"></t-radio>
        </template>
        <template #title>
          <span>单选 H48</span>
        </template>
      </t-cell>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, h } from 'vue';
import { CheckRectangleFilledIcon, CheckRectangleIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  setup() {
    const radio = ref('2');
    const radio2 = ref(true);
    const radio3 = ref('1');
    const radio4 = ref('1');
    const radio5 = ref('1');
    const radio6 = ref('1');
    const options = [
      {
        value: '1',
        label: '选项一',
      },
      {
        value: '2',
        label: '选项二',
      },
      {
        value: '3',
        label: '选项三',
      },
      {
        value: '4',
        label: () => '选项四',
      },
    ];

    const testChange = (name: string) => {
      console.log('testChange', name);
    };

    const onChangeFn = (checked: boolean, context: { e: Event }) => {
      console.log('checked', checked);
    };

    const TiconCheckRectangleFilled = h(CheckRectangleFilledIcon);
    const TiconCheckRectangle = h(CheckRectangleIcon);

    return {
      radio,
      radio2,
      radio3,
      radio4,
      radio5,
      radio6,
      testChange,
      checkRectangle: [TiconCheckRectangleFilled, TiconCheckRectangle],
      onChangeFn,
      options,
    };
  },
});
</script>
