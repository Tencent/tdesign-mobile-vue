import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import config from '../config';
import CountDownProps from './props';
import { useCountDown } from '../shared/useCountDown';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-count-down`,
  props: CountDownProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const countDownClass = usePrefixClass('count-down');
    const countDownClasses = computed(() => [
      countDownClass.value,
      `${countDownClass.value}--${props.theme}`,
      `${countDownClass.value}--${props.size}`,
    ]);
    const visibility = ref(true);
    const visibilitychangeListener = () => {
      visibility.value = !document.hidden;
    };
    onMounted(() => {
      document.addEventListener('visibilitychange', visibilitychangeListener, false);
    });
    onBeforeUnmount(() => {
      document.removeEventListener('visibilitychange', visibilitychangeListener, false);
    });
    const { showTimes } = useCountDown(props, visibility);
    return () => {
      const renderContent = () => {
        const content = renderTNodeJSX('content');

        if (content) {
          return content;
        }

        return showTimes.map((item) => {
          return (
            <>
              <span class={`${countDownClass.value}__item`}>{item.value}</span>
              {item.mark && (
                <span
                  class={[
                    `${countDownClass.value}__split`,
                    `${countDownClass.value}__split--${props.splitWithUnit ? 'text' : 'dot'}`,
                  ]}
                >
                  {item.mark}
                </span>
              )}
            </>
          );
        });
      };
      return <div class={countDownClasses.value}>{renderContent()}</div>;
    };
  },
});
