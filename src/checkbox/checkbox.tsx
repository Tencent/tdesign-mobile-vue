import { defineComponent, h, toRefs, computed, inject, getCurrentInstance } from 'vue';
import {
  CheckCircleFilledIcon,
  CircleIcon,
  MinusCircleFilledIcon,
  MinusRectangleFilledIcon,
  CheckRectangleFilledIcon,
} from 'tdesign-icons-vue-next';
import config from '../config';
import CheckboxProps from './props';
import { TNode, useDefault } from '../shared';
import { TdCheckboxProps } from '../checkbox/type';
import MinusLineFilledIcon from './assets/minus-line-filled-icon.svg';
import CheckLineFilledIcon from './assets/check-line-filled-icon.svg';
import { useTNodeJSX, useContent } from '../hooks/tnode';

const { prefix } = config;
const name = `${prefix}-checkbox`;

export default defineComponent({
  name,
  components: { TNode },
  props: {
    ...CheckboxProps,
    borderless: {
      type: Boolean,
      value: false,
    },
  },
  emits: ['update:checked', 'update:modelValue', 'change'],
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const [innerChecked, setInnerChecked] = useDefault<boolean, TdCheckboxProps>(
      props,
      context.emit,
      'checked',
      'change',
    );
    const checkboxGroup: any = inject('checkboxGroup', undefined);
    const indeterminate = computed<boolean>(() => {
      if (props.checkAll && checkboxGroup != null) return checkboxGroup.checkAllStatus.value === 'indeterminate';
      return props.indeterminate;
    });

    const isIconArray = Array.isArray(props.icon);
    const defaultCheckIcons = [h(CheckCircleFilledIcon), h(CircleIcon)];
    const checkIcons = computed(() => {
      if (isIconArray && props.icon.length > 1) {
        return props.icon.map((icon) =>
          typeof icon === 'string' ? h('img', { class: `${name}__icon-image`, src: icon }) : icon,
        );
      }
      return defaultCheckIcons;
    });

    const checkedIcon = computed(() => {
      if (props.icon === 'circle' || props.icon === true)
        return indeterminate.value ? h(MinusCircleFilledIcon) : h(CheckCircleFilledIcon);
      if (props.icon === 'rectangle')
        return indeterminate.value ? h(MinusRectangleFilledIcon) : h(CheckRectangleFilledIcon);
      if (props.icon === 'line')
        return indeterminate.value ? h('img', { src: MinusLineFilledIcon }) : h('img', { src: CheckLineFilledIcon });
      return null;
    });

    const isChecked = computed(() => {
      if (props.checkAll) {
        const checkAllStatus = checkboxGroup?.checkAllStatus.value;
        return checkAllStatus === 'checked' || checkAllStatus === 'indeterminate';
      }
      if (checkboxGroup != null && props.value != null) {
        return !!checkboxGroup.checkedSet.value?.has(props.value);
      }
      return innerChecked.value;
    });

    const isDisabled = computed(() => {
      if (checkboxGroup?.max.value)
        return checkboxGroup.max.value <= checkboxGroup.innerValue.value.length && !isChecked.value;
      if (props.disabled != null) return props.disabled;
      return !!checkboxGroup?.disabled.value;
    });

    const handleChange = (e: Event, source?: string) => {
      if (isDisabled.value) return;
      if (source === 'text' && props.contentDisabled) return;

      const value = !isChecked.value;
      setInnerChecked(value, { e });
      e.stopPropagation();
      if (checkboxGroup && checkboxGroup?.onCheckedChange) {
        checkboxGroup.onCheckedChange({ checked: value, checkAll: props.checkAll, e, option: props });
      }
    };
    return () => {
      const { placement, block, icon, maxLabelRow, maxContentRow, borderless } = props;
      const renderIconArray = () => {
        if (isIconArray) {
          return <t-node content={checkIcons.value[isChecked.value ? 0 : 1]} class={`${name}__icon-wrapper`} />;
        }
        if (isChecked.value) {
          return <t-node content={checkedIcon.value} class={`${name}__icon-wrapper`} />;
        }
        return (
          <>
            {(icon === 'circle' || icon === true || icon === 'rectangle') && (
              <div
                class={{
                  [`${name}__icon-circle`]: icon === true,
                  [`${name}__icon-${icon}`]: typeof icon === 'string',
                  [`${name}__icon-${icon}--disabled`]: isDisabled.value,
                }}
              ></div>
            )}
            {icon === 'line' && <div class="placeholder"></div>}
          </>
        );
      };

      const renderIconNode = () => {
        if (!icon) {
          return null;
        }
        return (
          <div
            class={{
              [`${name}__icon`]: true,
              [`${name}__icon--${placement}`]: true,
              [`${name}__icon--checked`]: isChecked.value,
              [`${name}__icon--disabled`]: isDisabled.value,
            }}
          >
            {renderIconArray()}
          </div>
        );
      };

      const renderCheckBoxContent = () => {
        const labelContent = renderContent('default', 'label');
        const checkboxContent = renderTNodeJSX('content');
        return (
          <div
            class={`${name}__content`}
            onClick={(event) => {
              event.stopPropagation();
              handleChange(event, 'text');
            }}
          >
            <div
              class={{
                [`${name}__title`]: true,
                [`${name}__title--checked`]: isChecked.value,
                [`${name}__title--disabled`]: isDisabled.value,
              }}
              style={{ '-webkit-line-clamp': maxLabelRow }}
            >
              {labelContent}
            </div>
            <div
              class={{
                [`${name}__description`]: true,
                [`${name}__description--disabled`]: isDisabled.value,
              }}
              style={{ '-webkit-line-clamp': maxContentRow }}
            >
              {checkboxContent}
            </div>
          </div>
        );
      };
      return (
        <div
          class={{
            [`${name}`]: true,
            [`${name}--${placement}`]: true,
            [`${name}--checked`]: isChecked.value,
            [`${name}--block`]: block,
          }}
          onClick={handleChange}
        >
          {renderIconNode()}
          {renderCheckBoxContent()}
          {!borderless && <div class={`${name}__border ${name}__border--${placement}`} />}
        </div>
      );
    };
  },
});
