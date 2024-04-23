import { computed, defineComponent, Fragment, provide, RendererNode } from 'vue';

import AvatarGroupProps from './avatar-group-props';
import config from '../config';
import TAvatar from './avatar';

import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

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

    const avatarGroupClasses = computed(() => [
      `${avatarGroupClass.value}`,
      `${avatarGroupClass.value}-offset-${direction}-${props.size.indexOf('px') > -1 ? 'medium' : props.size}`,
    ]);

    const readerAvatarItems = (children: Array<RendererNode>) => {
      const allChildren: Array<RendererNode> = [];
      children.forEach((child) => {
        if (child.type === Fragment) {
          allChildren.push(...child.children);
        } else {
          allChildren.push(child);
        }
      });

      let avatarItems: Array<RendererNode> = [];
      let isShowCollapse = false;
      if (allChildren.length > props.max) {
        avatarItems = allChildren.slice(0, props.max);
        isShowCollapse = true;
      } else {
        avatarItems = allChildren;
      }

      if (props.cascading === 'left-up') {
        const defaultZIndex = 100;
        for (let index = 0; index < avatarItems.length; index++) {
          avatarItems[index].props.style = { style: `z-index: ${defaultZIndex - index * 10}` };
        }
      }

      if (isShowCollapse) {
        const collapseAvatar = renderTNodeJSX('collapseAvatar');
        avatarItems.push(
          <TAvatar size={avatarItems[0].size || props.size}>
            {collapseAvatar || `+${allChildren.length - props.max}`}
          </TAvatar>,
        );
      }

      return avatarItems;
    };

    return () => {
      const children = renderTNodeJSX('default');
      return <div class={avatarGroupClasses.value}>{props.max ? readerAvatarItems(children) : children}</div>;
    };
  },
});
