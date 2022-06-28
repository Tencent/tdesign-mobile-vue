<template>
  <div>
    <t-overlay v-show="showOverlay" v-bind="customOverlayProps" />
    <div :class="classes">
      <t-node :content="iconContent"></t-node>
      <div v-if="messageContent" :class="`${name}__text`">
        <t-node :content="messageContent"></t-node>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LoadingIcon, CheckCircleIcon, ErrorCircleIcon } from 'tdesign-icons-vue-next';
import { computed, toRefs, ref, defineComponent, getCurrentInstance, h, onMounted, onUnmounted } from 'vue';
import { renderTNode, TNode } from '../shared';
import TOverlay from '../overlay';
import ToastProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-toast`;

export default defineComponent({
  name,
  components: { TOverlay, TNode },
  props: ToastProps,
  setup(props) {
    const toastTypeIcon = {
      loading: LoadingIcon,
      success: CheckCircleIcon,
      fail: ErrorCircleIcon,
    };
    const internalInstance = getCurrentInstance();
    const messageContent = computed(() => renderTNode(internalInstance, 'message'));
    const iconContent = computed(() => {
      let iconNode = renderTNode(internalInstance, 'icon');
      if (iconNode === undefined && props.theme) {
        iconNode = h(toastTypeIcon[props.theme]);
      }
      return iconNode;
    });

    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--${props.direction}`]: props.direction,
        [`${name}--text`]: !iconContent.value,
        [`${name}--icononly`]: !messageContent.value && iconContent.value,
        [`${name}--top`]: props.placement === 'top',
        [`${name}--middle`]: props.placement === 'middle',
        [`${name}--bottom`]: props.placement === 'bottom',
      },
    ]);

    const preventScrollCls = `${prefix}-overflow-hidden`;
    const preventScrollThrough = computed(
      () => props.preventScrollThrough || (props.showOverlay && props.preventScrollThrough !== false),
    );
    onMounted(() => {
      preventScrollThrough.value && document.body.classList.add(preventScrollCls);
    });
    onUnmounted(() => {
      preventScrollThrough.value && document.body.classList.remove(preventScrollCls);
    });

    const baseOverlayProps = {
      transparent: false,
    };
    const customOverlayProps = computed(() => ({ ...baseOverlayProps, ...props.overlayProps }));

    return {
      name: ref(name),
      classes,
      iconContent,
      messageContent,
      customOverlayProps,
      ...toRefs(props),
    };
  },
});
</script>
