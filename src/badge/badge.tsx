import { defineComponent, computed } from 'vue';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import config from '../config';
import BadgeProps from './props';
import { usePrefixClass } from '../hooks/useClass';
import { useContent, useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;
const name = `${prefix}-badge`;

export default defineComponent({
  name,
  props: BadgeProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();

    const badgeClass = usePrefixClass('badge');
    // 徽标外层样式类
    const badgeClasses = computed(() => ({
      [`${badgeClass.value}`]: true,
      [`${badgeClass.value}__ribbon-outer`]: props.shape === 'ribbon',
    }));

    // 徽标内层样式类
    const badgeInnerClasses = computed(() => ({
      [`${badgeClass.value}--basic`]: true,
      [`${badgeClass.value}--dot`]: props.dot,
      [`${badgeClass.value}--${props.size}`]: true,
      [`${badgeClass.value}--${props.shape}`]: true,
      [`${badgeClass.value}--count`]: !props.dot && props.count,
      [`${prefix}-has-count`]: true,
    }));

    // 是否展示角标
    const isShowBadge = computed(() => {
      if (props.dot) {
        return true;
      }
      const count = Number(props.count);
      if (!props.showZero && count === 0) {
        return false;
      }
      if (props.count == null) return false;
      return true;
    });

    const hasUnit = (unit: string) =>
      unit.indexOf('px') > 0 ||
      unit.indexOf('rpx') > 0 ||
      unit.indexOf('em') > 0 ||
      unit.indexOf('rem') > 0 ||
      unit.indexOf('%') > 0 ||
      unit.indexOf('vh') > 0 ||
      unit.indexOf('vm') > 0;

    // 徽标自定义样式
    const badgeStyles = computed(() => {
      if (!props.offset) {
        return { background: props.color };
      }
      let [xOffset = 0, yOffset = 0]: Array<string | number> = props.offset;
      xOffset = hasUnit(xOffset.toString()) ? xOffset : `${xOffset}px`;
      yOffset = hasUnit(yOffset.toString()) ? yOffset : `${yOffset}px`;
      return {
        background: props.color,
        right: xOffset,
        top: yOffset,
      };
    });

    return () => {
      const readerCount = () => {
        if (props.dot) return null;
        if (isString(props.count) || isNumber(props.count)) {
          if (props.count === 0) {
            return props.showZero ? props.count : null;
          }
          return Number(props.count) > Number(props.maxCount) ? `${props.maxCount}+` : props.count;
        }
        return renderTNodeJSX('count');
      };
      const readerContent = () => {
        const content = renderTNodeContent('default', 'content');
        if (typeof content === 'string') {
          return <span class={`${badgeClass.value}__content-text`}>{content}</span>;
        }
        return content;
      };

      const readerBadge = () => {
        if (!isShowBadge.value) {
          return null;
        }
        return (
          <div class={badgeInnerClasses.value} style={badgeStyles.value}>
            {readerCount()}
          </div>
        );
      };
      return (
        <div class={badgeClasses.value}>
          <div class={`${badgeClass.value}__content`}>{readerContent()}</div>
          {readerBadge()}
        </div>
      );
    };
  },
});
