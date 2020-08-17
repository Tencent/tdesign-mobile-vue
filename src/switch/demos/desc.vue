<template>
  <div class="cell-base">
    <t-cell-group title="带描述开关">
      <t-cell label="标题">
        <t-switch v-model="checked" text="描述信息" >
        </t-switch>
      </t-cell>
      <t-cell label="标题">
        <t-switch text="描述信息" >
        </t-switch>
      </t-cell>
      <t-cell label="标题">
        <t-switch v-model="disabledValue" disabled text="描述信息">
        </t-switch>
      </t-cell>
      <t-cell label="标题">
        <t-switch disabled text="描述信息">
        </t-switch>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const checked = ref(true);
    const disabledValue = ref(true);
    return {
      checked,
      disabledValue,
    };
  },
};
</script>
