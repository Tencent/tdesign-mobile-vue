<template>
  <div :class="gridClasses">
    <t-swiper
      v-show="actionItems.length > 1"
      :autoplay="false"
      pagination-position="bottom"
      :navigation="{ type: 'dots', showControls: false }"
      :loop="false"
      :class="`${name}__swiper-wrap`"
      height="192"
      @change="handleSwiperChange"
    >
      <t-swiper-item v-for="(Items, i) in actionItems" :key="i">
        <t-grid :column="gridColumn">
          <t-grid-item
            v-for="(item, index) in Items"
            :key="index"
            :text="item.label"
            :image="item.icon"
            :badge="item.badge"
            @click.prevent="handleSelected(i * count + index)"
          />
        </t-grid>
      </t-swiper-item>
    </t-swiper>
    <t-grid v-if="actionItems.length === 1" :column="gridColumn">
      <t-grid-item
        v-for="(item, index) in actionItems[0]"
        :key="index"
        :text="item.label"
        :image="item.icon"
        :badge="item.badge"
        @click="handleSelected(count + index)"
      />
    </t-grid>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import config from '../config';
import { useEmitEvent } from '../shared';
import { Grid as TGrid, GridItem as TGridItem } from '../grid';
import { Swiper as TSwiper, SwiperItem as TSwiperItem } from '../swiper';

const { prefix } = config;

const name = `${prefix}-action-sheet`;

export default defineComponent({
  components: { TGrid, TGridItem, TSwiper, TSwiperItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
    count: {
      type: Number,
      default: 8,
    },
  },
  emits: ['selected'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const gridColumn = computed(() => Math.ceil(props.count / 2));
    const pageNum = computed(() => Math.ceil(props.items.length / props.count));
    const actionItems = computed(() => {
      const res: any = [];
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
    const handleSelected = (i: any) => {
      emitEvent('selected', i);
    };

    return {
      name: ref(name),
      pageNum,
      gridColumn,
      actionItems,
      gridClasses,
      handleSelected,
    };
  },
});
</script>
