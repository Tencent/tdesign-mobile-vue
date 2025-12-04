import { computed, defineComponent, PropType, toRefs, h } from 'vue';
import TButton from '../button';
import TBadge from '../badge';
import { TNode } from '../common';
import { ActionSheetItem } from './type';
import { useTNodeDefault } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<ActionSheetItem[]>,
      required: true,
    },
    align: {
      type: String as PropType<'left' | 'center'>,
      default: 'center',
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const actionSheetClass = usePrefixClass('action-sheet');

    const renderTNodeJSX = useTNodeDefault();

    const { align, items } = toRefs(props);
    const handleSelected = (index: number) => {
      emit('selected', index);
    };
    const itemClasses = computed(() => ({
      [`${actionSheetClass.value}__list-item`]: true,
    }));

    const renderTNode = (node: TNode) => {
      if (!node) return null;
      if (typeof node === 'function') {
        return node(h);
      }
      return node;
    };

    return () => {
      const renderButtonNode = () => {
        const renderContent = (item: ActionSheetItem) => {
          const renderLabel = () => {
            if (item.badge) {
              if (item.badge.dot || item.badge.count) {
                return (
                  <TBadge
                    count={item.badge.count}
                    max-count={item.badge.maxCount || 99}
                    dot={item.badge.dot}
                    content={item.badge.content}
                    size={item.badge.size}
                    offset={item.badge.offset}
                  >
                    <span class={`${actionSheetClass.value}__list-item-text`}> {item.label}</span>
                  </TBadge>
                );
              }
              return renderTNodeJSX('badge', {
                defaultNode: <span class={`${actionSheetClass.value}__list-item-text`}>{item.label}</span>,
              });
            }
            return <span class={`${actionSheetClass.value}__list-item-text`}>{item.label}</span>;
          };

          const iconContent = renderTNode(item.icon);
          const suffixIconContent = renderTNode(item.suffixIcon);

          return (
            <>
              <div class={`${actionSheetClass.value}__list-item-content`}>
                {iconContent && <span class={`${actionSheetClass.value}__list-item-icon`}>{iconContent}</span>}
                {renderLabel()}
                {suffixIconContent && (
                  <span
                    class={`${actionSheetClass.value}__list-item-icon ${actionSheetClass.value}__list-item-icon--suffix`}
                  >
                    {suffixIconContent}
                  </span>
                )}
              </div>
              {item.description && <div class={`${actionSheetClass.value}__list-item-desc`}>{item.description}</div>}
            </>
          );
        };
        const buttonList = items.value.map((item, index) => (
          <TButton
            key={index}
            variant={'text'}
            block
            class={[itemClasses.value, { [`${actionSheetClass.value}__list-item--disabled`]: item.disabled }]}
            disabled={item.disabled}
            style={{ color: item.color }}
            onClick={() => handleSelected(index)}
          >
            {renderContent(item)}
          </TButton>
        ));
        return buttonList;
      };

      return <div class={`${actionSheetClass.value}__list`}>{renderButtonNode()}</div>;
    };
  },
});
