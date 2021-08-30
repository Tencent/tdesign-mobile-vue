<template>
  <div class='tdesign-mobile-demo'>
    <div class='tag-demo'>
      <t-check-tag
        v-for='(fruit, index) in fruits'
        :key='fruit.name'
        v-model:checked='fruit.checked'
        size='large'
        :disabled='fruit.disabled'
        @click='onClickFruit(index)'
        @change='change'
      >{{ fruit.name }}
      </t-check-tag>
      <t-check-tag
        v-for='(fruit, index) in fruits2'
        :key='fruit.name'
        :checked='fruit.checked'
        :disabled='fruit.disabled'
        @click='onClickFruit2(index)'
      >{{ fruit.name }}
      </t-check-tag>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const fruits = ref([
      {
        name: '苹果',
        checked: true,
      },
      {
        name: '香蕉',
        checked: false,
      },
      {
        name: '桃子',
        checked: false,
      },
      {
        name: '火龙果',
        checked: false,
        disabled: true,
      },
    ]);

    const fruits2 = ref([
      {
        name: '小苹果',
        checked: true,
      },
      {
        name: '小香蕉',
        checked: false,
      },
      {
        name: '小桃子',
        checked: false,
      },
      {
        name: '小火龙果',
        checked: false,
        disabled: true,
      },
    ]);


    function onClickFruit(index: number) {
      fruits.value[index].checked = !fruits.value[index].checked;
    }

    function onClickFruit2(index: number) {
      fruits2.value[index].checked = !fruits2.value[index].checked;
    }

    function change(checked: boolean) {
      console.log(checked);
    }

    return {
      fruits,
      fruits2,
      change,
      onClickFruit,
      onClickFruit2,
    };
  },
});
</script>
