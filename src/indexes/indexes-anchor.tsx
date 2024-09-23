import { ComponentInternalInstance, defineComponent, getCurrentInstance, inject } from 'vue';
import config from '../config';
import indexesAnchorProps from './indexes-anchor-props';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-indexes-anchor`,
  props: indexesAnchorProps,
  setup(props) {
    const readerTNodeJSX = useTNodeJSX();
    const indexesAnchorClass = usePrefixClass('indexes-anchor');
    const instance = getCurrentInstance();
    const indexesProvide: any = inject('indexesProvide', undefined);
    const { proxy } = instance as ComponentInternalInstance;
    indexesProvide.relation(proxy);

    return () => (
      <div class={indexesAnchorClass.value} data-index={props.index}>
        <div class={`${indexesAnchorClass.value}__wrapper`}>
          <div class={`${indexesAnchorClass.value}__slot`}>{readerTNodeJSX('default')}</div>
          <div class={`${indexesAnchorClass.value}__header`}>{props.index}</div>
        </div>
      </div>
    );
  },
});
