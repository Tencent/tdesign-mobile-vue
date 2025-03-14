import { defineComponent, h, computed, inject, toRefs } from 'vue';
import {
  CheckIcon,
  MinusIcon,
  CheckCircleFilledIcon,
  CircleIcon,
  MinusCircleFilledIcon,
  MinusRectangleFilledIcon,
  CheckRectangleFilledIcon,
} from 'tdesign-icons-vue-next';
import config from '../config';
import CheckboxProps from './props';
import { TNode } from '../shared';
import useVModel from '../hooks/useVModel';
import { TdCheckboxProps } from '../checkbox/type';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-checkbox`,
  components: { TNode },
  props: CheckboxProps,
  emits: ['update:checked', 'update:modelValue', 'change'],
  setup(props, context) {
    const checkboxClass = usePrefixClass('checkbox');
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    const checkboxGroup: any = inject('checkboxGroup', undefined);
    const disabled = useFormDisabled(checkboxGroup?.disabled);
    const indeterminate = computed<boolean>(() => {
      if (props.checkAll && checkboxGroup != null) return checkboxGroup.checkAllStatus.value === 'indeterminate';
      return props.indeterminate;
    });

    const isIconArray = Array.isArray(props.icon);
    const defaultCheckIcons = [h(CheckCircleFilledIcon), h(CircleIcon)];
    const checkIcons = computed(() => {
      if (isIconArray && props.icon.length > 1) {
        return props.icon.map((icon) =>
          typeof icon === 'string' ? h('img', { class: `${checkboxClass.value}__icon-image`, src: icon }) : icon,
        );
      }
      return defaultCheckIcons;
    });

    const checkedIcon = computed(() => {
      if (props.icon === 'circle' || props.icon === true)
        return indeterminate.value ? h(MinusCircleFilledIcon) : h(CheckCircleFilledIcon);
      if (props.icon === 'rectangle')
        return indeterminate.value ? h(MinusRectangleFilledIcon) : h(CheckRectangleFilledIcon);
      if (props.icon === 'line') return indeterminate.value ? h(MinusIcon) : h(CheckIcon);
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
      if (!props.checkAll && !isChecked.value && checkboxGroup?.maxExceeded.value) {
        return true;
      }
      return disabled.value;
    });

    const finalReadonly = computed(() => Boolean(props.readonly || checkboxGroup?.readonly.value));

    const handleChange = (e: Event, source?: string) => {
      if (isDisabled.value || finalReadonly.value) return;
      if (source === 'text' && props.contentDisabled) return;

      const value = !isChecked.value;
      setInnerChecked(value, { e });
      e.stopPropagation();
      if (checkboxGroup && checkboxGroup?.onCheckedChange) {
        checkboxGroup.onCheckedChange({ checked: value, checkAll: props.checkAll, e, option: props });
      }
    };
    return () => {
      const { placement, block, icon, maxLabelRow, maxContentRow } = props;
      const borderless = props.borderless || checkboxGroup?.borderless.value;

      const renderIconArray = () => {
        if (isIconArray) {
          return (
            <t-node
              content={checkIcons.value[isChecked.value ? 0 : 1]}
              class={`${checkboxClass.value}__icon-wrapper`}
            />
          );
        }
        if (isChecked.value) {
          return <t-node content={checkedIcon.value} class={`${checkboxClass.value}__icon-wrapper`} />;
        }
        return (
          <>
            {(icon === 'circle' || icon === true || icon === 'rectangle') && (
              <div
                class={{
                  [`${checkboxClass.value}__icon-circle`]: icon === true,
                  [`${checkboxClass.value}__icon-${icon}`]: typeof icon === 'string',
                  [`${checkboxClass.value}__icon-${icon}--disabled`]: isDisabled.value,
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
              [`${checkboxClass.value}__icon`]: true,
              [`${checkboxClass.value}__icon--${placement}`]: true,
              [`${checkboxClass.value}__icon--checked`]: isChecked.value,
              [`${checkboxClass.value}__icon--disabled`]: isDisabled.value,
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
            class={`${checkboxClass.value}__content`}
            onClick={(event) => {
              event.stopPropagation();
              handleChange(event, 'text');
            }}
          >
            <div
              class={{
                [`${checkboxClass.value}__title`]: true,
                [`${checkboxClass.value}__title--checked`]: isChecked.value,
                [`${checkboxClass.value}__title--disabled`]: isDisabled.value,
              }}
              style={{ '-webkit-line-clamp': maxLabelRow }}
            >
              {labelContent}
            </div>
            <div
              class={{
                [`${checkboxClass.value}__description`]: true,
                [`${checkboxClass.value}__description--disabled`]: isDisabled.value,
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
            [`${checkboxClass.value}`]: true,
            [`${checkboxClass.value}--${placement}`]: true,
            [`${checkboxClass.value}--checked`]: isChecked.value,
            [`${checkboxClass.value}--block`]: block,
          }}
          onClick={handleChange}
        >
          {renderIconNode()}
          {renderCheckBoxContent()}
          {!borderless && <div class={`${checkboxClass.value}__border ${checkboxClass.value}__border--${placement}`} />}
        </div>
      );
    };
  },
});
