<!--
 * @Author: your name
 * @Date: 2020-05-21 10:56:48
 * @LastEditTime: 2020-05-26 16:00:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tdesign-mobile-vue/src/radio/demos/base.vue
-->
<template>
  <div class="demo-icon">
    <t-cell-group title="基础单选框-标题">
      <t-radio-group v-model="radio" @change="testChange">
        <t-cell value-align="left">
          <t-radio name="1" title="单行标题"></t-radio>
        </t-cell>
        <t-cell value-align="left">
          <t-radio name="2" title="单行标题"></t-radio>
        </t-cell>
        <t-cell value-align="left">
          <t-radio name="3" title="双行标题，长文本自动换行，该选项的描述是一段很长的内容"></t-radio>
        </t-cell>
      </t-radio-group>
    </t-cell-group>

    <t-cell-group title="基础单选框-标题-不可选">
      <t-radio-group v-model="radio2" @change="testChange2" :disabled="rootDisable">
        <t-cell value-align="left">
          <t-radio name="1" title="单行标题"></t-radio>
        </t-cell>
        <t-cell value-align="left">
          <t-radio name="2" title="单行标题"></t-radio>
        </t-cell>
        <t-cell value-align="left">
          <t-radio name="3" title="双行标题，长文本自动换行，该选项的描述是一段很长的内容"></t-radio>
        </t-cell>
      </t-radio-group>
    </t-cell-group>

    <t-cell-group title="基础单选框-标题-文本-可选">
      <t-radio-group v-model="radio3" @change="testChange3">
        <t-cell value-align="left">
          <t-radio name="1" title="单行标题">一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-radio>
        </t-cell>
        <t-cell value-align="left">
          <t-radio name="2" title="单行标题">一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-radio>
        </t-cell>
        <t-cell value-align="left">
          <t-radio name="3" title="双行标题，长文本自动换行，该选项的描述是一段很长的内容">
            一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字
          </t-radio>
        </t-cell>
      </t-radio-group>
    </t-cell-group>

    <t-cell-group title="基础单选框-标题-文本-不可选">
      <t-radio-group v-model="radio4" @change="testChange4" :disabled="rootDisable">
        <t-cell value-align="left">
          <t-radio name="1" title="单行标题">一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-radio>
        </t-cell>
        <t-cell value-align="left">
          <t-radio name="2" title="单行标题">一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-radio>
        </t-cell>
        <t-cell value-align="left">
          <t-radio name="3" title="双行标题，长文本自动换行，该选项的描述是一段很长的内容">
            一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字
          </t-radio>
        </t-cell>
      </t-radio-group>
    </t-cell-group>

    <t-cell-group title="基础单选框-标题-文本-可选-无radio-group">
      <t-cell value-align="left">
        <t-radio name="1" title="单行标题" v-model="radio5" @change="testChange5">
          一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-radio>
      </t-cell>
      <t-cell value-align="left">
        <t-radio name="2" title="单行标题" v-model="radio5" @change="testChange5" disabled>
          不可点击</t-radio>
      </t-cell>
      <t-cell value-align="left">
        <t-radio
          name="3"
          title="双行标题，长文本自动换行，该选项的描述是一段很长的内容"
          v-model="radio5"
          @change="testChange5"
          limit-content-row="1"
          limit-title-row="1">
          一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字
        </t-radio>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="基础单选框-标题-文本-文本部分不能点击">
      <t-cell value-align="left">
        <t-radio name="1" title="单行标题" v-model="radio6" content-disabled @change="testChange6">
          一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-radio>
      </t-cell>
      <t-cell value-align="left">
        <t-radio name="2" title="单行标题" v-model="radio6" content-disabled @change="testChange6">
          不可点击</t-radio>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const radio = ref('1');
    const radio2 = ref('1');
    const radio3 = ref('1');
    const radio4 = ref('1');
    const radio5 = ref('1');
    const radio6 = ref('1');
    const rootDisable = ref(true);
    onMounted(() => {
    });
    const testChange = (name: string) => {
      radio.value = name;
      console.log('select-radio', name);
    };
    const testChange2 = (name: string) => {
      radio2.value = name;
      console.log('select-radio', name);
    };
    const testChange3 = (name: string) => {
      radio3.value = name;
      console.log('select-radio', name);
    };
    const testChange4 = (name: string) => {
      radio4.value = name;
      console.log('select-radio', name);
    };
    const testChange5 = (name: string) => {
      radio5.value = name;
      console.log('select-radio', name);
    };
    const testChange6 = (name: string) => {
      radio6.value = name;
    };
    // eslint-disable-next-line max-len
    return { radio, radio2, radio3, radio4, radio5, radio6, testChange, testChange2, testChange3, testChange4, testChange5, testChange6, rootDisable };
  },
};
</script>
