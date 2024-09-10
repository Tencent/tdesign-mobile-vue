import { computed, defineComponent, inject, ref } from 'vue';
import TBadge from '../badge';
import TImage from '../image';
import config from '../config';
import AvatarProps from './props';
import { TdAvatarGroupProps, TdAvatarProps } from './type';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-avatar`;

export const isValidSize = (value: string): boolean => {
  return ['small', 'medium', 'large'].includes(value);
};

export default defineComponent({
  name,
  props: AvatarProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();
    const avatarClass = usePrefixClass('avatar');

    const avatarGroupProps = inject<TdAvatarGroupProps>('avatarGroup', {});
    const hasAvatarGroupProps = Object.keys(avatarGroupProps).length > 0;

    const sizeValue = ref(props.size || avatarGroupProps?.size);
    const isCustomSize = computed(() => !isValidSize(sizeValue.value));

    const avatarClasses = computed(() => [
      `${avatarClass.value}`,
      `${avatarClass.value}--${isCustomSize.value ? 'medium' : sizeValue.value}`,
      {
        [`${avatarClass.value}--${props.shape}`]: props.shape,
      },
      hasAvatarGroupProps
        ? `${avatarClass.value}--border ${avatarClass.value}--border-${isCustomSize.value ? 'medium' : sizeValue.value}`
        : '',
    ]);

    const customSize = computed(() => {
      return isCustomSize.value
        ? {
            height: sizeValue.value,
            width: sizeValue.value,
            'font-size': `${(Number.parseInt(sizeValue.value, 10) / 8) * 3 + 2}px`,
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
        return <>{TNodeContent}</>;
      };
      return (
        <div class={`${avatarClass.value}__wrapper`}>
          <div class={`${avatarClass.value}__badge`}>
            <TBadge {...(props.badgeProps as TdAvatarProps['badgeProps'])}>
              <div class={avatarClasses.value} style={customSize.value}>
                {readerAvatar()}
              </div>
            </TBadge>
          </div>
        </div>
      );
    };
  },
});
