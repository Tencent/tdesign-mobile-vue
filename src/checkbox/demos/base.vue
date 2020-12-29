<template>
  <div>
    <t-cell-group title="基础多选框-单行标题">
      <t-check-group v-model="checkBoxs0">
        <t-cell value-align="left">
          <t-checkbox
            name="1"
            title="单行标题"></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="2"
            title="单行标题"></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="3"
            title="双行标题，长文本自动换行，该选项的描述是一段很长的内容"
            limit-content-row="1"></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="4"
            title="单行标题--不可选"
            disabled></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="5"
            title="单行标题--不可选"
            disabled></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="6"
            title="双行标题，长文本自动换行，该选项的描述是一段很长的内容--不可选"
            disabled></t-checkbox>
        </t-cell>
      </t-check-group>
    </t-cell-group>
    <t-cell-group title="带辅助信息多选框">
      <t-check-group v-model="checkBoxs1">
        <t-cell value-align="left">
          <t-checkbox
            name="1"
            title="单行标题">一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="2"
            title="单行标题">一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="3"
            title="双行标题，长文本自动换行，该选项的描述是一段很长的内容"
            limit-content-row="2">一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字，
            一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="4"
            title="单行标题--不可选"
            disabled>一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="5"
            title="单行标题--不可选"
            disabled>一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="6"
            title="双行标题，长文本自动换行，该选项的描述是一段很长的内容--不可选"
            disabled>一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-checkbox>
        </t-cell>
      </t-check-group>
    </t-cell-group>

    <t-cell-group title="限制最大可选--2项">
      <t-check-group v-model="checkBoxs2" max="2">
        <t-cell value-align="left">
          <t-checkbox
            name="1"
            title="单行标题"></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="2"
            title="单行标题"></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="3"
            title="单行标题"></t-checkbox>
        </t-cell>
      </t-check-group>
    </t-cell-group>

    <t-cell-group title="限制行数，超出行数打省略号">
      <t-check-group v-model="checkBoxs3">
        <t-cell value-align="left">
          <t-checkbox
            name="1"
            title="双行标题，长文本自动换行，该选项的描述是一段很长的内容">一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字，
            一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="2"
            title="双行标题，长文本自动换行，该选项的描述是一段很长的内容"
            limit-title-row="1"
            limit-content-row="1">一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字，
            一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="3"
            title="双行标题，长文本自动换行，该选项的描述是一段很长的内容"
            limit-content-row="2">一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字，
            一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字</t-checkbox>
        </t-cell>
      </t-check-group>
    </t-cell-group>

    <t-cell-group title="自定义图标和设置颜色">
      <t-check-group v-model="checkBoxs4">
        <t-cell value-align="left">
          <t-checkbox
            name="1"
            title="单行标题">
            <template #icon="props">
              <img class="my-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="2"
            title="单行标题"
            checked-color="#07c160"></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="3"
            title="单行标题"></t-checkbox>
        </t-cell>
      </t-check-group>
    </t-cell-group>

    <t-cell-group title="全选和取消">
      <t-check-group ref="checkGroup" v-model="checkBoxs5">
        <t-cell value-align="left">
          <t-checkbox
            name="1"
            title="单行标题">
          </t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="2"
            title="单行标题"></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox
            name="3"
            title="单行标题"></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <span class="select select-all" @click="toggleSelect(true)">全选</span>
          <span class="select canle-all" @click="toggleSelect(false)">取消</span>
        </t-cell>
      </t-check-group>
    </t-cell-group>

    <t-cell-group title="没有使用group">
      <t-cell value-align="left">
        <t-checkbox
          v-model="checked0"
          name="1"
          title="单行标题">
        </t-checkbox>
      </t-cell>
      <t-cell value-align="left">
        <t-checkbox
          v-model="checked1"
          name="2"
          title="单行标题">
        </t-checkbox>
      </t-cell>
      <t-cell value-align="left">
        <t-checkbox
          v-model="checked2"
          name="3"
          title="单行标题">
        </t-checkbox>
      </t-cell>
    </t-cell-group>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, watch, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    let checkGroup:any = ref(null);
    onMounted(() => {
      checkGroup = checkGroup.value;
    });
    const activeIcon = ref('https://img.yzcdn.cn/vant/user-active.png');
    const inactiveIcon = ref('https://img.yzcdn.cn/vant/user-inactive.png');
    const checkBoxs0 = ref(['1', '2', '4', '5']);
    const checkBoxs1 = ref(['1', '2', '4', '5']);
    const checkBoxs2 = ref(['1', '2']);
    const checkBoxs3 = ref(['1', '2']);
    const checkBoxs4 = ref(['1']);
    const checkBoxs5 = ref(['1', '2']);

    const checked0 = ref('1');
    const checked1 = ref('2');
    const checked2 = ref('3');

    watch(
      () => checkBoxs0.value,
      (val) => {
        console.log('val', val);
      },
    );

    watch(
      () => checkBoxs1.value,
      (val) => {
        console.log('val', val);
      },
    );

    watch(
      () => checkBoxs2.value,
      (val) => {
        console.log('val', val);
      },
    );

    watch(
      () => checkBoxs3.value,
      (val) => {
        console.log('val', val);
      },
    );

    watch(
      () => checkBoxs4.value,
      (val) => {
        console.log('val', val);
      },
    );

    watch(
      () => checkBoxs5.value,
      (val) => {
        console.log('val', val);
      },
    );

    watch(
      () => checked0.value,
      (val) => {
        console.log('val', val);
      },
    );

    watch(
      () => checked1.value,
      (val) => {
        console.log('val', val);
      },
    );

    watch(
      () => checked2.value,
      (val) => {
        console.log('val', val);
      },
    );

    const toggleSelect = (check: boolean) => {
      checkGroup.value.toggleAll(check);
    };
    return {
      checkGroup,
      checkBoxs0,
      checkBoxs1,
      checkBoxs2,
      checkBoxs3,
      checkBoxs4,
      checkBoxs5,
      checked0,
      checked1,
      checked2,
      activeIcon,
      inactiveIcon,
      toggleSelect,
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
    color: #FFFFFF;
  }
  .select-all {
    background-color: #0052D9;
  }
  .canle-all {
    background-color: #07c160;
    margin-left: 20px;
  }
</style>
