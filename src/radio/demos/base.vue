<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Radio 单选框</h1>
    <p class="summary">描述文字</p>
    <tdesign-demo-block title="01 类型" summary="左侧圆形单选框">
      <t-radio-group v-model="radio" default-value="1" @change="testChange">
        <t-cell-group>
          <t-cell @click="radio = '1'">
            <template #leftIcon>
              <t-radio name="radio1" value="1" :icon="circleFilledIcons"  @change="onChangeFn" :on-change="onChangeFn"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
          </t-cell>
          <t-cell @click="radio = '2'">
            <template #leftIcon>
              <t-radio name="radio1" value="2" :icon="circleFilledIcons" :on-change="onChangeFn"></t-radio>
            </template>
            <template #title>
              <span>单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选</span>
            </template>
          </t-cell>
          <t-cell @click="radio = '3'">
            <template #leftIcon>
              <t-radio name="radio1" value="3" :icon="circleFilledIcons" :on-change="onChangeFn"></t-radio>
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

    <tdesign-demo-block summary="右侧圆形单选框">
      <t-cell-group>
        <t-cell @click="radio = '1'">
          <template #rightIcon>
            <t-radio v-model="radio" name="radio2" value="1" :icon="circleFilledIcons"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
        <t-cell @click="radio = '2'">
          <template #rightIcon>
            <t-radio v-model="radio" name="radio2" value="2" :icon="circleFilledIcons"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
        <t-cell @click="radio = '3'">
          <template #rightIcon>
            <t-radio v-model="radio" name="radio2" value="3" :icon="circleFilledIcons"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
      </t-cell-group>
    </tdesign-demo-block>

    <tdesign-demo-block summary="左侧勾形单选框">
      <t-radio-group v-model:value="radio">
        <t-cell-group>
          <t-cell @click="radio = '1'">
            <template #leftIcon>
              <t-radio name="radio3" value="1" :icon="TIconChecks"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
          </t-cell>
          <t-cell @click="radio = '2'">
            <template #leftIcon>
              <t-radio name="radio3" value="2" :icon="TIconChecks"></t-radio>
            </template>
            <template #title>
              <span>单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选</span>
            </template>
          </t-cell>
          <t-cell @click="radio = '3'">
            <template #leftIcon>
              <t-radio name="radio3" value="3" :icon="TIconChecks"></t-radio>
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
        <t-cell @click="radio = '1'">
          <template #rightIcon>
            <t-radio v-model="radio" name="radio4" value="1" :icon="TIconChecks"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
        <t-cell @click="radio = '2'">
          <template #rightIcon>
            <t-radio v-model="radio" name="radio4" value="2" :icon="TIconChecks"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
        <t-cell @click="radio = '3'">
          <template #rightIcon>
            <t-radio v-model="radio" name="radio4" value="3" :icon="TIconChecks"></t-radio>
          </template>
          <template #title>
            <span>单选</span>
          </template>
        </t-cell>
        <t-cell @click="radio = '4'">
          <template #rightIcon>
            <t-radio v-model="radio" name="radio4" value="4" :icon="TIconChecks"></t-radio>
          </template>
          <template #title>
            <span>单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选</span>
          </template>
        </t-cell>
      </t-cell-group>
    </tdesign-demo-block>

    <tdesign-demo-block title="02 状态" summary="单选框禁用态">
      <t-radio-group v-model:value="radio">
        <t-cell-group>
          <t-cell>
            <template #leftIcon>
              <t-radio name="radio5" value="1" disabled :icon="circleFilledIcons"></t-radio>
            </template>
            <template #title>
              <span style="color: rgba(0,0,0,0.26)">单选</span>
            </template>
          </t-cell>
          <t-cell>
            <template #leftIcon>
              <t-radio name="radio5" value="2" disabled :icon="circleFilledIcons"></t-radio>
            </template>
            <template #title>
              <span style="color: rgba(0,0,0,0.26)">单选</span>
            </template>
          </t-cell>
        </t-cell-group>
      </t-radio-group>
      <div style="margin-top: 10px">
        <t-radio-group v-model:value="radio">
          <t-cell-group>
            <t-cell>
              <template #leftIcon>
                <t-radio name="radio6" value="1" disabled :icon="TIconChecks"></t-radio>
              </template>
              <template #title>
                <span style="color: rgba(0,0,0,0.26)">单选</span>
              </template>
            </t-cell>
            <t-cell>
              <template #leftIcon>
                <t-radio name="radio6" value="2" disabled :icon="TIconChecks"></t-radio>
              </template>
              <template #title>
                <span style="color: rgba(0,0,0,0.26)">单选</span>
              </template>
            </t-cell>
          </t-cell-group>
        </t-radio-group>
      </div>
      <div style="margin-top: 10px">
        <t-cell-group>
          <t-cell>
            <template #rightIcon>
              <t-radio v-model="radio" name="radio7" value="1" disabled :icon="circleFilledIcons"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
          </t-cell>
          <t-cell>
            <template #rightIcon>
              <t-radio v-model="radio" name="radio7" value="2" disabled :icon="circleFilledIcons"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
          </t-cell>
        </t-cell-group>
      </div>
      <div style="margin-top: 10px">
        <t-cell-group>
          <t-cell>
            <template #rightIcon>
              <t-radio v-model="radio" name="radio8" value="1" disabled :icon="TIconChecks"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
          </t-cell>
          <t-cell>
            <template #rightIcon>
              <t-radio v-model="radio" name="radio8" value="2" disabled :icon="TIconChecks"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
          </t-cell>
        </t-cell-group>
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="03 特殊类型" summary="自定义图标多选框">
      <t-radio-group v-model:value="radio">
        <t-cell-group>
          <t-cell :class="`cell-inden--bordered`" @click="radio = '1'">
            <template #leftIcon>
              <t-radio name="radio9" value="1" :icon="checkRectangle"></t-radio>
            </template>
            <template #title>
              <span>单选</span>
            </template>
          </t-cell>
          <t-cell :class="`cell-inden--bordered`" @click="radio = '2'">
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
      <t-radio-group v-model:value="radio">
        <t-cell-group>
          <t-cell :class="`cell-inden--bordered`" @click="radio = '1'">
            <template #leftIcon>
              <t-radio name="radio10" value="1" :icon="circleFilledIcons"></t-radio>
            </template>
            <template #title>
              <span>单选 H48</span>
            </template>
          </t-cell>
        </t-cell-group>
      </t-radio-group>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, h } from 'vue';
import {
  CheckCircleFilledIcon,
  CircleIcon,
  CheckIcon,
  CheckRectangleFilledIcon,
  CheckRectangleIcon,
} from 'tdesign-icons-vue-next';

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
      console.log('checked', checked);
    };

    const TIconCircleFilled = h(CheckCircleFilledIcon);
    const TIconCircle = h(CircleIcon);

    const TIconCheck = h(CheckIcon);

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
      rootDisable,
      circleFilledIcons: [TIconCircleFilled, TIconCircle],
      TIconChecks: [TIconCheck],
      checkRectangle: [TiconCheckRectangleFilled, TiconCheckRectangle],
      onChangeFn,
    };
  },
});
</script>
