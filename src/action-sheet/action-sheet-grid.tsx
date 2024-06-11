import { defineComponent, computed } from 'vue';
import config from '../config';
import { Grid as TGrid, GridItem as TGridItem } from '../grid';
import { Swiper as TSwiper, SwiperItem as TSwiperItem } from '../swiper';
import { ActionSheetItem } from './type';

const { prefix } = config;
const name = `${prefix}-action-sheet`;

export default defineComponent({
  components: { TGrid, TGridItem, TSwiper, TSwiperItem },
  props: {
    items: {
      type: Array<ActionSheetItem>,
      required: true,
    },
    count: {
      type: Number,
      default: 8,
    },
    selected: {
      type: Function,
      default: undefined,
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const gridColumn = computed(() => Math.ceil(props.count / 2));
    const pageNum = computed(() => Math.ceil(props.items.length / props.count));
    const actionItems = computed(() => {
      const res: ActionSheetItem[][] = [];
      for (let i = 0; i < pageNum.value; i++) {
        const temp = props.items.slice(i * props.count, (i + 1) * props.count);
        res.push(temp);
      }
      return res;
    });
    const gridClasses = computed(() => ({
      [`${name}__grid`]: true,
      [`${name}__grid--swiper`]: pageNum.value > 1,
      [`${name}__dots`]: pageNum.value > 1,
    }));
    const handleSelected = (i: number) => {
      emit('selected', i);
      console.log('111', i);
    };
    return () => {
      const swiper = () => {
        const swiperItems = actionItems.value.map((items, i) => {
          const gridItems = items.map((item, index) => (
            <t-grid-item
              key={index}
              text={item.label}
              image={item.icon}
              badge={item.badge}
              onClick={(event: MouseEvent) => {
                event.preventDefault();
                handleSelected(i * props.count + index);
              }}
            />
          ));
          return (
            <t-swiper-item key={i}>
              <t-grid column={gridColumn.value}>{gridItems}</t-grid>
            </t-swiper-item>
          );
        });
        if (actionItems.value.length > 1) {
          return (
            <t-swiper
              autoplay={false}
              pagination-position="bottom"
              navigation={{ type: 'dots', showControls: false }}
              loop={false}
              class={`${name}__swiper-wrap`}
              height={192}
            >
              {swiperItems}
            </t-swiper>
          );
        }
        return null;
      };
      const grid = () => {
        if (actionItems.value.length === 1) {
          const items = actionItems.value[0].map((item, index) => (
            <t-grid-item
              key={index}
              text={item.label}
              image={item.icon}
              badge={item.badge}
              onClick={() => handleSelected(index)}
            />
          ));

          return <t-grid column={gridColumn.value}>{items}</t-grid>;
        }
        return null;
      };
      return (
        <div class={gridClasses.value}>
          {swiper()}
          {grid()}
        </div>
      );
    };
  },
});
