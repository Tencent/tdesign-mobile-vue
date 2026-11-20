import { defineComponent, CSSProperties, PropType } from 'vue';
import { usePrefixClass } from '../../hooks/useClass';

export default defineComponent({
  name: 'TGradient',
  props: {
    style: Object as PropType<CSSProperties>,
  },
  setup(props) {
    const classPrefix = usePrefixClass();
    const gradientClass = usePrefixClass('loading__gradient');
    const classes = [gradientClass.value, `${classPrefix.value}-icon-loading`];
    return () => (
      <div class={classes} style={props.style}>
        <div class={`${gradientClass.value}-conic`} />
      </div>
    );
  },
});
