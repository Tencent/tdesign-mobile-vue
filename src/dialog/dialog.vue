<template>
  <t-popup
    :visible="visible"
    placement="center"
    :mask-transparent="!showOverlay"
    :teleport-disabled="true"
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
      <div v-if="buttonLayout != 'vertical'" :class="dFooterClassName">
        <div v-if="cancelBtn" :class="dDefaultBtnClassName" @click="handleCancel">
          <slot name="footer-cancel">
            {{ cancelBtn }}
          </slot>
        </div>
        <div v-if="confirmBtn" :class="dConformBtnClassName" @click="handleConfirm">
          <slot name="footer-confirm">
            {{ confirmBtn }}
          </slot>
        </div>
      </div>
      <div v-if="buttonLayout == 'vertical'" :class="dFooterVerticalClassName">
        <div v-if="cancelBtn" :class="dVerticalDefaultBtnClassName" @click="handleCancel">
          <slot name="footer-cancel">
            {{ cancelBtn }}
          </slot>
        </div>
        <div v-if="confirmBtn" :class="dVerticalConformBtnClassName" @click="handleConfirm">
          <slot name="footer-confirm">
            {{ confirmBtn }}
          </slot>
        </div>
      </div>
    </div>
  </t-popup>
</template>
<script lang="ts">
import { computed, ref, toRefs, watch, defineComponent, getCurrentInstance } from 'vue';
import TPopup from '../popup';
import config from '../config';
import DialogProps from './props';
import { renderContent, TNode } from '@/shared';

const { prefix } = config;
const name = `${prefix}-dialog`;

export default defineComponent({
  name,
  components: { TPopup, TNode },
  props: DialogProps,
  emits: ['update:modelValue', 'confirm', 'overlay-click', 'cancel', 'change', 'close'],
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
    const dFooterClassName = computed(() => `${name}__footer`);
    const dFooterVerticalClassName = computed(() => [`${name}__vertical-footer`, `${name}__footer`]);
    const dDefaultBtnClassName = computed(() => [`${name}__btn`, `${name}__btn--default`, `${name}__horizontal-btn`]);
    const dConformBtnClassName = computed(() => [`${name}__btn`, `${name}__btn--primary`, `${name}__horizontal-btn`]);
    const dVerticalDefaultBtnClassName = computed(() => [
      `${name}__btn`,
      `${name}__btn--default`,
      `${name}__vertical-btn`,
    ]);
    const dVerticalConformBtnClassName = computed(() => [
      `${name}__btn`,
      `${name}__btn--primary`,
      `${name}__vertical-btn`,
    ]);

    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
      width: typeof props.width === 'string' ? props.width : `${props.width}px`,
    }));

    const handleConfirm = () => {
      context.emit('update:modelValue', false);
      context.emit('confirm');
    };

    const handleCancel = () => {
      context.emit('update:modelValue', false);
      context.emit('close', 'cancel');
      context.emit('cancel');
    };

    const handleOverlayClick = () => {
      context.emit('update:modelValue', false);
      context.emit('close', 'overlay');
      context.emit('overlay-click');
    };

    watch(
      () => props.visible,
      (val: boolean) => {
        context.emit('change', val);
      },
    );

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
      dFooterVerticalClassName,
      dDefaultBtnClassName,
      dConformBtnClassName,
      dVerticalDefaultBtnClassName,
      dVerticalConformBtnClassName,
      dialogContent,
      handleConfirm,
      handleCancel,
      handleOverlayClick,
      rootStyles,
      ...toRefs(props),
    };
  },
});
</script>
