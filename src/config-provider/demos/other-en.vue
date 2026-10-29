<template>
  <t-config-provider :global-config="globalConfig">
    <div class="rate-demo-cell rate-demo-cell--space">
      <div class="rate-demo-cell__label">Rating</div>
      <t-rate v-model="rateValue" show-text />
    </div>

    <t-calendar
      v-model:visible="visibleCalendar"
      @close="onCalendarClose"
      @confirm="handleCalendarConfirm"
      @select="handleCalendarSelect"
    />
    <t-cell title="Single select date" arrow :note="calendarDateNote" @click="visibleCalendar = true" />

    <t-cell title="Select time" :note="pickerValueText || 'YY-MM-DD'" @click="visible = true" />
    <t-popup v-model="visible" placement="bottom">
      <t-date-time-picker
        :value="pickerValue"
        :mode="['date']"
        start="2015-5-5"
        format="YYYY-MM-DD"
        @change="onChange"
        @pick="onPick"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </t-popup>

    <div class="comment-demo">
      <t-comment
        :avatar="{ shape: 'circle', size: '32px', image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png' }"
        author="Name1"
        content="This is a comment content."
        datetime="Today 16:38"
        :folds="commentFold"
        @folds="handleUpdateFold"
      >
        <t-comment
          v-for="(item, index) in visibleReplies"
          :key="`${item.author}-${index}`"
          :avatar="{ shape: 'circle', size: '20px', image: item.avatar }"
          :author="item.author"
          :content="item.content"
          :datetime="item.datetime"
        />
      </t-comment>
    </div>
  </t-config-provider>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { merge } from 'lodash-es';
import type { CalendarValue, DateValue } from 'tdesign-mobile-vue';
import enConfig from 'tdesign-mobile-vue/es/locale/en_US';

// 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
const globalConfig = merge(enConfig, {
  dateTimePicker: {
    title: 'title test',
  },
});

const visible = ref(false);
const pickerValue = ref('2021-12-23');
const pickerValueText = ref('');

const rateValue = ref(0);

const visibleCalendar = ref(false);
const calendarDateNote = ref('');

const REPLY_COUNT = 6;
// 不传 folds.content，折叠/展开文案走全局国际化配置
const commentFold = ref<Record<string, any>>({
  state: 'collapsed',
  total: REPLY_COUNT,
  step: 3,
});

const replyInfo = ref(
  new Array(REPLY_COUNT).fill({}).map((_, index) => ({
    author: `Name${index + 1}`,
    avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    content: 'This is a reply content.',
    datetime: 'Today 16:38',
  })),
);

const visibleReplies = computed(() => {
  if (commentFold.value.state === 'collapsed') {
    return replyInfo.value.slice(0, 1);
  }
  if (commentFold.value.state === 'partial') {
    return replyInfo.value.slice(0, 3);
  }
  return replyInfo.value;
});

const handleUpdateFold = (context: { fold: Record<string, any> }) => {
  commentFold.value = context.fold;
};

const format = (val: Date) => {
  const date = new Date(val);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const handleCalendarConfirm = (val: CalendarValue) => {
  console.log(val);
  calendarDateNote.value = format(val as Date);
};
const handleCalendarSelect = (val: Date) => {
  console.log(val);
};
const onCalendarClose = (trigger: string) => {
  console.log('closed by', trigger);
};

const onChange = (value: DateValue) => {
  console.log('change: ', value);
};

const onPick = (value: DateValue) => {
  console.log('pick: ', value);
};

const onCancel = () => {
  console.log('cancel');
  visible.value = false;
};

const onConfirm = (value: DateValue) => {
  console.log('confirm: ', value);
  pickerValue.value = String(value);
  pickerValueText.value = String(value);
  visible.value = false;
};
</script>

<style lang="less" scoped>
.rate-demo-cell {
  background-color: var(--td-bg-color-container);
  padding: 12px 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__label {
    font-size: 16px;
    margin-right: 16px;
    min-width: 80px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  }

  &--space {
    margin-bottom: 16px;
  }
}

.comment-demo {
  margin-top: 16px;
  padding: 12px 0;
  background-color: var(--td-bg-color-container);
}
</style>
