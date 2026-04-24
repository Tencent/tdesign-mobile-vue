import { defineComponent, h } from 'vue';
import { useContent } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import props from './title-props';
import Ellipsis from './ellipsis';

export default defineComponent({
  name: 'TTypographyTitle',
  props,
  setup(props, { attrs }) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const renderContent = useContent();

    return () => {
      const { level: Tag } = props;
      const content = renderContent('default', 'content');
      return props.ellipsis ? (
        <Ellipsis {...props} class={COMPONENT_NAME.value}>
          {h(Tag, null, content)}
        </Ellipsis>
      ) : (
        <>{h(Tag, { ...attrs, class: [COMPONENT_NAME.value, attrs.class] }, content)}</>
      );
    };
  },
});
