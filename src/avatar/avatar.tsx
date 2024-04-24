import { computed, defineComponent, getCurrentInstance, inject, ref } from 'vue';
import TBadge from '../badge';
import TImage from '../image';
import config from '../config';
import AvatarProps from './props';
import { TdAvatarGroupProps, TdAvatarProps } from './type';
import CLASSNAMES from '../shared/constants';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-avatar`;

export default defineComponent({
  name,
  props: AvatarProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();
    const avatarClass = usePrefixClass('avatar');

    const avatarGroupProps = inject<TdAvatarGroupProps>('avatarGroup', {});
    const hasAvatarGroupProps = Object.keys(avatarGroupProps).length > 0;

    const sizeValue = ref(props.size || (avatarGroupProps && avatarGroupProps.size));
    const sizeReValue = ref((avatarGroupProps && avatarGroupProps.size) || props.size);
    const sizeClass = `${sizeReValue.value.indexOf('px') > -1 ? 'medium' : sizeReValue.value}`;
    const avatarClasses = computed(() => [
      `${avatarClass.value}`,
      `${avatarClass.value}--${sizeClass}`,
      {
        [`${avatarClass.value}--${props.shape}`]: props.shape,
      },
      hasAvatarGroupProps ? `${avatarClass.value}--border ${avatarClass.value}--border-${sizeClass}` : '',
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

    const handleImgLoadError = (e: any) => {
      props.onError?.(e);
    };
    return () => {
      const icon = renderTNodeJSX('icon');
      const TNodeContent = renderTNodeContent('default', 'content');

      const readerAvatar = () => {
        if (props.image && !props.hideOnLoadFailed) {
          return (
            <TImage
              style={customSize.value}
              src={props.image}
              alt={props.alt}
              {...(props.imageProps as TdAvatarProps['imageProps'])}
              onError={handleImgLoadError}
            />
          );
        }
        if (icon) {
          return <div class={`${avatarClass.value}__icon`}>{icon}</div>;
        }
        return <span>{TNodeContent}</span>;
      };
      return (
        <div class={`${avatarClass.value}__wrapper`} style={customSize.value}>
          <div class={`${avatarClass.value}__badge`}>
            <TBadge {...(props.badgeProps as TdAvatarProps['badgeProps'])}>
              <div class={avatarClasses.value}>{readerAvatar()}</div>
            </TBadge>
          </div>
        </div>
      );
    };
  },
});
