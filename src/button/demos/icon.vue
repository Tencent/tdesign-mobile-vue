<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button variant="text" :icon="starIcon">带图标文字按钮</t-button>
      <t-button theme="primary">
        <template #icon>
          <t-icon-star />
        </template>
        带图标的按钮
      </t-button>
    </div>
    <div class="tdesign-demo-block">
      <t-button loading>带图标的按钮-加载</t-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { StarIcon as TIconStar } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: { TIconStar },
  setup() {
    const starIcon = () => TIconStar;
    return { starIcon };
  },
});
</script>
