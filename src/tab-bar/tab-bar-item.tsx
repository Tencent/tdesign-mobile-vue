import { defineComponent, inject, computed, ref, watch, ComponentInternalInstance } from 'vue';
import { ViewListIcon as TViewListIcon } from 'tdesign-icons-vue-next';
import TBadge from '../badge';
import { TdBadgeProps } from '../badge/type';
import config from '../config';
import { initName } from './useTabBar';
import TabBarItemProps from './tab-bar-item-props';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { usePrefixClass, useConfig } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-tab-bar-item`,
  components: { TBadge, TViewListIcon },
  props: TabBarItemProps,
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const tabBarItemClass = usePrefixClass('tab-bar-item');

    const { t, globalConfig } = useConfig('tabBar');
    const { split, shape, theme, defaultIndex, activeValue, itemCount, updateChild } = inject<any>('tab-bar');
    const currentName = initName(defaultIndex);

    const textNode = ref<HTMLElement>();

    const badgeProps = computed((): TdBadgeProps => props.badgeProps);

    const getBadgeAriaLabel = () => {
      const options = badgeProps.value;
      if (options?.dot || options?.count) {
        const maxCount = options.maxCount || 99;
        if (options.dot) {
          return globalConfig.value.newsAriaLabel;
        }
        if (options.count === '...') {
          return globalConfig.value.moreNewsAriaLabel;
        }
        const count = Number(options.count);
        if (isNaN(count)) {
          return `${options.count}`;
        }
        const str1 = t(globalConfig.value.haveMoreNewsAriaLabel, { value: maxCount });
        const str2 = t(globalConfig.value.haveNewsAriaLabel, { value: options.count });
        return `${Number(options.count) > maxCount ? str1 : str2}`;
      }
      return 'TabBar';
    };
    const ariaLabel = ref(getBadgeAriaLabel());

    const iconOnly = ref(false);
    watch(textNode, () => {
      const height = textNode.value?.clientHeight;
      iconOnly.value = Number(height) === 0;
    });

    const hasSubTabBar = computed(() => {
      return Array.isArray(props.subTabBar) && props.subTabBar.length > 0;
    });

    const isChecked = computed(() => {
      if (hasSubTabBar.value && Array.isArray(activeValue.value)) {
        return activeValue.value.includes(currentName);
      }
      return currentName === activeValue.value;
    });

    const isSpread = ref(false);
    watch(isChecked, (newValue) => {
      if (!newValue) {
        isSpread.value = false;
      }
    });

    const crowded = ref(false);
    watch(itemCount, () => {
      if (isChecked.value) {
        crowded.value = itemCount.value > 3;
        isSpread.value = true;
      }
    });

    const isToggleCurrent = computed(() => Array.isArray(activeValue.value) && activeValue.value[0] === currentName);

    const toggle = () => {
      if (hasSubTabBar.value) {
        isSpread.value = !isSpread.value;
        if (!isToggleCurrent.value) {
          updateChild([currentName]);
          return;
        }
      }
      updateChild(currentName);
    };

    const hasChildren = computed(() => {
      return Number(props.subTabBar?.length) > 0;
    });

    const selectChild = (childName: number | string) => {
      if (!(Array.isArray(activeValue.value) && activeValue.value[1] === childName)) {
        updateChild([currentName, childName]);
      }
      isSpread.value = false;
    };
    return () => {
      const iconContent = () => {
        const iconSlot = renderTNodeJSX('icon');
        if (!iconSlot) {
          return null;
        }
        iconSlot?.forEach((item: ComponentInternalInstance) => {
          if (item.type?.name === 'Icon') {
            item.props.size = iconOnly.value ? '24px' : '20px';
          }
        });
        return iconSlot;
      };
      const badge = () => {
        return (
          iconContent() && (
            <div class={`${tabBarItemClass.value}__icon`} style={{ height: `${iconOnly.value ? 24 : 20}px` }}>
              {badgeProps.value?.dot || badgeProps.value?.count ? (
                <t-badge
                  count={badgeProps.value?.count || 0}
                  max-count={badgeProps.value?.maxCount || 99}
                  dot={badgeProps.value?.dot || false}
                  content={badgeProps.value?.content || ''}
                  size={badgeProps.value?.size || 'medium'}
                  offset={badgeProps.value?.offset || [0, 0]}
                >
                  {iconContent()}
                </t-badge>
              ) : (
                iconContent()
              )}
            </div>
          )
        );
      };
      const textNodeContent = () => {
        return (
          <div
            ref={textNode}
            class={{
              [`${tabBarItemClass.value}__text`]: true,
              [`${tabBarItemClass.value}__text--small`]: !!iconContent(),
            }}
          >
            {hasChildren.value && <t-view-list-icon size="16" class={`${tabBarItemClass.value}__icon-menu`} />}
            {renderContent('default', 'content')}
          </div>
        );
      };

      const menu = () => {
        if (hasChildren.value && isSpread.value) {
          return (
            <div role="menu" class={`${tabBarItemClass.value}__spread`}>
              {props.subTabBar.map((child, index) => (
                <div
                  key={index}
                  role="tab"
                  class={`${tabBarItemClass.value}__spread-item`}
                  onClick={() => selectChild(child.value || index)}
                >
                  {index !== 0 && <div class={`${tabBarItemClass.value}__spread-item-split`} />}
                  <div class={`${tabBarItemClass.value}__spread-item-text`}>{child.label}</div>
                </div>
              ))}
            </div>
          );
        }
      };
      return (
        <div
          class={{
            [`${tabBarItemClass.value}`]: true,
            [`${tabBarItemClass.value}--split`]: split.value,
            [`${tabBarItemClass.value}--text-only`]: !iconContent(),
            [`${tabBarItemClass.value}--crowded`]: crowded.value,
            [`${tabBarItemClass.value}--${shape.value}`]: true,
            [`${context.attrs.class || ''}`]: true,
          }}
        >
          <div
            class={{
              [`${tabBarItemClass.value}__content`]: true,
              [`${tabBarItemClass.value}__content--checked`]: isChecked.value,
              [`${tabBarItemClass.value}__content--${theme.value}`]: true,
            }}
            aria-selected={(!hasChildren.value || !isSpread.value) && isChecked.value}
            aria-expanded={hasChildren.value && isSpread.value}
            role={hasChildren.value ? 'button' : 'tab'}
            onClick={toggle}
          >
            {badge()}
            {textNodeContent()}
          </div>
          {menu()}
        </div>
      );
    };
  },
});
