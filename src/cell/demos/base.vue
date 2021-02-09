<template>
  <div class="cell-base">
    <t-cell-group title="单行单元格">
      <t-cell label="单行标题" @click="onClick" />
      <t-cell label="单行标题">
        <TIconChevronRight />
      </t-cell>
      <t-cell label="单行标题" value="辅助信息" link></t-cell>
      <t-cell>
        <template #leftIcon>
          <TIconUserFilled />
        </template>
        <template #label>
          <span>单行标题</span>
        </template>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="多行单元格">
      <t-cell label="单行标题" summary="一段很长很长的内容文字"></t-cell>
      <t-cell label="单行标题" summary="一段很长很长的内容文字" link></t-cell>
      <t-cell label="单行标题" summary="一段很长很长的内容文字">
        <template #default>
          <t-button theme="primary" variant="outline" size="small">小按钮</t-button>
        </template>
      </t-cell>
      <t-cell
        label="单行标题"
        summary="一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字"
      ></t-cell>

      <t-cell label="单行标题" summary="一段很长很长的内容文字">
        <template #leftIcon>
          <img
            src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png"
            style="width: 50px; height: 50px; margin-right: 8px"
          />
        </template>
      </t-cell>
      <t-cell label="双行标题，长文本自动换行，该选项的描述是一段很长的内容" summary="一段很长很长的内容文字"></t-cell>
    </t-cell-group>
    <t-cell-group title="分组标题" summary="列表外常驻文字，常常用于辅助信息说明，列表外常驻文字，常常用于辅助信息说明">
      <t-cell label="单行标题" />
      <t-cell label="单行标题" link />
    </t-cell-group>
  </div>
</template>

<script>
import TIconChevronRight from '@/icon/chevron-right.vue';
import TIconUserFilled from '@/icon/user-filled.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { TIconChevronRight, TIconUserFilled },
  setup() {
    const onClick = () => {
      console.log('cell click');
    };
    return {
      onClick,
    };
  },
});
</script>
