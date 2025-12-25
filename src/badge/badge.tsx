import { defineComponent, computed, CSSProperties } from 'vue';
import { isNumber, isString } from 'lodash-es';
import config from '../config';
import BadgeProps from './props';
import { usePrefixClass } from '../hooks/useClass';
import { useContent, useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-badge`,
  props: BadgeProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const renderTNodeContent = useContent();

    const badgeClass = usePrefixClass('badge');
    const classPrefix = usePrefixClass();

    // 是否使用外层类名
    const useOuterClass = computed(() => {
      const target = ['ribbon', 'ribbon-right', 'ribbon-left', 'triangle-right', 'triangle-left'];
      if (props.content || !target.includes(props.shape)) {
        return false;
      }
      return !renderTNodeContent('default', 'content');
    });

    // 徽标外层样式类
    const badgeClasses = computed(() => ({
      [`${badgeClass.value}`]: true,
      [`${badgeClass.value}__${props.shape}-outer`]: useOuterClass.value,
    }));

    // 徽标内层样式类
    const badgeInnerClasses = computed(() => ({
      [`${badgeClass.value}--basic`]: true,
      [`${badgeClass.value}--dot`]: props.dot,
      [`${badgeClass.value}--${props.size}`]: true,
      [`${badgeClass.value}--${props.shape}`]: true,
      [`${badgeClass.value}--count`]: !props.dot && props.count,
      [`${classPrefix.value}-has-count`]: true,
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

    const hasUnit = (value: string): boolean => {
      return /px|rpx|em|rem|%|vh|vw/.test(value);
    };

    const addUnit = (value: string | number): string => {
      const strValue = value.toString();
      return hasUnit(strValue) ? strValue : `${value}px`;
    };

    // 徽标自定义样式
    const badgeStyles = computed(() => {
      const styles: CSSProperties = {};

      if (props.color) {
        styles.background = props.color;
      }

      const [xOffset = 0, yOffset = 0] = props.offset || [];

      if (xOffset) {
        styles.left = `calc(100% + ${addUnit(xOffset)})`;
      }

      if (yOffset) {
        styles.top = addUnit(yOffset);
      }

      return styles;
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
            <div class={`${badgeClass.value}__count`}>{readerCount()}</div>
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
