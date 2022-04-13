<template>
  <div :class="classes">
    <component :is="avatarItems" />
    <avatar v-if="isShowEllipsisContent" :size="size">
      <t-node :content="ellipsisContent"></t-node>
    </avatar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Fragment, getCurrentInstance, provide, ref } from 'vue';
import { renderTNode, TNode } from '../shared';
import AvatarGroupProps from './avatar-group-props';
import { TdAvatarProps } from './type';
import config from '../config';
import Avatar from './avatar.vue';

const { prefix } = config;
const name = `${prefix}-avatar-group`;

export default defineComponent({
  name,
  components: {
    Avatar,
    TNode,
  },
  props: AvatarGroupProps,
  setup(props, { slots }) {
    provide('avatarGroup', { ...props });

    const internalInstance = getCurrentInstance();
    const classes = computed(() => [
      `${name}`,
      {
        [`${prefix}-avatar--offset-right`]: props.cascading === 'right-up',
        [`${prefix}-avatar--offset-left`]: props.cascading === 'left-up',
      },
    ]);

    const isShowEllipsisContent = ref(false);
    const ellipsisContent = ref(null);
    const size = ref(props.size);

    const collapseAvatar = computed(() => renderTNode(internalInstance, 'collapseAvatar'));

    const avatarItems = () => {
      const childContent: any[] = slots.default ? slots.default() : [];
      const children: TdAvatarProps[] = [];
      childContent.forEach((child) => {
        if (child.type === Fragment) {
          children.push(...child.children);
        } else {
          children.push(child);
        }
      });
      let childrenShow: TdAvatarProps[] = [];
      const max = props.max || 0;
      if (max && max < children.length) {
        childrenShow = children.slice(0, max);
        isShowEllipsisContent.value = true;
        ellipsisContent.value = collapseAvatar.value || `+${children.length - max}`;
      } else {
        childrenShow = children;
      }
      size.value = childrenShow[0].size || props.size;
      return childrenShow;
    };
    return {
      classes,
      size,
      isShowEllipsisContent,
      ellipsisContent,
      avatarItems,
    };
  },
});
</script>
