<template>
  <div>
    <t-radio v-model="radio" name="1">单行标题</t-radio>
    <t-radio v-model="radio" name="2">单行标题</t-radio>
    <t-radio v-model="radio" name="3">双行标题，长文本自动换行，该选项的描述是一段很长的内容</t-radio>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  setup() {
    const radio = ref('1');
    const title = ref(
      '双行标题，长文本自动换行，该选项的描述是一段很长的内容',
    );

    watch(
      () => radio.value,
      (val) => {
        console.log(val);
      },
    );

    return {
      radio,
      title,
    };
  },
});
</script>
