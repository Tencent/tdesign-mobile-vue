import { ref, watch, toRefs, computed, defineComponent, getCurrentInstance, h } from 'vue';
import TPopup from '../popup';
import config from '../config';
import { renderTNode, TNode } from '../shared';
import DrawerProps from './props';
import { DrawerItem } from './type';
import { useContent, useTNodeJSX } from '@/hooks/tnode';
import { usePrefixClass } from '@/hooks/useClass';

const { prefix } = config;
const name = `${prefix}-drawer`;

export default defineComponent({
  name,
  components: { TPopup, TNode },
  props: DrawerProps,
  emits: ['update:visible', 'itemClick', 'overlayClick'],
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const currentInstance = getCurrentInstance();
    const drawerClass = usePrefixClass('drawer');
    const { attach, visible, placement, showOverlay } = toRefs(props);
    const open = ref(visible.value || false);

    watch(open, () => {
      context.emit('update:visible', open.value);
    });

    watch(visible, () => {
      open.value = visible.value;
    });

    const onItemClick = (index: number, item: DrawerItem, context: { e: MouseEvent }) => {
      props.onItemClick?.(index, item, context);
    };

    const onVisibleChange = (visible: boolean) => {
      if (showOverlay.value) {
        props.onOverlayClick?.({ visible });
      }
    };

    const onClose = () => {
      props.onClose?.('overlay');
    };

    return () => {
      const { attach, zIndex, closeOnOverlayClick, destroyOnClose, items } = props;
      const renderTitleNode = () => {
        const titleNode = renderTNodeJSX('title');
        if (!titleNode) {
          return null;
        }
        return <div class={`${drawerClass.value}__title`}>{titleNode}</div>;
      };
      const renderFooterNode = () => {
        const footerNode = renderTNodeJSX('footer');
        if (!footerNode) {
          return null;
        }
        return <div class={`${drawerClass.value}__footer`}>{footerNode}</div>;
      };
      return (
        <t-popup
          v-model={open.value}
          placement={placement.value}
          attach={attach}
          showOverlay={showOverlay.value}
          zIndex={zIndex}
          closeOnOverlayClick={closeOnOverlayClick}
          destroyOnClose={destroyOnClose}
          onVisibleChange={onVisibleChange}
          onClose={onClose}
        >
          <div class={`${drawerClass.value}`}>
            {renderTitleNode()}
            {renderTNodeJSX('default')}

            <div class={`${drawerClass.value}__sidebar`}>
              {(items || []).map((item, index) => (
                <div
                  key={item.title}
                  class={`${drawerClass.value}__sidebar-item`}
                  onClick={(e) => onItemClick(index, item, { e })}
                >
                  {item.icon && <span class={`${drawerClass.value}__sidebar-item-icon`}>{item.icon(h)}</span>}
                  <div class={`${drawerClass.value}__sidebar-item-title`}>{item.title}</div>
                </div>
              ))}
            </div>

            {renderFooterNode()}
          </div>
        </t-popup>
      );
    };
  },
});
