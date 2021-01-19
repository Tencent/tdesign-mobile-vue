<template>
  <demo-container>
    <t-dropdown-menu>
      <t-dropdown-item title="单选菜单" disabled />
      <t-dropdown-item title="自定义内容">
        <t-cell-group>
          <t-cell label="开关 1">
            <t-switch v-model="switch1" text="描述信息"></t-switch>
          </t-cell>
          <t-cell label="开关 2">
            <t-switch v-model="switch2" text="描述信息"></t-switch>
          </t-cell>
          <t-cell label="开关 3">
            <t-switch v-model="switch3" disabled text="描述信息"></t-switch>
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
  </demo-container>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import DemoContainer from './demo-container.vue';

export default defineComponent({
  components: {
    DemoContainer,
  },
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
