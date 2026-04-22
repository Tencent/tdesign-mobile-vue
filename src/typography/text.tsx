import { computed, defineComponent, ref, h, isVNode } from 'vue';
import { CopyIcon, CheckIcon } from 'tdesign-icons-vue-next';
import { useContent } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import props from './text-props';
import Ellipsis from './ellipsis';
import { copy } from '../_util/copy-to-clipboard';

import type { TdTextProps } from './type';

export default defineComponent({
  name: 'TTypographyText',
  props,
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const isCopied = ref(false);
    const renderContent = useContent();

    const wrapperDecorations = (
      { code, underline, delete: del, strong, keyboard, mark, italic }: TdTextProps,
      content: any,
    ) => {
      let currentContent = content;

      function wrap(needed: boolean, Tag: string, styles: object = {}) {
        if (!needed) return;
        currentContent = h(Tag, { style: styles }, [currentContent]);
      }

      wrap(strong, 'strong');
      wrap(underline, 'u');
      wrap(del, 'del');
      wrap(code, 'code');
      wrap(mark !== false, 'mark', mark ? { backgroundColor: mark } : {});
      wrap(keyboard, 'kbd');
      wrap(italic, 'i');
      return currentContent;
    };

    const classList = computed(() => {
      const { theme, disabled } = props;
      const prefix = COMPONENT_NAME.value;
      const list: string[] = [prefix];
      if (disabled) {
        list.push(`${prefix}--disabled`);
      } else if (theme && ['primary', 'secondary', 'success', 'warning', 'error'].includes(theme)) {
        list.push(`${prefix}--${theme}`);
      }
      return list;
    });

    const content = computed(() => {
      return props.content || slots?.default();
    });

    const renderSuffix = (suffix: any, copied: boolean) => {
      if (typeof suffix === 'function') {
        return suffix(h, { copied });
      }
      if (isVNode(suffix)) {
        return suffix;
      }
      return suffix;
    };

    const renderCopy = (afterEllipsis?: boolean) => {
      const { copyable } = props;

      let icon: any = null;
      let onCopy = () => {};

      if (typeof copyable === 'object') {
        if (copyable.suffix && !isCopied.value) {
          icon = renderSuffix(copyable.suffix, isCopied.value);
        }
        if (typeof copyable.onCopy === 'function') {
          onCopy = copyable.onCopy;
        }
      }

      // 如果没有自定义 suffix，使用默认图标
      if (!icon) {
        icon = isCopied.value ? <CheckIcon /> : <CopyIcon />;
      }

      return (
        <span class={`${COMPONENT_NAME.value}__copy`} onClick={(e: MouseEvent) => onCopyClick(e, onCopy)}>
          {icon}
        </span>
      );
    };

    const getChildrenText = () => {
      const { copyable } = props;
      if (typeof copyable === 'object' && copyable?.text) {
        return copyable.text;
      }
      if (typeof content.value === 'string') {
        return content.value;
      }
      if (Array.isArray(content.value)) {
        return content.value.map((v: any) => v.children).join('');
      }
      return '';
    };

    const onCopyClick = (e: MouseEvent, cb: Function) => {
      e.preventDefault();
      e.stopPropagation();

      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 1500);

      copy(getChildrenText());
      cb?.();
    };

    return () => {
      const content = renderContent('default', 'content');
      return props.ellipsis ? (
        <Ellipsis {...props} class={classList.value} renderCopy={props.copyable ? () => renderCopy(true) : null}>
          {wrapperDecorations(props, content)}
        </Ellipsis>
      ) : (
        <span class={classList.value}>
          {wrapperDecorations(props, content)}
          {props.copyable ? renderCopy() : null}
        </span>
      );
    };
  },
});
