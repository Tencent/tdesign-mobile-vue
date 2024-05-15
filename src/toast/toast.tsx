import { LoadingIcon, CheckCircleIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';
import { computed, defineComponent, getCurrentInstance, h, onUnmounted } from 'vue';
import { renderTNode, TNode } from '../shared';
import TOverlay from '../overlay';
import ToastProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-toast`;
const bodyLockClass = `${name}-overflow-hidden`;

export default defineComponent({
  name,
  components: { TOverlay, TNode },
  props: ToastProps,
  setup(props) {
    const toastTypeIcon = {
      loading: LoadingIcon,
      success: CheckCircleIcon,
      error: CloseCircleIcon,
    };

    const internalInstance = getCurrentInstance();

    const customOverlayProps = computed(() => {
      const toastOverlayProps = {
        preventScrollThrough: props.preventScrollThrough,
        visible: props.showOverlay,
      };
      props.preventScrollThrough ? lock() : unlock();
      return {
        ...props.overlayProps,
        ...toastOverlayProps,
      };
    });

    const classes = computed(() => [
      `${name}`,
      `${name}__content`,
      `${name}__icon`,
      {
        [`${name}--${props.direction}`]: props.direction,
        [`${name}__content--${props.direction}`]: props.direction,
        [`${name}--loading`]: props.theme === 'loading',
      },
    ]);

    const topOptions = {
      top: '25%',
      bottom: '75%',
    };

    const computedStyle = computed(() => ({ top: topOptions[props.placement] ?? '45%' }));

    const iconClasses = computed(() => [
      {
        [`${name}__icon--${props.direction}`]: props.direction,
      },
    ]);

    const iconContent = computed(() => {
      let iconNode = renderTNode(internalInstance, 'icon');
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
        [`${name}__text`]: !iconContent.value,
        [`${name}__text--${props.direction}`]: props.direction,
      },
    ]);

    const messageContent = computed(() => renderTNode(internalInstance, 'message'));

    const renderMessageContent = computed(() => {
      if (messageContent.value) {
        return <div class={textClasses.value}>{messageContent.value}</div>;
      }
      return '';
    });

    const lock = () => {
      document.body.classList.add(bodyLockClass);
    };

    const unlock = () => {
      document.body.classList.remove(bodyLockClass);
    };

    onUnmounted(() => {
      unlock();
    });

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
