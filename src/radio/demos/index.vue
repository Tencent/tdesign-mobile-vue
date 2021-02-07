<template>
  <div>
    <t-radio v-model="radio" name="1" title="单行标题">这是内容</t-radio>
    <t-radio v-model="radio" name="2" title="单行标题">这是内容</t-radio>
    <t-radio v-model="radio" name="3" :title="title" limit-title-row="1" limit-content-row="1">
      这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
      这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
    </t-radio>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  setup() {
    const radio = ref('1');
    const title = ref(
      '这是很长的标题，这是很长的标题，这是很长的标题，这是很长的标题，这是很长的标题，这是很长的标题，这是很长的标题，这是很长的标题',
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
