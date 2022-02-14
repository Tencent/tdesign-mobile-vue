<template>
  <div class="pic-compose">
    <t-skeleton :row-col="rowCols" class="item"></t-skeleton>
    <t-skeleton :row-col="rowCols" class="item"></t-skeleton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      rowCols: [
        {
          height: '171px',
          borderRadius: '8px',
        },
        1,
        {
          width: '80%',
        },
        [
          {
            width: '60%',
          },
          {
            width: '20%',
          },
        ],
      ],
    };
  },
});
</script>
<style scoped lang="less">
.pic-compose {
  display: flex;
  justify-content: space-between;
  .item {
    width: 47%;
  }
}
</style>
