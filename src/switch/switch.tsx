import { computed, defineComponent } from 'vue';
import TLoading from '../loading';
import { useToggle, useDefault } from '../shared';
import config from '../config';
import SwitchProps from './props';
import { SwitchValue, TdSwitchProps } from './type';
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-switch`;
export default defineComponent({
  name,
  props: SwitchProps,
  setup(props, context) {
    const switchClass = usePrefixClass('switch');

    const disabled = useFormDisabled();
    const switchValues = props.customValue || [true, false];
    const [innerValue] = useDefault<SwitchValue, TdSwitchProps>(props, context.emit, 'value', 'change');
    const { state, toggle } = useToggle<SwitchValue>(switchValues, innerValue.value);
    const checked = computed(() => innerValue.value === switchValues[0]);
    const switchClasses = computed(() => [
      `${switchClass.value}`,
      `${switchClass.value}--${props.size}`,
      {
        [`${switchClass.value}--checked`]: checked.value,
        [`${switchClass.value}--disabled`]: disabled.value || props.loading,
      },
    ]);
    const dotClasses = computed(() => [
      `${switchClass.value}__dot`,
      `${switchClass.value}__dot--${props.size}`,
      {
        [`${switchClass.value}__dot--checked`]: checked.value,
        [`${switchClass.value}__dot--plain`]: props.label?.length !== 2 && props.icon?.length !== 2 && !props.loading,
      },
    ]);
    const labelClasses = computed(() => [
      `${switchClass.value}__label`,
      `${switchClass.value}__label--${props.size}`,
      {
        [`${switchClass.value}__label--checked`]: checked.value,
      },
    ]);
    const iconContent = computed(() => props.icon[checked.value ? 0 : 1]);

    function handleToggle(event: Event) {
      event.preventDefault();
      if (disabled.value || props.loading) {
        return;
      }

      if (state.value === innerValue.value) {
        toggle();
      }

      innerValue.value = state.value;
    }
    return () => {
      const readerContent = () => {
        if (props.loading) {
          return <TLoading inherit-color size="16.25px" />;
        }
        if (props.label.length === 2) {
          return checked.value ? props.label[0] : props.label[1];
        }
        return iconContent.value;
      };
      return (
        <div class={switchClasses.value} onClick={handleToggle}>
          <div class={dotClasses.value}>
            <div class={labelClasses.value}>{readerContent()}</div>
          </div>
        </div>
      );
    };
  },
});
