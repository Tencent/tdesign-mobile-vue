<template>
  <div :class="avatarClass" :style="customAvatarSize">
    <image
      v-if="image && isImgExist"
      :style="customImageSize"
      :src="image"
      :alt="alt"
      @error="handleImgLoadError"
    ></image>
    <div v-else-if="isIconOnly">
      <t-node :content="iconContent"></t-node>
    </div>
    <span v-else>
      <t-node :content="avatarContent"></t-node>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, getCurrentInstance } from 'vue';
import { renderContent, renderTNode, TNode } from '../shared';
import CLASSNAMES from '../shared/constants';
import AvatarProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-avatar`;

export default defineComponent({
  name,
  components: { TNode },
  props: AvatarProps,
  emits: ['error'],
  setup(props, context) {
    const { size } = toRefs(props);
    const internalInstance = getCurrentInstance();
    const avatarContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const iconContent = renderTNode(internalInstance, 'icon');
    const isIconOnly = computed(() => iconContent && !avatarContent.value);
    const avatarClass = computed(() => [
      `${name}`,
      props.size ? CLASSNAMES.SIZE[props.size] : '',
      {
        [`${name}--circle`]: props.shape === 'circle',
        [`${name}--round`]: props.shape === 'round',
        [`${name}__icon`]: !!isIconOnly.value,
      },
    ]);

    const sizeValue = size.value;
    const isCustomSize = sizeValue && !CLASSNAMES.SIZE[sizeValue];
    const customAvatarSize = computed(() => {
      return isCustomSize
        ? {
            height: sizeValue,
            width: sizeValue,
            'font-size': `${Number.parseInt(sizeValue, 10) / 2}px`,
          }
        : {};
    });
    const customImageSize = computed(() => {
      return isCustomSize
        ? {
            height: sizeValue,
            width: sizeValue,
          }
        : {};
    });
    const isImgExist = computed(() => !props.hideOnLoadFailed);
    const handleImgLoadError = (e: Event) => {
      const { onError } = props;
      onError && onError();
      context.emit('error', e);
    };

    return {
      name,
      ...toRefs(props),
      avatarContent,
      iconContent,
      isIconOnly,
      avatarClass,
      customAvatarSize,
      customImageSize,
      isImgExist,
      handleImgLoadError,
    };
  },
});
</script>
