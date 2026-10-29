<template>
  <div class="mobile-comment">
    <t-comment
      :avatar="{ shape: 'circle', size: '32px', image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png' }"
      :actions="mainActions"
      :folds="commentFold"
      content="这是一段很长很长很长很长很长很长的评论内容。"
      datetime="今天16:38·广东"
      @folds="handleUpdateFold"
    >
      <template #author>
        <div class="mobile-comment__author">
          <div>{{ mainCommentAuthor }}</div>
          <t-tag class="mobile-comment__author-tag" variant="light" theme="primary" shape="round"> 作者 </t-tag>
        </div>
      </template>
      <!-- default slot 作为 reply 内容 -->
      <t-comment
        v-for="(item, index) in visibleItems"
        :key="`${item.author}-${index}`"
        :avatar="{ shape: 'circle', size: '20px', image: item.avatar }"
        :actions="getReplyActions(item)"
      >
        <template #author>
          <div class="mobile-comment__author">
            <div>{{ item.author }}</div>
          </div>
        </template>
        <template #content>
          <span v-if="item.replyTo">
            回复<span class="mobile-comment__reply-name">{{ item.replyTo }}</span
            >：{{ item.content }}
          </span>
          <span v-else>{{ item.content }}</span>
        </template>
        <template #datetime>{{ item.datetime }}</template>
      </t-comment>
    </t-comment>
    <t-action-sheet
      v-model:visible="showActionSheet"
      :items="[{ label: '回复' }, { label: '转发' }, { label: '复制' }, { label: '举报' }]"
      cancel-text="取消"
      @selected="handleActionSheetSelected"
    />
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue';
import { Comment as TComment, Tag as TTag, Button as TButton, ActionSheet as TActionSheet } from 'tdesign-mobile-vue';
import { ThumbUpIcon, Uncomfortable1Icon } from 'tdesign-icons-vue-next';

const REPLY_COUNT = 6;
const mainCommentAuthor = 'Name1 名称';

const commentFold = ref({
  state: 'collapsed',
  total: REPLY_COUNT,
  step: 3,
  content: {
    collapsed: `展开${REPLY_COUNT - 1}条回复`,
    partial: ['展开更多回复', '收起'],
    expanded: '收起',
  },
});

const replyInfo = ref(
  new Array(REPLY_COUNT).fill({}).map((_, index) => ({
    author: `Name${index + 1} 名称`,
    avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    content: '这是一段很长很长很长很长很长很长的评论内容。',
    datetime: '今天16:38·广东',
    likeNum: 6,
  })),
);

const showActionSheet = ref(false);
const longPressTarget = ref(null);

const visibleItems = computed(() => {
  if (commentFold.value.state === 'collapsed') {
    return replyInfo.value.slice(0, 1);
  }
  if (commentFold.value.state === 'partial') {
    return replyInfo.value.slice(0, 3);
  }
  return replyInfo.value;
});

const mainActions = [
  {
    key: 'reply',
    placement: 'start',
    content: () =>
      h('div', { class: 'mobile-comment__reply-button', onClick: () => handleReply(mainCommentAuthor) }, '回复'),
  },
  {
    key: 'actions',
    placement: 'end',
    content: () =>
      h('div', { class: 'mobile-comment__actions' }, [
        h(
          TButton,
          { class: 'mobile-comment__actions-button', variant: 'text' },
          {
            default: () => '6',
            icon: () => h(ThumbUpIcon, { size: '14px' }),
          },
        ),
        h(
          TButton,
          { class: 'mobile-comment__actions-button', variant: 'text' },
          {
            icon: () => h(Uncomfortable1Icon, { size: '14px' }),
          },
        ),
      ]),
  },
];

const getReplyActions = (item) => [
  {
    key: 'reply',
    placement: 'start',
    content: () => h('div', { class: 'mobile-comment__reply-button', onClick: () => handleReply(item.author) }, '回复'),
  },
  {
    key: 'actions',
    placement: 'end',
    content: () =>
      h('div', { class: 'mobile-comment__actions' }, [
        h(
          TButton,
          { class: 'mobile-comment__actions-button', variant: 'text' },
          {
            default: () => item.likeNum || '',
            icon: () => h(ThumbUpIcon, { size: '14px' }),
          },
        ),
        h(
          TButton,
          { class: 'mobile-comment__actions-button', variant: 'text' },
          {
            icon: () => h(Uncomfortable1Icon, { size: '14px' }),
          },
        ),
      ]),
  },
];

const handleUpdateFold = (context) => {
  commentFold.value = context.fold;
};

const handleReply = (authorName) => {
  console.log('回复:', authorName);
};

const handleActionSheetSelected = (selected) => {
  const label = typeof selected === 'string' ? selected : selected.label;
  if (label === '回复' && longPressTarget.value) {
    handleReply(longPressTarget.value);
  }
  showActionSheet.value = false;
};
</script>

<style lang="less">
.mobile-comment {
  &__author {
    display: flex;
    align-items: center;
    font: var(--td-font-body-small);

    &-tag {
      border: none;
      --td-tag-medium-padding: 0 var(--td-spacer);
      --td-tag-primary-light-color: transparent;
    }
  }

  &__reply {
    &-button {
      color: var(--td-text-color-secondary);
      font: var(--td-font-body-small);
    }

    &-name {
      color: var(--td-text-color-secondary);
      font: var(--td-font-body-medium);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--td-spacer-2);

    &-button {
      padding: 2px calc(var(--td-spacer) / 4);
      color: var(--td-text-color-placeholder);
      font: var(--td-font-body-small);
      box-sizing: border-box;
      height: var(--td-spacer-3);
    }
  }
}
</style>
