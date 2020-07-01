<template>
  <div v-if="isShowDialog">
    <t-mask @click="handleCancel" />
    <!-- 对话框 -->
    <div :class="dClassName">
      <div :class="dHeaderClassName" v-if="showTitle">
        <slot name="title">
          <div :class="dTitleClassName">{{title}}</div>
        </slot>
      </div>
      <div :class="dBodyClassName">
        <slot name="tips">
          <div :class="dTextClassName" v-if="tips">{{tips}}</div>
        </slot>
        <input
          v-model="innerValue"
          :class="dInputClassName"
          type="text"
          :placeholder="placeholderText"
          v-if="isInput">
      </div>
      <div :class="dFooterClassName" v-if="type=='confirm'">
        <a href="javascript:" :class="dDefaultBtnClassName" @click="handleCancel">
          <slot name="footer-cancel">
            {{cancelButtonText}}
          </slot>
        </a>
        <a href="javascript:" :class="dConformBtnClassName" @click="handleConfirm">
          <slot name="footer-confirm">
            {{confirmButtonText}}
          </slot>
        </a>
      </div>
      <div :class="dFooterClassName" v-if="showFooter&&type!='confirm'">
        <a href="javascript:" :class="dDefaultBtnClassName" @click="handleConfirm">
          <slot name="footer">
            {{sureButtonText}}
          </slot>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import TMask from '../mask';
import { SetupContext, computed, ref, watch } from 'vue';
import config from '../config';
import { DialogProps, IDialogProps } from './dialog.interface';

const { prefix } = config;
const name = `${prefix}-dialog`;

export default {
  name,
  components: { TMask },
  props: DialogProps,
  setup(props: IDialogProps, context: SetupContext) {
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
    const showTitle = computed(() => props.showTitle);
    const title = computed(() => props.title || '温馨提醒');
    const tips = computed(() => props.tips || '');
    const type = computed(() => props.type || '');
    const showFooter = computed(() => props.showFooter);
    const confirmButtonText = computed(() => props.confirmButtonText || '确定');
    const cancelButtonText = computed(() => props.cancelButtonText || '取消');

    const isInput = computed(() => props.isInput);
    const isShowDialog = computed(() => props.isShowDialog);

    const handleConfirm = () => {
      context.emit('confirm', innerValue.value);
      innerValue.value = '';
    };

    const handleCancel = () => {
      context.emit('cancel');
      innerValue.value = '';
    };

    watch(isShowDialog, (val) => {
      if (val) {
        context.emit('opened', val);
      } else {
        context.emit('closed', val);
      }
    });

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
      dConformBtnClassName,
      showTitle,
      title,
      tips,
      type,
      showFooter,
      confirmButtonText,
      cancelButtonText,
      handleConfirm,
      handleCancel,
      isInput,
      isShowDialog,
    };
  },
};
</script>
