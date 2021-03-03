<template>
  <t-popup
    :visible="currentVisible"
    position="center"
    :mask-transparent="!showOverlay"
    :teleport-disabled="true"
    @opened="afterEnter"
    @closed="afterLeave"
    @close="handleClosed"
  >
    <div
      id="root"
      :class="dClassName"
      :style="rootStyles">
      <div v-if="showHeader" :class="dHeaderClassName">
        <slot name="header">
          <div :class="dTitleClassName">{{header}}</div>
        </slot>
      </div>
      <div :class="dBodyClassName">
        <slot name="content">
          <div v-if="content" :class="dTextClassName">{{content}}</div>
        </slot>
        <input
          v-if="isInput"
          id="input"
          v-model="innerValue"
          :class="dInputClassName"
          type="text"
          :placeholder="placeholderText">
      </div>
      <div v-if="type=='confirm'" :class="dFooterClassName">
        <div :class="dDefaultBtnClassName" @click="handleCancel">
          <slot name="footer-cancel">
            {{cancelContent}}
          </slot>
        </div>
        <div :class="dConformBtnClassName" @click="handleConfirm">
          <slot name="footer-confirm">
            {{confirmContent}}
          </slot>
        </div>
      </div>
      <div v-if="showFooter&&type!='confirm'" :class="dFooterClassName">
        <div :class="dDefaultBtnClassName" @click="handleConfirm">
          <slot name="footer">
            {{knowContent}}
          </slot>
        </div>
      </div>
    </div>
  </t-popup>
</template>
<script lang="ts">
import { computed, ref, toRefs, watch, defineComponent } from 'vue';
import TPopup from '../popup';
import config from '../config';
import { DialogProps } from './dialog.interface';

const { prefix } = config;
const name = `${prefix}-dialog`;

export default defineComponent({
  name,
  components: { TPopup },
  props: DialogProps,
  emits: ['update:modelValue', 'confirm', 'click-overlay', 'cancel', 'visible-change', 'closed', 'opened'],
  setup(props, context) {
    const innerValue = ref('');
    const dClassName = computed(() => `${name}`);
    const dBoxClassName = computed(() => `${name}__box`);
    const dHeaderClassName = computed(() => `${name}__header`);
    const dTitleClassName = computed(() => `${name}__title`);
    const dBodyClassName = computed(() => `${name}__body`);
    const dTextClassName = computed(() => `${name}__text`);
    const dInputClassName = computed(() => `${name}__input`);
    const dFooterClassName = computed(() => `${name}__footer`);
    const dDefaultBtnClassName = computed(() => [`${name}__btn`, `${name}__btn--default`]);
    const dConformBtnClassName = computed(() => [`${name}__btn`, `${name}__btn--primary`]);
    const currentVisible = computed(() => props.modelValue || props.visible);
    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
      width: typeof props.width === 'string' ? props.width : `${props.width}px`,
    }));

    const handleConfirm = () => {
      context.emit('update:modelValue', false);
      context.emit('confirm', innerValue.value);
      innerValue.value = '';
    };

    const handleCancel = () => {
      context.emit('update:modelValue', false);
      context.emit('cancel');
      innerValue.value = '';
    };

    const handleClosed = () => {
      context.emit('update:modelValue', false);
      context.emit('click-overlay');
      innerValue.value = '';
    };

    const afterEnter = () => {
      context.emit('opened');
    };

    const afterLeave = () => {
      context.emit('closed');
    };

    watch(
      () => currentVisible.value,
      (val) => {
        context.emit('visible-change', val);
      },
    );

    return {
      currentVisible,
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
      dConformBtnClassName,
      handleConfirm,
      handleCancel,
      handleClosed,
      rootStyles,
      ...toRefs(props),
      afterEnter,
      afterLeave,
    };
  },
});
</script>
