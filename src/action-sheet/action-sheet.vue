<template>
  <t-popup :class="name" :visible="currentVisible" @close="handleClose" position="bottom">
    <div :class="rootClasses">
      <div :class="`${name}__menu`">
        <button
          v-for="(item, index) in actionItems"
          :key="index"
          :class="`${name}__cell`"
          :disabled="item.disabled"
          @click="handleSelect(index)"
        >
          <div
            v-if="type === 'grid' && item.icon"
            :class="`${name}__cell-icon`"
            :style="{backgroundImage: `url(${item.icon})`}"
          ></div>
          <div :class="`${name}__cell-text`" :style="{color: item.color}">{{ item.label }}</div>
        </button>
      </div>
      <button v-if="showCancel" :class="`${name}__action`" @click="handleCancel">
        {{ cancelText }}
      </button>
    </div>
  </t-popup>
</template>

<script lang="ts">
import { ref, computed, SetupContext, watch, defineComponent, PropType } from 'vue';
import { IPopupProps, ActionSheetType } from './action-sheet.interface';

import TPopup from '../popup';

import config from '../config';
const { prefix } = config;

const name = `${prefix}-action-sheet`;

export default defineComponent({
  name,
  components: { TPopup },
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
     * @description 是否展示【取消】选项
     * @attribute show-cancel
     */
    showCancel: {
      type: Boolean,
      dafault: true,
    },
    /**
     * @description 【取消】选项的文本
     * @attribute cancel-text
     */
    cancelText: {
      type: String,
      default: '取消',
    },
    /**
     * @description 是否展示选中后的图标
     * @attribute show-select-icon
     */
    showSelectIcon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: IPopupProps, context: SetupContext) {
    const actionItems = ref([]);

    const currentVisible = computed(() => props.modelValue || props.visible);
    const rootClasses = computed(() => ({
      [`${name}__panel`]: true,
      [`${name}__panel-list`]: props.type === 'list',
      [`${name}__panel-grid`]: props.type === 'grid',
    }));

    watch(
      () => props.items,
      (val) => {
        console.log(val);
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
