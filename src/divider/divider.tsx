import { defineComponent, computed } from 'vue';
import config from '../config';
import DividerProps from './props';
import { useContent } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-divider`,
  props: DividerProps,
  setup(props) {
    const renderTNodeContent = useContent();

    const dividerClass = usePrefixClass('divider');
    const dividerClasses = computed(() => [
      `${dividerClass.value}`,
      `${dividerClass.value}--${props.layout}`,
      `${dividerClass.value}--${props.align}`,
      {
        [`${dividerClass.value}--dashed`]: props.dashed,
      },
    ]);
    return () => {
      const content = renderTNodeContent('default', 'content');
      return (
        <div class={dividerClasses.value} role="separator">
          <div class={`${dividerClass.value}__content`}>{content}</div>
        </div>
      );
    };
  },
});
