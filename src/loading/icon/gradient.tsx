import { defineComponent, nextTick, onMounted, onUpdated, ref, CSSProperties, PropType } from 'vue';
import circleAdapter from '../../_common/js/loading/circle-adapter';
import config from '../../config';
import { usePrefixClass } from '../../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-gradient`,
  props: {
    style: Object as PropType<CSSProperties>,
  },
  setup(props) {
    const gradientClass = usePrefixClass('loading__gradient');
    const classes = [gradientClass.value, `${prefix}-icon-loading`];
    const circle = ref<HTMLElement>();
    const updateColor = () => {
      const circleElem = circle.value;
      circleAdapter(circleElem);
    };

    onMounted(() => {
      nextTick(() => {
        updateColor();
      });
    });
    onUpdated(() => {
      updateColor();
    });

    return () => (
      <svg
        style={props.style}
        class={classes}
        viewBox="0 0 12 12"
        version="1.1"
        width="1em"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject x="0" y="0" width="12" height="12">
          <div ref={circle} class={`${gradientClass.value}-conic`} />
        </foreignObject>
      </svg>
    );
  },
});
