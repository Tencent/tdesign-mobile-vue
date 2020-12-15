<template>
  <t-popup :class="name" :visible="currentVisible" @close="handleClose" position="bottom">
    <div :class="rootClasses">

      <menu-list v-if="type === 'list'" :items="actionItems" @select="handleSelect">
        <template v-slot:cell="slotProps">
          <slot name="cell" :item="slotProps.item"></slot>
        </template>
      </menu-list>

      <menu-grid v-else :items="actionItems" :count="count" @select="handleSelect">
        <template v-slot:cell="slotProps">
          <slot name="cell" :item="slotProps.item"></slot>
        </template>
      </menu-grid>

      <template v-if="showCancel">
        <div :class="`${name}__separation`"></div>
        <button :class="`${name}__action`" @click="handleCancel">{{ cancelText }}</button>
      </template>
    </div>
  </t-popup>
</template>

<script lang="ts">
import { ref, computed, SetupContext, watch, defineComponent, PropType } from 'vue';
import { IPopupProps, ActionSheetType } from './action-sheet.interface';
import MenuList from './menu-list';
import MenuGrid from './menu-grid';
import TPopup from '../popup';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-action-sheet`;

export default defineComponent({
  name,
  components: {
    TPopup,
    MenuList,
    MenuGrid,
  },
  props: {
    modelValue: Boolean,
    /**
     * @description 是否显示
     * @attribute visible
     */
    visible: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 菜单项
     * @attribute items
     */
    items: {
      type: Array,
      required: true,
    },
    /**
     * @description 展示类型
     * @attribute type
     */
    type: {
      type: String as PropType<ActionSheetType>,
      default: 'list',
    },
    /**
     * @description grid时每页显示的数量
     * @attribute count
     */
    count: {
      type: Number,
      default: 8,
    },
    /**
     * @description 是否展示【取消】选项
     * @attribute show-cancel
     */
    showCancel: {
      type: Boolean,
      default: true,
    },
    /**
     * @description 【取消】选项的文本
     * @attribute cancel-text
     */
    cancelText: {
      type: String,
      default: '取消',
    },
  },
  setup(props: IPopupProps, context: SetupContext) {
    const actionItems = ref([]);

    const currentVisible = computed(() => props.modelValue || props.visible) as ComputedRef<boolean>;
    const rootClasses = computed(() => ({
      [`${name}__panel`]: true,
      [`${name}__panel-list`]: props.type === 'list',
      [`${name}__panel-grid`]: props.type === 'grid',
    }));

    watch(
      () => props.items,
      (val) => {
        let items = JSON.parse(JSON.stringify(val));
        // 数据格式处理，统一转为object结构
        items = items.map((item) => {
          if (typeof item === 'string') {
            return { label: item };
          }

          return item;
        });
        actionItems.value = items;
      },
      {
        immediate: true,
        deep: true,
      },
    );

    const handleCancel = () => {
      context.emit('cancel');
      context.emit('update:modelValue', false);
    };

    const handleSelect = (index) => {
      context.emit('select', props.items[index], index);
    };

    const handleClose = () => {
      context.emit('close');
      context.emit('update:modelValue', false);
    };

    return {
      name: ref(name),
      rootClasses,
      actionItems,
      currentVisible,
      handleCancel,
      handleSelect,
      handleClose,
    };
  },
});
</script>
