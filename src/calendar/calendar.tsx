import { provide, watch, ref, reactive, nextTick, onMounted, defineComponent, toRefs } from 'vue';
import TPopup from '../popup';
import config from '../config';
import props from './props';
import { useTNodeJSX } from '../hooks/tnode';
import TCalendarTemplate from './template';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-calendar`,
  props,
  emits: ['update:visible'],
  setup(props, context) {
    const calendarClass = usePrefixClass('calendar');

    const calendarTemplateRef = ref();
    const renderTNodeJSX = useTNodeJSX();

    provide('templateProps', reactive(props));
    const selectedValueIntoView = () => {
      const type = props.type === 'range' ? 'start' : 'selected';
      const { templateRef } = calendarTemplateRef.value;
      const scrollContainer = templateRef.querySelector(`.${calendarClass.value}__months`);
      const selectedDate = templateRef.querySelector(`.${calendarClass.value}__dates-item--${type}`)?.parentNode
        ?.previousElementSibling;
      if (selectedDate) {
        scrollContainer.scrollTop = selectedDate.offsetTop - scrollContainer.offsetTop;
      }
    };

    const onPopupVisibleChange = (v: boolean) => {
      if (!v) {
        props.onClose?.('overlay');
      } else {
        nextTick(() => {
          selectedValueIntoView();
        });
      }
      context.emit('update:visible', v);
    };

    onMounted(() => {
      if (!props.usePopup) selectedValueIntoView();
    });

    watch(
      () => props.value,
      (val) => {
        calendarTemplateRef.value.valueRef = val;
      },
    );

    return () => {
      const title = renderTNodeJSX('title');
      const confirmBtn = renderTNodeJSX('confirmBtn');
      return (
        <div>
          {!props.usePopup ? (
            <TCalendarTemplate ref={calendarTemplateRef} title={title} confirmBtn={confirmBtn}></TCalendarTemplate>
          ) : (
            <TPopup visible={props.visible} placement="bottom" onVisibleChange={onPopupVisibleChange}>
              <TCalendarTemplate ref={calendarTemplateRef} title={title} confirmBtn={confirmBtn}></TCalendarTemplate>
            </TPopup>
          )}
        </div>
      );
    };
  },
});
