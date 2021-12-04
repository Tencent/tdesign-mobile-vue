<template>
  <div>
    <t-mask v-show="showOverlay" />
    <div :class="classes">
      <TNode :content="iconContent"></TNode>
      <div v-if="message" :class="`${name}__text`">{{ message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { LoadingIcon, CheckIcon, ErrorIcon } from 'tdesign-icons-vue-next';
import { renderTNode, TNode } from '@/shared';
import { computed, toRefs, ref, defineComponent, getCurrentInstance, h } from 'vue';
import TMask from '../mask';
import ToastProps from './props';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-toast`;

export default defineComponent({
  name,
  components: { TMask, LoadingIcon, CheckIcon, ErrorIcon, TNode },
  props: ToastProps,
  setup(props) {
    const toastTypeIcon = {
      loading: LoadingIcon,
      success: CheckIcon,
      fail: ErrorIcon,
    };
    const internalInstance = getCurrentInstance();
    const iconContent = computed(() => {
      let iconNode = renderTNode(internalInstance, 'icon');
      if (iconNode === undefined && props.type) {
        iconNode = h(toastTypeIcon[props.type]);
      }
      return iconNode;
    });

    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--${props.direction}`]: props.direction,
        [`${name}--text`]: !iconContent.value,
        [`${name}--icononly`]: !props.message && iconContent.value,
        [`${name}--top`]: props.position === 'top',
        [`${name}--middle`]: props.position === 'middle',
        [`${name}--bottom`]: props.position === 'bottom',
      },
    ]);

    return {
      name: ref(name),
      classes,
      iconContent,
      ...toRefs(props),
    };
  },
});
</script>
