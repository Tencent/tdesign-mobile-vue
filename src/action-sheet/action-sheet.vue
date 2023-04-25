<template>
  <t-popup :visible="currentVisible" :placement="`bottom`" :class="name" @close="handleClose">
    <div :class="rootClasses">
      <p v-if="description" :class="descriptionClasses">{{ description }}</p>
      <action-sheet-list v-if="theme === 'list'" :align="align" :items="actionItems" @selected="handleSelected" />
      <action-sheet-grid v-if="theme === 'grid'" :items="actionItems" :count="count" @selected="handleSelected" />
      <template v-if="showCancel">
        <div :class="`${name}__footer`">
          <div :class="`${name}__gap-${theme}`"></div>
          <t-button :class="`${name}__cancel ${prefix}-class-cancel`" variant="text" block @click="handleCancel">
            {{ cancelText }}
          </t-button>
        </div>
      </template>
    </div>
  </t-popup>
</template>

<script lang="ts">
import { ref, watch, defineComponent, computed } from 'vue';
import { useEmitEvent, useDefault } from '../shared';
import ActionSheetList from './action-sheet-list.vue';
import ActionSheetGrid from './action-sheet-grid.vue';
import TPopup from '../popup';
import config from '../config';
import { TdActionSheetProps, ActionSheetItem } from './type';
import ActionSheetProps from './props';

const { prefix } = config;
const name = `${prefix}-action-sheet`;

export default defineComponent({
  name,
  components: {
    TPopup,
    ActionSheetList,
    ActionSheetGrid,
  },
  props: ActionSheetProps,
  emits: ['selected', 'update:modelValue', 'cancel', 'close'],
  setup(props: any, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const actionItems = computed(() => {
      return props.items.map((item: String | ActionSheetItem) => {
        if (typeof item === 'string') {
          return {
            label: item,
          };
        }
        return item;
      });
    });
    const [currentVisible] = useDefault<TdActionSheetProps['visible'], TdActionSheetProps>(
      props,
      context.emit,
      'visible',
      'visible-change',
    );
    const rootClasses = computed(() => ({
      [`${name}__content`]: true,
    }));
    const descriptionClasses = computed(() => ({
      [`${name}__description`]: true,
      [`${name}__description--left`]: props.align === 'left',
      [`${name}__description--grid`]: props.theme === 'grid',
    }));
    watch(
      () => currentVisible.value,
      (val) => {
        currentVisible.value = val;
        // emitEvent('update:modelValue', val);
      },
      {
        immediate: true,
        deep: true,
      },
    );

    const handleCancel = () => {
      emitEvent('cancel');
      context.emit('update:modelValue', false);
    };

    const handleSelected = (index: number) => {
      emitEvent('selected', props?.items[index], index);
      context.emit('update:modelValue', false);
    };

    const handleClose = () => {
      emitEvent('close');
      context.emit('update:modelValue', false);
    };

    return {
      prefix,
      name: ref(name),
      rootClasses,
      descriptionClasses,
      actionItems,
      currentVisible,
      handleCancel,
      handleSelected,
      handleClose,
    };
  },
});
</script>
