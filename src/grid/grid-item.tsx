import { defineComponent, getCurrentInstance, computed, inject } from 'vue';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

import config from '../config';
import gridItemProps from './grid-item-props';
import { useTNodeJSX } from '../hooks/tnode';
import TImage from '../image';
import TBadge from '../badge';

const { prefix } = config;
const name = `${prefix}-grid-item`;

export default defineComponent({
  name,
  components: { TImage, TBadge },
  props: gridItemProps,
  setup(props, context) {
    const internalInstance = getCurrentInstance();
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
      `${name}`,
      `${name}--${props.layout}`,
      { [`${name}--bordered`]: border.value, [`${name}--surround`]: border.value && gutter.value },
    ]);

    return () => {
      const renderImage = () =>
        realImage.value ? <t-image shape="round" {...realImage.value} /> : renderTNodeJSX('image');

      return (
        <div class={gridItemClasses.value} style={rootStyle.value}>
          <div class={`${name}__image ${name}__image--${size.value}`}>
            {props.badge ? (
              <t-badge {...(props.badge as Object)}>
                {realImage.value ? <t-image shape="round" {...realImage.value} /> : renderTNodeJSX('image')}
              </t-badge>
            ) : (
              renderImage()
            )}
          </div>

          <div class={`${name}__content ${name}__content--${props.layout}`}>
            <div class={`${name}__title ${name}__title--${size.value}`}>{renderTNodeJSX('text')}</div>
            <div class={`${name}__description ${name}__description--${props.layout}`}>
              {renderTNodeJSX('description')}
            </div>
          </div>
        </div>
      );
    };
  },
});
