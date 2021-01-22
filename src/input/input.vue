<template>
  <t-cell v-if="type !== 'textarea'" :class="styleWrapper" :value-align="valueAlign">
    <template v-if="hasLabel" #label>
      <slot name="label">
        <div v-if="label" :class="styleLabel">{{ label }}</div>
      </slot>
    </template>
    <template #default>
      <div :class="`${name}-wrap`">
        <input v-model="innerValue" v-bind="$attrs" :class="styleControl" :type="type" :disabled="disabled" />
        <div v-if="clearable && innerValue.length > 0" :class="`${name}-wrap--icon`" @click="handleClear">
          <t-icon name="clear-circle-filled" />
        </div>
        <div v-if="hasSuffix" :class="`${name}-wrap--suffix`">
          <slot name="suffix"></slot>
        </div>
        <div v-if="hasRightIcon" :class="`${name}-wrap--icon`">
          <slot name="rightIcon">
            <div v-if="suffix">{{ suffix }}</div>
            <t-icon v-if="rightIcon" :name="rightIcon" @click="handleClickIcon" />
          </slot>
        </div>
      </div>
      <div v-if="errorMessage" :class="`${name}__error-msg`">{{ errorMessage }}</div>
    </template>
  </t-cell>
  <div v-else>
    <div v-if="hasLabel" :class="`${name}--textarea-label`">
      <slot name="label">
        <div v-if="label">{{ label }}</div>
      </slot>
    </div>
    <div :class="`${name}--textarea`">
      <textarea ref="textarea" v-model="innerValue" v-bind="$attrs" :maxlength="maxlength" :disabled="disabled" />
      <div :class="`${name}--count`">{{ `${innerValue.length} / ${maxlength}` }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted, SetupContext, defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-input`;

export default defineComponent({
  name,
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    error: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    rightIcon: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: 500,
    },
    rows: {
      type: Number,
      default: 4,
    },
    maxRows: {
      type: Number,
      default: 12,
    },
    clearable: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'click-icon'],
  setup(props, context: SetupContext) {
    const textarea = ref();
    const cacheValue = ref('');

    const styleControl = computed(() => ({
      [`${name}--control`]: true,
      [`${name}--control__right`]: props.suffix
    }));
    const styleWrapper = computed(() => ({
      [name]: true,
      [`${name}__error`]: !!props.errorMessage || props.error
    }));
    const styleLabel = computed(() => ({
      [`${name}--label`]: true,
      [`${name}__disabled`]: props.disabled
    }));

    const hasLabel = computed(() => {
      if (props.label) return true;
      return !!context.slots.label;
    });

    const hasSuffix = computed(() => !!context.slots.suffix);
    const hasRightIcon = computed(() => {
      if (props.rightIcon || props.suffix) return true;
      return !!context.slots.rightIcon;
    });
    const valueAlign = computed(() => (hasLabel.value ? 'right' : 'left'));

    const innerValue = computed({
      get() {
        return props.modelValue || cacheValue.value;
      },
      set(val: string) {
        cacheValue.value = val;
        context.emit('update:modelValue', val);
      },
    });
    const handleClickIcon = () => {
      context.emit('click-icon');
    };
    const handleClear = () => {
      innerValue.value = '';
    };

    const MIN_HEIGHT = 22 * props.rows; // 默认四行
    const MAX_HEIGHT = 22 * props.maxRows; // 默认12行
    onMounted(() => {
      if (props.type === 'textarea') {
        textarea.value.style.height = `${MIN_HEIGHT}px`;
      }
    });
    watch(innerValue, () => {
      if (props.type === 'textarea') {
        textarea.value.style.height = 'auto';
        let height = textarea.value.scrollHeight;
        if (height < MIN_HEIGHT) {
          height = MIN_HEIGHT;
        }
        if (height > MAX_HEIGHT) {
          // 如果只设置rows，且rows大于maxRows，则忽略maxRows
          height = MIN_HEIGHT > MAX_HEIGHT ? MIN_HEIGHT : MAX_HEIGHT;
        }
        textarea.value.style.height = `${height}px`;
      }
    });
    return {
      name,
      styleLabel,
      styleWrapper,
      styleControl,
      hasLabel,
      hasRightIcon,
      hasSuffix,
      innerValue,
      valueAlign,
      textarea,
      handleClickIcon,
      handleClear,
    };
  },
});
</script>
