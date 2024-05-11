import { computed, inject, defineComponent, getCurrentInstance, h, onUnmounted, ComponentInternalInstance } from 'vue';
import { CloseIcon, CheckIcon } from 'tdesign-icons-vue-next';

import props from './step-item-props';
import config from '../config';
import { usePrefixClass } from '@/hooks/useClass';
import { useTNodeJSX } from '@/hooks/tnode';

const { prefix } = config;
const name = `${prefix}-step-item`;

export default defineComponent({
  name,
  props,
  setup(props, context) {
    const stepItemClass = usePrefixClass('step-item');
    const renderTNodeJSX = useTNodeJSX();

    const internalInstance = getCurrentInstance();
    const { proxy } = internalInstance as ComponentInternalInstance;
    const stepsProvide: any = inject('stepsProvide', undefined);
    stepsProvide.relation(proxy);
    const iconDefault = {
      check: h(CheckIcon),
      close: h(CloseIcon),
    };

    const index = computed(() => stepsProvide.state.children.indexOf(proxy));
    const isLastChild = computed(() => {
      return index.value === (stepsProvide.sequence === 'positive' ? stepsProvide.state.children.length - 1 : 0);
    });

    const theme = computed(() => stepsProvide.theme);
    const dot = computed(() => theme.value === 'dot');
    const icon = computed(() => props.icon || context.slots.icon);

    const current = computed(() => stepsProvide.current.value || stepsProvide.defaultCurrent || 0);
    const stepsStatus = computed(() => stepsProvide.currentStatus);
    const readonly = computed(() => stepsProvide.readonly);
    const currentStatus = computed(() => {
      const { status } = props;
      if (status !== 'default') return status;
      if (index.value === current.value) return stepsStatus.value;
      if (index.value < current.value) return 'finish';
      return status;
    });

    const rootClassName = computed(() => [
      stepItemClass.value,
      `${stepItemClass.value}--${stepsProvide.layout}`,
      { [`${stepItemClass.value}--default`]: readonly.value },
      { [`${stepItemClass.value}--${currentStatus.value}`]: currentStatus.value },
    ]);
    const iconWrapperClassName = computed(() => [
      `${stepItemClass.value}__anchor`,
      `${stepItemClass.value}__anchor--${stepsProvide.layout}`,
    ]);
    const dotClass = computed(() => [
      `${stepItemClass.value}__dot`,
      `${stepItemClass.value}__dot--${currentStatus.value}`,
    ]);

    const iconClassName = computed(() => [
      { [`${stepItemClass.value}__icon`]: icon.value },
      { [`${stepItemClass.value}__icon--${currentStatus.value}`]: icon.value },
      { [`${stepItemClass.value}__circle`]: !icon.value },
      { [`${stepItemClass.value}__circle--${currentStatus.value}`]: !icon.value },
    ]);
    const contentClass = computed(() => [
      `${stepItemClass.value}__content`,
      `${stepItemClass.value}__content--${stepsProvide.layout}`,
      {
        [`${stepItemClass.value}__content--${stepsProvide.layout}`]: isLastChild.value,
      },
      {
        [`${stepItemClass.value}__content--last`]: isLastChild.value,
      },
    ]);
    const tilteClass = computed(() => [
      `${stepItemClass.value}__title`,
      `${stepItemClass.value}__title--${currentStatus.value}`,
      `${stepItemClass.value}__title--${stepsProvide.layout}`,
    ]);
    const descriptionClass = computed(() => [
      `${stepItemClass.value}__description`,
      `${stepItemClass.value}__description--${currentStatus.value}`,
      `${stepItemClass.value}__description--${stepsProvide.layout}`,
    ]);
    const extraClass = computed(() => [
      `${stepItemClass.value}__extra`,
      `${stepItemClass.value}__extra--${currentStatus.value}`,
      `${stepItemClass.value}__extra--${stepsProvide.layout}`,
    ]);
    const separatorClass = computed(() => [
      stepItemClass.value,
      `${stepItemClass.value}__line`,
      `${stepItemClass.value}__line--${currentStatus.value}`,
      `${stepItemClass.value}__line--${stepsProvide.sequence}`,
      `${stepItemClass.value}__line--${stepsProvide.layout}`,
      `${stepItemClass.value}__line--${stepsProvide.theme}`,
    ]);
    const onClickIcon = (e: MouseEvent) => {
      if (!readonly.value) {
        stepsProvide.onClickItem(index.value, current.value, e);
      }
    };

    onUnmounted(() => {
      stepsProvide.removeRelation(proxy);
    });
    return () => {
      const renderIconContent = () => {
        if (icon.value) {
          return renderTNodeJSX('icon') || null;
        }
        if (currentStatus.value === 'error') {
          return iconDefault.close;
        }
        if (currentStatus.value === 'finish') {
          return iconDefault.check;
        }
        return index.value + 1;
      };

      return (
        <div class={rootClassName.value} onClick={onClickIcon}>
          <div class={iconWrapperClassName.value}>
            {dot.value ? (
              <div class={dotClass.value}></div>
            ) : (
              <div class={iconClassName.value}>{renderIconContent()}</div>
            )}
          </div>
          <div class={contentClass.value}>
            <div class={tilteClass.value}>
              {renderTNodeJSX('title')}
              {renderTNodeJSX('titleRight')}
            </div>
            <div class={descriptionClass.value}>{renderTNodeJSX('content')}</div>
            <div class={extraClass.value}>{renderTNodeJSX('extra')}</div>
          </div>
          {!isLastChild.value && <div class={separatorClass.value}></div>}
        </div>
      );
    };
  },
});
