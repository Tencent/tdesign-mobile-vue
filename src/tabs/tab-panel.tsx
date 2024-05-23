import { defineComponent, inject, Ref, computed, ref, watch } from 'vue';
import config from '../config';
import props from './tab-panel-props';
import { useContent } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import { TabValue } from '.';

const { prefix } = config;
const name = `${prefix}-tab-panel`;

export default defineComponent({
  name,
  props,
  setup(props) {
    const renderTNodeContent = useContent();
    const tabPanelClass = usePrefixClass('tab-panel');
    const tabsClass = usePrefixClass('tabs');
    const currentValue = inject<Ref<TabValue>>('currentValue');
    const isActive = computed(() => currentValue.value === props.value);
    const tabPanelClasses = computed(() => [`${tabPanelClass.value}`, `${tabsClass.value}__panel`]);
    const isMount = ref(props.lazy ? isActive.value : true);

    watch(
      isActive,
      () => {
        if (isActive.value) {
          if (!isMount.value) {
            isMount.value = true;
          }
        } else if (props.destroyOnHide) {
          isMount.value = false;
        }
      },
      { immediate: true },
    );

    return () => {
      if (!isMount.value) return null;

      return (
        <div v-show={isActive.value} class={tabPanelClasses.value}>
          {renderTNodeContent('default', 'panel')}
        </div>
      );
    };
  },
});
