<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Radio 单选框</h1>
    <p class="summary">描述文字</p>
    <tdesign-demo-block title="01 类型" summary="左侧圆形单选框">
      <t-radio-group v-model:value="radio" @change="testChange" defaultValue="1">
        <t-radio name="radio1" value="1" label="单选" :icon="circleFilledIcons" :onChange="onChangeFn"></t-radio>
        <t-radio name="radio1" value="2" label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" :icon="circleFilledIcons" :onChange="onChangeFn"></t-radio>
        <t-radio name="radio1" value="3" label="单选" content="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" :icon="circleFilledIcons" :onChange="onChangeFn"></t-radio>
      </t-radio-group>
    </tdesign-demo-block>

    <tdesign-demo-block summary="右侧圆形单选框">
      <t-radio-group v-model:value="radio" @change="testChange">
        <t-radio name="radio2" value="1" label="单选" :icon="circleFilledIcons" align="right"></t-radio>
        <t-radio name="radio2" value="2" label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" :icon="circleFilledIcons" align="right"></t-radio>
        <t-radio name="radio2" value="3" label="单选" content="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" :icon="circleFilledIcons" align="right"></t-radio>
      </t-radio-group>
    </tdesign-demo-block>

    <tdesign-demo-block summary="左侧勾形单选框">
      <t-radio-group v-model:value="radio">
        <t-radio name="radio3" value="1" label="单选" :icon="TIconChecks"></t-radio>
        <t-radio name="radio3" value="2" label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" :icon="TIconChecks"></t-radio>
        <t-radio name="radio3" value="3" label="单选" content="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" :icon="TIconChecks"></t-radio>
      </t-radio-group>
    </tdesign-demo-block>

    <tdesign-demo-block summary="右侧勾形单选框">
      <t-radio-group v-model:value="radio">
        <t-radio name="radio4" value="1" label="单选" :icon="TIconChecks"  align="right"></t-radio>
        <t-radio name="radio4" value="2" label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" :icon="TIconChecks"  align="right"></t-radio>
        <t-radio name="radio4" value="3" label="单选" content="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" :icon="TIconChecks"  align="right"></t-radio>
      </t-radio-group>
    </tdesign-demo-block>

    <tdesign-demo-block title="02 状态" summary="单选框禁用态">
      <t-radio-group v-model:value="radio">
        <t-radio name="radio5" value="1" label="单选" disabled :icon="circleFilledIcons"></t-radio>
        <t-radio name="radio5" value="2" label="单选" disabled :icon="circleFilledIcons"></t-radio>
      </t-radio-group>
      <div style="margin-top: 10px">
        <t-radio-group v-model:value="radio">
          <t-radio name="radio6" value="1" label="单选" disabled :icon="TIconChecks"></t-radio>
          <t-radio name="radio6" value="2" label="单选" disabled :icon="TIconChecks"></t-radio>
        </t-radio-group>
      </div>
      <div style="margin-top: 10px">
        <t-radio-group v-model:value="radio">
          <t-radio name="radio7" value="1" label="单选" disabled :icon="circleFilledIcons" align="right"></t-radio>
          <t-radio name="radio7" value="2" label="单选" disabled :icon="circleFilledIcons" align="right"></t-radio>
        </t-radio-group>
      </div>
      <div style="margin-top: 10px">
        <t-radio-group v-model:value="radio">
          <t-radio name="radio8" value="1" label="单选" disabled :icon="TIconChecks" align="right"></t-radio>
          <t-radio name="radio8" value="2" label="单选" disabled :icon="TIconChecks" align="right"></t-radio>
        </t-radio-group>
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="03 特殊类型" summary="自定义图标多选框">
      <t-radio-group v-model:value="radio">
          <t-radio name="radio9" value="1" label="单选" :icon="checkRectangle"></t-radio>
          <t-radio name="radio9" value="2" label="单选" :icon="checkRectangle"></t-radio>
        </t-radio-group>
    </tdesign-demo-block>

    <tdesign-demo-block title="04 规格" summary="单选框尺寸规格">
      <t-radio-group v-model:value="radio">
          <t-radio name="radio10" value="1" label="单选" :icon="circleFilledIcons"></t-radio>
      </t-radio-group>
      <t-radio-group v-model:value="radio">
        <t-radio name="radio11" value="2" label="单选" :icon="circleFilledIcons"></t-radio>
      </t-radio-group>
    </tdesign-demo-block>
  </div>


</template>

<script lang="ts">
import { ref, defineComponent, h } from 'vue';
import { CheckCircleFilledIcon, CircleIcon, CheckIcon, CheckRectangleFilledIcon, CheckRectangleIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  setup() {
    const radio = ref('2');
    const radio2 = ref('1');
    const radio3 = ref('1');
    const radio4 = ref('1');
    const radio5 = ref('1');
    const radio6 = ref('1');
    const rootDisable = ref(true);

    const testChange = (name: string) => {
      // radio.value = name;
      console.log('testChange', name);
    };

    const onChangeFn = (checked: boolean, context: { e: Event }) => {
      console.log(checked, context);
    };

    const TIconCircleFilled = h(CheckCircleFilledIcon);
    const TIconCircle = h(CircleIcon);

    const TIconCheck = h(CheckIcon);

    const TiconCheckRectangleFilled = h(CheckRectangleFilledIcon);
    const TiconCheckRectangle = h(CheckRectangleIcon);

    return { radio, radio2, radio3, radio4, radio5, radio6, testChange, rootDisable, circleFilledIcons: [TIconCircleFilled, TIconCircle], TIconChecks: [TIconCheck], checkRectangle: [TiconCheckRectangleFilled, TiconCheckRectangle], onChangeFn };
  },
});
</script>
