<template>
  <div>
    <t-radio name="1" title="单行标题" v-model="radio">这是内容</t-radio>
    <t-radio name="2" title="单行标题" v-model="radio">这是内容</t-radio>
    <t-radio name="3" :title="tilte" limit-title-row="1" limit-content-row="1" v-model="radio">
      这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
      这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
    </t-radio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '1',
      tilte: '这是很长的标题，这是很长的标题，这是很长的标题，这是很长的标题，这是很长的标题，这是很长的标题，这是很长的标题，这是很长的标题',
    };
  },
  watch: {
    radio(val) {
      console.log(val);
    },
  },
};
</script>
