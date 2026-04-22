import { defineComponent, computed } from 'vue';
import { usePrefixClass } from '../hooks/useClass';
import props from './paragraph-props';
import Ellipsis from './ellipsis';

export default defineComponent({
  name: 'TTypographyParagraph',
  props,
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const content = computed(() => {
      return props.content || slots?.default();
    });

    return () => {
      return props.ellipsis ? (
        <Ellipsis {...props} class={COMPONENT_NAME.value}>
          {content.value}
        </Ellipsis>
      ) : (
        <p class={COMPONENT_NAME.value}>{content.value}</p>
      );
    };
  },
});
