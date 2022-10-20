<template>
  <div :class="avatarClass" :style="customSize">
    <div :class="`${name}__inner`">
      <t-image
        v-if="image && !hideOnLoadFailed"
        :style="customSize"
        v-bind="customImageProps"
        @load="handleImgLoadCompleted"
        @error="handleImgLoadError"
      />
      <div v-else-if="iconContent !== undefined" :class="`${name}__icon`">
        <t-node :content="iconContent"></t-node>
      </div>
      <span v-else>
        <t-node :content="avatarContent"></t-node>
      </span>
    </div>
    <div v-if="badgeProps" :class="`${name}__badge`">
      <t-badge
        :count="badgeProps.count"
        :max-count="badgeProps.maxCount"
        :dot="badgeProps.dot"
        :content="badgeProps.content"
        :size="badgeProps.size"
        :offset="badgeProps.offset"
      >
      </t-badge>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, getCurrentInstance, inject, ref, SetupContext } from 'vue';
import TBadge from '../badge';
import TImage from '../image';
import config from '../config';
import AvatarProps from './props';
import { TdAvatarGroupProps } from './type';
import CLASSNAMES from '../shared/constants';
import { renderContent, renderTNode, TNode, useEmitEvent } from '../shared';

const { prefix } = config;
const name = `${prefix}-avatar`;

export default defineComponent({
  name,
  components: { TNode, TBadge, TImage },
  props: AvatarProps,
  emits: ['error'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const internalInstance = getCurrentInstance();
    const avatarGroupProps = inject('avatarGroup', {}) as TdAvatarGroupProps;
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));
    const avatarContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const sizeValue = ref(props.size || (avatarGroupProps && avatarGroupProps.size));
    const avatarClass = computed(() => [
      `${name}`,
      sizeValue.value ? CLASSNAMES.SIZE[sizeValue.value] : '',
      {
        [`${name}--${props.shape}`]: props.shape,
      },
    ]);

    const isCustomSize = computed(() => sizeValue.value && !CLASSNAMES.SIZE[sizeValue.value]);
    const customSize = computed(() => {
      return isCustomSize.value
        ? {
            height: sizeValue.value,
            width: sizeValue.value,
          }
        : {};
    });
    const handleImgLoadCompleted = (e: any) => {
      emitEvent('load', e);
    };
    const handleImgLoadError = (e: any) => {
      emitEvent('error', e);
    };

    const baseImageProps = {
      src: props.image,
      alt: props.alt,
    };
    const customImageProps = computed(() => ({
      ...props.imageProps,
      ...baseImageProps,
    }));

    return {
      name,
      ...toRefs(props),
      iconContent,
      avatarContent,
      avatarClass,
      customSize,
      handleImgLoadCompleted,
      handleImgLoadError,
      customImageProps,
    };
  },
});
</script>
