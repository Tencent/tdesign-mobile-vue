import {
  ref,
  reactive,
  defineComponent,
  onMounted,
  watchEffect,
  onBeforeUnmount,
  provide,
  computed,
  watch,
  ComponentPublicInstance,
} from 'vue';
import throttle from 'lodash/throttle';
import { preventDefault } from '../shared/dom';
import config from '../config';
import IndexesProps from './props';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';
import { TdIndexesAnchorProps } from './type';

interface State {
  showSidebarTip: boolean;
  activeSidebar: string | number;
  children: ComponentPublicInstance<TdIndexesAnchorProps>[];
}

interface GroupTop {
  height: number;
  top: number;
  anchor: string | number;
  totalHeight: number;
}

const { prefix } = config;
const name = `${prefix}-indexes`;

export default defineComponent({
  name,
  props: IndexesProps,
  emits: ['select', 'change'],
  setup(props) {
    const readerTNodeJSX = useTNodeJSX();
    const indexesClass = usePrefixClass('indexes');
    let timeOut: number;
    const indexesRoot = ref<HTMLElement>();
    const parentRect = ref();
    const state: State = reactive({
      showSidebarTip: false,
      activeSidebar: '',
      children: [],
    });

    const groupTop: Array<GroupTop> = [];
    const indexList = computed(() => {
      if (!props.indexList) {
        const start = 'A'.charCodeAt(0);
        const alphabet = [];
        for (let i = start, end = start + 26; i < end; i += 1) {
          alphabet.push(String.fromCharCode(i));
        }
        return alphabet;
      }
      return props.indexList;
    });

    const setAnchorOnScroll = (scrollTop: number) => {
      if (!groupTop.length) return;
      const { sticky, stickyOffset } = props;
      const stickyTop = stickyOffset + parentRect.value.top;
      scrollTop += stickyTop;
      const curIndex = groupTop.findIndex(
        (group) => scrollTop >= group.top - group.height && scrollTop <= group.top + group.totalHeight - group.height,
      );
      state.activeSidebar = groupTop[0].anchor;
      if (curIndex === -1) return;
      state.activeSidebar = groupTop[curIndex].anchor;
      const curGroup = groupTop[curIndex];
      if (sticky) {
        const offset = curGroup.top - scrollTop;
        const betwixt = offset < curGroup.height && offset > 0 && scrollTop > stickyTop;
        state.children.forEach((child, index) => {
          const { $el } = child;
          const wrapperClass = `${indexesClass.value}-anchor__wrapper`;
          const headerClass = `${indexesClass.value}-anchor__header`;
          const wrapper = $el.querySelector(`.${wrapperClass}`);
          const header = $el.querySelector(`.${headerClass}`);
          if (index === curIndex) {
            if (scrollTop - parentRect.value.top > stickyOffset) {
              wrapper.classList.add(`${wrapperClass}--sticky`);
            } else {
              wrapper.classList.remove(`${wrapperClass}--sticky`);
            }
            wrapper.classList.add(`${wrapperClass}--active`);
            header.classList.add(`${headerClass}--active`);
            wrapper.style = `transform: translate3d(0, ${betwixt ? offset : 0}px, 0); top: ${stickyTop}px`;
          } else if (index + 1 === curIndex) {
            wrapper.classList.add(`${wrapperClass}--sticky`);
            wrapper.classList.add(`${wrapperClass}--active`);
            header.classList.add(`${headerClass}--active`);
            wrapper.style = `transform: translate3d(0, ${
              betwixt ? offset - groupTop[index].height : 0
            }px, 0); top: ${stickyTop}px;`;
          } else {
            wrapper.classList.remove(`${wrapperClass}--sticky`);
            wrapper.classList.remove(`${wrapperClass}--active`);
            header.classList.remove(`${headerClass}--active`);
            wrapper.style = '';
          }
        });
      }
    };

    const scrollToByIndex = (index: number | string) => {
      const curGroup = groupTop.find((item) => item.anchor === index);
      if (indexesRoot.value) {
        indexesRoot.value.scrollTo?.(0, curGroup.top ?? 0);
      }
    };

    const setActiveSidebarAndTip = (index: string | number) => {
      state.activeSidebar = index;
      state.showSidebarTip = true;
    };

    const handleSidebarItemClick = (index: string | number) => {
      props.onSelect?.(index);
      setActiveSidebarAndTip(index);
      scrollToByIndex(index);
    };

    const handleRootScroll = throttle((e: UIEvent) => {
      const scrollTop = indexesRoot.value?.scrollTop ?? 0;
      setAnchorOnScroll(scrollTop);
    }, 1000 / 30);

    const clearSidebarTip = (): void => {
      if (state.showSidebarTip && state.activeSidebar) {
        timeOut && clearTimeout(timeOut);
        timeOut = window.setTimeout(() => {
          state.showSidebarTip = false;
        }, 1000);
      }
    };

    const getAnchorsRect = () => {
      return Promise.all(
        state.children.map((child) => {
          const { $el, index } = child;
          const rect = $el.getBoundingClientRect();
          groupTop.push({
            height: rect.height,
            top: rect.top - parentRect.value.top,
            anchor: index,
            totalHeight: 0,
          });
          return child;
        }),
      );
    };

    const handleSidebarTouchmove = (event: TouchEvent) => {
      preventDefault(event, false);
      const { touches } = event;
      const { clientX, clientY } = touches[0];
      const target = document.elementFromPoint(clientX, clientY);
      if (target && target.className === `${indexesClass.value}__sidebar-item` && target instanceof HTMLElement) {
        const { index } = target.dataset;
        const curIndex = indexList.value.find((idx) => String(idx) === index);
        if (curIndex !== undefined && state.activeSidebar !== curIndex) {
          setActiveSidebarAndTip(curIndex);
          scrollToByIndex(curIndex);
        }
      }
    };

    const relation = (child: ComponentPublicInstance) => {
      child && state.children.push(child);
    };

    watchEffect(() => {
      if (state.showSidebarTip) {
        clearSidebarTip();
      }
    });

    watch(
      () => state.activeSidebar,
      (val, oldVal) => {
        if (val !== oldVal) {
          props.onChange?.(state.activeSidebar);
        }
      },
    );

    onMounted(() => {
      parentRect.value = indexesRoot.value?.getBoundingClientRect() || { top: 0 };
      getAnchorsRect().then(() => {
        groupTop.forEach((item, index) => {
          const next = groupTop[index + 1];
          item.totalHeight = (next?.top || Infinity) - item.top;
        });
        setAnchorOnScroll(0);
      });
    });

    onBeforeUnmount(() => {
      timeOut && clearTimeout(timeOut);
    });

    provide('indexesProvide', {
      relation,
    });

    return () => (
      <div ref={indexesRoot} class={indexesClass.value} onScroll={handleRootScroll}>
        <div class={`${indexesClass.value}__sidebar`}>
          {indexList.value.map((item) => (
            <div
              class={[
                `${indexesClass.value}__sidebar-item`,
                state.activeSidebar === item ? `${indexesClass.value}__sidebar-item--active` : '',
              ]}
              data-index={item}
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                handleSidebarItemClick(item);
              }}
              onTouchmove={handleSidebarTouchmove}
            >
              {item}
              {state.showSidebarTip && state.activeSidebar === item && (
                <div class={`${indexesClass.value}__sidebar-tips`}>{state.activeSidebar}</div>
              )}
            </div>
          ))}
        </div>
        {readerTNodeJSX('default')}
      </div>
    );
  },
});
