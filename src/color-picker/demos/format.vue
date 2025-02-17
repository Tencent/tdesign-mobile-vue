<template>
  <div v-for="(line, lineIndex) of lineList" :key="lineIndex" class="format-line">
    <div
      v-for="item of line"
      :key="item"
      class="format-item"
      :class="curFormat === item ? 'active' : ''"
      @click.stop="clickFormat(item)"
    >
      <t-icon
        v-if="curFormat === item"
        name="check"
        size="14"
        style="position: absolute; left: 2.5px; top: 2.1px; z-index: 1; color: #fff"
      />
      {{ item }}
    </div>
  </div>
  <t-color-picker type="multiple" :format="curFormat" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const curFormat = ref('RGB');
const lineList = [
  ['CSS', 'HEX', 'RGB'],
  ['HSL', 'HSV', 'CMYK'],
];
const clickFormat = (val: string) => {
  curFormat.value = val;
};
</script>
<style scoped>
:root {
  --press-color-picker-panel-width: 100%;
}

.format-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  margin: 0 16px 20px;
}

.format-item {
  border-radius: 6px;
  height: 100%;
  background-color: #fff;
  padding: 16px;
  line-height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  cursor: pointer;
}

.format-item.active {
  border: 1px solid #0052d9;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
    border-top-left-radius: 6px;
    border-top: 28px solid #0052d9;
    border-right: 28px solid transparent;
    border-radius: 0;
  }
}

.format-item:not(:last-child) {
  margin-right: 12px;
}
</style>
