import { CloseIcon } from 'tdesign-icons-vue-next';
import { computed, defineComponent } from 'vue';
import get from 'lodash/get';
import isString from 'lodash/isString';

import TButton, { ButtonProps } from '../button';
import TPopup from '../popup';
import config from '../config';
import props from './props';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-dialog`,
  components: { TPopup, TButton, CloseIcon },
  props,
  emits: ['update:visible', 'confirm', 'overlay-click', 'cancel', 'close', 'closed'],
  setup(props, context) {
    const dialogClass = usePrefixClass('dialog');

    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const isTextStyleBtn = computed(() =>
      [props?.confirmBtn, props?.cancelBtn, ...(props?.actions || [])].some((item) => get(item, 'variant') === 'text'),
    );

    const footerClass = computed(() => [
      `${dialogClass.value}__footer`,
      {
        [`${dialogClass.value}__footer--column`]: props.buttonLayout === 'vertical',
        [`${dialogClass.value}__footer--full`]: isTextStyleBtn.value && get(props.actions, 'length', 0) === 0,
      },
    ]);

    const buttonClass = computed(() => [
      `${dialogClass.value}__button`,
      {
        [`${dialogClass.value}__button--${props.buttonLayout}`]: !isTextStyleBtn.value,
        [`${dialogClass.value}__button--text`]: isTextStyleBtn.value,
      },
    ]);

    const rootStyles = computed(() => ({
      width: isString(props.width) ? props.width : `${props.width}px`,
    }));

    const handleClose = (args: { e: MouseEvent }) => {
      const { e } = args;
      context.emit('update:visible', false);
      context.emit('close', { e, trigger: 'close-btn' });
    };

    const handleClosed = () => {
      context.emit('closed');
    };

    const handleConfirm = (e: MouseEvent) => {
      context.emit('update:visible', false);
      context.emit?.('confirm', { e });
    };

    const handleCancel = (e: MouseEvent) => {
      context.emit('update:visible', false);
      context.emit('close', { e, trigger: 'cancel' });
      context.emit('cancel', { e });
    };

    const handleOverlayClick = (args: { e: MouseEvent }) => {
      const { e } = args;
      if (!props.closeOnOverlayClick) {
        return;
      }
      context.emit('update:visible', false);
      context.emit('close', { e, trigger: 'overlay' });
      context.emit('overlay-click', { e });
    };

    const calcBtn = (btn: any) => (isString(btn) ? { content: btn } : btn);
    const confirmBtnProps = computed(() => ({
      theme: 'primary',
      ...calcBtn(props.confirmBtn),
    }));
    const cancelBtnProps = computed<ButtonProps>(() => ({
      theme: isTextStyleBtn.value ? 'default' : 'light',
      ...calcBtn(props.cancelBtn),
    }));
    const actionsBtnProps = computed(() => props.actions?.map((item) => calcBtn(item)));

    return () => {
      const { visible, showOverlay, overlayProps, preventScrollThrough, destroyOnClose, zIndex, closeBtn, actions } =
        props;
      const renderTitleNode = () => {
        const titleNode = renderTNodeJSX('title');
        if (!titleNode) {
          return null;
        }

        return <div class={`${dialogClass.value}__header`}>{titleNode}</div>;
      };
      const renderContentNode = () => {
        const contentNode = renderContent('default', 'content');
        if (!contentNode) {
          return null;
        }
        return (
          <div class={`${dialogClass.value}__body`}>
            <div class={`${dialogClass.value}__body-text`}>{contentNode}</div>
          </div>
        );
      };
      const renderActionsNode = () => {
        const actionsNode = renderTNodeJSX('actions');
        if (actionsNode && actionsBtnProps.value) {
          return actionsBtnProps.value.map((item, index) => (
            <t-button key={index} {...item} class={buttonClass.value} onClick={handleCancel} />
          ));
        }
        return null;
      };
      const renderCancelBtnNode = () => {
        const cancelBtnNode = renderTNodeJSX('cancelBtn');
        if (!actions && cancelBtnNode) {
          return <t-button {...cancelBtnProps.value} class={buttonClass.value} onClick={handleCancel} />;
        }
        return null;
      };

      const renderConfirmBntNode = () => {
        const confirmBtnNode = renderTNodeJSX('confirmBtn');
        if (!actions && confirmBtnNode) {
          return <t-button {...confirmBtnProps.value} class={buttonClass.value} onClick={handleConfirm} />;
        }
        return null;
      };
      return (
        <t-popup
          visible={visible}
          placement="center"
          show-overlay={showOverlay}
          overlay-props={overlayProps}
          prevent-scroll-through={preventScrollThrough}
          destroy-on-close={destroyOnClose}
          z-index={zIndex}
          onClose={handleOverlayClick}
          onClosed={handleClosed}
        >
          <div class={`${dialogClass.value} ${context.attrs.class || ''}`} style={rootStyles.value}>
            {renderTNodeJSX('top')}
            {closeBtn && (
              <div class={`${dialogClass.value}__close-btn`}>
                <close-icon onClick={handleClose} />
              </div>
            )}
            <div class={`${dialogClass.value}__content`}>
              {renderTitleNode()}
              {renderContentNode()}
            </div>
            {renderTNodeJSX('middle')}
            <div class={footerClass.value}>
              {renderActionsNode()}
              {renderCancelBtnNode()}
              {renderConfirmBntNode()}
            </div>
          </div>
        </t-popup>
      );
    };
  },
});
