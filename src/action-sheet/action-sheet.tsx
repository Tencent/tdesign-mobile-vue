import { computed, defineComponent, toRefs } from 'vue';
import TActionSheetGrid from './action-sheet-grid';
import TActionSheetList from './action-sheet-list';
import TButton from '../button';
import TPopup from '../popup';
import config from '../config';
import { useConfig, usePrefixClass } from '../hooks/useClass';
import useVModel from '../hooks/useVModel';
import props from './props';
import { ActionSheetItem, TdActionSheetProps } from './type';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-action-sheet`,
  props,
  emits: ['selected', 'update:modelValue', 'cancel', 'close', 'update:visible'],
  setup(props, context) {
    const actionSheetClass = usePrefixClass('action-sheet');
    const { globalConfig } = useConfig('actionSheet');

    const actionItems = computed(() => {
      return props.items.map((item: string | ActionSheetItem) => {
        if (typeof item === 'string') {
          return {
            label: item,
          };
        }
        return item;
      });
    });
    const { visible, modelValue } = toRefs(props);
    const [currentVisible] = useVModel(visible, modelValue, props.defaultVisible, () => {}, 'visible');

    const rootClasses = computed(() => [
      `${actionSheetClass.value}`,
      `${actionSheetClass.value}--${props.theme}`,
      `${actionSheetClass.value}--${props.align}`,
      {
        [`${actionSheetClass.value}--no-description`]: !props.description,
      },
    ]);

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
            return <p class={`${actionSheetClass.value}__description`}>{props.description}</p>;
          }
          return null;
        };
        const list = () => {
          if (props.theme === 'list') {
            return <TActionSheetList items={actionItems.value} onSelected={handleSelected} />;
          }
        };
        const grid = () => {
          if (props.theme === 'grid') {
            return <TActionSheetGrid items={actionItems.value} count={props.count} onSelected={handleSelected} />;
          }
        };
        const cancel = () => {
          if (props.showCancel) {
            return (
              <div class={`${actionSheetClass.value}__footer`}>
                <div class={`${actionSheetClass.value}__gap-${props.theme}`}></div>
                <TButton class={`${actionSheetClass.value}__cancel`} variant="text" block onClick={handleCancel}>
                  {props.cancelText || globalConfig.value.cancel}
                </TButton>
              </div>
            );
          }
        };
        return (
          <div class={`${actionSheetClass.value}__content`}>
            {description()}
            {list()}
            {grid()}
            {cancel()}
          </div>
        );
      };
      return (
        <TPopup
          {...(props.popupProps as TdActionSheetProps['popupProps'])}
          visible={currentVisible.value}
          placement="bottom"
          destroy-on-close={true}
          class={rootClasses.value}
          onClose={handleClose}
          showOverlay={props.showOverlay}
        >
          {root()}
        </TPopup>
      );
    };
  },
});
