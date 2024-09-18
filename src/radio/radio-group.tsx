import { provide, defineComponent, computed } from 'vue';
import { useDefault } from '../shared';
import props from '../radio/radio-group-props';
import { RadioOption, RadioOptionObj, RadioValue, TdRadioGroupProps } from '../radio/type';
import TRadio from './radio';
import config from '../config';
import { KeysType } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-radio-group`,
  props,
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const radioGroupClass = usePrefixClass('radio-group');

    const [groupValue, setGroupValue] = useDefault<RadioValue, TdRadioGroupProps>(
      props,
      context.emit,
      'value',
      'change',
    );

    const keys = computed((): KeysType => props.keys);

    const groupOptions = computed(() => {
      return props.options?.map((option: RadioOption) => {
        let opt = option as RadioOptionObj;
        if (typeof option === 'string' || typeof option === 'number') {
          opt = { value: option, label: option.toString() };
        }
        return opt;
      });
    });
    const handleRadioChange = (val: RadioValue, context: { e: Event; name?: string }) => {
      if (props.allowUncheck && val === groupValue.value) {
        setGroupValue('', context);
      } else {
        setGroupValue(val, context);
      }
    };

    provide('rootGroupProps', props);
    provide('rootGroupValue', groupValue);
    provide('rootGroupChange', handleRadioChange);
    return () => {
      return (
        <div class={radioGroupClass.value} role="radiogroup">
          {props.options &&
            groupOptions.value.map((opt, index) => (
              <TRadio
                name={props.name}
                icon={props.icon}
                checked={groupValue.value === opt[keys.value?.value ?? 'value']}
                disabled={opt?.disabled ?? props.disabled}
                value={opt[keys.value?.value ?? 'value']}
                label={opt[keys.value?.label ?? 'label']}
                placement={props.placement}
              />
            ))}
          {!props.options && renderTNodeJSX('default')}
        </div>
      );
    };
  },
});
