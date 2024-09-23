import { watch, defineComponent, computed } from 'vue';
import { useDefault } from '../shared';
import ActionSheetList from './action-sheet-list';
import ActionSheetGrid from './action-sheet-grid';
import TPopup from '../popup';
import TButton from '../button';
import config from '../config';
import { TdActionSheetProps, ActionSheetItem } from './type';
import props from './props';
import { usePrefixClass, useConfig } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-action-sheet`,
  components: {
    TPopup,
    TButton,
    ActionSheetList,
    ActionSheetGrid,
  },
  props,
  emits: ['selected', 'update:modelValue', 'cancel', 'close', 'update:visible'],
  setup(props, context) {
    const actionSheetClass = usePrefixClass('action-sheet');
    const { globalConfig } = useConfig('actionSheet');

    const actionItems = computed(() => {
      return props.items.map((item: String | ActionSheetItem) => {
        if (typeof item === 'string') {
          return {
            label: item,
          };
        }
        return item;
      });
    });
    const [currentVisible] = useDefault<TdActionSheetProps['visible'], TdActionSheetProps>(
      props,
      context.emit,
      'visible',
      'visible-change',
    );
    const rootClasses = computed(() => ({
      [`${actionSheetClass.value}__content`]: true,
    }));
    const descriptionClasses = computed(() => ({
      [`${actionSheetClass.value}__description`]: true,
      [`${actionSheetClass.value}__description--left`]: props.align === 'left',
      [`${actionSheetClass.value}__description--grid`]: props.theme === 'grid',
    }));
    watch(
      () => currentVisible.value,
      (val) => {
        currentVisible.value = val;
      },
      {
        immediate: true,
        deep: true,
      },
    );

    const hide = (trigger: string) => {
      context.emit('update:modelValue', false);
      props.onClose?.({ trigger });
    };

    const handleCancel = () => {
      props.onCancel?.();
      context.emit('update:modelValue', false);
    };

    const handleSelected = (index: number) => {
      props.onSelected?.(props?.items[index], index);
      hide('selected');
    };

    const handleClose = () => {
      hide('overlay');
    };

    return () => {
      const root = () => {
        const description = () => {
          if (props.description) {
            return <p class={descriptionClasses.value}>{props.description}</p>;
          }
          return null;
        };
        const list = () => {
          if (props.theme === 'list') {
            return <action-sheet-list align={props.align} items={actionItems.value} onSelected={handleSelected} />;
          }
        };
        const grid = () => {
          if (props.theme === 'grid') {
            return <action-sheet-grid items={actionItems.value} count={props.count} onSelected={handleSelected} />;
          }
        };
        const cancel = () => {
          if (props.showCancel) {
            return (
              <div class={`${actionSheetClass.value}__footer`}>
                <div class={`${actionSheetClass.value}__gap-${props.theme}`}></div>
                <t-button class={`${actionSheetClass.value}__cancel`} variant="text" block onClick={handleCancel}>
                  {props.cancelText || globalConfig.value.cancel}
                </t-button>
              </div>
            );
          }
        };
        return (
          <div class={rootClasses.value}>
            {description()}
            {list()}
            {grid()}
            {cancel()}
          </div>
        );
      };
      return (
        <t-popup
          visible={currentVisible.value}
          placement="bottom"
          destroy-on-close={true}
          class={actionSheetClass.value}
          onClose={handleClose}
        >
          {root()}
        </t-popup>
      );
    };
  },
});
