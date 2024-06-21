import {
  computed,
  defineComponent,
  reactive,
  getCurrentInstance,
  h,
  Transition,
  ref,
  Ref,
  watch,
  nextTick,
  onUnmounted,
} from 'vue';
import { CloseIcon, DeleteIcon } from 'tdesign-icons-vue-next';

import config from '../config';
import props from './props';
import { useDefault, isBrowser, useGesture, DragState, PinchState } from '../shared';
import { useTNodeJSX } from '../hooks/tnode';

// inner components
import { Swiper as TSwiper, SwiperItem as TSwiperItem } from '../swiper';
import TImage from '../image';
import { TdImageViewerProps } from './type';
import { ImageInfo } from './image-viewer-interface';

const { prefix } = config;
const name = `${prefix}-image-viewer`;

const TAP_TIME = 300;

export default defineComponent({
  name,
  components: {
    Transition,
    TSwiper,
    TSwiperItem,
    TImage,
  },
  props,
  emits: ['close', 'index-change', 'update:visible', 'update:modelValue', 'update:index', 'delete'],
  setup(props, { emit }) {
    const state = reactive({
      dblTapZooming: false, // double tap zooming
      zooming: false, // pinch zooming
      scale: 1,
      touchIndex: 0,
      dragging: false,
      draggedX: 0,
      draggedY: 0,
      extraDraggedX: 0,
    });
    const [visible, setVisible] = useDefault(props, emit, 'visible', 'change');
    const [currentIndex, setIndex] = useDefault<TdImageViewerProps['index'], TdImageViewerProps>(
      props,
      emit,
      'index',
      'index-change',
    );

    // 预加载前后几张图片，以保持预览流畅也节省资源
    // 需要预加载的图片索引，第一张、第二张、最后一张，保持当前图片和当前图左右两边的图片预加载
    const preloadImageIndex = [0, 1, props.images.length - 1];
    // 图片列表信息，包含是否需要预加载标志
    const imageInfoList = computed(() => {
      return props.images.map((image, index) => {
        let imageInfo: ImageInfo;
        if (typeof image === 'string') {
          imageInfo = {
            url: image,
            align: 'center',
          };
        } else {
          imageInfo = image;
        }
        return {
          image: imageInfo,
          preload: preloadImageIndex.includes(index),
        };
      });
    });

    const disabled = ref(false);
    const rootRef = ref();
    const imagesSize = reactive({});
    const swiperRootRef = ref();
    const swiperItemRefs = ref<any[]>([]);
    const gestureRef = ref();

    const renderTNodeJSX = useTNodeJSX();

    const closeNode = computed(() => renderTNodeJSX('closeBtn', h(CloseIcon)));
    const deleteNode = computed(() => renderTNodeJSX('deleteBtn', h(DeleteIcon)));

    const imageTransform = computed(() => {
      const { scale, draggedX, draggedY } = state;
      return `matrix(${scale}, 0, 0, ${scale}, ${draggedX}, ${draggedY})`;
    });

    const imageTransitionDuration = computed(() => {
      const { zooming, dragging } = state;
      return zooming || dragging ? 'transition-duration: 0s' : 'transition-duration: 0.3s';
    });

    const beforeClose = () => {
      state.dblTapZooming = false;
      state.zooming = false;
      state.scale = 1;
      state.dragging = false;
      state.draggedX = 0;
      state.draggedY = 0;
      state.extraDraggedX = 0;
    };

    const handleClose = (e: Event, trigger: string) => {
      beforeClose();
      setVisible(false);
      emit('close', { trigger, e });
    };

    const handleDelete = () => {
      emit('delete', currentIndex.value ?? 0);
    };

    // 设置当前索引图片上一张、下一张预加载
    const setImagePreload = (index: number) => {
      const nextIndex = index >= imageInfoList.value.length - 1 ? 0 : index + 1;
      const preIndex = index <= 0 ? imageInfoList.value.length - 1 : index - 1;
      imageInfoList.value[preIndex].preload = true;
      imageInfoList.value[nextIndex].preload = true;
    };

    const onSwiperChange = (index: number, context: any) => {
      if (currentIndex.value !== index) {
        setIndex(index, { context });
        setScale(1);
        setImagePreload(index);
      }
    };

    const onImgLoad = (e: Event, index: number) => {
      const { height } = e.target as HTMLImageElement;
      imagesSize[index] = { height };
    };

    const getMaxDraggedX = () => {
      const rootOffsetWidth = rootRef.value?.offsetWidth || 0;
      const scaledWidth = state.scale * rootOffsetWidth;
      return Math.max(0, (scaledWidth - rootOffsetWidth) / 2);
    };

    const getMaxDraggedY = (index: number) => {
      const rootOffsetHeight = rootRef.value?.offsetHeight || 0;
      // 当前图片高度
      const currentImageHeight = imagesSize?.[index]?.height || 0;
      // 当前图片Scaled后总高度
      const currentImageScaledHeight = state.scale * currentImageHeight;
      // 当前图片Scaled后总高度与原图片高度差值的一半，作为图片Scaled后top和bottom的增量(scale是以图片中心点进行的，align为start和end时会影响)
      const halfScaleHeight = (currentImageScaledHeight - currentImageHeight) / 2;
      if (currentImageScaledHeight <= rootOffsetHeight) {
        return {
          top: 0,
          bottom: 0,
        };
      }
      // 图片和外层root元素高度差
      const diffHeight = currentImageScaledHeight - rootOffsetHeight;
      const centerDraggedY = diffHeight / 2;
      // 图片align配置对应的滚动区域
      const alignmentDraggedY = {
        start: {
          top: -diffHeight + halfScaleHeight,
          bottom: halfScaleHeight,
        },
        center: {
          top: -centerDraggedY,
          bottom: centerDraggedY,
        },
        end: {
          top: -halfScaleHeight,
          bottom: diffHeight - halfScaleHeight,
        },
      };
      // 当前图片align值
      const alignment = imageInfoList.value[index]?.image?.align || 'center';
      return alignmentDraggedY[alignment];
    };

    const setScale = (scale: number) => {
      scale = Math.min(scale, +props.maxZoom + 1);
      if (scale !== state.scale) {
        state.scale = scale;

        if (scale === 1) {
          state.draggedX = 0;
          state.draggedY = 0;
        }
      }
    };

    let dragStartTime: number;
    let dblTapTimer: number | null;

    const toggleScale = () => {
      const scale = state.scale > 1 ? 1 : 2;
      setScale(scale);
    };

    const onTransitionEnd = (index: number) => {
      if (index === state.touchIndex) {
        state.dblTapZooming = false;
        clearTimeout(dblTapTimer);
        dblTapTimer = null;
      }
    };

    const onTransitionStart = (index: number) => {
      if (index === state.touchIndex) {
        state.dblTapZooming = true;
        clearTimeout(dblTapTimer);
      }
    };

    const checkTap = (e: DragState) => {
      const { event } = e;
      const deltaTime = Date.now() - dragStartTime;
      if (deltaTime < TAP_TIME && isBrowser) {
        if (dblTapTimer) {
          clearTimeout(dblTapTimer);
          dblTapTimer = window.setTimeout(() => {
            clearTimeout(dblTapTimer);
            state.dragging = false;
            toggleScale();
          }, TAP_TIME);
        } else {
          dblTapTimer = window.setTimeout(() => {
            handleClose(event, 'overlay');
            dblTapTimer = null;
          }, TAP_TIME);
        }
      }
    };

    const onPinchChange = (scale: number, index: number) => {
      state.zooming = true;
      state.touchIndex = index;
      setScale(scale);
    };

    const onPinchEnd = () => {
      state.zooming = false;
      if (state.scale < 1) {
        setScale(1);
      }
      if (state.scale > props.maxZoom) {
        state.scale = +props.maxZoom;
      }
    };

    const handlePinch = (pinState: PinchState, index: number) => {
      const {
        last,
        offset: [d],
      } = pinState;
      // 图片未加载完毕，禁止拖拽
      if (!imagesSize?.[index]) return;
      if (state.dblTapZooming) return;
      if (!last) {
        onPinchChange(d, index);
      } else {
        onPinchEnd();
      }
    };

    const handleDrag = (dragState: DragState, index: number) => {
      state.touchIndex = index;
      const { setOffset } = swiperRootRef.value || {};

      // 图片未加载完毕，禁止拖拽
      if (!imagesSize?.[index]) return;
      const { first, movement, _movement, elapsedTime, tap, offset, overflow, _delta } = dragState;
      if (first) {
        dragStartTime = Date.now();
      }

      if (tap && elapsedTime > 0 && elapsedTime < 300) {
        checkTap(dragState);
        return;
      }

      // 双击缩放时取消拖拽事件
      if (state.dblTapZooming) {
        dragState?.cancel();
        return;
      }

      state.dragging = true;

      // 过高图片允许上下滑动
      state.draggedY = offset?.[1] || 0;

      if (state.scale === 1) return;

      state.draggedX = offset?.[0] || 0;

      if (movement[0] !== _movement[0] && overflow[0] !== 0) {
        state.extraDraggedX += _delta[0] / 5;
        setOffset?.(state.extraDraggedX, 'X');
      } else if (state.extraDraggedX !== 0) {
        state.extraDraggedX = 0;
        setOffset?.(state.extraDraggedX, 'X');
      }
    };

    const handleDragEnd = (dragState: DragState) => {
      const { overflow, last } = dragState;
      const { goPrev, goNext, swiperContainer } = swiperRootRef.value || {};

      state.dragging = false;

      if (state.extraDraggedX !== 0 && last) {
        if (Math.abs(state.extraDraggedX) > 50) {
          state.extraDraggedX = 0;
          overflow[0] < 0 ? goNext?.('touch') : goPrev?.('touch');
          return;
        }
        state.extraDraggedX = 0;
        nextTick(() => {
          swiperContainer?.style?.setProperty?.('transform', 'translateX(0)');
          swiperContainer?.style?.setProperty?.('transition', 'transform 0.3s');
        });
      }
    };

    const gestureOptions = reactive({
      destroyInvisible: true,
      visible: !!visible.value,
    });

    gestureRef.value = useGesture(gestureOptions);

    watch(
      () => visible.value,
      (newVal) => (gestureOptions.visible = !!newVal),
    );

    watch(
      () => [visible.value, swiperItemRefs.value],
      ([newVisible, newRefs]) => {
        if (!newVisible) return;
        nextTick(() => {
          (newRefs as any[]).forEach?.((item: any, index: number) => {
            const { $el } = item;
            gestureRef.value?.create(
              $el as Element,
              {
                onDrag: (dragState: DragState) => handleDrag(dragState, index),
                onDragEnd: (dragState: DragState) => handleDragEnd(dragState),
                onPinch: (pinchState: PinchState) => handlePinch(pinchState, index),
              },
              {
                drag: {
                  from: () => [state.draggedX, state.draggedY],
                  pointer: { touch: true },
                  bounds: () => ({
                    top: getMaxDraggedY(index).top,
                    right: getMaxDraggedX(),
                    bottom: getMaxDraggedY(index).bottom,
                    left: -getMaxDraggedX(),
                  }),
                },
                pinch: {
                  from: () => [state.scale, 0],
                  pointer: { touch: true },
                },
              },
            );
          });
        });
      },
    );

    watch(
      () => state.scale,
      (newVal) => (disabled.value = newVal !== 1),
    );

    onUnmounted(() => {
      clearTimeout(dblTapTimer);
    });

    return () => (
      <transition name="fade">
        {visible.value && (
          <div ref={rootRef} class={`${prefix}-image-viewer`}>
            <div class={`${name}__mask`} onClick={(e) => handleClose(e, 'overlay')} />
            <TSwiper
              ref={swiperRootRef}
              autoplay={false}
              class={`${name}__content`}
              height="100vh"
              defaultCurrent={currentIndex.value}
              disabled={disabled.value}
              onChange={onSwiperChange}
            >
              {imageInfoList.value.map((info, index) => (
                <TSwiperItem
                  ref={(item: any) => (swiperItemRefs.value[index] = item)}
                  key={index}
                  class={`${name}__swiper-item`}
                  style={`touch-action: none; align-items:${info.image.align};`}
                >
                  {info.preload ? (
                    <img
                      src={info.image.url}
                      style={`
                      transform: ${index === state.touchIndex ? imageTransform.value : 'matrix(1, 0, 0, 1, 0, 0)'}; 
                      ${imageTransitionDuration.value};`}
                      onLoad={(event: Event) => onImgLoad(event, index)}
                      onTransitionstart={(event: TransitionEvent) => {
                        if (event.target === event.currentTarget) {
                          onTransitionStart(index);
                        }
                      }}
                      onTransitionend={(event: TransitionEvent) => {
                        if (event.target === event.currentTarget) {
                          onTransitionEnd(index);
                        }
                      }}
                    />
                  ) : (
                    <span></span>
                  )}
                </TSwiperItem>
              ))}
            </TSwiper>
            <div class={`${name}__nav`}>
              {closeNode.value && (
                <div class={`${name}__nav-close`} onClick={(e) => handleClose(e, 'close-btn')}>
                  {closeNode.value}
                </div>
              )}
              {props.showIndex && (
                <div class={`${name}__nav-index`}>
                  {`${Math.min((currentIndex.value ?? 0) + 1, props.images?.length)}/${props.images?.length}`}
                </div>
              )}
              {deleteNode.value && (
                <div class={`${name}__nav-delete`} onClick={handleDelete}>
                  {deleteNode.value}
                </div>
              )}
            </div>
          </div>
        )}
      </transition>
    );
  },
});
