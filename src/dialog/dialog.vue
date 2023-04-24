<template>
  <t-popup
    :visible="visible"
    placement="center"
    :show-overlay="showOverlay"
    :overlay-props="overlayProps"
    :prevent-scroll-through="preventScrollThrough"
    @close="handleOverlayClick"
  >
    <div id="root" :class="`${name}`" :style="rootStyles">
      <slot name="top" />
      <div v-if="closeBtn" :class="`${name}__close-btn`">
        <close-icon @click="handleCancel" />
      </div>
      <div :class="`${name}__content`">
        <div v-if="titleNode" :class="`${name}__header`">
          <t-node :content="titleNode" />
        </div>
        <div v-if="contentNode" :class="`${name}__body`">
          <div :class="`${name}__body-text`">
            <t-node :content="contentNode" />
          </div>
        </div>
      </div>
      <slot name="middle" />
      <div :class="footerClass">
        <slot name="actions">
          <template v-if="actionsBtnProps">
            <t-button
              v-for="(item, index) in actionsBtnProps"
              :key="index"
              v-bind="item"
              :class="buttonClass"
              @click="handleCancel"
            />
          </template>
        </slot>
        <slot name="cancelBtn">
          <template v-if="!actions && cancelBtn">
            <t-button v-bind="cancelBtnProps" :class="buttonClass" @click="handleCancel" />
          </template>
        </slot>
        <slot name="confirmBtn">
          <template v-if="!actions && confirmBtn">
            <t-button v-bind="confirmBtnProps" :class="buttonClass" @click="handleConfirm" />
          </template>
        </slot>
      </div>
    </div>
  </t-popup>
</template>
<script lang="ts">
import { CloseIcon } from 'tdesign-icons-vue-next';
import { computed, toRefs, defineComponent, getCurrentInstance } from 'vue';
import get from 'lodash/get';
import isString from 'lodash/isString';

import TButton, { ButtonProps } from '../button';
import TPopup from '../popup';
import config from '../config';
import DialogProps from './props';
import { renderContent, renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-dialog`;

export default defineComponent({
  name,
  components: { TPopup, TNode, TButton, CloseIcon },
  props: DialogProps,
  emits: ['update:visible', 'confirm', 'overlay-click', 'cancel', 'close'],
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const contentNode = computed(() => renderContent(internalInstance, 'default', 'content'));
    const titleNode = computed(() => renderTNode(internalInstance, 'title'));
    const isTextStyleBtn = computed(() =>
      [props?.confirmBtn, props?.cancelBtn, ...(props?.actions || [])].some((item) => get(item, 'variant') === 'text'),
    );

    const footerClass = computed(() => [
      `${name}__footer`,
      props.buttonLayout === 'vertical' ? `${name}__footer--column` : '',
      isTextStyleBtn.value && get(props.actions, 'length', 0) === 0 ? `${name}__footer--full` : '',
    ]);
    const buttonClass = computed(() => [
      `${name}__button`,
      props.buttonLayout === 'vertical' ? `${name}__button--vertical` : '',
      !isTextStyleBtn.value && props.buttonLayout !== 'vertical' ? `${name}__button--horizontal` : ``,
      isTextStyleBtn.value ? `${name}__button--text` : '',
    ]);

    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
      width: isString(props.width) ? props.width : `${props.width}px`,
    }));

    const handleConfirm = (e: TouchEvent) => {
      context.emit('update:visible', false);
      context.emit?.('confirm', { e });
    };

    const handleCancel = () => {
      context.emit('update:visible', false);
      context.emit('close', 'cancel');
      context.emit('cancel');
    };

    const handleOverlayClick = () => {
      if (!props.closeOnOverlayClick) {
        return;
      }
      context.emit('update:visible', false);
      context.emit('close', 'overlay');
      context.emit('overlay-click');
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

    return {
      name,
      footerClass,
      buttonClass,
      contentNode,
      titleNode,
      confirmBtnProps,
      cancelBtnProps,
      actionsBtnProps,
      handleConfirm,
      handleCancel,
      handleOverlayClick,
      rootStyles,
      ...toRefs(props),
    };
  },
});
</script>
