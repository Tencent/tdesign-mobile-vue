<template>
  <t-cell v-if="type !== 'textarea'" :required="required" :class="styleWrapper">
    <template v-if="labelContent" #title>
      <div :class="styleLabel">
        <t-node :content="labelContent"></t-node>
      </div>
    </template>
    <template #leftIcon>
      <t-node :content="prefixIconContent"></t-node>
    </template>
    <template #note>
      <div :class="`${componentName}__wrap`">
        <input
          ref="inputRef"
          v-model="innerValue"
          :name="name"
          :class="styleControl"
          :type="type"
          :disabled="disabled"
          :autocomplete="autocomplete ? 'On' : 'Off'"
          :placeholder="placeholder"
          :readonly="readonly"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <div v-if="clearable && innerValue.length > 0" :class="`${componentName}__wrap--icon`" @click="handleClear">
          <close-circle-filled-icon />
        </div>
        <div v-if="suffixContent" :class="`${componentName}__wrap--suffix`">
          <t-node :content="suffixContent" />
        </div>
      </div>
      <div v-if="errorMessage" :class="`${componentName}__error-msg`">{{ errorMessage }}</div>
    </template>
    <template #rightIcon>
      <t-node :content="suffixIconContent"></t-node>
    </template>
  </t-cell>
  <div v-else :class="styleWrapper">
    <div v-if="labelContent" :class="`${componentName}--textarea-label`">
      <t-node :content="labelContent"></t-node>
    </div>
    <div :class="`${componentName}--textarea`">
      <textarea
        ref="inputRef"
        v-model="innerValue"
        :name="name"
        :maxlength="maxlength || -1"
        :disabled="disabled"
        :autocomplete="autocomplete ? 'On' : 'Off'"
        :placeholder="placeholder"
        :readonly="readonly"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div v-if="maxlength" :class="`${componentName}--count`">{{ `${innerValue.length}/${maxlength}` }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { ref, computed, watch, onMounted, defineComponent, getCurrentInstance, toRefs } from 'vue';
import { getCharacterLength, renderTNode, TNode } from '@/shared';
import ClASSNAMES from '@/shared/constants';
import config from '../config';
import InputProps from './props';
import { InputValue } from './type';

const { prefix } = config;
const componentName = `${prefix}-input`;

export default defineComponent({
  name: componentName,
  components: {
    CloseCircleFilledIcon,
    TNode,
  },
  props: InputProps,
  emits: ['update:value', 'click-icon', 'focus', 'blur', 'change'],
  setup(props, context) {
    const inputRef = ref<null | HTMLElement>(null);
    const internalInstance = getCurrentInstance();
    const cacheValue = ref('');

    const styleLabel = computed(() => ({
      [`${componentName}--label`]: true,
      [ClASSNAMES.STATUS.disabled]: props.disabled,
    }));

    const labelContent = computed(() => renderTNode(internalInstance, 'label'));
    const suffixIconContent = computed(() => renderTNode(internalInstance, 'suffixIcon'));
    const prefixIconContent = computed(() => renderTNode(internalInstance, 'prefixIcon'));
    const suffixContent = computed(() => renderTNode(internalInstance, 'suffix'));

    const styleControl = computed(() => ({
      [`${componentName}__control`]: true,
      [`${componentName}__control--right`]: suffixIconContent.value,
    }));

    const styleWrapper = computed(() => ({
      [componentName]: true,
      [`${componentName}__error`]: !!props.errorMessage,
    }));

    const innerValue = computed({
      get() {
        return String(props.value) || cacheValue.value;
      },
      set(val: string) {
        if (props.maxcharacter && props.maxcharacter >= 0) {
          const stringInfo = getCharacterLength(String(val), props.maxcharacter);
          if (typeof stringInfo === 'object') {
            cacheValue.value = stringInfo.characters;
          }
        } else {
          cacheValue.value = val;
        }
        context.emit('update:value', val);
        context.emit('change', val);
      },
    });
    const handleClickIcon = () => {
      context.emit('click-icon');
    };
    const handleClear = () => {
      innerValue.value = '';
    };
    const handleFocus = () => {
      context.emit('focus');
    };
    const handleBlur = () => {
      context.emit('blur');
    };

    onMounted(() => {
      if (props.autofocus) {
        inputRef.value?.focus();
      }
    });
    watch(innerValue, () => {
      if (props.type === 'textarea' && inputRef.value) {
        inputRef.value.style.height = 'auto';
      }
    });
    return {
      componentName,
      ...toRefs(props),
      styleLabel,
      styleWrapper,
      styleControl,
      suffixContent,
      suffixIconContent,
      prefixIconContent,
      labelContent,
      innerValue,
      inputRef,
      handleClickIcon,
      handleClear,
      handleFocus,
      handleBlur,
    };
  },
});
</script>
