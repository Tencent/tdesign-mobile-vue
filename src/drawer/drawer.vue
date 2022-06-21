<template>
  <t-popup
    v-model="open"
    :placement="placement"
    :show-overlay="showOverlay"
    :z-index="zIndex"
    @visible-change="onVisibleChange"
    @close="onClose"
  >
    <div :class="dSideBarClassName">
      <div
        v-for="(item, index) in items"
        :key="item.title"
        :class="dSideBarItemClassName"
        @click="onItemClick(index, item, { e: $event })"
      >
        <span v-if="!!item.icon" :class="dSideBarItemIconClassName"><component :is="item.icon"></component></span>
        <div :class="dSideBarItemTitleClassName">{{ item.title }}</div>
      </div>
    </div>
  </t-popup>
</template>

<script lang="ts">
import { ref, watch, toRefs, computed, SetupContext, defineComponent } from 'vue';
import TPopup from '../popup';
import config from '../config';
import { useEmitEvent } from '../shared';
import DrawerProps from './props';
import { DrawerItem, TdDrawerProps } from './type';

const { prefix } = config;
const name = `${prefix}-drawer`;

export default defineComponent({
  name,
  components: { TPopup },
  props: DrawerProps,
  emits: ['update:visible', 'itemClick', 'overlayClick'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const { visible, items, placement, showOverlay, zIndex } = toRefs(props);
    const open = ref(visible.value || false);

    const dSideBarClassName = computed(() => `${name}__sidebar`);
    const dSideBarItemClassName = computed(() => `${name}__sidebar-item`);
    const dSideBarItemIconClassName = computed(() => `${name}__sidebar-item-icon`);
    const dSideBarItemTitleClassName = computed(() => `${name}__sidebar-item-title`);

    watch(open, () => {
      emitEvent('update:visible', open.value);
    });

    watch(visible, () => {
      open.value = visible.value;
    });

    const onItemClick: TdDrawerProps['onItemClick'] = (index: number, item: DrawerItem, context: { e: MouseEvent }) => {
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
      items,
      placement,
      showOverlay,
      zIndex,
      open,
      dSideBarClassName,
      dSideBarItemClassName,
      dSideBarItemIconClassName,
      dSideBarItemTitleClassName,
      onItemClick,
      onVisibleChange,
      onClose,
    };
  },
});
</script>
