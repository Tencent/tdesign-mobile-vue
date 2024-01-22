<template>
  <div>
    <div class="summary">垂直带序号步骤条</div>
    <div class="steps-vertical-demo-block">
      <t-steps layout="vertical" :current="options.first" @change="onFirstChange">
        <t-step-item
          v-for="(_, index) in count"
          :key="index"
          :title="getTitle('first', index)"
          content="可自定义此处内容"
        />
      </t-steps>
    </div>
    <div class="summary">垂直带图标步骤条</div>
    <div class="steps-vertical-demo-block">
      <t-steps layout="vertical" :current="options.second" @change="onSecondChange">
        <t-step-item
          v-for="(_, index) in count"
          :key="index"
          :title="getTitle('second', index)"
          content="可自定义此处内容"
        >
          <template #icon>
            <CartIcon size="20px" />
          </template>
        </t-step-item>
      </t-steps>
    </div>
    <div class="summary">垂直简略步骤条</div>
    <div class="steps-vertical-demo-block">
      <t-steps layout="vertical" :current="options.third" theme="dot" @change="onThirdChange">
        <t-step-item
          v-for="(_, index) in count"
          :key="index"
          :title="getTitle('third', index)"
          content="可自定义此处内容"
        />
      </t-steps>
    </div>

    <div class="summary">垂直带可自定义此处内容步骤条</div>
    <div class="steps-vertical-demo-block">
      <t-steps layout="vertical" :current="options.four" theme="dot" @change="onFourChange">
        <t-step-item
          v-for="(_, index) in count"
          :key="index"
          :title="getTitle('four', index)"
          content="可自定义此处内容"
        >
          <template v-if="index === 1" #extra>
            <t-image
              src="https://tdesign.gtimg.com/mobile/demos/steps1.png"
              alt="图标"
              style="width: 100%"
              mode="widthFix"
            />
          </template>
        </t-step-item>
      </t-steps>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { CartIcon } from 'tdesign-icons-vue-next';

const options = reactive({
  first: 1,
  second: 1,
  third: 1,
  four: 1,
});
const count = ref(4);
const onFirstChange = (current: number) => {
  options.first = current;
};
const onSecondChange = (current: number) => {
  options.second = current;
};
const onThirdChange = (current: number) => {
  options.third = current;
};
const onFourChange = (current: number) => {
  options.four = current;
};

const getTitle = (type: 'first' | 'second' | 'third' | 'four', index: number) => {
  if (index === options[type]) {
    return '当前步骤';
  }
  if (index < options[type]) {
    return '已完成';
  }
  if (index > options[type]) {
    return '未完成步骤';
  }
};
</script>
