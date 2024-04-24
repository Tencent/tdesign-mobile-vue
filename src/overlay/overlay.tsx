import { Transition, computed, defineComponent } from 'vue';
import { preventDefault } from '../shared/dom';
import config from '../config';
import OverlayProps from './props';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;
const name = `${prefix}-overlay`;

export default defineComponent({
  name,
  props: OverlayProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const overlayClass = usePrefixClass('overlay');

    const overlayClasses = computed(() => ({
      [`${overlayClass.value}`]: true,
      [`${overlayClass.value}--active`]: props.visible,
    }));

    const overlayStyles = computed(() => {
      const arr = [];

      if (props.customStyle) {
        arr.push(props.customStyle);
      }
      if (props.zIndex) {
        arr.push(`z-index: ${props.zIndex}`);
      }
      if (props.duration) {
        arr.push(`transition-duration: ${props.duration}ms`);
      }
      if (props.backgroundColor) {
        arr.push(`background-color: ${props.backgroundColor}`);
      }
      return arr.join('; ');
    });

    const handleTouchMove = (e: TouchEvent) => {
      if (props.preventScrollThrough) {
        preventDefault(e, true);
      }
    };
    const handleClick = (e: MouseEvent) => {
      props.onClick?.({ e });
    };

    return () => (
      <Transition name={name}>
        <div
          v-show={props.visible}
          class={overlayClasses.value}
          style={overlayStyles.value}
          onClick={handleClick}
          onTouchmove={handleTouchMove}
        >
          {renderTNodeJSX('default')}
        </div>
      </Transition>
    );
  },
});
