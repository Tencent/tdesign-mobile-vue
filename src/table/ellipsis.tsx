import { defineComponent, ref, computed, h } from 'vue';
import Popup from '../popup';
import { TdPopupProps } from '../popup/type';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import { TNode } from '../common';

// 浮层属性
export type EllipsisPopupProps = TdPopupProps & { title?: TNode };

export interface EllipsisProps {
  content?: TNode;
  popupContent?: TNode;
  popupProps?: EllipsisPopupProps;
  classPrefix?: string;
  attach?: TdPopupProps['attach'];
  zIndex?: number;
  overlayClassName?: string;
}

/** 超出省略，点击溢出内容弹出浮层预览 */
export default defineComponent({
  name: 'TEllipsis',
  props: {
    content: [String, Number, Function, Object, Array],
    popupContent: [String, Number, Function, Object, Array],
    popupProps: Object as import('vue').PropType<EllipsisPopupProps>,
    classPrefix: String,
    attach: [String, Function] as import('vue').PropType<TdPopupProps['attach']>,
    zIndex: Number,
    overlayClassName: String,
  },
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const componentName = usePrefixClass('table');
    const root = ref<HTMLElement>();
    const visible = ref(false);

    const ellipsisClasses = computed(() => [
      props.classPrefix ? `${props.classPrefix}-table__ellipsis` : `${componentName.value}__ellipsis`,
      props.classPrefix ? `${props.classPrefix}-text-ellipsis` : 't-text-ellipsis',
      props.overlayClassName,
    ]);

    const renderContent = () => {
      if (props.content !== undefined) {
        return typeof props.content === 'function' ? (props.content as any)(h) : props.content;
      }
      return renderTNodeJSX('default');
    };

    const cellNode = renderContent();

    // 仅在内容真正溢出时才弹出浮层
    const handleClick = () => {
      const el = root.value;
      if (el && el.scrollWidth > el.clientWidth) {
        visible.value = true;
      }
    };

    const popupVisible = computed({
      get: () => props.popupProps?.visible ?? visible.value,
      set: (val: boolean) => {
        visible.value = val;
      },
    });

    const handleVisibleChange = (val: boolean, trigger: any) => {
      visible.value = val;
      props.popupProps?.onVisibleChange?.(val, trigger);
    };

    const popupPlacement = props.popupProps?.placement || 'bottom';
    const showCloseBtn = props.popupProps?.closeBtn ?? true;

    const renderPopupContent = () => {
      if (props.popupContent !== undefined) {
        return typeof props.popupContent === 'function' ? (props.popupContent as any)(h) : props.popupContent;
      }
      return cellNode;
    };

    const renderPopupTitle = () => {
      const title = props.popupProps?.title;
      if (title === undefined || title === null) return null;
      return (
        <div class={`${componentName.value}__popup-title`}>
          {typeof title === 'function' ? (title as any)(h) : title}
        </div>
      );
    };

    return () => (
      <>
        <div ref={root} class={ellipsisClasses.value} onClick={handleClick}>
          {cellNode}
        </div>
        <Popup
          visible={popupVisible.value}
          onVisibleChange={handleVisibleChange}
          placement={popupPlacement}
          showOverlay={props.popupProps?.showOverlay}
          closeOnOverlayClick={props.popupProps?.closeOnOverlayClick}
          closeBtn={showCloseBtn}
          destroyOnClose={props.popupProps?.destroyOnClose}
          zIndex={props.zIndex ?? props.popupProps?.zIndex}
          attach={props.attach ?? props.popupProps?.attach}
          overlayProps={props.popupProps?.overlayProps}
          class={[`${componentName.value}__popup`, `${componentName.value}__popup--${popupPlacement}`]}
        >
          <div class={`${componentName.value}__popup-inner`}>
            {renderPopupTitle()}
            <div
              class={[
                `${componentName.value}__popup-content`,
                {
                  [`${componentName.value}__popup-content--center`]: popupPlacement === 'center',
                  [`${componentName.value}__popup-content--with-close`]: showCloseBtn !== false,
                },
              ]}
            >
              {renderPopupContent()}
            </div>
          </div>
        </Popup>
      </>
    );
  },
});
