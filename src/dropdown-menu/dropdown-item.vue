<template>
  <div v-if="isShowItems" :class="classes" :style="{ ...expandStyle }">
    <t-mask v-if="isShowItems && showOverlay" @click="onClickOverlay" />
    <div :class="styleContent" :style="{ ...transitionStyle }">
      <div :class="`${name}__bd`">
        <slot>
          <template v-if="optionsLayout === 'columns'">
            <t-cell-group v-if="selectMode === 'single'">
              <!-- 单选列表 -->
              <t-radio-group v-model="radioSelect">
                <t-cell v-for="option in options" :key="option.value" value-align="left">
                  <t-radio
                    :name="option.value"
                    :title="option.title"
                    :disabled="option.disabled"
                    :class="styleDropRadio(option.value)"
                  >
                    <template #checkedIcon>
                      <t-check v-if="isCheckedRadio(option.value)" />
                    </template>
                  </t-radio>
                </t-cell>
              </t-radio-group>
            </t-cell-group>
            <t-cell-group v-else-if="selectMode === 'multi'">
              <!-- 多选列表 -->
              <t-check-group v-model="checkSelect">
                <t-cell v-for="option in options" :key="option.value" value-align="left">
                  <t-checkbox :name="option.value" :title="option.title" :disabled="option.disabled"></t-checkbox>
                </t-cell>
              </t-check-group>
            </t-cell-group>
          </template>
          <template v-else-if="optionsLayout === 'tree'">
            <!-- 树形列表 ST -->
            <t-cell-group v-for="(_, level) in treeOptions" :key="level">
              <t-radio-group
                v-if="level < treeState.leafLevel"
                :model-value="treeState.selectList[level]"
                @update:modelValue="selectTreeNode(level, $event)"
              >
                <!-- 树形列表 - 父级节点 ST -->
                <t-cell
                  v-for="option in treeOptions[level]"
                  :key="option.value"
                  value-align="left"
                  :data-value="option.value"
                >
                  <t-radio
                    :class="styleTreeRadio(option.value, level)"
                    :name="option.value"
                    :title="option.title"
                    :disabled="option.disabled"
                  />
                </t-cell>
                <!-- 树形列表 - 父级节点 ED -->
              </t-radio-group>
              <template v-else>
                <!-- 树形列表 - 叶子节点 ST -->
                <template v-if="selectMode === 'single'">
                  <!-- 树形列表 - 叶子节点（单选） ST -->
                  <t-radio-group
                    v-for="option in treeOptions[level]"
                    :key="option.value"
                    :model-value="treeState.selectList[level]"
                    @update:modelValue="selectTreeNode(level, $event)"
                  >
                    <t-cell value-align="left">
                      <t-radio
                        :name="option.value"
                        :title="option.title"
                        :disabled="option.disabled"
                        :class="styleTreeRadio(option.value, level)"
                      >
                        <template #checkedIcon>
                          <t-check v-if="option.value === treeState.selectList[level]" />
                        </template>
                      </t-radio>
                    </t-cell>
                  </t-radio-group>
                  <!-- 树形列表 - 叶子节点（单选） ED -->
                </template>
                <template v-else-if="selectMode === 'multi'">
                  <!-- 树形列表 - 叶子节点（多选） ST -->
                  <t-check-group
                    v-for="option in treeOptions[level]"
                    :key="option.value"
                    :model-value="treeState.selectList[level]"
                    @update:modelValue="selectTreeNode(level, $event)"
                  >
                    <t-cell value-align="left">
                      <t-checkbox :name="option.value" :title="option.title" :disabled="option.disabled"></t-checkbox>
                    </t-cell>
                  </t-check-group>
                  <!-- 树形列表 - 叶子节点（多选） ED -->
                </template>
                <!-- 树形列表 - 叶子节点 ED -->
              </template>
            </t-cell-group>
            <!-- 树形列表 ED -->
          </template>
        </slot>
      </div>
      <div v-if="selectMode === 'multi' || optionsLayout === 'tree'" :class="`${name}__ft`">
        <t-button variant="outline" :disabled="isBtnDisabled" @click="resetSelect">重置</t-button>
        <t-button theme="primary" :disabled="isBtnDisabled" @click="confirmSelect">确定</t-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref, reactive, inject, watch, defineComponent, nextTick, SetupContext } from 'vue';
import TCheck from '../icon/check.vue';
import { DropdownMenuPropsType, DropdownItemProps, DropdownItemPropsType } from './dropdown.interface';
import config from '../config';
import TransAniControl from './trans-ani-control';

const { prefix } = config;
const name = `${prefix}-dropdown-item`;

