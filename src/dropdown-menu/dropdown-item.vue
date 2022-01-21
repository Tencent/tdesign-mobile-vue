<template>
  <div v-if="isShowItems" :class="classes" :style="{ ...expandStyle }">
    <t-mask v-if="isShowItems && showOverlay" @click="onClickOverlay" />
    <div :class="styleContent" :style="{ ...transitionStyle }">
      <div :class="`${name}__bd`">
        <slot>
          <template v-if="optionsLayout === 'columns'">
            <template v-if="!multiple">
              <!-- 单选列表 -->
              <t-radio-group v-model="radioSelect">
                <div v-for="option in options" :key="option.value" :class="`${name}__cell`">
                  <t-radio
                    :value="option.value"
                    :label="option.title"
                    :disabled="option.disabled"
                    :class="styleDropRadio(option.value)"
                    :icon="isCheckedRadio(option.value) ? [renderCheckIcon] : []"
                  />
                </div>
              </t-radio-group>
            </template>
            <template v-else>
              <!-- 多选列表 -->
              <t-check-group v-model="checkSelect">
                <div v-for="option in options" :key="option.value" :class="`${name}__cell`">
                  <t-checkbox :value="option.value" :label="option.title" :disabled="option.disabled" />
                </div>
              </t-check-group>
            </template>
          </template>
          <template v-else-if="optionsLayout === 'tree'">
            <!-- 树形列表 ST -->
            <div v-for="(_, level) in treeOptions" :key="level" :class="`${name}__tree-group`">
              <t-radio-group
                v-if="level < treeState.leafLevel"
                :model-value="treeState.selectList[level]"
                @update:model-value="selectTreeNode(level, $event)"
              >
                <!-- 树形列表 - 父级节点 ST -->
                <div
                  v-for="option in treeOptions[level]"
                  :key="option.value"
                  :data-value="option.value"
                  :class="`${name}__cell`"
                >
                  <t-radio
                    :class="styleTreeRadio(option.value, level)"
                    :value="option.value"
                    :label="option.title"
                    :disabled="option.disabled"
                  />
                </div>
                <!-- 树形列表 - 父级节点 ED -->
              </t-radio-group>
              <template v-else>
                <!-- 树形列表 - 叶子节点 ST -->
                <template v-if="!multiple">
                  <!-- 树形列表 - 叶子节点（单选） ST -->
                  <t-radio-group
                    v-for="option in treeOptions[level]"
                    :key="option.value"
                    :value="treeState.selectList[level]"
                    @update:value="selectTreeNode(level, $event)"
                  >
                    <div :class="`${name}__cell`">
                      <t-radio
                        :value="option.value"
                        :label="option.title"
                        :disabled="option.disabled"
                        :class="styleTreeRadio(option.value, level)"
                        :icon="option.value === treeState.selectList[level] ? [renderCheckIcon] : []"
                      />
                    </div>
                  </t-radio-group>
                  <!-- 树形列表 - 叶子节点（单选） ED -->
                </template>
                <template v-else>
                  <!-- 树形列表 - 叶子节点（多选） ST -->
                  <t-check-group :value="treeState.selectList[level]" @update:value="selectTreeNode(level, $event)">
                    <div v-for="option in treeOptions[level]" :key="option.value" :class="`${name}__cell`">
                      <t-checkbox :value="option.value" :label="option.title" :disabled="option.disabled"></t-checkbox>
                    </div>
                  </t-check-group>
                  <!-- 树形列表 - 叶子节点（多选） ED -->
                </template>
                <!-- 树形列表 - 叶子节点 ED -->
              </template>
            </div>
            <!-- 树形列表 ED -->
          </template>
        </slot>
      </div>
      <div v-if="multiple || optionsLayout === 'tree'" :class="`${name}__ft`">
        <t-button variant="outline" :disabled="isBtnDisabled" @click="resetSelect">重置</t-button>
        <t-button theme="primary" :disabled="isBtnDisabled" @click="confirmSelect">确定</t-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  toRefs,
  ref,
  reactive,
  inject,
  watch,
  defineComponent,
  nextTick,
  onBeforeMount,
  SetupContext,
  h,
} from 'vue';
import { CheckIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import { emitEvent } from '../shared/emit';
import TransAniControl from './trans-ani-control';
import DropdownItemProps from './dropdown-item-props';
import { TdDropdownMenuProps, TdDropdownItemOption, TdDropdownItemOptionValueType } from './type';
import { DropdownMenuState, DropdownMenuControl } from './context';

const { prefix } = config;
const name = `${prefix}-dropdown-item`;

interface TdDropdownTreeState {
  /**
   * 叶子层级
   */
  leafLevel: number;
  /**
   * 树的各级选项
   */
  selectList: TdDropdownTreeValueType[];
}

/**
 * 树选中项目（单选/多选）
 */
type TdDropdownTreeValueType = TdDropdownItemOptionValueType | TdDropdownItemOptionValueType[] | undefined;

export default defineComponent({
  name,
  props: DropdownItemProps,
  emits: ['change', 'open', 'opened', 'close', 'closed', 'update:value'],
  setup(props, context: SetupContext) {
    // 从父组件取属性、状态和控制函数
    const menuProps = inject('dropdownMenuProps') as TdDropdownMenuProps;
    const menuState = inject('dropdownMenuState') as DropdownMenuState;
    const { expandMenu, collapseMenu } = inject('dropdownMenuControl') as DropdownMenuControl;
    const menuAniControl = inject('dropdownAniControl') as TransAniControl;

    // 组件样式
    const classes = computed(() => [
      `${name}`,
      {
        [`${prefix}-is-expanded`]: state.isExpanded,
      },
    ]);

    const itemId = ref(0);
    onBeforeMount(() => {
      itemId.value = menuState.childCount;
      menuState.childCount += 1;
    });

    const state = reactive({
      showOverlay: computed(() => menuProps.overlay),
      isShowItems: false,
      isExpanded: false,
      expandStyle: {},
      transitionStyle: computed(() => ({
        transition: `transform ${menuProps.duration}ms ease`,
        '-webkit-transition': `transform ${menuProps.duration}ms ease`,
      })),
      multiple: computed(() => props.multiple),
      optionsLayout: computed(() => props.optionsLayout),
      options: computed(() => props.options),
    });
    const isCheckedRadio = (value: TdDropdownItemOptionValueType) => value === radioSelect.value;
    const styleDropRadio = (value: TdDropdownItemOptionValueType) => [
      `${name}__radio`,
      {
        [`${prefix}-is-tick`]: !props.multiple,
        [`${prefix}-is-checked`]: isCheckedRadio(value),
      },
    ];
    const styleContent = computed(() => {
      const { optionsLayout } = props;
      const layoutCol = +(props.optionsColumns ?? 0);
      const isTree = optionsLayout === 'tree';
      const treeCol = isTree ? treeState.leafLevel + 1 : 0;
      return [
        `${name}__content`,
        {
          [`${prefix}-is-tree`]: isTree,
          [`${prefix}-is-single`]: !isTree && !props.multiple,
          [`${prefix}-is-multi`]: !isTree && props.multiple,
          [`${prefix}-is-col1`]: layoutCol === 1 || treeCol === 1,
          [`${prefix}-is-col2`]: layoutCol === 2 || treeCol === 2,
          [`${prefix}-is-col3`]: layoutCol === 3 || treeCol === 3,
        },
      ];
    });
    // 设置展开/收起状态
    const setExpand = (val: boolean) => {
      // 菜单定位
      const { bottom } = menuState.barRect;
      state.expandStyle = {
        zIndex: menuProps.zIndex,
        top: `${bottom}px`,
      };
      // console.log(`dropdown-item(${itemId.value}) changing state: `, val);
      const { duration } = menuProps;
      // 动画状态控制
      menuAniControl.setTo(
        +duration,
        () => {
          // Now do:
          emitEvent(props, context, val ? 'open' : 'close');
          if (val) {
            state.isShowItems = val;
          }
          state.isExpanded = !val;
        },
        () => {
          // Next tick do:
          state.isExpanded = val;
        },
        () => {
          // Finally do:
          if (!val) {
            state.isShowItems = val;
          }
          emitEvent(props, context, val ? 'opened' : 'closed');
        },
      );
    };

    // 根据父组件状态，判断当前是否展开
    watch(
      () => menuState.activeId === itemId.value,
      (val: boolean) => setExpand(val),
    );

    const radioSelect = ref<TdDropdownItemOptionValueType | null>(null);
    const checkSelect = ref<TdDropdownItemOptionValueType[]>([]);
    const treeState = reactive<TdDropdownTreeState>({
      leafLevel: 0,
      selectList: [],
    });
    const styleTreeRadio = computed(() => (value: string, level: number) => [
      `${name}__radio`,
      {
        [`${prefix}-is-tick`]: level === treeState.leafLevel,
        [`${prefix}-is-checked`]: value === treeState.selectList[level],
      },
    ]);
    // 点击树形节点的时候
    const selectTreeNode = (level: number, value: TdDropdownTreeValueType, rebuildTree = true) => {
      // console.log('level:', level, 'value:', value);
      // 当前节点
      const tempValue: TdDropdownTreeValueType[] = treeState.selectList.slice(0, level);
      tempValue[level] = value;
      treeState.selectList = tempValue;
      if (rebuildTree) {
        buildTreeOptions();
      }
    };
    // 处理后的树形选项列表
    const treeOptions = ref(<TdDropdownItemOption[]>[]);
    const buildTreeOptions = () => {
      const { options } = props;
      const { selectList } = treeState;
      const newTreeOptions = [];
      let level = -1;
      let node: TdDropdownItemOption | undefined = {
        title: '',
        value: '',
        disabled: false,
        options,
      };
      while (node?.options) {
        // 当前层级节点的列表
        const list: TdDropdownItemOption[] = node.options;
        newTreeOptions.push([...list]);
        level += 1;
        // 当前层级列表选中项
        const thisValue: TdDropdownTreeValueType | undefined = selectList[level];
        if (thisValue === undefined) {
          const firstChild = list[0];
          if (firstChild.options) {
            // 还有子节点，当前层级作为单选处理
            selectTreeNode(level, firstChild.value, false);
            node = firstChild;
          } else {
            // 没有子节点，结束处理
            selectTreeNode(level, props.multiple ? [] : undefined, false);
            break;
          }
        } else if (!Array.isArray(thisValue)) {
          const child: TdDropdownItemOption | undefined = list.find(
            (child: TdDropdownItemOption) => child.value === thisValue,
          );
          node = child;
        } else {
          node = undefined;
        }
      }
      treeState.leafLevel = Math.max(0, level);
      treeOptions.value = newTreeOptions as [];
    };
    if (props.optionsLayout === 'tree') {
      watch(
        () =>
          JSON.stringify({
            options: props.options,
          }),
        async () => {
          // fix: 这次微任务结束后，再重建选项。否则 oldVal 无法更新，导致无限调用
          await nextTick();
          buildTreeOptions();
        },
      );
      buildTreeOptions();
    }
    // 根据传入值更新当前选中
    const updateSelectValue = (
      val: TdDropdownItemOptionValueType | TdDropdownItemOptionValueType[] | TdDropdownTreeValueType[] | undefined,
    ) => {
      const layout = props.optionsLayout;
      if (layout === 'tree') {
        treeState.selectList = (val ?? []) as TdDropdownTreeValueType[];
        buildTreeOptions();
      } else if (layout === 'columns') {
        if (!props.multiple) {
          const list = props.options as TdDropdownItemOption[];
          const firstChild = list?.[0];
          const newValue = val ?? firstChild?.value ?? null;
          radioSelect.value = newValue as TdDropdownItemOptionValueType;
        } else if (props.multiple) {
          if (props.optionsLayout === 'columns') {
            checkSelect.value = (val ?? []) as TdDropdownItemOptionValueType[];
          }
        }
      }
    };
    // 初始值更新一次选中项
    updateSelectValue(props.value);
    // 跟踪 modelValue 更新选项
    watch(
      () => props.value,
      (val) => updateSelectValue(val),
    );

    // 底部按键是否可用
    const isBtnDisabled = computed(() => {
      switch (props.optionsLayout) {
        case 'columns':
          return checkSelect.value.length <= 0;
        case 'tree':
          if (!props.multiple) {
            return treeState.selectList[treeState.leafLevel] === undefined;
          }
          if (props.multiple) {
            const selectList = treeState.selectList[treeState.leafLevel] as [];
            return selectList && selectList.length <= 0;
          }
      }
      return true;
    });
    // 重置
    const resetSelect = () => {
      switch (props.optionsLayout) {
        case 'columns':
          checkSelect.value = [];
          break;
        case 'tree':
          treeState.selectList = [];
          break;
      }
    };
    // 确认
    const confirmSelect = () => {
      let values;
      switch (props.optionsLayout) {
        case 'columns':
          values = checkSelect.value;
          break;
        case 'tree':
          values = treeState.selectList;
          break;
      }
      values = JSON.parse(JSON.stringify(values));
      emitEvent(props, context, 'update:value', values);
      emitEvent(props, context, 'change', values);
      collapseMenu();
    };
    // 单选值监控
    watch(radioSelect, (val) => {
      if (props.multiple || props.optionsLayout === 'tree') return;
      if (!state.isShowItems) return;
      const value = props.value || [];
      if (value[0] === val) return;
      emitEvent(props, context, 'update:value', val);
      emitEvent(props, context, 'change', val);
      collapseMenu();
    });
    // 点击遮罩层
    const onClickOverlay = () => {
      if (menuProps.closeOnClickOverlay) {
        collapseMenu();
      }
    };
    // 创建小图标
    const renderCheckIcon = h(CheckIcon);
    return {
      name: ref(name),
      classes,
      styleContent,
      styleDropRadio,
      isBtnDisabled,
      isCheckedRadio,
      radioSelect,
      checkSelect,
      treeOptions,
      treeState,
      selectTreeNode,
      styleTreeRadio,
      ...toRefs(props),
      ...toRefs(state),
      expandMenu,
      collapseMenu,
      resetSelect,
      confirmSelect,
      onClickOverlay,
      renderCheckIcon,
    };
  },
});
</script>
