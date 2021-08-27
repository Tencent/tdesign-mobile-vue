<template>
  <div class="cell-base">
    <t-cell-group title="单行单元格">
      <t-cell title="单行标题" />
      <t-cell title="单行标题">
        <TIconChevronRight />
      </t-cell>
      <t-cell title="单行标题" note="辅助信息" arrow></t-cell>
      <t-cell>
        <template #leftIcon>
          <TIconUserFilled />
        </template>
        <template #title>
          <span>单行标题</span>
        </template>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="多行单元格">
      <t-cell title="单行标题" description="一段很长很长的内容文字"></t-cell>
      <t-cell title="单行标题" description="一段很长很长的内容文字" arrow></t-cell>
      <t-cell title="单行标题" description="一段很长很长的内容文字">
        <t-button theme="primary" variant="outline" size="small">小按钮</t-button>
      </t-cell>
      <t-cell
        title="单行标题"
        description="一段很长很长的内容文字，一段很长很长的内容文字，一段很长很长的内容文字"
      ></t-cell>

      <t-cell title="单行标题" description="一段很长很长的内容文字">
        <template #leftIcon>
          <img
            src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png"
            style="width: 50px; height: 50px; margin-right: 8px; float: left"
          />
        </template>
      </t-cell>
      <t-cell title="双行标题，长文本自动换行，该选项的描述是一段很长的内容" description="一段很长很长的内容文字"></t-cell>
    </t-cell-group>
    <t-cell-group title="分组标题" description="列表外常驻文字，常常用于辅助信息说明，列表外常驻文字，常常用于辅助信息说明">
      <t-cell title="单行标题" />
      <t-cell title="单行标题" arrow />
    </t-cell-group>
    <t-cell-group title="显示组边框" border>
      <t-cell value-align="right">
        <template #title>
          <div>自定义标题</div>
        </template>
        <div>内容是长长长长长长长长长长长长长长长长长长长长长的</div>
      </t-cell>
      <t-cell value-align="right">
        <template #title>
          <div>自定义标题</div>
        </template>
        <div>内容是短的</div>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="单元格点击时触发" border>
      <t-cell value-align="right" @click="onClick">
        <template #title>
          <div>自定义标题</div>
        </template>
        <div>内容是长长长长长长长长长长长长长长长长长长长长长的</div>
      </t-cell>
      <t-cell value-align="right" @click="onClick">
        <template #title>
          <div>自定义标题</div>
        </template>
        <div>内容是短的</div>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script>
import TIconChevronRight from '@/icon/chevron-right.vue';
import TIconUserFilled from '@/icon/user-filled.vue';
import { defineComponent } from 'vue';
import Message from '../../message';

export default defineComponent({
  components: { TIconChevronRight, TIconUserFilled },
  setup() {
    const onClick = () => {
      Message.info('cell click');
    };
    return {
      onClick,
    };
  },
});
</script>
