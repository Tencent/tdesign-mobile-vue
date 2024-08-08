import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import config from '../config';
import FabProps from './props';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import TButton from '../button';
import { TdFabProps } from './type';

const { prefix } = config;
const name = `${prefix}-fab`;
const getNumber = (num: string) => num.replace(/[^\d]/g, '');

export default defineComponent({
  name,
  props: FabProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();

    const fabClass = usePrefixClass('fab');
    const fabRef = ref();
    const fabButtonRef = ref();

    const handleClick = (e: MouseEvent) => {
      props.onClick?.({ e });
    };

    const mounted = ref(false);
    const fabButtonSize = ref({
      width: 48,
      height: 48,
    });
    const btnSwitchPos = ref({
      x: 16,
      y: 32,
    });
    const switchPos = ref({
      hasMoved: false, // exclude click event
      x: btnSwitchPos.value.x, // right
      y: btnSwitchPos.value.y, // bottom
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    });

    const onTouchStart = (e: TouchEvent) => {
      switchPos.value.startX = e.touches[0].pageX;
      switchPos.value.startY = e.touches[0].pageY;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (!props.draggable) {
        return;
      }

      if (e.touches.length <= 0) {
        return;
      }
      const offsetX = e.touches[0].pageX - switchPos.value.startX;
      const offsetY = e.touches[0].pageY - switchPos.value.startY;
      let x = Math.floor(switchPos.value.x - offsetX);
      let y = Math.floor(switchPos.value.y - offsetY);
      [x, y] = getSwitchButtonSafeAreaXY(x, y);
      btnSwitchPos.value.x = x;
      btnSwitchPos.value.y = y;
      switchPos.value.endX = x;
      switchPos.value.endY = y;
      switchPos.value.hasMoved = true;
    };

    const getSwitchButtonSafeAreaXY = (x: number, y: number) => {
      const bottomThreshold = 0;
      const top = 0;
      const windowTop = 0;
      const windowBottom = 0;
      const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth, screen.width);
      const windowHeight = Math.min(window.innerHeight, document.documentElement.clientHeight, screen.height);
      const docWidth = windowWidth;
      const docHeight = windowHeight - top;

      // check edge
      if (x + fabButtonSize.value.width > docWidth) {
        x = docWidth - fabButtonSize.value.width;
      }
      if (y + fabButtonSize.value.height - windowTop > docHeight) {
        y = docHeight - fabButtonSize.value.height + windowTop;
      }

      if (x < 0) {
        x = 0;
      }
      if (y < bottomThreshold + windowBottom) {
        y = bottomThreshold + windowBottom;
      }
      // safe area for iOS Home indicator
      return [x, y];
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!switchPos.value.hasMoved) {
        return;
      }
      switchPos.value.startX = 0;
      switchPos.value.startY = 0;
      switchPos.value.hasMoved = false;
      setSwitchPosition(switchPos.value.endX, switchPos.value.endY);
    };

    const setSwitchPosition = (switchX: number, switchY: number) => {
      [switchX, switchY] = getSwitchButtonSafeAreaXY(switchX, switchY);
      switchPos.value.x = switchX;
      switchPos.value.y = switchY;
      btnSwitchPos.value.x = switchX;
      btnSwitchPos.value.y = switchY;
    };

    const fabStyle = computed(() => ({
      right: `${btnSwitchPos.value.x}px`,
      bottom: `${btnSwitchPos.value.y}px`,
    }));

    onMounted(() => {
      mounted.value = true;
      resetDraggableParams();

      const info = window.getComputedStyle(fabButtonRef.value.$el);
      fabButtonSize.value.height = +getNumber(info.height);
      fabButtonSize.value.width = +getNumber(info.width);
    });

    const getFabOriginStyle = () => {
      const info = window.getComputedStyle(fabRef.value);
      const { right, bottom } = info || {};

      return {
        right: +(getNumber(right) || 0),
        bottom: +(getNumber(bottom) || 0),
      };
    };

    const resetDraggableParams = () => {
      const { right, bottom } = getFabOriginStyle();

      btnSwitchPos.value.x = right;
      btnSwitchPos.value.y = bottom;

      switchPos.value.x = right;
      switchPos.value.y = bottom;
    };

    watch(
      () => props.style,
      () => {
        resetDraggableParams();
      },
    );

    return () => {
      const icon = () => renderTNodeJSX('icon');
      return (
        <div
          class={fabClass.value}
          style={mounted.value && props.draggable ? { ...fabStyle.value } : props.style}
          onClick={handleClick}
          onTouchstart={onTouchStart}
          onTouchmove={onTouchMove}
          onTouchend={onTouchEnd}
          ref={fabRef}
        >
          <TButton
            size="large"
            theme="primary"
            shape={props.text ? 'round' : 'circle'}
            class={`${fabClass.value}__button`}
            {...(props.buttonProps as TdFabProps['buttonProps'])}
            icon={icon}
            ref={fabButtonRef}
          >
            {props.text}
          </TButton>
        </div>
      );
    };
  },
});
