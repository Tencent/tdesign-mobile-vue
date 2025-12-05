import { defineComponent, computed } from 'vue';
import { Grid as TGrid, GridItem as TGridItem } from '../grid';
import { Swiper as TSwiper, SwiperItem as TSwiperItem } from '../swiper';
import { ActionSheetItem } from './type';
import { usePrefixClass } from '../hooks/useClass';

export default defineComponent({
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
    const actionSheetClass = usePrefixClass('action-sheet');

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
      [`${actionSheetClass.value}__grid`]: true,
      [`${actionSheetClass.value}__grid--swiper`]: pageNum.value > 1,
      [`${actionSheetClass.value}__dots`]: pageNum.value > 1,
    }));

    const handleSelected = (i: number) => {
      emit('selected', i);
    };

    return () => {
      const swiper = () => {
        const swiperItems = actionItems.value.map((items, i) => {
          const gridItems = items.map((item, index) => (
            <TGridItem
              key={index}
              text={item.label}
              description={item.description}
              image={item.icon}
              badge={item.badge}
              onClick={(event: MouseEvent) => {
                event.preventDefault();
                handleSelected(i * props.count + index);
              }}
            />
          ));
          return (
            <TSwiperItem key={i}>
              <TGrid column={gridColumn.value}>{gridItems}</TGrid>
            </TSwiperItem>
          );
        });
        if (actionItems.value.length > 1) {
          return (
            <TSwiper
              autoplay={false}
              pagination-position="bottom"
              navigation={{ type: 'dots', showControls: false }}
              loop={false}
              class={`${actionSheetClass.value}__swiper-wrap`}
              height={192}
            >
              {swiperItems}
            </TSwiper>
          );
        }
        return null;
      };
      const grid = () => {
        if (actionItems.value.length === 1) {
          const items = actionItems.value[0].map((item, index) => (
            <TGridItem
              key={index}
              text={item.label}
              description={item.description}
              image={item.icon}
              badge={item.badge}
              onClick={() => handleSelected(index)}
            />
          ));

          return <TGrid column={gridColumn.value}>{items}</TGrid>;
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
