<template>
  <div>
    <t-mask v-show="showOverlay" />
    <div :class="classes">
      <component :is="computedIcon" :class="`${name}__icon`"> </component>
      <div v-if='message' :class="`${name}__text`">{{ message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import TIconLoading from '../icon/loading.vue';
import TIconCheck from '../icon/check.vue';
import TIconWarning from '../icon/warning.vue';
import { computed, toRefs, ref, defineComponent } from 'vue';
import TMask from '../mask';
import ToastProps from './props';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-toast`;

export default defineComponent({
  name,
  components: { TMask, TIconLoading, TIconCheck, TIconWarning },
  props: ToastProps,
  setup(props, context) {
    const toastTypeIcon = {
      loading: TIconLoading,
      success: TIconCheck,
      fail: TIconWarning,
    };
    const computedIcon = computed(() => {
      if (typeof props.icon === 'function') {
        return props.icon();
      }
      if (!!context.slots.icon) {
        return context.slots.icon;
      }
      if (props.type) {
        return toastTypeIcon[props.type];
      }
      return undefined;
    });

    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--${props.direction}`]: props.direction,
        [`${name}--text`]: !computedIcon.value,
        [`${name}--icononly`]: !props.message && computedIcon.value,
        [`${name}--top`]: props.position === 'top',
        [`${name}--middle`]: props.position === 'middle',
        [`${name}--bottom`]: props.position === 'bottom',
      },
    ]);

    return {
      name: ref(name),
      classes,
      computedIcon,
      ...toRefs(props),
    };
  },
});
</script>
