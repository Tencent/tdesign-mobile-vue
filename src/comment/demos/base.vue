<template>
  <div class="mobile-comment">
    <t-comment
      :avatar="{ shape: 'circle', size: '32px', image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png' }"
      :actions="actions"
      content="这是一段很长很长很长很长很长很长的评论内容。"
      datetime="今天16:38·广东"
    >
      <template #author>
        <div class="mobile-comment__author">
          <div>Name1 名称</div>
          <t-tag class="mobile-comment__author-tag" variant="light" theme="primary" shape="round"> 作者 </t-tag>
        </div>
      </template>
    </t-comment>
  </div>
</template>

<script setup>
import { h } from 'vue';
import { Comment as TComment, Tag as TTag, Button as TButton } from 'tdesign-mobile-vue';
import { ThumbUpIcon, Uncomfortable1Icon } from 'tdesign-icons-vue-next';

const actions = [
  {
    key: 'reply',
    placement: 'start',
    content: () => h('div', { class: 'mobile-comment__reply-button' }, '回复'),
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

  &__reply-button {
    color: var(--td-text-color-secondary);
    font: var(--td-font-body-small);
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
