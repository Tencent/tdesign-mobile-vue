<template>
  <div class="mobile-comment">
    <t-comment
      :avatar="{ shape: 'circle', size: '32px', image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png' }"
      :actions="actions"
      datetime="今天16:38·广东"
    >
      <template #author>
        <div class="mobile-comment__author">
          <div>Name1 名称</div>
          <t-tag class="mobile-comment__author-tag" variant="light" theme="primary" shape="round"> 作者 </t-tag>
        </div>
      </template>
      <template #content>
        <div class="mobile-comment__text">这是一段很长很长很长很长很长很长的评论内容。</div>
        <div class="mobile-comment__images">
          <div
            v-for="(src, index) in showImages"
            :key="index"
            class="mobile-comment__images-item"
            @click="handleImageClick(index)"
          >
            <t-image :src="src" fit="cover" shape="round" :style="{ width: '78px', height: '78px' }" />
            <div v-if="index === MAX_SHOW - 1 && images.length > MAX_SHOW" class="mobile-comment__images-badge">
              共{{ images.length }}张
            </div>
          </div>
        </div>
      </template>
    </t-comment>
    <t-image-viewer
      v-model:visible="visible"
      :images="images"
      :index="viewerIndex"
      @index-change="(index) => (viewerIndex = index)"
    />
  </div>
</template>

<script setup>
import { ref, h } from 'vue';
import {
  Comment as TComment,
  Tag as TTag,
  Button as TButton,
  Image as TImage,
  ImageViewer as TImageViewer,
} from 'tdesign-mobile-vue';
import { ThumbUpIcon, Uncomfortable1Icon } from 'tdesign-icons-vue-next';

const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
];

const MAX_SHOW = 3;
const showImages = images.slice(0, MAX_SHOW);
const visible = ref(false);
const viewerIndex = ref(0);

const handleImageClick = (index) => {
  viewerIndex.value = index;
  visible.value = true;
};

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

  &__text {
    margin-bottom: calc(var(--td-spacer) / 2);
  }

  &__images {
    display: flex;
    gap: var(--td-spacer);

    &-item {
      position: relative;
      width: 78px;
      height: 78px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
      cursor: pointer;
    }

    &-badge {
      position: absolute;
      right: 4px;
      bottom: 4px;
      padding: 0 var(--td-spacer);
      background: var(--td-mask-active);
      color: var(--td-text-color-anti);
      font: var(--td-font-body-extraSmall);
      border-radius: 12px;
      white-space: nowrap;
    }
  }
}
</style>
