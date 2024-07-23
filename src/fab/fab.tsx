import { defineComponent } from 'vue';
import config from '../config';
import FabProps from './props';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import TButton from '../button';
import { TdFabProps } from './type';

const { prefix } = config;
const name = `${prefix}-fab`;
export default defineComponent({
  name,
  props: FabProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();

    const fabClass = usePrefixClass('fab');

    const handleClick = (e: MouseEvent) => {
      props.onClick?.({ e });
    };

    return () => {
      const icon = () => renderTNodeJSX('icon');
      return (
        <div class={fabClass.value} style={props.style} onClick={handleClick}>
          <TButton
            size="large"
            theme="primary"
            shape={props.text ? 'round' : 'circle'}
            class={`${fabClass.value}__button`}
            {...(props.buttonProps as TdFabProps['buttonProps'])}
            icon={icon}
          >
            {props.text}
          </TButton>
        </div>
      );
    };
  },
});
