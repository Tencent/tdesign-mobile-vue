import { ref, watch, toRefs, inject, computed, reactive, onBeforeMount, defineComponent, nextTick } from 'vue';
import TRadio, { RadioGroup as TRadioGroup } from '../radio';
import config from '../config';
import TButton from '../button';
import TPopup from '../popup';
import TCheckbox, { CheckboxGroup as TCheckboxGroup } from '../checkbox';
import { useVModel, uniqueFactory } from '../shared';
import DropdownItemProps from './dropdown-item-props';
import { DropdownMenuState, DropdownMenuControl } from './context';
import { TdDropdownMenuProps, DropdownValue } from './type';
import { KeysType } from '../common';
import { useConfig } from '../config-provider/useConfig';
import { useContent, useTNodeJSX } from '../hooks/tnode';

const { prefix } = config;
const name = `${prefix}-dropdown-item`;
const getUniqueID = uniqueFactory('dropdown-popup');

export default defineComponent({
  name,
  components: { TRadio, TButton, TPopup, TCheckbox, TRadioGroup, TCheckboxGroup },
  props: DropdownItemProps,
  emits: ['change', 'open', 'opened', 'close', 'closed', 'update:value', 'update:modelValue'],
  setup(props) {
    const { globalConfig } = useConfig('dropdownMenu');
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const popupContent = ref(null);

    // 受控 value 属性
    const { value, modelValue } = toRefs(props);
    const [passInValue, setValue] = useVModel(value, modelValue, props.defaultValue);
    // 从父组件取属性、状态和控制函数
    const menuProps = inject('dropdownMenuProps') as TdDropdownMenuProps;
    const menuState = inject('dropdownMenuState') as DropdownMenuState;
    const { expandMenu, collapseMenu, emitEvents } = inject('dropdownMenuControl') as DropdownMenuControl;

    // 组件样式
    const classes = computed(() => [`${name}`]);

    const itemId = ref(0);
    onBeforeMount(() => {
      itemId.value = menuState.childCount;
      menuState.childCount += 1;
    });

    const state = reactive({
      showOverlay: computed(() => menuProps.showOverlay),
      duration: computed(() => menuProps.duration),
      isShowItems: false,
      wrapperVisible: false,
      expandStyle: {} as Object,
      multiple: computed(() => props.multiple),
      options: computed(() => {
        if (props.keys) {
          return props.options?.map((item) => ({
            value: item[(props.keys as KeysType)?.value ?? 'value'],
            label: item[(props.keys as KeysType)?.label ?? 'label'],
            disabled: item.disabled,
          }));
        }
        return props.options;
      }),
    });

    const isCheckedRadio = (value: DropdownValue) => value === radioSelect.value;
    const styleDropRadio = (value: DropdownValue) => [
      `${name}__radio-item`,
      {
        [`${prefix}-is-tick`]: !props.multiple,
        [`${prefix}-is-checked`]: isCheckedRadio(value),
      },
    ];
    const popupStyle = computed(() => {
      return {
        zIndex: menuProps.zIndex && menuProps.zIndex + 1,
        position: 'absolute',
      };
    });
    const styleContent = computed(() => {
      return [`${name}__content`, `t-popup__content`];
    });
    const contentStyle = computed(() => {
      return menuProps.direction === 'up' ? { transform: 'rotateX(180deg) rotateY(180deg)' } : {};
    });
    const popupId = getUniqueID();
    // 设置展开/收起状态
    const setExpand = (val: boolean) => {
      // 菜单定位
      const { bottom, top } = menuState.barRect;
      menuProps.direction === 'up'
        ? (state.expandStyle = {
            transform: menuProps.direction === 'up' ? 'rotateX(180deg) rotateY(180deg)' : '',
            zIndex: menuProps.zIndex,
            bottom: `calc(100vh - ${top}px)`,
          })
        : (state.expandStyle = {
            zIndex: menuProps.zIndex,
            top: `${bottom}px`,
          });
      const { duration } = menuProps;
      props[`on${val ? 'Open' : 'Close'}`]?.();
      // 动画状态控制
      if (val) {
        state.wrapperVisible = true;
      }
      nextTick(() => {
        state.isShowItems = val;
      });
      if (!val) {
        setTimeout(() => {
          state.wrapperVisible = false;
        }, Number(duration));
      }
      setTimeout(() => {
        props[`on${val ? 'Opened' : 'Closed'}`]?.();
      }, Number(duration));
    };

    // 根据父组件状态，判断当前是否展开
    watch(
      () => menuState.activeId === itemId.value,
      (val: boolean) => setExpand(val),
    );

    const radioSelect = ref();
    const checkSelect = ref();
    // 根据传入值更新当前选中
    const updateSelectValue = (val: DropdownValue | DropdownValue[] | null) => {
      if (!props.multiple) {
        const list = state.options;
        const firstChild = list?.[0];
        const newValue = val ?? firstChild?.value ?? null;
        radioSelect.value = newValue as DropdownValue;
      } else if (props.multiple) {
        checkSelect.value = (val ?? []) as DropdownValue[];
      }
    };
    // 初始值更新一次选中项
    updateSelectValue(passInValue.value || null);
    // 跟踪 modelValue 更新选项
    watch(
      () => passInValue.value,
      (val) => {
        if (!val) return;
        updateSelectValue(val);
      },
    );
    // 底部按键是否可用
    const isBtnDisabled = computed(() => {
      return Array.isArray(checkSelect.value) && checkSelect.value.length <= 0;
    });
    // 重置
    const resetSelect = () => {
      checkSelect.value = [];
      let values = checkSelect.value;
      values = JSON.parse(JSON.stringify(values));
      props.onReset?.(values);
    };
    // 确认
    const confirmSelect = () => {
      let values = checkSelect.value;
      values = JSON.parse(JSON.stringify(values));
      props.onConfirm?.(values);
      setValue(values);
      collapseMenu();
      emitEvents('menuClosed', 'confirm');
    };
    // 多选值监控
    watch(checkSelect, (val) => {
      if (!props.multiple) return;
      if (!state.isShowItems) return;
      if (val) {
        const value = JSON.stringify(passInValue.value || []);
        const values = JSON.stringify(val);
        if (value === values) return;
        props.onChange?.(JSON.parse(values));
      }
    });
    // 单选值监控
    watch(radioSelect, (val) => {
      if (menuState.activeId !== null) {
        const target = state.options?.find((item: any) => item.value === val);
        menuState.itemsLabel[menuState.activeId] = target?.label;
      }
      if (props.multiple) return;
      if (!state.isShowItems) return;
      const value: any = passInValue.value || [];
      if (value[0] === val) return;
      props.onChange?.(val);
      setValue(val);
      collapseMenu();
      emitEvents('menuClosed', 'content');
    });

    const onVisibleChange = (visible: boolean) => {
      if (menuProps.closeOnClickOverlay && !visible) {
        collapseMenu();
        emitEvents('menuClosed', 'overlay');
      }
    };
    const { showOverlay, duration, isShowItems, wrapperVisible, expandStyle, multiple, options } = toRefs(state);

    return () => {
      const handleRadioChange = (value: any) => {
        radioSelect.value = value;
      };
      const handleCheckboxChange = (value: any) => {
        checkSelect.value = value;
      };
      const defaultSlot = () => {
        if (!multiple.value) {
          // 单选列表
          return (
            <t-radio-group
              value={radioSelect.value}
              onChange={handleRadioChange}
              placement="right"
              class={`${name}__radio-group`}
            >
              {(options.value || []).map((option) => (
                <t-radio
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  disabled={option.disabled}
                  class={styleDropRadio(option.value)}
                  checked={isCheckedRadio(option.value)}
                  icon="line"
                />
              ))}
            </t-radio-group>
          );
        }
        // 多选列表
        return (
          <t-checkbox-group
            value={checkSelect.value}
            onChange={handleCheckboxChange}
            class={`${name}__checkbox-group`}
            style={`grid-template-columns: repeat(${props.optionsColumns}, 1fr)`}
          >
            {(options.value || []).map((option) => (
              <t-checkbox
                key={option.value}
                class={`${name}__checkbox-item t-checkbox--tag`}
                icon={false}
                borderless
                value={option.value}
                label={option.label}
                disabled={option.disabled}
              />
            ))}
          </t-checkbox-group>
        );
      };

      const footerSlot = () => {
        if (multiple.value) {
          return (
            <div class={`${name}__footer`}>
              <t-button
                theme="light"
                class={`${name}__footer-btn ${name}__reset-btn`}
                disabled={isBtnDisabled.value}
                onClick={resetSelect}
              >
                {globalConfig.value.reset}
              </t-button>
              <t-button
                theme="primary"
                class={`${name}__footer-btn ${name}__confirm-btn`}
                disabled={isBtnDisabled.value}
                onClick={confirmSelect}
              >
                {globalConfig.value.confirm}
              </t-button>
            </div>
          );
        }
      };

      const content = renderContent('default', 'content');

      const footer = renderTNodeJSX('footer');
      return (
        wrapperVisible.value && (
          <div id={popupId} class={classes.value} style={{ ...expandStyle.value }}>
            <t-popup
              visible={isShowItems.value}
              duration={duration.value}
              showOverlay={showOverlay.value}
              style={popupStyle.value}
              overlayProps={{ style: 'position: absolute' }}
              class={`${name}__popup-host`}
              attach={`#${popupId}`}
              onVisibleChange={onVisibleChange}
            >
              <div ref={popupContent} class={styleContent.value} style={contentStyle.value}>
                <div class={`${name}__body`}>{content || defaultSlot()}</div>
                {footer || footerSlot()}
              </div>
            </t-popup>
          </div>
        )
      );
    };
  },
});
