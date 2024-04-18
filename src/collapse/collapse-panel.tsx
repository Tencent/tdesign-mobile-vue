import { ref, computed, nextTick, watch, onMounted, inject, defineComponent, getCurrentInstance } from 'vue';
import { ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next';
import TCell from '../cell';
import props from './collapse-panel-props';
import config from '../config';
import { findIndex } from './util';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import { CollapseProvide } from './collapse';

const { prefix } = config;
const name = `${prefix}-collapse-panel`;

export default defineComponent({
  name,
  components: { TCell },
  props,
  setup(props, { slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const componentName = usePrefixClass('collapse-panel');

    const parent = inject<CollapseProvide>('collapse');
    const renderParentTNode: Function = inject('renderParentTNode');

    const disabled = computed(() => parent?.disabled.value || props.disabled);
    const rootClass = computed(() => ({
      [`${componentName.value}`]: true,
      [`${componentName.value}--${props.placement}`]: true,
      [`${componentName.value}--active`]: isActive.value,
      [`${componentName.value}--disabled`]: disabled.value,
    }));
    const isActive = computed(() => findIndex(props.value, parent?.activeValue.value) > -1);
    const updatePanelValue = (args?: any) => {
      if (props.value != null) {
        parent?.onPanelChange(props.value, args);
      }
    };

    const handleClick = (e: MouseEvent) => {
      e?.stopPropagation();
      if (disabled.value) {
        return;
      }
      updatePanelValue({ e });
    };

    // 设置折叠/展开高度过渡
    const bodyRef = ref();
    const wrapRef = ref();
    const headRef = ref();
    const wrapperHeight = ref('');
    const updatePanelState = () => {
      nextTick(() => {
        if (!wrapRef.value) {
          return;
        }
        const { height: headHeight } = headRef.value.getBoundingClientRect();
        if (!isActive.value) {
          wrapperHeight.value = `${headHeight}px`;
          return;
        }
        const { height: bodyHeight } = bodyRef.value.getBoundingClientRect();
        const height = headHeight + bodyHeight;
        wrapperHeight.value = `${height}px`;
      });
    };

    watch(
      isActive,
      () => {
        nextTick(() => updatePanelState());
      },
      {
        immediate: true,
      },
    );

    onMounted(() => {
      if (parent?.defaultExpandAll) {
        updatePanelValue();
      }
    });

    const renderDefaultIcon = () => {
      if (props.placement === 'bottom') {
        return isActive.value ? <ChevronUpIcon /> : <ChevronDownIcon />;
      }
      return isActive.value ? <ChevronDownIcon /> : <ChevronUpIcon />;
    };
    const panelExpandIcon = computed(() => slots.expandIcon || props.expandIcon);
    const renderRightIcon = () => {
      const tNodeRender = panelExpandIcon.value === undefined ? renderParentTNode : renderTNodeJSX;
      return <div class={`${componentName.value}__header-icon`}>{tNodeRender('expandIcon', renderDefaultIcon())}</div>;
    };

    return () => {
      const panelContent = renderContent('default', 'content');
      const headerContent = renderTNodeJSX('header');
      const noteContent = renderTNodeJSX('headerRightContent');
      const leftIcon = renderTNodeJSX('headerLeftIcon');

      return (
        <div ref={wrapRef} class={rootClass.value} style={{ height: wrapperHeight.value }}>
          <div ref={headRef} class={`${componentName.value}__title`} onClick={handleClick}>
            <TCell
              class={[
                `${componentName.value}__header`,
                `${componentName.value}__header--${props.placement}`,
                { [`${componentName.value}__header--expanded`]: isActive.value },
              ]}
              v-slots={{
                leftIcon: () => leftIcon,
                title: () => headerContent,
                note: () => noteContent,
                rightIcon: () => renderRightIcon(),
              }}
            ></TCell>
          </div>
          <div ref={bodyRef} class={`${componentName.value}__content`}>
            {panelContent}
          </div>
        </div>
      );
    };
  },
});
