<template>
  <transition name="dialog" @after-leave="afterLeave" @after-enter="afterEnter">
    <div v-if="currentVisible" ref="root">
      <t-mask @click="handleClosed" />
      <!-- 对话框 -->
      <div :class="dClassName" id="root">
        <div :class="dHeaderClassName" v-if="showTitle">
          <slot name="title">
            <div :class="dTitleClassName">{{title}}</div>
          </slot>
        </div>
        <div :class="dBodyClassName">
          <slot name="content">
            <div :class="dTextClassName" v-if="content">{{content}}</div>
          </slot>
          <input
            v-model="innerValue"
            id="input"
            :class="dInputClassName"
            type="text"
            :placeholder="placeholderText"
            v-if="isInput">
        </div>
        <div :class="dFooterClassName" v-if="type=='confirm'">
          <a href="javascript:" :class="dDefaultBtnClassName" @click="handleCancel">
            <slot name="footer-cancel">
              {{cancelContent}}
            </slot>
          </a>
          <a href="javascript:" :class="dConformBtnClassName" @click="handleConfirm">
            <slot name="footer-confirm">
              {{confirmContent}}
            </slot>
          </a>
        </div>
        <div :class="dFooterClassName" v-if="showFooter&&type!='confirm'">
          <a href="javascript:" :class="dDefaultBtnClassName" @click="handleConfirm">
            <slot name="footer">
              {{knowContent}}
            </slot>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import TMask from '../mask';
import { SetupContext, computed, ref } from 'vue';
import config from '../config';
import { DialogProps, IDialogProps } from './dialog.interface';

const { prefix } = config;
const name = `${prefix}-dialog`;

export default {
  name,
  components: { TMask },
  props: DialogProps,
  setup(props: IDialogProps, context: SetupContext) {
    const root = ref(null);
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
    const title = computed(() => props.title);
    const content = computed(() => props.content);
    const type = computed(() => props.type);
    const showFooter = computed(() => props.showFooter);
    const confirmContent = computed(() => props.confirmContent);
    const cancelContent = computed(() => props.cancelContent);
    const knowContent = computed(() => props.knowContent);

    const isInput = computed(() => props.isInput);
    const currentVisible = computed(() => props.modelValue || props.visible);

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
      context.emit('clickoverlay');
      innerValue.value = '';
    };

    return {
      root,
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
      showTitle,
      title,
      content,
      type,
      showFooter,
      confirmContent,
      cancelContent,
      handleConfirm,
      handleCancel,
      handleClosed,
      isInput,
      knowContent,
      afterEnter: () => context.emit('opened'),
      afterLeave: () => context.emit('closed'),
    };
  },
};
</script>
