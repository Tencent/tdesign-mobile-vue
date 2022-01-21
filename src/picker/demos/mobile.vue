<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Picker 选择器</h1>
    <p class="summary">用于选择一个地区的省、市、区、街道等，包含树形用于多层级地区选择以及行政区单层选择</p>
    <!-- 基础选择器 -->
    <tdesign-demo-block title="01 类型" summary="基础选择器">
      <t-cells>
        <t-cell arrow title="城市" :note="text.city.join(',') || '选择城市'" @click="show.city = true"></t-cell>
        <t-cell
          arrow
          title="年份和季节"
          :note="text.yearAndSeason.join(',') || '选择城年份和季节'"
          @click="show.yearAndSeason = true"
        ></t-cell>
        <t-cell arrow title="日期" :note="text.date.join(',') || '选择日期'" @click="show.date = true"></t-cell>
      </t-cells>

      <div class="props-block">
        <t-popup v-model="show.city" position="bottom">
          <t-picker
            v-model="text.city"
            :defaultValue="['广州市']"
            title="标题"
            @change="onChange"
            @confirm="onCityConfirm"
            @cancel="onCancel"
          >
            <t-picker-item :options="roleOptions" @change="onColumnChange" />
          </t-picker>
        </t-popup>
        <t-popup v-model="show.yearAndSeason" position="bottom">
          <t-picker
            v-model="text.yearAndSeason"
            @change="onChange"
            @confirm="onYearAndSeasonConfirm"
            @cancel="onCancel"
          >
            <t-picker-item :options="yearOptions" :formatter="(val) => `${val}年`" @change="onColumnChange" />
            <t-picker-item :options="seasonOptions" @change="onColumnChange" />
          </t-picker>
        </t-popup>
        <t-popup v-model="show.date" position="bottom">
          <t-picker v-model="text.date" @change="onChange" @confirm="onDateConfirm" @cancel="onCancel">
            <t-picker-item :options="yearOptions" :formatter="(val) => `${val}年`" @change="onColumnChange" />
            <t-picker-item :options="monthOptions" :formatter="(val) => `${val}月`" @change="onColumnChange" />
            <t-picker-item :options="dayOptions" :formatter="(val) => `${val}日`" @change="onColumnChange" />
          </t-picker>
        </t-popup>
      </div>
    </tdesign-demo-block>

    <!-- 带标题选择器 -->
    <tdesign-demo-block summary="带标题选择器">
      <t-cells>
        <t-cell
          arrow
          title="城市"
          :note="
            text.cityTitle.map((item) => cityObjectOptions.find((citem) => citem.value === item).label).join(',') ||
            '选择城市'
          "
          @click="show.cityTitle = true"
        ></t-cell>
        <t-cell
          arrow
          title="年份和季节"
          :note="text.yearAndSeasonTitle.join(',') || '选择城年份和季节'"
          @click="show.yearAndSeasonTitle = true"
        ></t-cell>
        <t-cell
          arrow
          title="日期"
          :note="text.dateTitle.join(',') || '选择日期'"
          @click="show.dateTitle = true"
        ></t-cell>
      </t-cells>

      <div class="props-block">
        <t-popup v-model="show.cityTitle" position="bottom">
          <t-picker
            v-model="text.cityTitle"
            title="选择城市"
            @change="onChange"
            @confirm="onCityTitleConfirm"
            @cancel="onCancel"
          >
            <t-picker-item :options="cityObjectOptions" @change="onColumnChange" />
          </t-picker>
        </t-popup>
        <t-popup v-model="show.yearAndSeasonTitle" position="bottom">
          <t-picker
            v-model="text.yearAndSeasonTitle"
            title="选择年份和季节"
            @change="onChange"
            @confirm="onYearAndSeasonTitleConfirm"
            @cancel="onCancel"
          >
            <t-picker-item :options="yearOptions" :formatter="(val) => `${val}年`" @change="onColumnChange" />
            <t-picker-item :options="seasonOptions" @change="onColumnChange" />
          </t-picker>
        </t-popup>
        <t-popup v-model="show.dateTitle" position="bottom">
          <t-picker
            v-model="text.dateTitle"
            title="选择日期"
            @change="onChange"
            @confirm="onDateTitleConfirm"
            @cancel="onCancel"
          >
            <t-picker-item :options="yearOptions" :formatter="(val: any) => `${val}年`" @change="onColumnChange" />
            <t-picker-item :options="monthOptions" :formatter="(val: any) => `${val}月`" @change="onColumnChange" />
            <t-picker-item :options="dayOptions" :formatter="(val: any) => `${val}日`" @change="onColumnChange" />
          </t-picker>
        </t-popup>
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue';

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
      city: [],
      cityTitle: [],
      yearAndSeason: [],
      yearAndSeasonTitle: [],
      date: [],
      dateTitle: [],
    });

    const cities = ['北京市', '上海市', '广州市', '深圳市', '成都市', '杭州市'];

    const objectCities = [
      { label: '北京市', value: 'bj' },
      { label: '上海市', value: 'sh' },
      { label: '广州市', value: 'gz' },
      { label: '深圳市', value: 'sz' },
      { label: '成都市', value: 'cd' },
      { label: '杭州市', value: 'hz' },
    ];
    const years = [2021, 2020, 2019, 2018, 2017, 2016, 2015];
    const seasons = ['春', '夏', '秋', '冬'];
    const months = Array.from(new Array(12), (_, index) => index + 1);
    const days = Array.from(new Array(31), (_, index) => index + 1);

    const cityOptions = ref(cities);
    const cityObjectOptions = ref(objectCities);
    const yearOptions = ref(years);
    const seasonOptions = ref(seasons);
    const monthOptions = ref(months);
    const dayOptions = ref(days);
    const roleOptions = ref(cities);
    const visible = ref(false);
    const onColumnChange = (e: any) => {
      console.log('picker-item:change', e);
    };
    const onChange = (e: any) => {
      console.log('picker:change', e);
    };
    const onCancel = () => {
      console.log('取消');
      Object.keys(show).forEach((item) => (show[item] = false));
      visible.value = false;
    };

    const onCityConfirm = (e: any) => {
      console.log('picker:confirm', JSON.stringify(text.city));
      show.city = false;
    };

    const onCityTitleConfirm = (e: any) => {
      console.log('picker:confirm', JSON.stringify(text.cityTitle));
      show.cityTitle = false;
    };

    const onYearAndSeasonConfirm = (e: any) => {
      console.log('picker:confirm', e);
      show.yearAndSeason = false;
    };

    const onYearAndSeasonTitleConfirm = (e: any) => {
      console.log('picker:confirm', e);
      show.yearAndSeasonTitle = false;
    };

    const onDateConfirm = (e: any) => {
      console.log('picker:confirm', e);
      show.date = false;
    };

    const onDateTitleConfirm = (e: any) => {
      console.log('picker:confirm', e);
      show.dateTitle = false;
    };

    return {
      cityOptions,
      cityObjectOptions,
      yearOptions,
      seasonOptions,
      monthOptions,
      dayOptions,
      roleOptions,
      onColumnChange,
      onChange,
      onCancel,
      onCityConfirm,
      onCityTitleConfirm,
      onYearAndSeasonConfirm,
      onYearAndSeasonTitleConfirm,
      onDateConfirm,
      onDateTitleConfirm,
      show,
      text,
    };
  },
});
</script>
<style lang="less" scoped>
.tdesign-mobile-demo-block {
  .t-input + .t-input {
    margin-top: 16px;
  }
}
</style>
