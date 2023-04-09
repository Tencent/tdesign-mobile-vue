<template>
  <t-popup
    :visible="visible"
    placement="center"
    :mask-transparent="!showOverlay"
    :teleport-disabled="true"
    :lock-scroll="preventScrollThrough"
    @close="handleOverlayClick"
  >
    <div id="root" :class="dClassName" :style="rootStyles">
      <slot name="top" />
      <div :class="dContentClassName">
        <div :if="title" :class="dContentTitleClassName">{{ title }}</div>
        <slot name="title" />
        <div :if="dialogContent" :class="dBodyClassName">
          <div :class="dBodyTextClassName">
            <t-node :content="dialogContent"></t-node>
          </div>
        </div>
      </div>
      <slot name="middle" />
      <div :class="dFooterClassName" :style="footerStyles">
        <slot name="actions">
          <template v-if="actionsBtnProps">
            <t-button
              v-for="(item, index) in actionsBtnProps"
              :key="index"
              v-bind="item"
              :class="dCommonBtnClassName"
              @click="handleCancel"
            />
          </template>
        </slot>
        <slot name="cancelBtn">
          <template v-if="!actions && cancelBtn">
            <t-button v-bind="cancelBtnProps" :class="dCommonBtnClassName" @click="handleCancel" />
          </template>
        </slot>
        <slot name="confirmBtn">
          <template v-if="!actions && confirmBtn">
            <t-button v-bind="confirmBtnProps" :class="dCommonBtnClassName" @click="handleConfirm" />
          </template>
        </slot>
      </div>
    </div>
  </t-popup>
</template>
<script lang="ts">
import get from 'lodash/get';
import { computed, ref, toRefs, watch, defineComponent, getCurrentInstance } from 'vue';
import TButton from '../button';
import TPopup from '../popup';
import config from '../config';
import DialogProps from './props';
import { renderContent, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-dialog`;

export default defineComponent({
  name,
  components: { TPopup, TNode, TButton },
  props: DialogProps,
  emits: ['update:visible', 'confirm', 'overlay-click', 'cancel', 'change', 'close'],
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const dialogContent = computed(() => renderContent(internalInstance, 'default', 'content'));

    const innerValue = ref('');
    const dClassName = computed(() => [`${name}`, `${'t'}-class`]);
    const dContentClassName = computed(() => [`${name}__content`]);
    const dContentTitleClassName = computed(() => [`${name}__header`]);
    const dBodyClassName = computed(() => [`${name}__body`]);
    const dBodyTextClassName = computed(() => [`${name}__body-text`]);
    const dFooterClassName = computed(() => [
      `${name}__footer`,
      `${name}__footer--full`,
      props.buttonLayout === 'vertical' ? `${name}__footer--column` : '',
    ]);
    const footerStyles = computed(() => ({
      padding: '24px',
    }));
    const isUseTextBtn = () =>
      [props?.confirmBtn, props?.cancelBtn, ...(props?.actions || [])].some((item) => get(item, 'variant') === 'text');

    const dCommonBtnClassName = computed(() => [
      `${name}__button`,
      props.buttonLayout === 'vertical' ? `${name}__button--vertical` : `${name}__button--horizontal`,
      isUseTextBtn() ? `${name}__button--text` : '',
    ]);
    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
      width: typeof props.width === 'string' ? props.width : `${props.width}px`,
    }));

    const handleConfirm = () => {
      context.emit('update:visible', false);
      context.emit('confirm');
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

    watch(
      () => props.visible,
      (val: boolean) => {
        context.emit('change', val);
      },
    );

    const calcBtn = (btn: any) => (typeof btn === 'string' ? { content: btn } : btn);
    const confirmBtnProps = computed(() => ({
      ...calcBtn(props.confirmBtn),
      type: 'primary',
      theme: 'primary',
    }));
    const cancelBtnProps = computed(() => ({
      ...calcBtn(props.cancelBtn),
      type: 'cancel',
    }));
    const actionsBtnProps = computed(() => props.actions?.map((item) => calcBtn(item)));

    return {
      innerValue,
      dClassName,
      dContentClassName,
      dContentTitleClassName,
      dBodyClassName,
      dBodyTextClassName,
      dFooterClassName,
      footerStyles,
      dCommonBtnClassName,
      dialogContent,
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
