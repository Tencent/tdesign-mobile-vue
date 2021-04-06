<template>
  <div class="tdesign-demo--picker">
    <div class="block">
      <!-- 基础 -->
      <div class="block--title">基础选择器</div>
      <t-cell-group>
        <t-input v-model="text.city" label="城市" placeholder="选择城市" @click="show.city = true" />
      </t-cell-group>
      <t-cell-group style="margin-top: 20px">
        <t-input
          v-model="text.yearAndSeason"
          label="年份和季节"
          placeholder="选择城年份和季节"
          @click="show.yearAndSeason = true"
        />
      </t-cell-group>
      <t-cell-group style="margin-top: 20px">
        <t-input v-model="text.date" label="日期" placeholder="选择日期" @click="show.date = true" />
        <span style="color: #888; padding: 5px 10px; font-size: 12px">仅做展示，年月日关联关系由自己实现</span>
      </t-cell-group>

      <t-popup v-model="show.city" position="bottom">
        <t-picker title="标题" @change="onChange" @confirm="onCityConfirm" @cancel="onCancel">
          <t-picker-column :options="roleOptions" @change="onColumnChange" />
        </t-picker>
      </t-popup>
      <t-popup v-model="show.yearAndSeason" position="bottom">
        <t-picker @change="onChange" @confirm="onYearAndSeasonConfirm" @cancel="onCancel">
          <t-picker-column :options="yearOptions" :formatter="(val) => `${val}年`" @change="onColumnChange" />
          <t-picker-column :options="seasonOptions" @change="onColumnChange" />
        </t-picker>
      </t-popup>

      <t-popup v-model="show.date" position="bottom">
        <t-picker @change="onChange" @confirm="onDateConfirm" @cancel="onCancel">
          <t-picker-column :options="yearOptions" :formatter="(val) => `${val}年`" @change="onColumnChange" />
          <t-picker-column :options="monthOptions" :formatter="(val) => `${val}月`" @change="onColumnChange" />
          <t-picker-column :options="dayOptions" :formatter="(val) => `${val}日`" @change="onColumnChange" />
        </t-picker>
      </t-popup>
    </div>
    <div class="block">
      <!-- 带标题 -->
      <div class="block--title">基础选择器</div>
      <t-cell-group>
        <t-input v-model="text.city" label="城市" placeholder="选择城市" @click="show.cityTitle = true" />
      </t-cell-group>
      <t-cell-group style="margin-top: 20px">
        <t-input
          v-model="text.yearAndSeason"
          label="年份和季节"
          placeholder="选择城年份和季节"
          @click="show.yearAndSeasonTitle = true"
        />
      </t-cell-group>
      <t-cell-group style="margin-top: 20px">
        <t-input v-model="text.date" label="日期" placeholder="选择日期" @click="show.dateTitle = true" />
        <span style="color: #888; padding: 5px 10px; font-size: 12px">仅做展示，年月日关联关系由自己实现</span>
      </t-cell-group>

      <t-popup v-model="show.cityTitle" position="bottom">
        <t-picker title="选择城市" @change="onChange" @confirm="onCityConfirm" @cancel="onCancel">
          <t-picker-column :options="cityOptions" @change="onColumnChange" />
        </t-picker>
      </t-popup>

      <t-popup v-model="show.yearAndSeasonTitle" position="bottom">
        <t-picker title="选择年份和季节" @change="onChange" @confirm="onYearAndSeasonConfirm" @cancel="onCancel">
          <t-picker-column :options="yearOptions" :formatter="(val) => `${val}年`" @change="onColumnChange" />
          <t-picker-column :options="seasonOptions" @change="onColumnChange" />
        </t-picker>
      </t-popup>

      <t-popup v-model="show.dateTitle" position="bottom">
        <t-picker title="选择日期" @change="onChange" @confirm="onDateConfirm" @cancel="onCancel">
          <t-picker-column :options="yearOptions" :formatter="(val) => `${val}年`" @change="onColumnChange" />
          <t-picker-column :options="monthOptions" :formatter="(val) => `${val}月`" @change="onColumnChange" />
          <t-picker-column :options="dayOptions" :formatter="(val) => `${val}日`" @change="onColumnChange" />
        </t-picker>
      </t-popup>
    </div>
    <div class="block">
      <!-- 单列 -->
      <div class="block--title">对象数组</div>
      <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column :options="rolesObjOptions" option-key="name" @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 单列默认 -->
      <div class="block--title">默认选中</div>
      <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column :options="roleOptions" :default-index="2" @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 单列 -->
      <div class="block--title">自定义展示内容</div>
      <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column :options="roleOptions" :formatter="(val) => `辣鸡${val}`" @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 多列选择 -->
      <div class="block--title">多列选择</div>
      <t-picker title="游戏" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column :options="gameOptions" :default-index="2" @change="onColumnChange" />
        <t-picker-column :options="gameLevelOptions" @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 联动选择 -->
      <div class="block--title">联动选择</div>
      <t-picker title="王者荣耀" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
        <t-picker-column :options="roleOptions" @change="onRoleChange" />
        <t-picker-column :options="heroOptions" @change="onColumnChange" />
      </t-picker>
    </div>
    <div class="block">
      <!-- 单列 -->
      <div class="block--title">弹出层的Picker</div>
      <t-button theme="primary" style="margin-left: 20px" @click="visible = true"> 结合Popup组件</t-button>
      <t-popup v-model="visible">
        <t-picker title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel">
          <t-picker-column :options="roleOptions" @change="onColumnChange" />
        </t-picker>
      </t-popup>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed, defineComponent, reactive } from 'vue';
