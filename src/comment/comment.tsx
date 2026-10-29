import { computed, defineComponent, h, nextTick, onMounted, ref, toRefs, watch } from 'vue';
import { isFunction, isObject } from 'lodash-es';
import { ChevronDownSIcon, ChevronUpSIcon } from 'tdesign-icons-vue-next';
import Avatar from '../avatar';
import { usePrefixClass } from '../hooks/useClass';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import type { CommentActionItem, CommentFold, CommentFoldState } from './type';
import CommentProps from './props';

const DEFAULT_COMMENT_FOLDS = {
  state: 'collapsed',
  total: 0,
  step: 3,
  content: {
    collapsed: '展开回复',
    partial: ['展开更多回复', '收起'], // [主文案, 副文案]
    expanded: '收起',
  },
} as unknown as CommentFold;

export default defineComponent({
  name: 'TComment',
  props: CommentProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const commentClass = usePrefixClass('comment');

    const { folds, defaultFolds } = toRefs(props);

    const innerFoldsState = ref<CommentFoldState>(defaultFolds.value?.state || 'collapsed');
    const foldSteps = ref(0);
    const replyBodyRef = ref<HTMLDivElement>(null);
    const replyInnerRef = ref<HTMLDivElement>(null);

    const isControlled = computed(() => folds.value !== undefined);
    const commentFolds = computed(() => folds.value || defaultFolds.value || DEFAULT_COMMENT_FOLDS);

    // 当前实际使用的折叠状态
    const curFoldsState = computed<CommentFoldState>(() => {
      return isControlled.value ? folds.value?.state || 'collapsed' : innerFoldsState.value;
    });

    // 受控模式下，当外部 folds.state 或 step 变化时同步 foldSteps
    watch([() => folds.value?.state, () => commentFolds.value.step], ([newState]) => {
      if (!isControlled.value) {
        return;
      }
      if (newState === 'collapsed') {
        foldSteps.value = 0;
      } else if (newState === 'expanded') {
        foldSteps.value = (commentFolds.value.step || 3) - 1;
      }
    });

    const handleClickActions = (event: Event, action: CommentActionItem | any) => {
      props.onActions?.({ action, e: event });
    };

    const handleClickFold = (event: Event, isExpand: boolean) => {
      if (!isExpand) {
        // 收起：重置为 collapsed
        foldSteps.value = 0;
        if (!isControlled.value) {
          innerFoldsState.value = 'collapsed';
        }
        props.onFolds?.({
          fold: { ...commentFolds.value, state: 'collapsed' },
          e: event,
        });
        return;
      }

      // 展开：递增步进并计算下一状态
      foldSteps.value += 1;
      const nextState: CommentFoldState =
        foldSteps.value >= (commentFolds.value.step || 3) - 1 ? 'expanded' : 'partial';

      if (!isControlled.value) {
        innerFoldsState.value = nextState;
      }
      props.onFolds?.({
        fold: { ...commentFolds.value, state: nextState },
        e: event,
      });
    };

    const renderAvatar = () => {
      const avatarValue = props.avatar;
      if (typeof avatarValue === 'string') {
        return <Avatar class={`${commentClass.value}__avatar`} image={avatarValue} />;
      }
      if (isObject(avatarValue) && typeof avatarValue !== 'function') {
        return <Avatar class={`${commentClass.value}__avatar`} {...(avatarValue as any)} />;
      }
      return renderTNodeJSX('avatar');
    };

    const renderAuthor = () => <div class={`${commentClass.value}__author`}>{renderTNodeJSX('author')}</div>;

    const renderContentNode = () => <div class={`${commentClass.value}__content`}>{renderTNodeJSX('content')}</div>;

    const renderActionItemContent = (item: CommentActionItem) => {
      const { content } = item;
      if (isFunction(content)) {
        return (content as Function)(h, { disabled: item.disabled });
      }
      return content;
    };

    const renderFooter = () => {
      const renderActions = () => {
        const { actions } = props;
        if (!actions) {
          return null;
        }
        if (!Array.isArray(actions)) {
          return <div onClick={(e: Event) => handleClickActions(e, actions)}>{renderTNodeJSX('actions')}</div>;
        }
        const renderLeftPlacement = () =>
          actions
            .filter((item) => item.placement === 'start')
            .map((item) => (
              <div key={item.key} onClick={(e: Event) => handleClickActions(e, item)}>
                {renderActionItemContent(item)}
              </div>
            ));
        const renderRightPlacement = () =>
          actions
            .filter((item) => item.placement === 'end')
            .map((item) => (
              <div key={item.key} onClick={(e: Event) => handleClickActions(e, item)}>
                {renderActionItemContent(item)}
              </div>
            ));
        return (
          <>
            <div class={`${commentClass.value}-block`}>{renderLeftPlacement()}</div>
            <div class={`${commentClass.value}-block`}>{renderRightPlacement()}</div>
          </>
        );
      };

      return (
        <div class={`${commentClass.value}__bottom`}>
          <div class={`${commentClass.value}__date`}>{renderTNodeJSX('datetime')}</div>
          <div class={`${commentClass.value}__actions`}>{renderActions()}</div>
        </div>
      );
    };

    const renderFoldsContent = () => {
      const { content } = commentFolds.value;
      if (curFoldsState.value === 'collapsed') {
        // 全收起
        return (
          <div class={`${commentClass.value}__folds-item`} onClick={(e: Event) => handleClickFold(e, true)}>
            {content?.collapsed}
            <ChevronDownSIcon size="16px" />
          </div>
        );
      }
      if (curFoldsState.value === 'partial') {
        // 半展开
        const partialContent = content?.partial as any;
        return (
          <>
            <div class={`${commentClass.value}__folds-item`} onClick={(e: Event) => handleClickFold(e, true)}>
              {Array.isArray(partialContent) ? partialContent[0] : partialContent}
              <ChevronDownSIcon size="16px" />
            </div>
            <div class={`${commentClass.value}__folds-item`} onClick={(e: Event) => handleClickFold(e, false)}>
              {Array.isArray(partialContent) ? partialContent[1] : null}
              <ChevronUpSIcon size="16px" />
            </div>
          </>
        );
      }
      // 全展开
      return (
        <div class={`${commentClass.value}__folds-item`} onClick={(e: Event) => handleClickFold(e, false)}>
          {content?.expanded}
          <ChevronUpSIcon size="16px" />
        </div>
      );
    };

    const renderFolds = () => {
      if (!commentFolds.value.total || commentFolds.value.total <= 1) {
        return null;
      }
      return <div class={`${commentClass.value}__folds`}>{renderFoldsContent()}</div>;
    };

    const renderReply = () => {
      return (
        <div class={`${commentClass.value}__reply`}>
          <div ref={replyBodyRef} class={`${commentClass.value}__reply-body`}>
            <div ref={replyInnerRef} class={`${commentClass.value}__reply-inner`}>
              {renderContent('reply', 'default')}
            </div>
          </div>
          {renderFolds()}
        </div>
      );
    };

    // 根据回复区内容高度同步设置容器高度
    const updateReplyBodyHeight = () => {
      const body = replyBodyRef.value;
      const inner = replyInnerRef.value;
      if (body && inner) {
        body.style.height = `${inner.scrollHeight}px`;
      }
    };

    // 首次渲染后同步设置高度，避免闪烁
    onMounted(() => {
      nextTick(updateReplyBodyHeight);
    });

    // 监听回复区内容高度变化，驱动过渡动画
    useResizeObserver(replyInnerRef, updateReplyBodyHeight);

    return () => (
      <div class={`${commentClass.value}`}>
        <div class={`${commentClass.value}__inner`}>
          {renderAvatar()}
          <div class={`${commentClass.value}__detail`}>
            {renderAuthor()}
            {renderContentNode()}
            {renderFooter()}
          </div>
        </div>
        {renderReply()}
      </div>
    );
  },
});
