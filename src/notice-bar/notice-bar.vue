<template>
  <div :class="rootClasses" :style="bgColorCustom" v-if="showNoticeBar" ref="root">
    <div :class="`${name}__inner`">
      <div :class="`${name}__hd`" v-if="showLeftArea">
        <slot name="leftSlot">
          <t-icon
            :name="`${leftIconCustom}`"
            :style="iconColorCustom"
          />
        </slot>
      </div>
      <div :class="`${name}__bd`">
        <div
          ref="listDOM"
          :class="`${name}__list ${scrollable ? `${name}__list--scrolling` : ''}`"
        >
          <div
            ref="itemDOM"
            :class="`${name}__item ${showDetailText ? `${name}__item-detail` : ''}`"
            :style="scrollable ? animateStyle : ''"
            @transitionend="handleTransitionend()"
          >
            <span
              :class="`${name}__text`"
              :style="colorCustom"
            >{{content}}<span
              :class="`${name}__text-detail`"
              v-if="showDetailText"
              @click="handleDetailLink"
            >{{detailText}}</span>
            </span>
          </div>
        </div>
      </div>
      <div :class="`${name}__ft`" v-if="showRightArea" @click="handleClickIcon">
        <slot name="rightSlot">
          <t-icon
            :name="`${rightIconCustom}`"
            :style="iconColorCustom"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs, SetupContext, computed, onMounted, nextTick, defineComponent, PropType } from 'vue';
