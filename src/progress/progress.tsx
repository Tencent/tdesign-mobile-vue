import { defineComponent, computed, CSSProperties, VNode } from 'vue';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, CheckIcon, CloseIcon, ErrorIcon } from 'tdesign-icons-vue-next';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';
import { getBackgroundColor } from './utils';
import props from './props';
import { PRO_THEME, CIRCLE_SIZE_PX, STATUS_ICON, PLUMP_SEPARATE } from './constants';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-progress`;

export default defineComponent({
  name,
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const componentName = usePrefixClass('progress');

    const computedStatus = computed(() => {
      if (props.percentage >= 100) {
        return 'success';
      }
      return props.status || 'default';
    });

    const trackBgStyle = computed(() => {
      const style: CSSProperties = {};
      if (props.strokeWidth) {
        const height = isString(props.strokeWidth) ? props.strokeWidth : `${props.strokeWidth}px`;
        style.height = height;
        style.borderRadius = height;
      }
      if (props.trackColor) {
        style.backgroundColor = props.trackColor;
      }
      return style;
    });

    const barStyle = computed(() => {
      return {
        width: `${props.percentage}%`,
        background: props.color && getBackgroundColor(props.color),
      };
    });

    const getIconMap = () => {
      const CIRCLE_ICONS = {
        success: CheckIcon,
        warning: ErrorIcon,
        error: CloseIcon,
      };
      const NORMAL_ICONS = {
        success: CheckCircleFilledIcon,
        warning: ErrorCircleFilledIcon,
        error: ErrorCircleFilledIcon,
      };
      return props.theme === PRO_THEME.CIRCLE ? CIRCLE_ICONS : NORMAL_ICONS;
    };

    // theme=circle 获取直径
    const diameter = computed(() => {
      return CIRCLE_SIZE_PX;
    });

    const rPoints = computed(() => {
      return diameter.value / 2;
    });

    const circleStrokeWidth = computed(() => {
      return props.strokeWidth ? Number(props.strokeWidth) : 6;
    });

    const radius = computed(() => {
      return rPoints.value - circleStrokeWidth.value / 2;
    });

    const circleStyle = computed(() => {
      if (props.theme !== PRO_THEME.CIRCLE) {
        return {};
      }
      return {
        width: `${diameter.value}px`,
        height: `${diameter.value}px`,
      };
    });

    const strokeDashArr = computed(() => {
      const radius = (diameter.value - circleStrokeWidth.value) / 2;
      const perimeter = Math.PI * 2 * radius;
      const percent = props.percentage / 100;
      return `${perimeter * percent}  ${perimeter * (1 - percent)}`;
    });

    const circlePathStyle = computed(() => {
      const strokeColor = isObject(props.color) ? '' : props.color;
      return {
        stroke: strokeColor,
      };
    });

    const circleOuterStyle = computed(() => {
      const strokeColor = isObject(props.trackColor) ? '' : props.trackColor;
      return {
        stroke: strokeColor,
      };
    });

    const getLabelContent = () => {
      let labelContent: string | VNode = `${props.percentage}%`;
      const status = props.status || '';
      if (STATUS_ICON.includes(status) && props.theme !== PRO_THEME.PLUMP) {
        const components = getIconMap();
        const component = components[status];
        if (component) {
          labelContent = <component class={[`${componentName.value}__icon`]}></component>;
        }
      }
      return labelContent;
    };
    return () => {
      const labelContent = props.label && (
        <div class={`${componentName.value}__info`}>{renderTNodeJSX('label', getLabelContent())}</div>
      );

      const separateClasses =
        props.percentage > PLUMP_SEPARATE ? `${componentName.value}--over-ten` : `${componentName.value}--under-ten`;
      return (
        <div class={componentName.value}>
          {props.theme === PRO_THEME.LINE && (
            <div class={`${componentName.value}--thin ${componentName.value}--status-${computedStatus.value}`}>
              <div class={`${componentName.value}__bar`} style={trackBgStyle.value}>
                <div class={`${componentName.value}__inner`} style={barStyle.value}></div>
              </div>
              {labelContent}
            </div>
          )}

          {props.theme === PRO_THEME.PLUMP && (
            <div
              class={[
                `${componentName.value}__bar ${componentName.value}--plump ${separateClasses}`,
                { [`${componentName.value}--status-${computedStatus.value}`]: computedStatus.value },
              ]}
              style={trackBgStyle.value}
            >
              <div class={`${componentName.value}__inner`} style={barStyle.value}>
                {props.percentage > PLUMP_SEPARATE && labelContent}
              </div>
              {props.percentage <= PLUMP_SEPARATE && labelContent}
            </div>
          )}

          {props.theme === PRO_THEME.CIRCLE && (
            <div
              class={`${componentName.value}--circle ${componentName.value}--status-${computedStatus.value}`}
              style={circleStyle.value}
            >
              {labelContent}
              <svg width={diameter.value} height={diameter.value} viewBox={`0 0 ${diameter.value} ${diameter.value}`}>
                <circle
                  cx={rPoints.value}
                  cy={rPoints.value}
                  r={radius.value}
                  stroke-width={circleStrokeWidth.value}
                  fill="none"
                  class={[`${componentName.value}__circle-outer`]}
                  style={circleOuterStyle.value}
                />
                {props.percentage > 0 && (
                  <circle
                    cx={rPoints.value}
                    cy={rPoints.value}
                    r={radius.value}
                    stroke-width={circleStrokeWidth.value}
                    fill="none"
                    stroke-linecap="round"
                    class={[`${componentName.value}__circle-inner`]}
                    transform={`matrix(0,-1,1,0,0,${diameter.value})`}
                    stroke-dasharray={strokeDashArr.value}
                    style={circlePathStyle.value}
                  />
                )}
              </svg>
            </div>
          )}
        </div>
      );
    };
  },
});
