<template>
  <div :class="classes">
    <slot></slot>
    <Avatar :size="size" :icon="icon" v-if="isShowEllipsisContent">
      {{ellipsisContent}}
    </Avatar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue';
import { renderTNode } from '../shared';
import AvatarGroupProps from './props';
import config from '../config';
import Avatar from '../avatar/avatar.vue';

const { prefix } = config;
const name = `${prefix}-avatar-group`;

export default defineComponent({
  name,
  components: {
    Avatar
  },
  props: AvatarGroupProps,
  setup(props, { emit, slots }) {
    const classes = computed(() => [
      `${name}`, 
      {
        [`${prefix}-avatar--offset-right`]: props.cascading === 'right-up',
        [`${prefix}-avatar--offset-left`]: props.cascading === 'left-up',
      }
    ]);

    const internalInstance = getCurrentInstance();
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));
    const icon = iconContent || null;

    let children: any[] = slots.default ? slots.default() : [];
    const max = props.max || 0;
    let childrenShow: any[] = [];
    let isShowEllipsisContent = false;
    let ellipsisContent: any = icon;
    if(max && max < children.length) {
      childrenShow = children.slice(0, max);
      isShowEllipsisContent = true;
      ellipsisContent = props.collapseAvatar ? props.collapseAvatar : `+${children.length - max}`;
    }
    children = childrenShow;


    return { 
      classes,
      icon,
      isShowEllipsisContent,
      ellipsisContent,
    };
  },
});
</script>