export default defineComponent({
  setup() {
    const show = reactive({
      city: false,
      yearAndSeason: false,
      date: false,
      cityTitle: false,
      yearAndSeasonTitle: false,
      dateTitle: false,
    });
    const text = reactive({
      city: '',
      yearAndSeason: '',
      date: '',
    });
    const cities = ['广州市', '韶关市', '深圳市', '珠海市', '汕头市'];
    const years = [2021, 2020, 2019, 2018, 2017, 2016, 2015];
    const seasons = ['春', '夏', '秋', '冬'];
    const months = Array.from(new Array(12), (_, index) => index + 1);
    const days = Array.from(new Array(31), (_, index) => index + 1);

    const cityOptions = ref(cities);
    const yearOptions = ref(years);
    const seasonOptions = ref(seasons);
    const monthOptions = ref(months);
    const dayOptions = ref(days);

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
      [
        '安琪拉',
        '扁鹊',
        '不知火舞',
        '嫦娥',
        '妲己',
        '貂蝉',
        '干将莫邪',
        '高渐离',
        '姜子牙',
        '武则天',
        '米莱迪',
        '芈月',
        '墨子',
        '女娲',
        '沈梦溪',
        '王昭君',
        '小乔',
        '西施',
        '嬴政',
        '张良',
        '甄姬',
        '周瑜',
        '钟馗',
        '周瑜',
        '诸葛孔明',
      ],
      [
        '百里守约',
        '成吉思汗',
        '狄仁杰',
        '伽罗',
        '公孙离',
        '后裔',
        '黄忠',
        '李元芳',
        '小鲁班',
        '马克',
        '蒙犽',
        '孙尚香',
        '虞姬',
      ],
      [
        '马超',
        '上官婉儿',
        '云中君',
        '司马懿',
        '元歌',
        '裴擒虎',
        '百里玄策',
        '橘右京',
        '李白',
        '露娜',
        '兰陵王',
        '赵云',
        '阿轲',
        '花木兰',
        '孙悟空',
        '韩信',
      ],
      ['刘邦', '项羽', '庄周', '白起', '程咬金', '廉颇', '刘禅', '东皇'],
      ['蔡文姬', '瑶', '杨玉环', '盾山', '孙膑', '太乙真人', '大乔', '小明', '牛魔', '鬼谷子'],
    ];
    const roleOptions = ref(cities);
    const rolesObjOptions = ref(rolesObjs);
    const gameOptions = ref(['端游', '手游', 'PS4', 'NS']);
    const gameLevelOptions = ref(['3A大作', '精品游戏', '换皮游戏', '氪金游戏', '辣鸡游戏']);
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
    const onCancel = () => {
      console.log('取消');
      Object.keys(show).forEach(item => (show[item] = false));
      visible.value = false;
    };

    const onCityConfirm = (e: any) => {
      console.log('picker:confirm', e);
      text.city = e.value;
      show.city = false;
      show.cityTitle = false;
    };

    const onYearAndSeasonConfirm = (e: any) => {
      console.log('picker:confirm', e);
      text.yearAndSeason = JSON.stringify(e.value);
      show.yearAndSeason = false;
      show.yearAndSeasonTitle = false;
    };

    const onDateConfirm = (e: any) => {
      console.log('picker:confirm', e);
      text.date = JSON.stringify(e.value);
      show.date = false;
      show.dateTitle = false;
    };

    const onConfirm = () => {
      console.log('confirm');
    };

    return {
      cityOptions,
      yearOptions,
      seasonOptions,
      monthOptions,
      dayOptions,
      roleOptions,
      rolesObjOptions,
      heroOptions,
      gameOptions,
      gameLevelOptions,
      visible,
      onColumnChange,
      onRoleChange,
      onChange,
      onCancel,
      onCityConfirm,
      onYearAndSeasonConfirm,
      onConfirm,
      onDateConfirm,
      show,
      text,
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
