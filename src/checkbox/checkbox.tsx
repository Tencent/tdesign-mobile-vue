import { defineComponent, h, computed, inject, toRefs } from 'vue';
import {
  Check1Icon as TdCheck1Icon,
  Remove1Icon as TdRemove1Icon,
  CheckIcon as TdCheckIcon,
  MinusIcon as TdMinusIcon,
} from 'tdesign-icons-vue-next';
import CheckboxProps from './props';
import { TNode } from '../shared';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { useFormDisabled, useReadonly } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';

export default defineComponent({
  name: 'TCheckbox',
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
    const direction = computed(() => checkboxGroup?.direction?.value);
    const disabled = useFormDisabled(checkboxGroup?.disabled);
    const isReadonly = useReadonly(checkboxGroup?.readonly);
    const indeterminate = computed<boolean>(() => {
      if (props.checkAll && checkboxGroup != null) return checkboxGroup.checkAllStatus.value === 'indeterminate';
      return props.indeterminate;
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

    const isActive = computed(() => isChecked.value || indeterminate.value);

    const isDisabled = computed(() => {
      if (!props.checkAll && !isChecked.value && checkboxGroup?.maxExceeded.value) {
        return true;
      }
      return disabled.value;
    });

    const handleChange = (e: Event, source?: string) => {
      if (isDisabled.value || isReadonly.value) return;
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

      const renderIconContent = () => {
        if (Array.isArray(icon) && icon.length > 1) {
          const selectedIcon = icon[isActive.value ? 0 : 1];
          const content =
            typeof selectedIcon === 'string'
              ? h('img', { class: `${checkboxClass.value}__icon-image`, src: selectedIcon })
              : selectedIcon;
          return <t-node content={content} class={`${checkboxClass.value}__icon-wrapper`} />;
        }
        if (icon !== 'circle' && icon !== true && icon !== 'rectangle' && icon !== 'line' && !Array.isArray(icon)) {
          return null;
        }

        let shape = 'circle';
        if (icon === 'rectangle') shape = 'rectangle';
        if (icon === 'line') shape = 'line';
        let ActiveIcon = indeterminate.value ? TdRemove1Icon : TdCheck1Icon;
        if (shape === 'line') ActiveIcon = indeterminate.value ? TdMinusIcon : TdCheckIcon;
        return (
          <span
            class={{
              [`${checkboxClass.value}__icon-${shape}`]: true,
              [`${checkboxClass.value}__icon-${shape}--checked`]: shape !== 'line' && isActive.value,
              [`${checkboxClass.value}__icon-${shape}--disabled`]: isDisabled.value,
            }}
          >
            {isActive.value && <ActiveIcon />}
          </span>
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
              [`${checkboxClass.value}__icon--checked`]: isActive.value,
              [`${checkboxClass.value}__icon--disabled`]: isDisabled.value,
            }}
          >
            {renderIconContent()}
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
            [`${checkboxClass.value}--${direction.value}`]: !!direction.value,
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
