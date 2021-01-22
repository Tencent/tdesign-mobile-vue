<template>
  <div>
    <t-cell-group title="长文本输入框">
      <t-input type="textarea" placeholder="长文本预设内容，文本默认容纳四行" />
    </t-cell-group>
    <t-cell-group>
      <t-input label="标题文字" type="textarea" placeholder="长文本预设内容，文本默认容纳四行" />
    </t-cell-group>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const state = reactive({
      text: '',
      text1: '一段错误填写的内容',
      text2: '不可编辑的内容',
      text3: '',
      passwd: '12345678',
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
