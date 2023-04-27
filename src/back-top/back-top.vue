<script lang="ts">
import { computed, defineComponent, getCurrentInstance, h } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { BacktopIcon as TIconBackTop } from 'tdesign-icons-vue-next';

import { useEmitEvent, renderTNode, TNode } from '../shared';
import BackTopProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-back-top`;
export default defineComponent({
  name,
  components: { TNode, TIconBackTop },
  props: BackTopProps,
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const el = computed(() => {
      return props.target ? props.target() : window.document.documentElement;
    });
    const { top } = useElementBounding(el);
    const classes = computed(() => {
      return {
        [`${name}`]: true,
        [`${name}--fixed`]: props.fixed,
        [`${name}--${props.theme}`]: true,
      };
    });

    const internalInstance = getCurrentInstance();
    const iconTNode = computed(() => {
      if (context.slots?.icon || typeof props.icon === 'function') {
        return renderTNode(internalInstance, 'icon');
      }
      return h(TIconBackTop, { size: '22px' });
    });

    const clickBackBtn = () => {
      window.document.documentElement.scrollTop += top.value;
      emitEvent('to-top');
    };
    return () => {
      return h(
        'div',
        {
          class: classes.value,
          onClick: clickBackBtn,
        },
        [
          h(TNode, { content: iconTNode.value }),
          ...(props.text
            ? [
                h(
                  'span',
                  {
                    class: `${name}__text--${props.theme}`,
                  },
                  props.text,
                ),
              ]
            : []),
        ],
      );
    };
  },
});
</script>
