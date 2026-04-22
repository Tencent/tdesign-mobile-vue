import { defineComponent, computed, ref, h } from 'vue';
import { usePrefixClass } from '../hooks/useClass';
import { useConfig } from '../config-provider/useConfig';

import props from './paragraph-props';

import type { TypographyEllipsis } from './type';

export default defineComponent({
  name: 'TEllipsis',
  props: {
    ...props,
    renderCopy: Function,
  },
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const { globalConfig } = useConfig('typography');

    const content = computed(() => {
      return props.content || slots?.default();
    });

    const ellipsisState = computed((): TypographyEllipsis => {
      const { ellipsis } = props;
      return {
        row: 1,
        expandable: false,
        ...(typeof ellipsis === 'object' ? ellipsis : null),
      };
    });

    const ellipsisStyles = computed((): any => {
      const ellipsis = ellipsisState.value;
      const def: Record<string, any> = {
        overflow: props.ellipsis ? 'hidden' : 'visible',
        textOverflow: props.ellipsis ? 'ellipsis' : 'initial',
        whiteSpace: props.ellipsis ? 'normal' : 'nowrap',
        display: '-webkit-box',
        WebkitLineClamp: ellipsis.row,
        WebkitBoxOrient: 'vertical',
      };

      if (isExpand.value) {
        def.overflow = 'visible';
        def.whiteSpace = 'normal';
        def.display = 'initial';
      }
      return def;
    });

    const isExpand = ref(false);

    const onExpand = () => {
      isExpand.value = true;
      if (typeof props.ellipsis === 'object') props.ellipsis.onExpand?.(true);
    };

    const onCollapse = () => {
      isExpand.value = false;
      if (typeof props.ellipsis === 'object') props.ellipsis.onExpand?.(false);
    };

    const renderSuffix = (expanded: boolean) => {
      const { suffix } = ellipsisState.value;
      if (!suffix) return null;
      if (typeof suffix === 'function') return suffix(h, { expanded });
      return suffix;
    };

    const renderEllipsisExpand = () => {
      const { suffix } = ellipsisState.value;
      const symbolStyle = {
        textDecoration: 'none',
        whiteSpace: 'nowrap' as const,
        flex: 1,
        marginRight: props.renderCopy ? '8px' : 0,
      };
      const moreNode = (
        <span class={`${COMPONENT_NAME.value}-ellipsis-symbol`} onClick={onExpand} style={symbolStyle}>
          {suffix ? renderSuffix(false) : globalConfig.value?.expandText || '展开'}
        </span>
      );

      const { expandable, collapsible } = ellipsisState.value;
      if (!isExpand.value && expandable) {
        return moreNode;
      }
      if (expandable && isExpand.value && collapsible) {
        return (
          <span class={`${COMPONENT_NAME.value}-ellipsis-symbol`} onClick={onCollapse} style={symbolStyle}>
            {globalConfig.value?.collapseText || '收起'}
          </span>
        );
      }
    };

    return () => {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <p style={props.ellipsis ? ellipsisStyles.value : {}}>{content.value}</p>
          {renderEllipsisExpand()}
          {props.renderCopy?.()}
        </div>
      );
    };
  },
});
