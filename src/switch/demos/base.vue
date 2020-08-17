<template>
  <div class="cell-base">
    <t-cell-group title="基础开关">
      <t-cell label="标题">
        <t-switch v-model="checked" @change="onChange" >
        </t-switch>
      </t-cell>
      <t-cell label="标题">
        <t-switch></t-switch>
      </t-cell>
      <t-cell label="标题">
        <t-switch v-model="disabledValue" disabled>
        </t-switch>
      </t-cell>
      <t-cell label="标题">
        <t-switch disabled>
        </t-switch>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="带描述开关">
      <t-cell label="标题">
        <t-switch v-model="value" text="描述信息" >
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
    const value = ref(true);
    const disabledValue = ref(true);
    const checked = ref(true);
    function onChange($event:string|number|boolean) {
      console.log(`change to ${$event}`);
    }
    return {
      value,
      disabledValue,
      checked,
      onChange,
    };
  },
};
</script>
