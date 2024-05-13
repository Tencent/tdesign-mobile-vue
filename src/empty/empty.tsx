import { defineComponent } from 'vue';
import TImage from '../image';
import EmptyProps from './props';
import config from '../config';

import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;
const name = `${prefix}-empty`;

export default defineComponent({
  name,
  props: EmptyProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const emptyClass = usePrefixClass('empty');

    return () => {
      const action = renderTNodeJSX('action');
      const description = renderTNodeJSX('description');

      const readerThumb = () => {
        const image = renderTNodeJSX('image');
        if (image) {
          if (typeof props.image === 'string') {
            return <TImage v-if="typeof image === 'string'" src={props.image} />;
          }
          return image;
        }

        const icon = renderTNodeJSX('icon');
        if (icon) {
          return <div class={`${emptyClass.value}__icon`}>{icon}</div>;
        }
        return null;
      };

      return (
        <div class={emptyClass.value}>
          <div class={`${emptyClass.value}__thumb`}>{readerThumb()}</div>

          {description && <div class={`${emptyClass.value}__description`}>{description}</div>}
          {action && <div class={`${emptyClass.value}__actions`}>{action}</div>}
        </div>
      );
    };
  },
});
