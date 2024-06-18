import { CSSProperties, PropType, defineComponent } from 'vue';
import config from '../../config';

import { usePrefixClass } from '../../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-spinner`,
  props: {
    style: Object as PropType<CSSProperties>,
  },
  setup(props) {
    const spinnerClass = usePrefixClass('loading__spinner');

    return () => (
      <span class={spinnerClass.value} style={props.style}>
        {[...new Array(12)].map((_, index) => (
          <i class={[`${spinnerClass.value}--line`, `${spinnerClass.value}--line-${index + 1}`]} />
        ))}
      </span>
    );
  },
});
