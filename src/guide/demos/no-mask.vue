<template>
  <div class="guide-demo">
    <t-button theme="primary" @click="handleClick">用户引导</t-button>
    <t-popup v-model="visible" placement="bottom" style="height: 100vh; border-radius: 0" destroy-on-close>
      <template #default>
        <div class="guide-container">
          <div class="main-title">
            <div class="title-major">用户引导标题</div>
            <div class="title-sub">按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</div>
          </div>
          <div class="field label-field">
            <t-input label="标签文字" layout="vertical" placeholder="请输入内容" />
          </div>
          <div class="field">
            <t-input label="标签文字" layout="vertical" placeholder="请输入内容" />
          </div>
          <div class="action">
            <t-button theme="light" variant="base" size="large">重置</t-button>
            <t-button theme="primary" size="large">确定</t-button>
          </div>
        </div>

        <t-guide
          v-model="current"
          :steps="steps"
          :show-overlay="false"
          @change="handleChange"
          @next-step-click="handleNextStepClick"
          @finish="handleFinish"
          @skip="handleSkip"
          @back="handleBack"
        ></t-guide>
      </template>
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { TdGuideProps } from 'tdesign-mobile-vue';

const visible = ref(false);
const current = ref(-1);

const steps: TdGuideProps['steps'] = [
  {
    element: '.main-title',
    title: '用户引导标题',
    body: '用户引导的说明文案',
    placement: 'center',
  },
  {
    element: '.label-field',
    title: '用户引导标题',
    body: '用户引导的说明文案',
    placement: 'bottom',
    highlightPadding: 0,
  },
  {
    element: '.action',
    title: '用户引导标题',
    body: '用户引导的说明文案',
    placement: 'bottom-right',
  },
];
const handleClick = () => {
  visible.value = true;
  setTimeout(() => {
    current.value = 0;
  }, 800);
};

const handleChange: TdGuideProps['onChange'] = (current: number, { e, total }) => {
  console.log(current, e, total);
};

const handleNextStepClick: TdGuideProps['onNextStepClick'] = ({ e, next, current, total }) => {
  console.log(e, next, current, total);
};

const handleFinish: TdGuideProps['onFinish'] = ({ e, current, total }) => {
  visible.value = false;
  console.log(e, current, total);
};

const handleSkip: TdGuideProps['onSkip'] = ({ e, current, total }) => {
  visible.value = false;
  console.log(e, current, total);
};
const handleBack: TdGuideProps['onBack'] = ({ e, current, total }) => {
  console.log(e, current, total);
};
</script>
<style scoped>
.guide-demo {
  display: flex;
  justify-content: center;
}
.guide-container {
  height: 100%;
  width: 100%;
  position: relative;
}
.main-title {
  margin: 16px;
  display: inline-block;
}
.title-major {
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
}
.title-sub {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-top: 4px;
  color: rgba(0, 0, 0, 0.6);
}
.action {
  margin: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>
