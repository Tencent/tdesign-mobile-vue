import { defineComponent, ref, Ref, ComponentInternalInstance, provide } from 'vue';
import config from '../config';
import props from './props';
import { TdSideBarProps } from './type';
import { useDefault } from '../shared';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-side-bar`,
  props,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const sideBarClass = usePrefixClass('side-bar');
    const [currentValue, setCurrentValue] = useDefault<TdSideBarProps['value'], TdSideBarProps>(
      props,
      context.emit,
      'value',
      'change',
    );

    const children: Ref<ComponentInternalInstance[]> = ref([]);

    const relation = (child: ComponentInternalInstance) => {
      child && children.value.push(child);
    };

    const removeRelation = (child: ComponentInternalInstance) => {
      children.value = children.value.filter((item) => item !== child);
    };

    const onClickItem = (cur: string | number, label: string) => {
      setCurrentValue(cur);
      props.onClick?.(cur, label);
    };

    provide('sideBarProvide', {
      ...props,
      children,
      currentValue,
      relation,
      removeRelation,
      onClickItem,
    });

    return () => (
      <div class={`${sideBarClass.value}`}>
        {renderTNodeJSX('default')}
        <div class={`${sideBarClass.value}__padding`}></div>
      </div>
    );
  },
});
