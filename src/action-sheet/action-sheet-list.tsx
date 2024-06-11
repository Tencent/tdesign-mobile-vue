import { computed, defineComponent, PropType, toRefs } from 'vue';
import TButton from '../button';
import TBadge from '../badge';
import config from '../config';
import { ActionSheetItem } from './type';
import { useTNodeDefault } from '../hooks/tnode';

const { prefix } = config;
const name = `${prefix}-action-sheet`;

export default defineComponent({
  name,
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
  components: { TButton, TBadge },
  emits: ['selected'],
  setup(props, { emit }) {
    const renderTNodeJSX = useTNodeDefault();

    const { align, items } = toRefs(props);
    const handleSelected = (index: number) => {
      emit('selected', index);
    };
    const itemClasses = computed(() => ({
      [`${name}__list-item`]: true,
      [`${name}__list-item--left`]: align.value === 'left',
    }));

    return () => {
      const renderButtonNode = () => {
        const renderBadgeNode = (item: ActionSheetItem) => {
          if (item.badge) {
            const content = () => {
              if (item.badge.dot || item.badge.count) {
                return (
                  <t-badge
                    count={item.badge.count}
                    max-count={item.badge.maxCount || 99}
                    dot={item.badge.dot}
                    content={item.badge.content}
                    size={item.badge.size}
                    offset={item.badge.offset || [-16, 20]}
                  >
                    <span class={`${name}__list-item-text`}> {item.label}</span>
                  </t-badge>
                );
              }
              return renderTNodeJSX('badge', {
                defaultNode: <span class={`${name}__list-item-text`}>{item.label}</span>,
              });
            };
            return content();
          }
          return <span class={`${name}__list-item-text`}>{item.label}</span>;
        };
        const buttonList = items.value.map((item, index) => (
          <t-button
            key={index}
            variant={'text'}
            block
            class={[itemClasses.value, { [`${name}__list-item--disabled`]: item.disabled }]}
            disabled={item.disabled}
            icon={item.icon}
            style={{ color: item.color }}
            onClick={() => handleSelected(index)}
          >
            {renderBadgeNode(item)}
          </t-button>
        ));
        return buttonList;
      };

      return <div class={`${name}__list`}>{renderButtonNode()}</div>;
    };
  },
});
