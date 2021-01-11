<template>
  <div class="tdesign-demo--picker">
    <div class="block">
      <!-- 单列 -->
      <div class="block--title">单列选择</div>
      <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column
          :options="roleOptions"
          @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 单列 -->
      <div class="block--title">对象数组</div>
      <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column
          :options="rolesObjOptions"
          option-key="name"
          @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 单列默认 -->
      <div class="block--title">默认选中</div>
      <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column
          :options="roleOptions"
          :default-index="2"
          @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 单列 -->
      <div class="block--title">自定义展示内容</div>
      <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column
          :options="roleOptions"
          :formatter="(val) => `辣鸡${val}`"
          @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 多列选择 -->
      <div class="block--title">多列选择</div>
      <t-picker title="游戏" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column
          :options="gameOptions"
          :default-index="2"
          @change="onColumnChange" />
        <t-picker-column
          :options="gameLevelOptions"
          @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 联动选择 -->
      <div class="block--title">联动选择</div>
      <t-picker title="王者荣耀" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column
          :options="roleOptions"
          @change="onRoleChange" />
        <t-picker-column
          :options="heroOptions"
          @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 单列 -->
      <div class="block--title">弹出层的Picker</div>
      <t-button theme="primary" @click="visible = true" style="margin-left: 20px;">
        结合Popup组件</t-button>
      <t-popup v-model="visible">
        <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
          <t-picker-column
            :options="roleOptions"
            @change="onColumnChange" />
        </t-picker>
      </t-popup>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const roles = ['战士', '法师', '射手', '刺客', '坦克', '辅助'];
    const rolesObjs = [
      { name: '战士', value: 'warrior' },
      { name: '法师', value: 'mage' },
      { name: '射手', value: 'shooter' },
      { name: '刺客', value: 'ssassin' },
      { name: '坦克', value: 'tank' },
      { name: '辅助', value: 'auxiliary' },
    ];
    const curRoleIndex = ref(0);
    const heros = [
      ['夏侯惇', '吕布', '铠', '狂铁', '李信', '哪吒', '杨戬', '关羽', '宫本武藏', '钟无艳', '亚瑟', '达摩', '老夫子'],
      ['安琪拉', '扁鹊', '不知火舞', '嫦娥', '妲己', '貂蝉', '干将莫邪', '高渐离', '姜子牙', '武则天', '米莱迪', '芈月', '墨子', '女娲',
        '沈梦溪', '王昭君', '小乔', '西施', '嬴政', '张良', '甄姬', '周瑜', '钟馗', '周瑜', '诸葛孔明'],
      ['百里守约', '成吉思汗', '狄仁杰', '伽罗', '公孙离', '后裔', '黄忠', '李元芳', '小鲁班', '马克', '蒙犽', '孙尚香', '虞姬'],
      ['马超', '上官婉儿', '云中君', '司马懿', '元歌', '裴擒虎', '百里玄策', '橘右京', '李白', '露娜', '兰陵王', '赵云', '阿轲', '花木兰', '孙悟空', '韩信'],
      ['刘邦', '项羽', '庄周', '白起', '程咬金', '廉颇', '刘禅', '东皇'],
      ['蔡文姬', '瑶', '杨玉环', '盾山', '孙膑', '太乙真人', '大乔', '小明', '牛魔', '鬼谷子'],
    ];
    const roleOptions = ref(roles);
    const rolesObjOptions = ref(rolesObjs);
    const gameOptions = ref([
      '端游',
      '手游',
      'PS4',
      'NS',
    ]);
    const gameLevelOptions = ref([
      '3A大作',
      '精品游戏',
      '换皮游戏',
      '氪金游戏',
      '辣鸡游戏',
    ]);
    const visible = ref(false);
    const heroOptions = computed(() => heros[curRoleIndex.value]);
    const onColumnChange = (e: any) => {
      console.log('column:change', e);
    };
    const onRoleChange = (e: any) => {
      console.log('column:change', e);
      curRoleIndex.value = e.index;
    };
    const onChange = (e: any) => {
      console.log('picker:change', e);
    };
    const onConfirm = (e: any) => {
      console.log('picker:confirm', e);
      visible.value = false;
    };
    const onCancel = () => {
      console.log('取消');
      visible.value = false;
    };
    return {
      roleOptions,
      rolesObjOptions,
      heroOptions,
      gameOptions,
      gameLevelOptions,
      visible,
      onColumnChange,
      onRoleChange,
      onChange,
      onConfirm,
      onCancel,
    };
  },
});
</script>
<style lang="less" scoped>
.tdesign-demo--picker {
  padding-bottom: 20px;
  .block + .block {
    .block--title {
      margin-top: 12px;
    }
  }
  .block--title {
    padding: 20px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
