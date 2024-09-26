import { LoadingIcon, CheckCircleIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';
import { computed, defineComponent, h, ref } from 'vue';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import TOverlay from '../overlay';
import ToastProps from './props';
import config from '../config';
import { useLockScroll } from '../hooks/useLockScroll';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-toast`,
  props: ToastProps,
  setup(props) {
    const toastTypeIcon = {
      loading: LoadingIcon,
      success: CheckCircleIcon,
      error: CloseCircleIcon,
    };

    const toastClass = usePrefixClass('toast');

    const renderTNodeJSX = useTNodeJSX();

    const renderContent = useContent();

    const toastRef = ref<HTMLElement>();

    const customOverlayProps = computed(() => {
      const toastOverlayProps = {
        preventScrollThrough: props.preventScrollThrough,
        visible: props.showOverlay,
      };
      return {
        ...props.overlayProps,
        ...toastOverlayProps,
      };
    });

    const classes = computed(() => [
      `${toastClass.value}`,
      `${toastClass.value}__content`,
      `${toastClass.value}__icon`,
      {
        [`${toastClass.value}--${props.direction}`]: props.direction,
        [`${toastClass.value}__content--${props.direction}`]: props.direction,
        [`${toastClass.value}--loading`]: props.theme === 'loading',
      },
    ]);

    const topOptions = {
      top: '25%',
      bottom: '75%',
      middle: '50%',
    };

    const computedStyle = computed(() => ({
      top: topOptions[props.placement],
    }));

    const iconClasses = computed(() => [
      {
        [`${toastClass.value}__icon--${props.direction}`]: props.direction,
      },
    ]);

    const iconContent = computed(() => {
      let iconNode = renderTNodeJSX('icon');
      if (iconNode === undefined && props.theme) {
        iconNode = h(toastTypeIcon[props.theme]);
      }
      return iconNode;
    });

    const renderIconContent = computed(() => {
      if (iconContent.value) {
        return <div class={iconClasses.value}>{iconContent.value}</div>;
      }
      return '';
    });

    const textClasses = computed(() => [
      {
        [`${toastClass.value}__text`]: !iconContent.value,
        [`${toastClass.value}__text--${props.direction}`]: props.direction,
      },
    ]);

    const messageContent = computed(() => renderContent('default', 'message'));

    const renderMessageContent = computed(() => {
      if (messageContent.value) {
        return <div class={textClasses.value}>{messageContent.value}</div>;
      }
      return '';
    });

    useLockScroll(toastRef, () => props.preventScrollThrough, toastClass.value);

    return () => {
      return (
        <div>
          <TOverlay {...customOverlayProps.value} />

          <div class={classes.value} style={computedStyle.value}>
            {renderIconContent.value}
            {renderMessageContent.value}
          </div>
        </div>
      );
    };
  },
});
