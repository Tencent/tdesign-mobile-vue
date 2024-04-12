import { computed, defineComponent } from 'vue';
import { InfoCircleIcon, CheckCircleIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import TResultProps from './props';
import { useTNodeJSX } from '../hooks/tnode';
import TImage from '../image';
import { useIcon } from '../hooks/icon';

const { prefix } = config;
const name = `${prefix}-result`;
export default defineComponent({
  name,
  props: TResultProps,
  setup(props) {
    const classPrefix = name;
    const renderTNodeJSX = useTNodeJSX();
    const renderIconTNode = useIcon();
    const resultClass = computed(() => [`${classPrefix}`, `${classPrefix}--theme-${props.theme || 'default'}`]);

    const renderIcon = () => {
      const defaultIcons = {
        default: InfoCircleIcon,
        success: CheckCircleIcon,
        warning: InfoCircleIcon,
        error: CloseCircleIcon,
      };
      const iconContent = renderIconTNode('icon', defaultIcons);
      return iconContent ? <iconContent class={`${classPrefix}__icon`}></iconContent> : null;
    };

    const renderImage = () => {
      const image = renderTNodeJSX('image');
      if (image) {
        if (typeof image === 'string') {
          return <TImage src={image} />;
        }
        return image;
      }
      return null;
    };

    const renderThumb = () => {
      const image = renderImage();
      return <div class={`${classPrefix}__thumb`}>{image || renderIcon()}</div>;
    };

    const renderTitle = () => {
      const title = renderTNodeJSX('title');
      return title ? <div class={[`${classPrefix}__title`]}>{title}</div> : null;
    };
    const renderDescription = () => {
      const description = renderTNodeJSX('description');
      return description ? <div class={[`${classPrefix}__description`]}>{description}</div> : null;
    };
    return () => {
      return (
        <div class={[resultClass.value]}>
          {renderThumb()}
          {renderTitle()}
          {renderDescription()}
        </div>
      );
    };
  },
});
