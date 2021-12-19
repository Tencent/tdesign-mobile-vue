<template>
  <div>
    <div class="tdesign-mobile-demo">
      <h1 class="title">Checkbox 多选框</h1>
      <p class="summary">描述文字</p>
      <tdesign-demo-block title="01 类型" summary="基础多选框">
        <t-checkbox name="checkbox0" value="1" label="多选" @change="changeFn"></t-checkbox>
        <t-checkbox name="checkbox0" value="2" label="多选" @change="changeFn"></t-checkbox>
        <t-checkbox name="checkbox0" value="3" label="多选" @change="changeFn"></t-checkbox>
      </tdesign-demo-block>
      <tdesign-demo-block title="01 类型" summary="基础多选框">
        <t-check-group v-model:value="checkBoxs1" @change="changeFn">
          <t-checkbox name="checkbox1" value="1" label="多选"></t-checkbox>
          <t-checkbox name="checkbox1" value="2" label="多选" :icon="circleFilledIcons"></t-checkbox>
          <t-checkbox name="checkbox1" value="3" label="多选" :icon="circleFilledIcons"></t-checkbox>
          <t-checkbox name="checkbox1" value="4" label="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选" :icon="circleFilledIcons"></t-checkbox>
          <t-checkbox name="checkbox1" value="5" label="多选" content="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选" :icon="circleFilledIcons"></t-checkbox>
        </t-check-group>
      </tdesign-demo-block>
      <tdesign-demo-block summary="右侧圆形单选框">
        <t-check-group v-model:value="checkBoxs1" >
          <t-checkbox name="checkbox2" value="1" label="多选" :icon="circleFilledIcons" align="right"></t-checkbox>
          <t-checkbox name="checkbox2" value="2" label="多选" :icon="circleFilledIcons" align="right"></t-checkbox>
          <t-checkbox name="checkbox2" value="3" label="多选" :icon="circleFilledIcons" align="right"></t-checkbox>
          <t-checkbox name="checkbox2" value="4" label="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选" :icon="circleFilledIcons" align="right" maxLabelRow="1"></t-checkbox>
        </t-check-group>
      </tdesign-demo-block>
      <tdesign-demo-block summary="带全选多选框">
        <t-check-group v-model:value="checkBoxs2" >
          <t-checkbox name="checkbox3" value="1" label="全选" checkAll :icon="circleFilledIcons"></t-checkbox>
          <t-checkbox name="checkbox3" value="2" label="多选" :icon="circleFilledIcons"></t-checkbox>
          <t-checkbox name="checkbox3" value="3" label="多选" :icon="circleFilledIcons"></t-checkbox>
          <t-checkbox name="checkbox3" value="4" label="多选" :icon="circleFilledIcons"></t-checkbox>
        </t-check-group>
      </tdesign-demo-block>
      <tdesign-demo-block title="02 状态" summary="多选框禁用态">
        <t-check-group v-model:value="checkBoxs3">
          <t-checkbox name="checkbox4" value="1" label="多选" :icon="circleFilledIcons" disabled></t-checkbox>
          <t-checkbox name="checkbox4" value="2" label="多选" :icon="circleFilledIcons" disabled></t-checkbox>
          <t-checkbox name="checkbox4" value="3" label="多选" :icon="circleFilledIcons" align="right" disabled></t-checkbox>
          <t-checkbox name="checkbox4" value="4" label="多选" :icon="circleFilledIcons" align="right" disabled></t-checkbox>
        </t-check-group>
      </tdesign-demo-block>
      <tdesign-demo-block summary="多选框半选态">
        <t-check-group v-model:value="checkBoxs1">
          <t-checkbox name="checkbox5" value="1" label="半选" :icon="circleFilledIcons" indeterminate></t-checkbox>
        </t-check-group>
      </tdesign-demo-block>
      <tdesign-demo-block title="03 特殊类型" summary="自定义图标多选框">
        <t-check-group v-model:value="checkBoxs1">
          <t-checkbox name="checkbox6" value="1" label="多选" :icon="CheckRectangleFilledIcons"></t-checkbox>
          <t-checkbox name="checkbox6" value="2" label="多选" :icon="CheckRectangleFilledIcons"></t-checkbox>
          <t-checkbox name="checkbox6" value="3" label="多选" :icon="CheckRectangleFilledIcons"></t-checkbox>
        </t-check-group>
      </tdesign-demo-block>
      <tdesign-demo-block title="04 规格" summary="多选框尺寸规格">
        <t-check-group v-model:value="checkBoxs1">
          <t-checkbox name="checkbox7" value="1" label="多选 H48" :icon="circleFilledIcons"></t-checkbox>
        </t-check-group>
      </tdesign-demo-block>
      <tdesign-demo-block summary="多选框尺寸规格">
        <t-check-group v-model:value="checkBoxs1">
          <t-checkbox name="checkbox8" value="1" label="多选 H56" :icon="circleFilledIcons"></t-checkbox>
        </t-check-group>
      </tdesign-demo-block>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, watch, defineComponent, h } from 'vue';
import { CheckCircleFilledIcon, CircleIcon, CheckRectangleFilledIcon, RectangleIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  setup() {
    const checkGroup: any = ref(null);
    const checkBoxs1 = ref(['1', '2', '4', '5']);
    const checkBoxs2 = ref(['1', '2']);
    const checkBoxs3 = ref(['1', '4']);
    watch(
      () => checkBoxs1.value,
      (val) => {
        console.log('checkBoxs1:', val);
      },
    );

    watch(
      () => checkBoxs2.value,
      (val) => {
        console.log('checkBoxs2:', val);
      }
    )

    const TIconCircleFilled = h(CheckCircleFilledIcon);
    const TIconCircle = h(CircleIcon);
    const TCheckRectangleFilledIcon = h(CheckRectangleFilledIcon);
    const TRectangleIcon = h(RectangleIcon);
    const changeFn = (value: any, context: { e: Event }) => {
      console.log('value:', value);
      console.log('Event:', context);
    }

    return {
      checkGroup,
      checkBoxs1,
      checkBoxs2,
      checkBoxs3,
      circleFilledIcons: [TIconCircleFilled, TIconCircle],
      CheckRectangleFilledIcons: [TCheckRectangleFilledIcon, TRectangleIcon],
      changeFn
    };
  },
});
</script>
<style lang="less" scoped>
.select {
  font-size: 16px;
  display: inline-block;
  width: 50px;
  text-align: center;
  border-radius: 2px;
  color: #ffffff;
}
.select-all {
  background-color: #0052d9;
}
.canle-all {
  background-color: #07c160;
  margin-left: 20px;
}
</style>
