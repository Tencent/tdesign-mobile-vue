<template>
  <div :class="`${name}`">
    <t-dropdown-menu>
      <t-dropdown-item title="单选菜单" disabled />
      <t-dropdown-item title="自定义内容">
        <t-cell-group>
          <t-cell label="开关 1">
            <t-switch text="描述信息" v-model="switch1"></t-switch>
          </t-cell>
          <t-cell label="开关 2">
            <t-switch text="描述信息" v-model="switch2"></t-switch>
          </t-cell>
          <t-cell label="开关 3">
            <t-switch disabled text="描述信息" v-model="switch3"></t-switch>
          </t-cell>
        </t-cell-group>
      </t-dropdown-item>
    </t-dropdown-menu>
    <p>
      开关 1:
      <strong>{{switch1}}</strong>
    </p>
    <p>
      开关 2:
      <strong>{{switch2}}</strong>
    </p>
    <p>
      开关 3:
      <strong>{{switch3}}</strong>
    </p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

const componentName = 'dropdown-menu';
const name = `${componentName}-demo`;

export default defineComponent({
  name,
  setup() {
    const switch1 = ref(false);
    const switch2 = ref(true);
    const switch3 = ref(false);
    return {
      name,
      switch1,
      switch2,
      switch3,
    };
  },
});
</script>
<style lang="less" scoped>
.dropdown-menu-demo {
  position: relative;
  background: #fff;
  transform: translate(0, 0);
  height: 400px;
  padding: 1px 0;
}
p {
  font-size: 14px;
  line-height: 1.4;
  margin: 1em .5em;
}
</style>
