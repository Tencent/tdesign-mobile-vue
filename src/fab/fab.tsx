import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import config from '../config';
import FabProps from './props';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import TButton from '../button';
import { TdFabProps } from './type';
import { reconvertUnit } from '../shared';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-fab`,
  props: FabProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();

    const fabClass = usePrefixClass('fab');
    const fabRef = ref();
    const fabButtonRef = ref();
    const customNodeRef = ref();

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
      props.onDragStart?.({ e });

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

      if (props.draggable !== 'vertical') {
        btnSwitchPos.value.x = x;
        switchPos.value.endX = x;
      }
      if (props.draggable !== 'horizontal') {
        btnSwitchPos.value.y = y;
        switchPos.value.endY = y;
      }
      switchPos.value.hasMoved = true;
    };

    const getSwitchButtonSafeAreaXY = (x: number, y: number) => {
      const bottomThreshold = reconvertUnit(props.yBounds?.[1] ?? 0);
      const topThreshold = reconvertUnit(props.yBounds?.[0] ?? 0);
      const leftBound = reconvertUnit(props.xBounds?.[0] ?? 0);
      const rightBound = reconvertUnit(props.xBounds?.[1] ?? 0);

      const docWidth = Math.min(window.innerWidth, document.documentElement.clientWidth, screen.width);
      const docHeight = Math.min(window.innerHeight, document.documentElement.clientHeight, screen.height);

      const maxY = docHeight - fabButtonSize.value.height - topThreshold;
      // x 是 right 值：
      // - 最小 right 值是右边界（即 right = rightBound，最靠近右边）
      // - 最大 right 值是 docWidth - width - leftBound（即 left = leftBound，最靠近左边）
      const minX = rightBound;
      const maxX = docWidth - fabButtonSize.value.width - leftBound;

      x = Math.max(minX, Math.min(maxX, x));
      y = Math.max(bottomThreshold, Math.min(maxY, y));

      return [x, y];
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!switchPos.value.hasMoved) {
        return;
      }
      props.onDragEnd?.({ e });
      switchPos.value.startX = 0;
      switchPos.value.startY = 0;
      switchPos.value.hasMoved = false;
      setSwitchPosition(switchPos.value.endX, switchPos.value.endY);

      // 自动吸附
      if (props.magnet) {
        handleMagnet();
      }
    };

    const handleMagnet = () => {
      const docWidth = Math.min(window.innerWidth, document.documentElement.clientWidth, screen.width);
      const currentRight = btnSwitchPos.value.x;
      const currentLeft = docWidth - fabButtonSize.value.width - currentRight;
      const leftBound = reconvertUnit(props.xBounds?.[0] ?? 0);
      const rightBound = reconvertUnit(props.xBounds?.[1] ?? 0);

      if (props.magnet === 'left') {
        // 固定吸附到左边（right = docWidth - width - leftBound）
        setSwitchPosition(docWidth - fabButtonSize.value.width - leftBound, switchPos.value.y);
      } else if (props.magnet === 'right') {
        // 固定吸附到右边（right = rightBound）
        setSwitchPosition(rightBound, switchPos.value.y);
      } else if (props.magnet === true) {
        // 自动判断吸附到左右两侧
        if (currentLeft < currentRight) {
          setSwitchPosition(docWidth - fabButtonSize.value.width - leftBound, switchPos.value.y);
        } else {
          setSwitchPosition(rightBound, switchPos.value.y);
        }
      }
    };

    const setSwitchPosition = (switchX: number, switchY: number) => {
      [switchX, switchY] = getSwitchButtonSafeAreaXY(switchX, switchY);
      switchPos.value.x = switchX;
      switchPos.value.y = switchY;

      if (props.draggable !== 'vertical') {
        btnSwitchPos.value.x = switchX;
      }
      if (props.draggable !== 'horizontal') {
        btnSwitchPos.value.y = switchY;
      }
    };

    const fabStyle = computed(() => {
      const { x, y } = btnSwitchPos.value;
      // TODO: 验收之后可移除
      const transition = !switchPos.value.hasMoved ? 'transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)' : '';

      return `right: ${x}px;bottom: ${y}px;${transition};`;
    });

    const fabClasses = computed(() => [
      `${fabClass.value}`,
      { [`${fabClass.value}--animation`]: !switchPos.value.hasMoved && props.magnet },
    ]);

    onMounted(() => {
      mounted.value = true;
      resetDraggableParams();

      if (fabButtonRef.value || customNodeRef.value) {
        const info = window.getComputedStyle(fabButtonRef.value?.$el || customNodeRef.value);

        fabButtonSize.value.height = +reconvertUnit(info.height);
        fabButtonSize.value.width = +reconvertUnit(info.width);
      }
    });

    const getFabOriginStyle = () => {
      const info = window.getComputedStyle(fabRef.value);
      const { right, bottom } = info || {};

      return {
        right: +(reconvertUnit(right) || 0),
        bottom: +(reconvertUnit(bottom) || 0),
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
      const defaultContent = (
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
      );

      const customNode = renderTNodeJSX('default');
      return (
        <div
          class={fabClasses.value}
          style={mounted.value && props.draggable ? fabStyle.value : props.style}
          onClick={handleClick}
          onTouchstart={onTouchStart}
          onTouchmove={onTouchMove}
          onTouchend={onTouchEnd}
          ref={fabRef}
        >
          {customNode ? <div ref={customNodeRef}>{customNode}</div> : defaultContent}
        </div>
      );
    };
  },
});
