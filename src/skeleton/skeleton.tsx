import { h, defineComponent, watch, ref } from 'vue';
import isNumber from 'lodash/isNumber';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import { useContent } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import config from '../config';
import SkeletonProps from './props';
import { SkeletonRowCol, SkeletonRowColObj, TdSkeletonProps } from './type';
import { ClassName, Styles } from '../common';

const { prefix } = config;

const ThemeMap: Record<TdSkeletonProps['theme'], SkeletonRowCol> = {
  avatar: [{ type: 'circle', size: '48px' }],
  image: [{ type: 'rect', size: '72px' }],
  text: [
    [
      { width: '24%', height: '16px', marginRight: '16px' },
      { width: '76%', height: '16px' },
    ],
    1,
  ],
  paragraph: [1, 1, 1, { width: '55%' }],
};

const getColItemStyle = (obj: SkeletonRowColObj): Styles => {
  const styleName = [
    'width',
    'height',
    'marginRight',
    'marginLeft',
    'margin',
    'size',
    'background',
    'backgroundColor',
    'borderRadius',
  ];
  const style: Styles = {};
  styleName.forEach((name) => {
    if (name in obj) {
      const px = isNumber(obj[name]) ? `${obj[name]}px` : obj[name];
      if (name === 'size') {
        [style.width, style.height] = [px, px];
      } else {
        style[name] = px;
      }
    }
  });
  return style;
};

export default defineComponent({
  name: `${prefix}-skeleton`,
  props: SkeletonProps,
  setup(props, { slots }) {
    const isShow = ref(false);
    const renderContent = useContent();

    const skeletonClass = usePrefixClass('skeleton');

    const getColItemClass = (obj: SkeletonRowColObj): ClassName => [
      `${skeletonClass.value}__col`,
      `${skeletonClass.value}--type-${obj.type || 'text'}`,
      { [`${skeletonClass.value}--animation-${props.animation}`]: props.animation },
    ];

    const renderCols = (_cols: Number | SkeletonRowColObj | Array<SkeletonRowColObj>) => {
      let cols: Array<SkeletonRowColObj> = [];
      if (isArray(_cols)) {
        cols = _cols;
      } else if (isNumber(_cols)) {
        cols = new Array(_cols).fill({ type: 'text' });
      } else {
        cols = [_cols as SkeletonRowColObj];
      }

      return cols.map((obj) => (
        <div class={getColItemClass(obj)} style={getColItemStyle(obj)}>
          {isFunction(obj.content) ? obj.content(h) : obj.content}
        </div>
      ));
    };

    const renderRowCol = (_rowCol?: SkeletonRowCol) => {
      const rowCol: SkeletonRowCol = _rowCol || props.rowCol;

      return rowCol.map((item) => <div class={`${skeletonClass.value}__row`}>{renderCols(item)}</div>);
    };

    watch(
      () => props.loading,
      (val) => {
        if (!val || props.delay === 0) {
          isShow.value = val;
          return;
        }
        setTimeout(() => {
          isShow.value = val;
        }, props.delay);
      },
      { immediate: true },
    );

    return () => {
      const content = renderContent('default', 'content');
      if (slots.default) {
        return <div>{content}</div>;
      }

      if (!isShow.value) {
        return;
      }

      const children = [];

      // 保持优先级： rowCol > theme，增加默认值兜底
      if (props.rowCol) {
        children.push(renderRowCol(props.rowCol));
      } else if (props.theme) {
        children.push(renderRowCol(ThemeMap[props.theme]));
      } else if (!props.theme && !props.rowCol) {
        // 什么都不传时，传入默认 rowCol
        children.push(
          renderRowCol([
            [
              { width: '24%', height: '16px', marginRight: '16px' },
              { width: '76%', height: '16px' },
            ],
            1,
          ]),
        );
      }

      return <div class={skeletonClass.value}>{children}</div>;
    };
  },
});
