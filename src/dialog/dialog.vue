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
      <div v-if="title" :class="dHeaderClassName">
        <slot name="header">
          <div :class="dTitleClassName">{{ title }}</div>
        </slot>
      </div>
      <div v-if="content" :class="dBodyClassName">
        <div :class="dTextClassName">
          <t-node :content="dialogContent"></t-node>
        </div>
      </div>
      <div :class="dFooterClassName">
        <template v-if="actionsBtnProps">
          <slot name="actions">
            <t-button
              v-for="(item, index) in actionsBtnProps"
              :key="index"
              v-bind="item"
              variant="text"
              :class="dDefaultBtnClassName"
              @click="handleCancel"
            />
          </slot>
        </template>
        <template v-if="cancelBtn">
          <slot name="cancelBtn">
            <t-button v-bind="cancelBtnProps" variant="text" :class="dDefaultBtnClassName" @click="handleCancel" />
          </slot>
        </template>
        <template v-if="confirmBtn">
          <slot name="confirmBtn">
            <t-button v-bind="confirmBtnProps" variant="text" :class="dConfirmBtnClassName" @click="handleConfirm" />
          </slot>
        </template>
      </div>
    </div>
  </t-popup>
</template>
<script lang="ts">
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
    const dialogContent = renderContent(internalInstance, 'default', 'content');
    const innerValue = ref('');
    const dClassName = computed(() => `${name}`);
    const dBoxClassName = computed(() => `${name}__box`);
    const dHeaderClassName = computed(() => [
      `${name}__header`,
      {
        [`${name}__header--has-content`]: dialogContent,
      },
    ]);
    const dTitleClassName = computed(() => `${name}__title`);
    const dBodyClassName = computed(() => `${name}__body`);
    const dTextClassName = computed(() => `${name}__text`);
    const dInputClassName = computed(() => `${name}__input`);
    const dFooterClassName = computed(() => [
      {
        [`${name}__vertical-footer`]: props.buttonLayout === 'vertical',
      },
      `${name}__footer`,
    ]);
    const dDefaultBtnClassName = computed(() => [
      `${name}__btn`,
      `${name}__btn--default`,
      `${name}__${props.buttonLayout}-btn`,
    ]);
    const dConfirmBtnClassName = computed(() => [
      `${name}__btn`,
      `${name}__btn--primary`,
      `${name}__${props.buttonLayout}-btn`,
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
    const confirmBtnProps = computed(() => calcBtn(props.confirmBtn));
    const cancelBtnProps = computed(() => calcBtn(props.cancelBtn));
    const actionsBtnProps = computed(() => props.actions?.map((item) => calcBtn(item)));

    return {
      innerValue,
      dClassName,
      dBoxClassName,
      dHeaderClassName,
      dTitleClassName,
      dBodyClassName,
      dTextClassName,
      dInputClassName,
      dFooterClassName,
      dDefaultBtnClassName,
      dConfirmBtnClassName,
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
