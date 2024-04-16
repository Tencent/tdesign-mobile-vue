import { computed, defineComponent } from 'vue';
import { InfoCircleIcon, CheckCircleIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import ResultProps from './props';
import { useTNodeJSX } from '../hooks/tnode';
import TImage from '../image';
import { useIcon } from '../hooks/icon';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-result`;
export default defineComponent({
  name,
  props: ResultProps,
  setup(props) {
    const resultClass = usePrefixClass('result');
    const renderTNodeJSX = useTNodeJSX();
    const renderIconTNode = useIcon();
    const resultClasses = computed(() => [
      `${resultClass.value}`,
      `${resultClass.value}--theme-${props.theme || 'default'}`,
    ]);

    const renderIcon = () => {
      const defaultIcons = {
        default: InfoCircleIcon,
        success: CheckCircleIcon,
        warning: InfoCircleIcon,
        error: CloseCircleIcon,
      };
      const iconContent = renderIconTNode('icon', defaultIcons);
      return iconContent ? <iconContent class={`${resultClass.value}__icon`}></iconContent> : null;
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
      return <div class={`${resultClass.value}__thumb`}>{image || renderIcon()}</div>;
    };

    const renderTitle = () => {
      const title = renderTNodeJSX('title');
      return title ? <div class={[`${resultClass.value}__title`]}>{title}</div> : null;
    };

    const renderDescription = () => {
      const description = renderTNodeJSX('description');
      return description ? <div class={[`${resultClass.value}__description`]}>{description}</div> : null;
    };

    return () => {
      return (
        <div class={[resultClasses.value]}>
          {renderThumb()}
          {renderTitle()}
          {renderDescription()}
        </div>
      );
    };
  },
});
