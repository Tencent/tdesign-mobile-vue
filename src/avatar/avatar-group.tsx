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

      if (props.cascading === 'left-up') {
        const defaultZIndex = 100;
        for (let index = 0; index < avatarList.length; index++) {
          avatarList[index].props.style = `z-index: ${defaultZIndex - index * 10}`;
        }
      }

      if (isShowCollapse) {
        const collapseAvatar = renderTNodeJSX('collapseAvatar');
        avatarList.push(
          <TAvatar size={avatarList[0].size || props.size}>
            {collapseAvatar || `+${allChildren.length - props.max}`}
          </TAvatar>,
        );
      }

      return avatarList;
    };

    return () => {
      return <div class={avatarGroupClasses.value}>{readerAvatar()}</div>;
    };
  },
});
