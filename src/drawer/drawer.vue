<template>
  <t-popup
    v-model="open"
    :placement="placement"
    :attach="attach"
    :show-overlay="showOverlay"
    :z-index="zIndex"
    :close-on-overlay-click="closeOnOverlayClick"
    @visible-change="onVisibleChange"
    @close="onClose"
  >
    <div :class="`${name}`">
      <div v-if="titleNode" :class="`${name}__title`">
        <t-node :content="titleNode" />
      </div>
      <slot />

      <div :class="`${name}__sidebar`">
        <div
          v-for="(item, index) in items"
          :key="item.title"
          :class="`${name}__sidebar-item`"
          @click="onItemClick(index, item, { e: $event })"
        >
          <span v-if="!!item.icon" :class="`${name}__sidebar-item-icon`">
            <component :is="item.icon" />
          </span>
          <div :class="`${name}__sidebar-item-title`">{{ item.title }}</div>
        </div>
      </div>

      <div :class="`${name}__footer`">
        <t-node :content="footerNode" />
      </div>
    </div>
  </t-popup>
</template>

<script lang="ts">
import { ref, watch, toRefs, computed, defineComponent, getCurrentInstance } from 'vue';
import TPopup from '../popup';
import config from '../config';
import { useEmitEvent, renderTNode, TNode } from '../shared';
import DrawerProps from './props';
import { DrawerItem } from './type';

const { prefix } = config;
const name = `${prefix}-drawer`;

export default defineComponent({
  name,
  components: { TPopup, TNode },
  props: DrawerProps,
  emits: ['update:visible', 'itemClick', 'overlayClick'],
  setup(props, context) {
    const currentInstance = getCurrentInstance();
    const emitEvent = useEmitEvent(props, context.emit);
    const { visible, items, placement, showOverlay } = toRefs(props);
    const open = ref(visible.value || false);

    const titleNode = computed(() => renderTNode(currentInstance, 'title'));
    const footerNode = computed(() => renderTNode(currentInstance, 'footer'));

    watch(open, () => {
      emitEvent('update:visible', open.value);
    });

    watch(visible, () => {
      open.value = visible.value;
    });

    const onItemClick = (index: number, item: DrawerItem, context: { e: MouseEvent }) => {
      emitEvent('itemClick', index, item, context);
    };

    const onVisibleChange = (visible: boolean) => {
      if (showOverlay.value) {
        emitEvent('overlayClick', { visible });
      }
    };

    const onClose = () => {
      emitEvent('close', { trigger: 'overlay' });
    };

    return {
      name,
      items,
      placement,
      showOverlay,
      open,
      titleNode,
      footerNode,
      onItemClick,
      onVisibleChange,
      onClose,
    };
  },
});
</script>
