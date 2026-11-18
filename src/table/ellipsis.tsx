import { defineComponent, ref, computed, h, PropType } from 'vue';
import Popup from '../popup';
import { TdPopupProps } from '../popup/type';
import { useTNodeJSX } from '../hooks/tnode';
import { TNode } from '../common';

// 浮层属性
export type EllipsisPopupProps = TdPopupProps & { title?: TNode };

export interface EllipsisProps {
  content?: string | TNode;
  popupContent?: string | number | TNode;
  classPrefix?: string;
  attach?: TdPopupProps['attach'];
  /** 透传给 Popup 的属性，如 placement/title/closeBtn 等 */
  popupProps?: EllipsisPopupProps;
}

/** 超出省略，点击溢出内容弹出浮层预览 */
export default defineComponent({
  name: 'TEllipsis',
  props: {
    content: [String, Number, Function, Object, Array],
    popupContent: [String, Number, Function, Object, Array],
    classPrefix: String,
    attach: [String, Function] as PropType<TdPopupProps['attach']>,
    popupProps: Object as PropType<EllipsisPopupProps>,
  },
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const root = ref<HTMLElement>();
    const visible = ref(false);

    const ellipsisClasses = computed(() => [
      `${props.classPrefix}-table__ellipsis`,
      `${props.classPrefix}-text-ellipsis`,
    ]);

    const parseNode = (node: unknown) => (typeof node === 'function' ? (node as any)(h) : node);

    const renderContent = () => {
      if (props.content) {
        return parseNode(props.content);
      }
      return renderTNodeJSX('default');
    };

    const cellNode = renderContent();

    // 仅在内容溢出时弹出预览
    const handleClick = () => {
      const el = root.value;
      if (el && el.scrollWidth > el.clientWidth) visible.value = true;
    };

    const handleVisibleChange = (val: boolean) => {
      visible.value = val;
    };

    return () => {
      const {
        title,
        placement = 'bottom',
        closeBtn = true,
        showOverlay = true,
        closeOnOverlayClick = true,
        ...restPopupProps
      } = props.popupProps ?? {};

      return (
        <>
          <div ref={root} class={ellipsisClasses.value} onClick={handleClick}>
            {cellNode}
          </div>
          <Popup
            attach={props.attach}
            {...restPopupProps}
            class={`${props.classPrefix}-table__popup ${props.classPrefix}-table__popup--${placement}`}
            placement={placement}
            showOverlay={showOverlay}
            closeOnOverlayClick={closeOnOverlayClick}
            closeBtn={closeBtn}
            visible={visible.value}
            onVisibleChange={handleVisibleChange}
          >
            <div
              class={[
                `${props.classPrefix}-table__popup-inner`,
                `${props.classPrefix}-table__popup-inner--${placement}`,
              ]}
            >
              <div class={`${props.classPrefix}-table__popup-title`}>{title ? parseNode(title) : null}</div>
              <div
                class={[
                  `${props.classPrefix}-table__popup-content`,
                  `${props.classPrefix}-table__popup-content--${placement}`,
                  {
                    [`${props.classPrefix}-table__popup-content--with-close`]: closeBtn !== false,
                  },
                ]}
              >
                <div class={`${props.classPrefix}-table__popup-content-inner`}>
                  {props.popupContent != null ? parseNode(props.popupContent) : cellNode}
                </div>
              </div>
            </div>
          </Popup>
        </>
      );
    };
  },
});
