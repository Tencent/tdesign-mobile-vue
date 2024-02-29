<template>
  <div class="guide-demo">
    <t-button theme="primary" @click="handleClick">Button</t-button>
    <t-popup v-model="visible" placement="bottom" style="height: 100vh" destroy-on-close>
      <template #default>
        <div class="guide-container">
          <div class="main-title">
            <div class="title-major">User guide title</div>
            <div class="title-sub">User guide description copy.</div>
          </div>
          <div class="field label-field">
            <t-input label="Label" layout="vertical" placeholder="placeholder" />
          </div>
          <div class="field">
            <t-input label="Label" layout="vertical" placeholder="placeholder" />
          </div>
          <div class="action">
            <t-button theme="light" variant="base" size="large">Reset</t-button>
            <t-button theme="primary" size="large">Confirm</t-button>
          </div>
        </div>

        <t-guide
          v-model="current"
          :steps="steps"
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

import MyPopover from './my-popover.vue';
import { TdGuideProps } from '../type';

const visible = ref(false);
const current = ref(-1);

const steps: TdGuideProps['steps'] = [
  {
    element: '.main-title',
    title: 'User guide title',
    body: 'User guide description copy.',
    placement: 'center',
    // @ts-ignore
    content: MyPopover,
  },
  {
    element: '.label-field',
    title: 'User guide title',
    body: 'User guide description copy.',
    placement: 'bottom',
    highlightPadding: 0,
    // @ts-ignore
    content: MyPopover,
  },
  {
    element: '.action',
    title: 'User guide title',
    body: 'User guide description copy.',
    placement: 'bottom-right',
    // @ts-ignore
    content: MyPopover,
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
  color: rgba(0, 0, 0, 0.6);
}
.action {
  margin: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>
