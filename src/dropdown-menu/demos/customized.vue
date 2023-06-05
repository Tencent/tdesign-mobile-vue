<template>
  <t-dropdown-menu ref="parentRef">
    <t-dropdown-item v-model="val" label="三列多选" multiple options-columns="1">
      <div v-for="(group, i) in groups" :key="i">
        <div class="demo-dropdown-item_label">
          {{ group.label }}
        </div>
        <!-- 多选列表 -->
        <t-checkbox-group
          v-model="checkSelectGroup[i]"
          class="t-dropdown-item__checkbox-group"
          :style="`grid-template-columns: repeat(3, 1fr)`"
          @change="handleMultipleSelect($event, i)"
        >
          <template v-for="option in group.options" :key="option.value">
            <t-checkbox
              class="t-dropdown-item__checkbox-item t-checkbox--tag"
              :icon="false"
              borderless
              :value="option.value"
              :label="option.label"
              :disabled="option.disabled"
            />
          </template>
        </t-checkbox-group>
      </div>
      <template #footer>
        <div class="demo-dropdown-item_footer">
          <t-button theme="light" @click="resetSelect">重置</t-button>
          <t-button theme="primary" @click="confirmSelect">确定</t-button>
        </div>
      </template>
    </t-dropdown-item>
  </t-dropdown-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 获取组件
const parentRef = ref<HTMLElement | null>(null);

let val = ref(['type_1', 'type_2', 'role_2']);

const chineseNumber = '一二三四五六七八九十'.split('');

const options1 = new Array(8).fill(null).map((_, i) => ({
  label: `类型${chineseNumber[i]}`,
  value: `type_${i + 1}`,
  disabled: false,
}));

const options2 = new Array(8).fill(null).map((_, i) => ({
  label: `角色${chineseNumber[i]}`,
  value: `role_${i + 1}`,
  disabled: false,
}));

const groups = [
  {
    label: '类型',
    options: [
      ...options1,
      {
        label: '禁用选项',
        value: 'disabled',
        disabled: true,
      },
    ],
  },
  {
    label: '角色',
    options: [
      ...options2,
      {
        label: '禁用选项',
        value: 'disabled',
        disabled: true,
      },
    ],
  },
];
const checkSelectGroup = ref([]);

let checkSelect: any = [];

function initCheckValue() {
  for (let i = 0; i < groups.length; i++) {
    checkSelect.push([]);
  }

  groups.forEach((item, index) => {
    val.value.forEach((e: any) => {
      item.options.forEach((opt) => {
        if (e === opt.value) {
          checkSelect[index].push(e);
        }
      });
    });
  });
  checkSelectGroup.value = checkSelect;
}

initCheckValue();

function handleMultipleSelect(e: any, i: number) {
  console.log(e);
  checkSelect[i] = e;
  let res: any = [];
  checkSelect.forEach((item: any) => {
    res = res.concat(item);
  });
  val.value = res;
}

// 重置
function resetSelect() {
  val = ref([]);
  checkSelect = [];
  initCheckValue();
}

// 确认
function confirmSelect() {
  // @ts-ignore
  parentRef.value.collapseMenu();
}
</script>
<style lang="less" scoped>
.demo-dropdown-item {
  &_label {
    padding: 16px 0 0 16px;
  }
  &_footer {
    display: flex;
    width: 100%;

    .t-button {
      flex: 1;
    }
  }
}

.demo-dropdown-item_footer {
  --td-button-border-radius: 0;
}
</style>
