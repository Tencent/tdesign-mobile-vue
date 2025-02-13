<template>
  <picker
    v-bind="pickerProps"
    :columns="(selected) => generateCascadePickerColumns(selected, columns, finalDepth, finalSubOptionsRecord, keys)"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { get as lodashGet } from 'lodash-es';
import config from '../config';
import { KeysType } from '../common';
import PickerProps from './props';
import { PickerColumn, PickerValue } from './type';
import Picker from './picker';

const { prefix } = config;
const name = `${prefix}-cascade`;
export default defineComponent({
  name,
  components: { Picker },
  props: PickerProps,
  setup(props: any, context) {
    const pickerProps = computed(() => ({ ...props }));
    const finalDepth = ref(1);
    const finalSubOptionsRecord = ref({});
    const generateCascadePickerColumns = (
      value: PickerValue[],
      options: any,
      depth: number,
      subOptionsRecord: Record<string, any>,
      keys?: KeysType,
    ) => {
      const columns: PickerColumn[] = [];
      columns.push(
        options.map((option: any) => ({
          label: lodashGet(option, keys?.label ?? 'label'),
          value: lodashGet(option, keys?.value ?? 'value'),
        })),
      );
      for (let i = 0; i < depth - 1; i++) {
        const x = value[i];
        const subOptions = subOptionsRecord[x];
        if (!subOptions) {
          columns.push([]);
        } else {
          columns.push(
            subOptions.map((option: any) => ({
              label: lodashGet(option, keys?.label ?? 'label'),
              value: lodashGet(option, keys?.value ?? 'value'),
            })),
          );
        }
      }
      console.log('---00---', columns);
      return columns;
    };
    const initDepthAndRecord = (options: any) => {
      let depth = 1;
      const subOptionsRecord: Record<string, any[]> = {};
      function traverse(option: any, currentDepth: number) {
        if (!option.children) {
          return;
        }
        subOptionsRecord[option.value] = option.children;
        const nextDepth = currentDepth + 1;
        if (nextDepth > depth) {
          depth = nextDepth;
        }
        option.children.forEach((option: any) => {
          traverse(option, nextDepth);
        });
      }
      options.forEach((option: any) => {
        traverse(option, 1);
      });
      finalDepth.value = depth;
      finalSubOptionsRecord.value = subOptionsRecord;

      console.log('---999---', finalDepth.value, finalSubOptionsRecord.value);
    };
    initDepthAndRecord(props.columns);

    return {
      name,
      finalDepth,
      finalSubOptionsRecord,
      pickerProps,
      generateCascadePickerColumns,
    };
  },
});
</script>
