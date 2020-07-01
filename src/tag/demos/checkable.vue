
<template>
  <div class="container">
    <t-check-tag
      size="large"
      v-for="(fruit, index) in fruits"
      @click="onClickFruit(index)"
      :key="fruit.name"
      :checked="fruit.checked"
      :disabled="fruit.disabled"
    >{{fruit.name}}</t-check-tag>
    <t-check-tag
      v-for="(fruit, index) in fruits2"
      @click="onClickFruit2(index)"
      :key="fruit.name"
      :checked="fruit.checked"
      :disabled="fruit.disabled"
    >{{fruit.name}}</t-check-tag>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
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


    return {
      fruits,
      fruits2,
      onClickFruit,
      onClickFruit2,
    };
  },
};
</script>
<style>
  .t-tag + .t-tag {
    margin-left: 8px;
  }
  .container{
    background-color: #fff;
    padding: 16px;
  }
</style>
