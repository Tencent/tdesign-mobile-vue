import { computed, onMounted, inject, defineComponent, getCurrentInstance } from 'vue';
import { ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next';
import TCell from '../cell';
import props from './collapse-panel-props';
import config from '../config';
import { findIndex } from './util';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import { CollapseProvide } from './collapse';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-collapse-panel`,
  components: { TCell },
  props,
  setup(props, { slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const collapsePanelClass = usePrefixClass('collapse-panel');

    const parent = inject<CollapseProvide>('collapse');
    const renderParentTNode: Function = inject('renderParentTNode');

    const disabled = computed(() => parent?.disabled.value || props.disabled);
    const rootClass = computed(() => ({
      [`${collapsePanelClass.value}`]: true,
      [`${collapsePanelClass.value}--${props.placement}`]: true,
      [`${collapsePanelClass.value}--active`]: isActive.value,
      [`${collapsePanelClass.value}--disabled`]: disabled.value,
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
      return (
        <div class={`${collapsePanelClass.value}__header-icon`}>{tNodeRender('expandIcon', renderDefaultIcon())}</div>
      );
    };

    const renderPanelContent = () => {
      const panelContent = renderContent('default', 'content');
      if (props.destroyOnCollapse && !isActive.value) {
        return null;
      }

      return <div class={`${collapsePanelClass.value}__content`}>{panelContent}</div>;
    };

    return () => {
      const headerContent = renderTNodeJSX('header');
      const noteContent = renderTNodeJSX('headerRightContent');
      const leftIcon = renderTNodeJSX('headerLeftIcon');

      return (
        <div class={rootClass.value}>
          <div class={`${collapsePanelClass.value}__title`} onClick={handleClick}>
            <TCell
              class={[
                `${collapsePanelClass.value}__header`,
                `${collapsePanelClass.value}__header--${props.placement}`,
                { [`${collapsePanelClass.value}__header--expanded`]: isActive.value },
              ]}
              v-slots={{
                leftIcon: () => leftIcon,
                title: () => headerContent,
                note: () => noteContent,
                rightIcon: () => renderRightIcon(),
              }}
            ></TCell>
          </div>
          <div class={`${collapsePanelClass.value}__body`} style={{ gridTemplateRows: isActive.value ? '1fr' : '0fr' }}>
            <div class={`${collapsePanelClass.value}__inner`}>{renderPanelContent()}</div>
          </div>
        </div>
      );
    };
  },
});
