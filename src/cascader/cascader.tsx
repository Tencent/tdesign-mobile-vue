import { CloseIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import {
  defineComponent,
  toRefs,
  computed,
  ref,
  toRaw,
  reactive,
  watch,
  onMounted,
  Transition,
  onBeforeUnmount,
} from 'vue';
import { get as lodashGet } from 'lodash-es';
import TPopup from '../popup';
import { Tabs } from '../tabs';
import { RadioValue, RadioGroup as TRadioGroup } from '../radio';
import { Search } from '../search';
import props from './props';
import { TreeOptionData } from '../common';
import { useConfig } from '../config-provider/useConfig';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import { CascaderTriggerSource, TdCascaderProps } from './type';

interface ChildrenInfoType {
  value: string | number | boolean;
  level: number;
}

const childrenInfo: ChildrenInfoType = {
  value: '',
  level: 0,
};

interface KeysType {
  value?: string;
  label?: string;
  children?: string;
  disabled?: string;
}

// 搜索结果片段类型
interface ResultFragment {
  id: number;
  text: string;
  highlight: boolean;
}

// 搜索结果项类型
interface FilterResult {
  indexes: number[];
  path: TreeOptionData[];
  disabled: boolean;
  fragments: ResultFragment[];
}

export default defineComponent({
  name: 'TCascader',
  props,
  emits: ['update:visible', 'update:value', 'update:modelValue'],
  setup(props, { emit, expose }) {
    const renderTNodeJSX = useTNodeJSX();
    const cascaderClass = usePrefixClass('cascader');
    const { globalConfig } = useConfig('cascader');

    const { visible, value, modelValue } = toRefs(props);
    const [cascaderValue, setCascaderValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const open = ref(visible.value || false);
    const placeholder = computed(() => props.placeholder || globalConfig.value.placeholder);

    const stepIndex = ref(0);
    const selectedIndexes = reactive<number[]>([]);
    const selectedValue = reactive<Array<string | number>>([]);
    const items = ref<Array<Array<TreeOptionData>>>([props.options ?? []]);
    const steps = reactive([placeholder.value]);

    // 搜索相关状态
    const searchKeyword = ref('');
    const searchResults = ref<FilterResult[]>([]);
    const isSearching = ref(false);
    const filterDebouncedRef = ref<ReturnType<typeof setTimeout> | null>(null);

    // 规范化 keys
    const normalizedKeys = computed(() => ({
      label: props.keys?.label ?? 'label',
      value: props.keys?.value ?? 'value',
      children: props.keys?.children ?? 'children',
      disabled: props.keys?.disabled ?? 'disabled',
    }));

    // 展平所有路径
    const flattenPaths = (
      options: TreeOptionData[],
    ): Array<{
      path: TreeOptionData[];
      indexes: number[];
      labels: string[];
      disabled: boolean;
      isLeaf: boolean;
    }> => {
      const result: Array<{
        path: TreeOptionData[];
        indexes: number[];
        labels: string[];
        disabled: boolean;
        isLeaf: boolean;
      }> = [];
      const keys = normalizedKeys.value;

      const walk = (list: TreeOptionData[], path: TreeOptionData[], indexes: number[]) => {
        list.forEach((item, idx) => {
          const nextPath = [...path, item];
          const nextIndexes = [...indexes, idx];
          const children = item[keys.children];
          const isLeaf = !(Array.isArray(children) && children.length > 0);

          result.push({
            path: nextPath,
            indexes: nextIndexes,
            labels: nextPath.map((node) => String(node[keys.label] ?? '')),
            disabled: nextPath.some((node) => node[keys.disabled]),
            isLeaf,
          });

          if (!isLeaf) {
            walk(children as TreeOptionData[], nextPath, nextIndexes);
          }
        });
      };

      walk(options || [], [], []);
      return result;
    };

    // 构建高亮片段
    const buildFragments = (labels: string[], keyword: string): ResultFragment[] => {
      const joined = labels.join(' / ');
      const push = (acc: ResultFragment[], text: string, highlight: boolean) => {
        if (!text) return;
        acc.push({ id: acc.length, text, highlight });
      };

      if (!keyword) return [{ id: 0, text: joined, highlight: false }];

      const fragments: ResultFragment[] = [];
      const haystack = joined.toLowerCase();
      const needle = keyword.toLowerCase();
      let cursor = 0;
      while (cursor < joined.length) {
        const hit = haystack.indexOf(needle, cursor);
        if (hit === -1) {
          push(fragments, joined.slice(cursor), false);
          break;
        }
        push(fragments, joined.slice(cursor, hit), false);
        push(fragments, joined.slice(hit, hit + needle.length), true);
        cursor = hit + needle.length;
      }
      return fragments.length ? fragments : [{ id: 0, text: joined, highlight: false }];
    };

    // 默认过滤函数
    const defaultFilterFn = (keyword: string, _option: TreeOptionData, path: TreeOptionData[]): boolean => {
      const lower = keyword.toLowerCase();
      const labelKey = normalizedKeys.value.label;
      const joined = path
        .map((node) => String(node?.[labelKey] ?? ''))
        .join('')
        .toLowerCase();
      const text = String(path[path.length - 1]?.[labelKey] ?? '').toLowerCase();
      return joined.includes(lower) || (!!text && text.includes(lower));
    };

    // 执行过滤
    const applyFilter = (rawKeyword: string) => {
      const keyword = String(rawKeyword ?? '').trim();
      if (!keyword) {
        resetFilter();
        return;
      }

      const keys = normalizedKeys.value;
      const flatPaths = flattenPaths(props.options ?? []);
      const userFilter = props.filter as TdCascaderProps['filter'] | undefined;
      const results: FilterResult[] = [];

      flatPaths.forEach((entry) => {
        // 非 checkStrictly 仅保留叶子节点
        if (!props.checkStrictly && !entry.isLeaf) return;

        const leaf = entry.path[entry.path.length - 1];
        const matched = userFilter
          ? !!userFilter(keyword, leaf, entry.path)
          : defaultFilterFn(keyword, leaf, entry.path);

        if (matched) {
          results.push({
            indexes: entry.indexes,
            path: entry.path,
            disabled: entry.disabled,
            fragments: buildFragments(entry.labels, keyword),
          });
        }
      });

      searchResults.value = results;
      isSearching.value = true;
    };

    // 重置过滤
    const resetFilter = () => {
      searchKeyword.value = '';
      searchResults.value = [];
      isSearching.value = false;
    };

    // 处理搜索关键词变化（带防抖）
    const handleFilterChange = (value: string) => {
      const trimmed = String(value ?? '').trim();
      searchKeyword.value = trimmed;
      if (filterDebouncedRef.value) {
        clearTimeout(filterDebouncedRef.value);
      }
      filterDebouncedRef.value = setTimeout(() => {
        applyFilter(trimmed);
      }, 200);
    };

    // 清空搜索
    const handleFilterClear = () => {
      if (filterDebouncedRef.value) {
        clearTimeout(filterDebouncedRef.value);
      }
      resetFilter();
    };

    // 从搜索结果中选择一项
    const handleFilterResultTap = (result: FilterResult) => {
      if (result.disabled || result.indexes.length === 0) return;

      const keys = normalizedKeys.value;
      const { indexes, path } = result;

      // 更新选中状态
      selectedIndexes.length = 0;
      selectedValue.length = 0;
      steps.length = 0;
      items.value = [props.options ?? []];

      // 重建 items 和 steps
      let currentOptions = props.options ?? [];
      let finalLevel = 0;
      for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        const selectedItem = currentOptions[index];
        if (!selectedItem) break;

        selectedIndexes.push(index);
        selectedValue.push(lodashGet(selectedItem, keys.value));
        steps.push(lodashGet(selectedItem, keys.label));
        finalLevel = i;

        const children = lodashGet(selectedItem, keys.children);
        if (Array.isArray(children) && children.length > 0) {
          items.value.push(children);
          currentOptions = children;
        }
      }

      // 触发 onPick
      const finalNode = path[path.length - 1];
      props.onPick?.({
        value: lodashGet(finalNode, keys.value),
        label: String(lodashGet(finalNode, keys.label) || ''),
        index: indexes[indexes.length - 1],
        level: finalLevel,
      });

      // 处理异步加载
      const childrenKey = keys.children;
      if (finalNode && finalNode[childrenKey] === true && props.load) {
        const nodeModel = {
          data: finalNode,
          value: lodashGet(finalNode, keys.value),
          label: lodashGet(finalNode, keys.label),
        };
        props
          .load(nodeModel)
          .then((loadedChildren) => {
            items.value[finalLevel + 1] = loadedChildren;
            while (steps.length <= finalLevel + 1) {
              steps.push('');
            }
            steps.length = finalLevel + 2;
            stepIndex.value = finalLevel + 1;
            steps[finalLevel + 1] = placeholder.value;
            resetFilter();
          })
          .catch((error) => {
            console.error('Load children failed:', error);
          });
        return;
      }

      // 更新 cascader 值
      setCascaderValue(
        lodashGet(finalNode, keys.value),
        path.map((node) => toRaw(node)),
      );
      resetFilter();
      close('finish');
    };

    // 清理防抖定时器
    onBeforeUnmount(() => {
      if (filterDebouncedRef.value) {
        clearTimeout(filterDebouncedRef.value);
      }
    });

    const initWithValue = () => {
      // 清空所有状态
      steps.length = 0;
      selectedValue.length = 0;
      selectedIndexes.splice(0, selectedIndexes.length);
      items.value = [props.options ?? []];

      if (cascaderValue.value != null) {
        const path = getIndexesByValue(props.options, cascaderValue.value);
        path?.forEach((e: number) => {
          // @ts-ignore
          selectedIndexes.push(e);
        });
        watchSelectedIndexes();
      } else {
        // 如果 value 为空,重置为初始状态
        steps.push(placeholder.value);
        stepIndex.value = 0;
      }
    };

    const watchSelectedIndexes = () => {
      if (props.options && props.options.length > 0) {
        items.value = [props.options];

        const keys = props.keys as KeysType;
        for (let i = 0, size = selectedIndexes.length; i < size; i += 1) {
          const index = selectedIndexes[i];
          const next = items.value[i]?.[index];
          selectedValue.push(lodashGet(next, keys?.value ?? 'value'));
          steps.push(lodashGet(next, keys?.label ?? 'label'));
          const children = lodashGet(next, keys?.children ?? 'children');
          if (Array.isArray(children) && children.length > 0) {
            items.value.push(children);
          }
        }
      }

      if (steps.length < items.value.length) {
        steps.push(placeholder.value);
      }
      stepIndex.value = items.value.length - 1;
    };

    const getIndexesByValue = (options: any, value: any) => {
      const keys = props.keys as KeysType;
      for (let i = 0; i < options.length; i++) {
        if (lodashGet(options[i], keys?.value ?? 'value') === value) {
          return [i];
        }
        const children = lodashGet(options[i], keys?.children ?? 'children');
        if (Array.isArray(children) && children.length > 0) {
          const res: any = getIndexesByValue(children, value);
          if (res) {
            return [i, ...res];
          }
        }
      }
    };

    const chooseSelect = (value: RadioValue, level: number, index: number, item: any) => {
      const keys = props.keys as KeysType;
      selectedIndexes[level] = index;
      selectedIndexes.length = level + 1;
      selectedValue[level] = typeof value === 'number' ? value : String(value);
      selectedValue.length = level + 1;
      // 确保 steps 数组长度足够后再赋值
      while (steps.length <= level) {
        steps.push('');
      }
      steps[level] = lodashGet(item, keys?.label ?? 'label');

      const children = lodashGet(item, keys?.children ?? 'children');
      if (children === true && props.load) {
        // 异步加载子节点
        const nodeModel = {
          data: item,
          value: lodashGet(item, keys?.value ?? 'value'),
          label: lodashGet(item, keys?.label ?? 'label'),
        } as any;
        props
          .load(nodeModel)
          .then((loadedChildren) => {
            // 将加载的数据与现有 options 结合
            items.value[level + 1] = loadedChildren;
            // 确保 steps 数组长度足够
            while (steps.length <= level + 1) {
              steps.push('');
            }
            steps.length = level + 2;
            stepIndex.value += 1;
            steps[level + 1] = placeholder.value;
          })
          .catch((error) => {
            console.error('Load children failed:', error);
          });
      } else if (Array.isArray(children) && children.length > 0) {
        items.value[level + 1] = children;
        // 确保 steps 数组长度足够
        while (steps.length <= level + 1) {
          steps.push('');
        }
        steps.length = level + 2;
        stepIndex.value += 1;
        steps[level + 1] = placeholder.value;
      } else {
        items.value.length = level + 1;
        steps.length = level + 1;
        stepIndex.value = level;

        setCascaderValue(
          lodashGet(item, keys?.value ?? 'value'),
          items.value.map((item, index) => toRaw(item?.[selectedIndexes[index]])),
        );
        close('finish');
      }
    };

    const cancelSelect = (value: RadioValue, level: number, index: number, item: any) => {
      const keys = props.keys as KeysType;
      selectedIndexes[level] = index;
      selectedIndexes.length = level;
      selectedValue.length = level;
      // 确保 steps 数组长度足够
      while (steps.length <= level) {
        steps.push('');
      }
      steps[level] = String(placeholder.value);
      steps.length = level + 1;

      const children = lodashGet(item, keys?.children ?? 'children');
      if (Array.isArray(children) && children.length > 0) {
        items.value[level + 1] = children;
      }
    };

    const handleSelect = (value: RadioValue, level: number, fromHandler = true) => {
      const keys = props.keys as KeysType;
      const index = items.value[level].findIndex((item: any) => lodashGet(item, keys?.value ?? 'value') === value);
      const item = items.value[level][index];
      if (lodashGet(item, keys?.disabled ?? 'disabled')) {
        return;
      }

      if (fromHandler) {
        props.onPick?.({
          value: lodashGet(item, keys?.value ?? 'value'),
          label: lodashGet(item, keys?.label ?? 'label'),
          level,
          index,
        });
      }

      if (props.checkStrictly && selectedValue.includes(String(value)) && fromHandler) {
        cancelSelect(value, level, index, item);
      } else {
        chooseSelect(value, level, index, item);
      }
    };

    const close = (trigger: CascaderTriggerSource) => {
      resetFilter();
      props.onClose?.(trigger);
    };

    const handleVisibleChange = (visible: boolean, e: any) => {
      if (e?.trigger !== 'overlay') return;
      close('overlay');
    };

    const updateCascaderValue = () => {
      setCascaderValue(
        selectedValue[selectedValue.length - 1],
        items.value
          .filter((item, index) => !!item && selectedIndexes.length > index)
          .map((item, index) => toRaw(item?.[selectedIndexes[index]])),
      );
    };

    const onClose = () => {
      open.value = false;
      close('close-btn');
    };

    const onCloseBtn = () => {
      if (props.checkStrictly) {
        updateCascaderValue();
        onClose();
      } else {
        onClose();
      }
    };

    const onStepClick = (index: number) => {
      stepIndex.value = index;
    };

    const onTabChange = (value: number | string) => {
      stepIndex.value = Number(value);
    };

    watch(open, () => {
      emit('update:visible', open.value);
    });

    watch(visible, () => {
      open.value = visible.value;
      if (visible.value) {
        initWithValue();
      }
    });

    watch(
      () => props.options,
      () => {
        initWithValue();

        if (open.value && cascaderValue.value) {
          handleSelect(childrenInfo.value, childrenInfo.level, false);
        }
      },
      {
        deep: true,
      },
    );

    watch(placeholder, (newValue, oldValue) => {
      const index = steps.indexOf(oldValue);
      if (index !== -1) {
        steps[index] = newValue;
      }
    });

    watch(
      cascaderValue,
      () => {
        initWithValue();
      },
      {
        deep: true,
      },
    );

    // visible 变化时重置搜索状态
    watch(open, (newVal) => {
      if (!newVal) {
        resetFilter();
      }
    });

    // filterable 关闭时重置搜索状态
    watch(
      () => props.filterable,
      (newVal) => {
        if (!newVal && isSearching.value) {
          resetFilter();
        }
      },
    );

    // options 变化时，若处于搜索态，基于最新数据重新过滤
    watch(
      () => props.options,
      () => {
        if (isSearching.value) {
          applyFilter(searchKeyword.value);
        }
      },
      { deep: true },
    );

    onMounted(() => {
      initWithValue();
    });

    const reset = () => {
      setCascaderValue(undefined, []);
    };

    expose({
      reset,
      searchKeyword,
    });

    return () => {
      const title = renderTNodeJSX('title') || globalConfig.value.title;
      const closeBtn = renderTNodeJSX('closeBtn', { defaultNode: <CloseIcon size="24px" /> });
      const PlaceholderNode = renderTNodeJSX('placeholder');

      const readerStep = () => {
        return (
          <div class={`${cascaderClass.value}__steps`}>
            {steps.map((step, index) => {
              return (
                <div
                  class={`${cascaderClass.value}__step`}
                  onClick={() => {
                    onStepClick(index);
                  }}
                >
                  <div
                    class={[
                      `${cascaderClass.value}__step-dot`,
                      {
                        [`${cascaderClass.value}__step-dot--active`]: step !== placeholder.value,
                        [`${cascaderClass.value}__step-dot--last`]: index === steps.length - 1,
                      },
                    ]}
                  />
                  <div
                    class={[
                      `${cascaderClass.value}__step-label`,
                      {
                        [`${cascaderClass.value}__step-label--active`]: index === stepIndex.value,
                      },
                    ]}
                  >
                    {PlaceholderNode && !(typeof PlaceholderNode === 'string') && step === placeholder.value
                      ? PlaceholderNode
                      : step}
                  </div>
                  <ChevronRightIcon class={`${cascaderClass.value}__step-arrow`} size="22" />
                </div>
              );
            })}
          </div>
        );
      };

      const renderTabStep = () => {
        const _steps = steps.map((item, index) => ({ value: index, label: item }));
        return <Tabs value={stepIndex.value} spaceEvenly={false} list={_steps} onChange={onTabChange} />;
      };

      const readerSteps = () => {
        if (steps.length === 0) {
          return null;
        }
        if (props.theme === 'step') {
          return readerStep();
        }

        if (open.value && props.theme === 'tab') {
          return renderTabStep();
        }
      };

      // 渲染搜索框
      const renderSearchBox = () => {
        if (!props.filterable) return null;
        return (
          <div class={`${cascaderClass.value}__filter`}>
            <Search
              value={searchKeyword.value}
              placeholder={props.filterPlaceholder || '搜索'}
              clearable
              onChange={handleFilterChange}
              onClear={handleFilterClear}
            />
          </div>
        );
      };

      // 渲染搜索结果
      const renderSearchResults = () => {
        if (!isSearching.value) return null;

        if (searchResults.value.length === 0) {
          return (
            <div class={`${cascaderClass.value}__filter-empty`}>
              <span>{(globalConfig.value as any).empty || '暂无搜索结果'}</span>
            </div>
          );
        }

        return (
          <div class={`${cascaderClass.value}__filter-result`}>
            {searchResults.value.map((result, index) => (
              <div
                key={`${result.indexes.join('-')}-${index}`}
                class={[
                  `${cascaderClass.value}__filter-result-item`,
                  { [`${cascaderClass.value}__filter-result-item--disabled`]: result.disabled },
                ]}
                onClick={() => handleFilterResultTap(result)}
              >
                {result.fragments.map((frag) => (
                  <span key={frag.id} class={[{ [`${cascaderClass.value}__filter-highlight`]: frag.highlight }]}>
                    {frag.text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        );
      };

      // 判断是否显示搜索视图
      const isSearchActive = computed(() => props.filterable && isSearching.value);

      return (
        <TPopup
          overlayProps={props.overlayProps}
          v-model={open.value}
          placement="bottom"
          onVisibleChange={handleVisibleChange}
        >
          <div class={`${cascaderClass.value}`}>
            <div class={`${cascaderClass.value}__title`}>{title}</div>
            <div class={`${cascaderClass.value}__close-btn`} onClick={onCloseBtn}>
              {closeBtn}
            </div>
            {renderTNodeJSX('header')}
            <div class={`${cascaderClass.value}__content`}>
              {renderSearchBox()}
              {isSearchActive.value ? (
                renderSearchResults()
              ) : (
                <>
                  {readerSteps()}
                  {renderTNodeJSX('middleContent')}
                  {props.subTitles && props.subTitles[stepIndex.value] && (
                    <div class={`${cascaderClass.value}__options-title`}>{props.subTitles[stepIndex.value]}</div>
                  )}
                  <div
                    class={`${cascaderClass.value}__options-container`}
                    style={`width: ${items.value.length + 1}00vw; transform: translateX(-${stepIndex.value}00vw);`}
                  >
                    {items.value.map((options, index) => {
                      return (
                        <div class={`${cascaderClass.value}__options`}>
                          <Transition appear name="slide">
                            <div class={`${cascaderClass.value}-radio-group-${index}`}>
                              <TRadioGroup
                                value={selectedValue[index] || ''}
                                keys={props.keys}
                                options={options}
                                placement="right"
                                icon="line"
                                borderless
                                onChange={(
                                  value: RadioValue,
                                  context: {
                                    e: Event;
                                  },
                                ) => {
                                  handleSelect(value, index);
                                }}
                              />
                            </div>
                          </Transition>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </TPopup>
      );
    };
  },
});
