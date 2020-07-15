<template>
  <t-cell v-if="type !== 'textarea'" :class="styleWrapper" :value-align="valueAlign">
    <template v-if="hasLabel" #label>
      <slot name="label">
        <div v-if="label" :class="styleLabel">{{ label }}</div>
      </slot>
    </template>
    <template #default>
      <div :class="styleValueWrap">
        <input
          v-bind="$attrs"
          v-model="innerValue"
          :class="styleControl"
          :type="type"
          :disabled="disabled"
        />
        <div v-if="clearable && innerValue.length > 0" @click="handleClear" :class="styleIcon">
          <t-icon icon="circle_clear" />
        </div>
        <div v-if="hasSuffix" :class="styleSuffix">
          <slot name="suffix"></slot>
        </div>
        <div v-if="hasRightIcon" :class="styleIcon">
          <slot name="rightIcon">
            <div v-if="suffix">{{ suffix }}</div>
            <t-icon v-if="rightIcon" :icon="rightIcon" @click="handleClickIcon" />
          </slot>
        </div>
      </div>
      <div v-if="errorMessage" :class="styleErrMsg">{{ errorMessage}}</div>
    </template>
  </t-cell>
  <div v-else>
    <div v-if="hasLabel" :class="styleTextareaLabel">
      <slot name="label">
        <div v-if="label">{{ label }}</div>
      </slot>
    </div>
    <div :class="styleTextarea">
      <textarea
        v-bind="$attrs"
        ref="textarea"
        v-model="innerValue"
        :maxlength="maxlength"
        :disabled="disabled"
      />
      <div :class="styleCount">{{ `${innerValue.length} / ${maxlength}` }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  onMounted,
  SetupContext,
  defineComponent,
} from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-input`;

export default defineComponent({
  name,
  props: {
    label: String,
    modelValue: String,
    error: Boolean,
    errorMessage: String,
    rightIcon: String,
    suffix: String,
    type: String,
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
  setup(props, context: SetupContext) {
    const { emit } = context;
    const textarea = ref();
    const state = reactive({
      styleValueWrap: `${name}-wrap`,
      styleErrMsg: `${name}__error-msg`,
      styleSuffix: `${name}-wrap--suffix`,
      styleIcon: `${name}-wrap--icon`,
      styleTextarea: `${name}--textarea`,
      styleTextareaLabel: `${name}--textarea-label`,
      styleCount: `${name}--count`,
      styleDisabled: `${name}__disabled`,
      cacheValue: '',
    });
    const styleControl = computed(() => {
      if (props.suffix) {
        return `${name}--control ${name}--control__right`;
      }
      return `${name}--control`;
    });
    const styleWrapper = computed(() => {
      if (!!props.errorMessage || props.error) {
        return `${name} ${name}__error`;
      }
      return name;
    });
    const styleLabel = computed(() => {
      if (props.disabled) return `${name}--label ${name}__disabled`;
      return `${name}--label`;
    });
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
        return props.modelValue || state.cacheValue;
      },
      set(val: string) {
        emit('update:modelValue', val);
        state.cacheValue = val;
      },
    });
    const handleClickIcon = () => {
      emit('click-icon');
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
          height =  MIN_HEIGHT > MAX_HEIGHT ? MIN_HEIGHT : MAX_HEIGHT;
        }
        textarea.value.style.height = `${height}px`;
      }
    });
    return {
      ...toRefs(state),
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
