<template>
  <div>
    <t-overlay v-bind="customOverlayProps" />
    <div :class="classes" :style="{ top: placement === 'top' ? '25%' : placement === 'bottom' ? '75%' : '45%' }">
      <div v-if="iconContent" :class="iconClasses">
        <t-node :content="iconContent"></t-node>
      </div>
      <div v-if="messageContent" :class="textClasses">
        <t-node :content="messageContent"></t-node>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LoadingIcon, CheckCircleIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';
import { computed, toRefs, ref, defineComponent, getCurrentInstance, h, onUnmounted } from 'vue';
import { renderTNode, TNode } from '../shared';
import TOverlay from '../overlay';
import ToastProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-toast`;
const bodyLockClass = `${name}-overflow-hidden`;

export default defineComponent({
  name,
  components: { TOverlay, TNode },
  props: ToastProps,
  setup(props) {
    const toastTypeIcon = {
      loading: LoadingIcon,
      success: CheckCircleIcon,
      error: CloseCircleIcon,
    };
    // 获取当前实例-单例
    const internalInstance = getCurrentInstance();
    // 内容渲染
    const messageContent = computed(() => renderTNode(internalInstance, 'message'));
    // 图标渲染
    const iconContent = computed(() => {
      let iconNode = renderTNode(internalInstance, 'icon');
      if (iconNode === undefined && props.theme) {
        iconNode = h(toastTypeIcon[props.theme]);
      }
      return iconNode;
    });

    const classes = computed(() => [
      `${name}`,
      `${name}__content`,
      `${name}__icon`,
      {
        [`${name}--${props.direction}`]: props.direction,
        [`${name}__content--${props.direction}`]: props.direction,
        [`${name}--loading`]: props.theme === 'loading',
      },
    ]);

    const textClasses = computed(() => [
      {
        [`${name}__text`]: !iconContent.value,
        [`${name}__text--${props.direction}`]: props.direction,
      },
    ]);

    const iconClasses = computed(() => [
      {
        [`${name}__icon--${props.direction}`]: props.direction,
      },
    ]);

    const lock = () => {
      document.body.classList.add(bodyLockClass);
    };

    const unlock = () => {
      document.body.classList.remove(bodyLockClass);
    };

    const customOverlayProps = computed(() => {
      const toastOverlayProps = {
        preventScrollThrough: props.preventScrollThrough,
        visible: props.showOverlay,
      };
      props.preventScrollThrough ? lock() : unlock();
      return {
        ...props.overlayProps,
        ...toastOverlayProps,
      };
    });

    onUnmounted(() => {
      unlock();
    });

    return {
      name: ref(name),
      classes,
      textClasses,
      iconClasses,
      iconContent,
      messageContent,
      customOverlayProps,
      ...toRefs(props),
    };
  },
});
</script>
