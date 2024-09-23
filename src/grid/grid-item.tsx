import { defineComponent, computed, inject } from 'vue';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import config from '../config';
import props from './grid-item-props';
import { useTNodeJSX } from '../hooks/tnode';
import TImage from '../image';
import TBadge from '../badge';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-grid-item`,
  components: { TImage, TBadge },
  props,
  setup(props, context) {
    const gridItemClass = usePrefixClass('grid-item');

    const renderTNodeJSX = useTNodeJSX();
    const { column, border, align, gutter } = inject<any>('grid');

    const rootStyle = computed(() => {
      const percent = column.value > 0 ? `${100 / +column.value}%` : 0;
      const style: Record<string, any> = {
        textAlign: ['center', 'left'].includes(align.value) ? align.value : 'center',
      };
      if (percent !== 0) {
        style.flexBasis = percent;
      }
      return style;
    });

    const size = computed(() => {
      if (column.value > 4 || !column.value) return 'small';
      return column.value < 4 ? 'large' : 'middle';
    });

    const realImage = computed(() => {
      if (isString(props.image)) return { src: props.image };
      if (isObject(props.image) && !isFunction(props.image) && !context.slots.image) {
        return props.image;
      }
      return null;
    });

    const gridItemClasses = computed(() => [
      `${gridItemClass.value}`,
      `${gridItemClass.value}--${props.layout}`,
      {
        [`${gridItemClass.value}--bordered`]: border.value,
        [`${gridItemClass.value}--surround`]: border.value && gutter.value,
      },
    ]);

    return () => {
      const renderImage = () =>
        realImage.value ? <t-image shape="round" {...realImage.value} /> : renderTNodeJSX('image');

      return (
        <div class={gridItemClasses.value} style={rootStyle.value}>
          <div class={`${gridItemClass.value}__image ${gridItemClass.value}__image--${size.value}`}>
            {props.badge ? <t-badge {...(props.badge as Object)}>{renderImage()}</t-badge> : renderImage()}
          </div>

          <div class={`${gridItemClass.value}__content ${gridItemClass.value}__content--${props.layout}`}>
            <div class={`${gridItemClass.value}__title ${gridItemClass.value}__title--${size.value}`}>
              {renderTNodeJSX('text')}
            </div>
            <div class={`${gridItemClass.value}__description ${gridItemClass.value}__description--${props.layout}`}>
              {renderTNodeJSX('description')}
            </div>
          </div>
        </div>
      );
    };
  },
});
