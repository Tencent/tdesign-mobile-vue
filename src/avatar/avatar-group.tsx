import { computed, defineComponent, Fragment, provide, RendererNode } from 'vue';
import AvatarGroupProps from './avatar-group-props';
import config from '../config';
import TAvatar from './avatar';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import { isValidSize } from '../_common/js/avatar/utils';

const { prefix } = config;
const name = `${prefix}-avatar-group`;

export default defineComponent({
  name,
  props: AvatarGroupProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const avatarGroupClass = usePrefixClass('avatar-group');

    provide('avatarGroup', { ...props });

    const direction = props.cascading ? props.cascading.split('-')[0] : 'right';
    const isCustomSize = computed(() => !isValidSize(props.size));

    const avatarGroupClasses = computed(() => [
      `${avatarGroupClass.value}`,
      `${avatarGroupClass.value}-offset-${direction}`,
      `${avatarGroupClass.value}-offset-${direction}-${isCustomSize.value ? 'medium' : props.size}`,
    ]);

    const onCollapsedItemClick = (e: MouseEvent) => {
      props.onCollapsedItemClick?.({ e });
    };

    const readerAvatar = () => {
      const children: Array<RendererNode> = renderTNodeJSX('default');
      const allChildren: Array<RendererNode> = [];

      children.forEach((child) => {
        if (child.type === Fragment) {
          allChildren.push(...child.children);
        } else {
          allChildren.push(child);
        }
      });

      let isShowCollapse = false;
      let avatarList: Array<RendererNode> = [];
      if (allChildren.length > props.max) {
        avatarList = allChildren.slice(0, props.max);
        isShowCollapse = true;
      } else {
        avatarList = allChildren;
      }

      if (isShowCollapse) {
        const collapseAvatar = renderTNodeJSX('collapseAvatar');
        avatarList.push(
          <div class={`${avatarGroupClass.value}__collapse--default`} onClick={onCollapsedItemClick}>
            <TAvatar size={avatarList[0].size || props.size} shape={props.shape}>
              {collapseAvatar || `+${allChildren.length - props.max}`}
            </TAvatar>
          </div>,
        );
      }

      return avatarList;
    };

    return () => {
      return <div class={avatarGroupClasses.value}>{readerAvatar()}</div>;
    };
  },
});