import { NoticeBarProps, NoticeBarType, NoticeBarMode, NoticeBarIcon } from './notice-bar.interface';
import TIcon from '../icon';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-notice-bar`;


export default defineComponent({
  name,
  components: { TIcon },
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
    /**
     * @description 显示与隐藏
     * @attribute visible
     */
    visible: {
      type: Boolean,
      default: true,
    },
    /**
     * @description 文本内容
     * @attribute content
     */
    content: {
      type: String,
    },
    /**
     * @description 文本颜色
     * @attribute color
     */
    color: {
      type: String,
      default: '',
    },
    /**
     * @description 背景色
     * @attribute bgColor
     */
    bgColor: {
      type: String,
      default: '',
    },
    /**
     * @description 是否需要滚动
     * @attribute scrollable
     */
    scrollable: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 类型
     * @attribute type
     */
    type: {
      type: String,
      default: '',
    },
    /**
     * @description 模式
     * @attribute mode
     */
    mode: {
      type: String as PropType<NoticeBarMode>,
      default: NoticeBarMode.Default,
    },
    /**
     * @description 左边图标
     * @attribute leftIcon
     */
    leftIcon: {
      type: String,
      default: '',
    },
    /**
     * @description 图标颜色
     * @attribute iconColor
     */
    iconColor: {
      type: String,
      default: '',
    },
    /**
     * @description 详情
     * @attribute detailText
     */
    detailText: {
      type: String,
      default: '详情',
    },
    /**
     * @description 详情颜色
     * @attribute detailTextColor
     */
    detailTextColor: {
      type: String,
      default: '详情',
    },
    /**
     * @description 滚动速度
     * @attribute speed
     */
    speed: {
      type: Number,
      default: 50,
    },
    /**
     * @description 延迟
     * @attribute delay
     */
    delay: {
      type: Number,
      default: 0,
    },
  },
  setup(props: NoticeBarProps, context: SetupContext) {
    // console.log('props', props);
    // console.log('context', context);

    const state = reactive({
      duration: 0,
      offset: 0,
      listWidth: 0,
      itemWidth: 0,
      timer: null,
      nextTimer: null,
    });

    const root = ref(null);
    const rootClasses = computed(() => [
      `${name}`,
      {
        [`${name}--info`]:
          props.type === NoticeBarType.Info.valueOf(),
        [`${name}--error`]:
          props.type === NoticeBarType.Error.valueOf(),
      },
    ]);

    const showLeftArea = computed(() => props.mode !== NoticeBarMode.Text.valueOf());

    const leftIconCustom = computed(() => {
      let icon = '';
      if (props.mode === NoticeBarMode.Default.valueOf()) {
        icon =  props.leftIcon || NoticeBarIcon.Info;
      } else if (props.mode === NoticeBarMode.Text.valueOf()) {
        icon = '';
      } else if (props.mode === NoticeBarMode.Link.valueOf()) {
        icon =  props.leftIcon || NoticeBarIcon.Info;
      } else {
        icon = props.leftIcon || NoticeBarIcon.Sound;
      }
      return icon;
    });

    const showRightArea = computed(() => {
      let isShow = false;
      if (props.mode === NoticeBarMode.Text.valueOf()) {
        isShow = false;
      } else if (props.mode === NoticeBarMode.Default.valueOf()) {
        isShow = false;
      } else {
        isShow = true;
      }
      return isShow;
    });

    const rightIconCustom = computed(() => {
      let icon = '';
      if (
        props.mode === NoticeBarMode.Closeable.valueOf() ||
        props.mode === NoticeBarMode.Detail.valueOf()
      ) {
        icon = NoticeBarIcon.Clear;
      } else if (props.mode === NoticeBarMode.Link.valueOf()) {
        icon = NoticeBarIcon.Right;
      } else {
        icon = '';
      }
      return icon;
    });

    const colorCustom = computed(() => (props.color ? `color:${props.color}` : ''));

    const bgColorCustom = computed(() => (props.bgColor ? `background-color:${props.bgColor}` : ''));

    const iconColorCustom = computed(() => (props.iconColor ? `color:${props.iconColor};` : ''));

    const showNoticeBar = computed(() => props.modelValue);

    function handleClose() {
      console.log('handleClose');
      context.emit('update:modelValue', props.modelValue);
      context.emit('close', props.modelValue);
    };

    function handleClick()  {
      context.emit('click');
      console.log('handleClick');
    };

    const handleClickIcon = computed(() => {
      let fn = () => {};
      if (
        props.mode === NoticeBarMode.Closeable.valueOf() ||
        props.mode === NoticeBarMode.Detail.valueOf()
      ) {
        fn = handleClose;
      } else  {
        fn = handleClick;
      }
      return fn;
    });

    const showDetailText = computed(() => props.mode === NoticeBarMode.Detail.valueOf());

    function handleDetailLink() {
      console.log('handleDetailLink');
      context.emit('detail');
    };

    const animateStyle = computed(() => ({
      transform: state.offset ? `translateX(${state.offset}px)` : '',
      transitionDuration: `${state.duration}s`,
      transitionTimingFunction: 'linear',
    }));

    const listDOM = ref();
    const itemDOM = ref();

    function handleScrolling() {
      const delay = props.delay && props.delay > 0 ? props.delay * 1000 : 0;
      const speed = props.speed && props.speed > 0 ? props.speed : 50;

      setTimeout(() => {
        if (!props.scrollable) {
          return;
        }

        const listDOMWidth = listDOM.value.getBoundingClientRect().width;
        const itemDOMWidth = itemDOM.value.getBoundingClientRect().width;

        if (itemDOMWidth > listDOMWidth) {
          state.offset = -itemDOMWidth;
          state.duration = itemDOMWidth / speed;
          state.listWidth = listDOMWidth;
          state.itemWidth = itemDOMWidth;
        }
      }, delay);
    };

    function handleTransitionend() {
      const speed = props.speed && props.speed > 0 ? props.speed : 50;

      state.offset = state.listWidth;
      state.duration = 0;

      setTimeout(() => {
        state.offset = -state.itemWidth;
        state.duration = (state.itemWidth + state.listWidth) / speed;
      }, 0);
    }

    onMounted(() => {
      nextTick(() => {
        handleScrolling();
      });
    });

    return {
      name,
      ...toRefs(state),
      root,
      rootClasses,
      showLeftArea,
      showRightArea,
      leftIconCustom,
      rightIconCustom,
      showDetailText,
      colorCustom,
      bgColorCustom,
      iconColorCustom,
      showNoticeBar,
      handleClickIcon,
      handleDetailLink,
      listDOM,
      itemDOM,
      animateStyle,
      handleScrolling,
      handleTransitionend,
    };
  },
});
</script>
