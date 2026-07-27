import { ComponentInternalInstance, defineComponent, getCurrentInstance, inject, onBeforeUnmount } from 'vue';
import indexesAnchorProps from './indexes-anchor-props';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TIndexesAnchor',
  props: indexesAnchorProps,
  setup(props) {
    const readerTNodeJSX = useTNodeJSX();
    const indexesAnchorClass = usePrefixClass('indexes-anchor');
    const instance = getCurrentInstance();
    const indexesProvide: any = inject('indexesProvide', undefined);
    const { proxy } = instance as ComponentInternalInstance;
    indexesProvide.relation(proxy);

    onBeforeUnmount(() => {
      indexesProvide.unRelation(proxy);
    });

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