export default defineComponent({
  name,
  components: { TCheck },
  props: DropdownItemProps,
  emits: ['update:modelValue', 'change', 'open', 'opened', 'close', 'closed'],
  setup(props: DropdownItemPropsType, context: SetupContext) {
    // 从父组件取属性、状态和控制函数
    const menuProps = inject('dropdownMenuProps') as DropdownMenuPropsType;
    const menuState = inject('dropdownMenuState') as any;
    const { expandMenu, collapseMenu } = inject('dropdownMenuControl') as any;
    const menuAniControl = inject('dropdownAniControl') as TransAniControl;
    // 组件样式
    const classes = computed(() => [
      `${name}`,
      {
        [`${prefix}-is-expanded`]: state.isExpanded,
      },
    ]);
    const state = reactive({
      showOverlay: computed(() => menuProps.overlay),
      isShowItems: false,
      isExpanded: false,
      expandStyle: {},
      transitionStyle: computed(() => ({
        transition: `transform ${menuProps.duration}ms ease`,
        '-webkit-transition': `transform ${menuProps.duration}ms ease`,
      })),
      selectMode: computed(() => props.selectMode),
      optionsLayout: computed(() => props.optionsLayout),
      options: computed(() => props.options),
    });
    const isCheckedRadio = (value: string) => value === radioSelect.value;
    const styleDropRadio = (value: string) => [
      `${name}__radio`,
      {
        [`${prefix}-is-tick`]: props.selectMode === 'single',
        [`${prefix}-is-checked`]: isCheckedRadio(value),
      },
    ];
    const styleContent = computed(() => {
      const selectMode = props.selectMode;
      const optionsLayout = props.optionsLayout;
      const layoutCol = +props.optionsColumns;
      const isTree = optionsLayout === 'tree';
      const treeCol = isTree ? treeState.leafLevel + 1 : 0;
      return [
        `${name}__content`,
        {
          [`${prefix}-is-tree`]: isTree,
          [`${prefix}-is-single`]: !isTree && selectMode === 'single',
          [`${prefix}-is-multi`]: !isTree && selectMode === 'multi',
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
      // console.log(`dropdown-item(${props.itemId}) changing state: `, val);
      const duration = menuProps.duration;
      // 动画状态控制
      menuAniControl.setTo(
        duration,
        () => {
          // Now do:
          context.emit(val ? 'open' : 'close');
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
          context.emit(val ? 'opened' : 'closed');
        },
      );
    };

    // 根据父组件状态，判断当前是否展开
    watch(
      () => menuState.activeId === props.itemId,
      (val: boolean) => setExpand(val),
    );

    const radioSelect = ref(null);
    const checkSelect = ref([]);
    const treeState = reactive({
      leafLevel: 0,
      selectList: [],
      select: [],
    });
    const styleTreeRadio = computed(() => (value: string, level: number) => [
      `${name}__radio`,
      {
        [`${prefix}-is-tick`]: level === treeState.leafLevel,
        [`${prefix}-is-checked`]: value === treeState.selectList[level],
      },
    ]);
    // 点击树形节点的时候
    const selectTreeNode = (level: number, value: any) => {
      // console.log('level:', level, 'value:', value);
      // 当前节点
      const tempValue: any = treeState.selectList.slice(0, level);
      tempValue[level] = value;
      treeState.selectList = tempValue;
    };
    // 处理后的树形选项列表
    const treeOptions = ref([]);
    const buildTreeOptions = () => {
      const { options, selectMode } = props;
      const { selectList } = treeState;
      const newTreeOptions = [];
      let level = -1;
      let node = { options };
      while (node.options) {
        // 当前层级节点的列表
        const list = node.options;
        newTreeOptions.push([...list]);
        level += 1;
        // 当前层级列表选中项
        const thisValue: [] | string | number | null = selectList[level];
        if (thisValue === undefined) {
          const firstChild = list[0];
          if (firstChild.options) {
            // 还有子节点，当前层级作为单选处理
            selectTreeNode(level, firstChild.value);
            node = firstChild;
          } else {
            // 没有子节点，结束处理
            selectTreeNode(level, selectMode === 'multi' ? [] : undefined);
            break;
          }
        } else {
          const child: any = !Array.isArray(thisValue) && list.find((child: any) => child.value === thisValue);
          node = child;
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
            selectList: treeState.selectList,
          }),
        //   async (val, oldVal) => {
        async () => {
          //   console.log(`${oldVal}\n =>\n${val}`);
          // fix: 这次微任务结束后，再重建选项。否则 oldVal 无法更新，导致无限调用
          await nextTick();
          buildTreeOptions();
        },
      );
      buildTreeOptions();
    }
    // 根据传入值更新当前选中
    const updateSelectValue = (val: any) => {
      const valueList = val || [];
      const mode = props.selectMode;
      const layout = props.optionsLayout;
      if (layout === 'tree') {
        treeState.selectList = valueList;
      } else if (layout === 'columns') {
        if (mode === 'single') {
          const firstChild = props.options[0] || {};
          radioSelect.value = val === undefined ? firstChild.value : val;
        } else if (mode === 'multi') {
          if (props.optionsLayout === 'columns') {
            checkSelect.value = valueList;
          }
        }
      }
    };
    // 初始值更新一次选中项
    updateSelectValue(props.modelValue);
    // 跟踪 modelValue 更新选项
    watch(
      () => props.modelValue,
      (val: any) => updateSelectValue(val),
    );

    // 底部按键是否可用
    const isBtnDisabled = computed(() => {
      switch (props.optionsLayout) {
        case 'columns':
          return checkSelect.value.length <= 0;
        case 'tree':
          if (props.selectMode === 'single') {
            return treeState.selectList[treeState.leafLevel] === undefined;
          }
          if (props.selectMode === 'multi') {
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
      context.emit('update:modelValue', values);
      context.emit('change', values);
      collapseMenu();
    };
    // 单选值监控
    watch(radioSelect, (val: any) => {
      if (props.selectMode !== 'single' || props.optionsLayout === 'tree') return;
      if (!state.isShowItems) return;
      const value = props.modelValue || [];
      if (value[0] === val) return;
      context.emit('update:modelValue', val);
      context.emit('change', val);
      collapseMenu();
    });
    // 点击遮罩层
    const onClickOverlay = () => {
      if (menuProps.closeOnClickOverlay) {
        collapseMenu();
      }
    };
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
    };
  },
});
</script>
