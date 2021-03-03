<template>
  <div>
    <t-radio
      v-model="radio"
      name="1"
      :limit-title-row="1"
      :limit-content-row="2"
      title="双行标题，长文本自动换行，该选项的描述是一段很长的内容"
    >一段很长很长的辅助信息介绍，一段很长很长的辅助信息介绍，一段很长很长的辅助信息介绍。一段很长很长的辅助信息介绍，一段很长很长的辅助信息介绍，一段很长很长的辅助信息介绍。</t-radio>
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
