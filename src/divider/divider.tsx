import { defineComponent, computed } from 'vue';
import config from '../config';
import DividerProps from './props';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-divider`;
export default defineComponent({
  name,
  props: DividerProps,
  setup(props) {
    const dividerClass = usePrefixClass('divider');
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();

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
