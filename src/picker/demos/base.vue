<template>
  <div class="tdesign-demo-block">
    <!-- demos -->
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

    <!-- pickers -->
    <t-popup v-model="show.city" placement="bottom">
      <t-picker @change="onChange" @confirm="onCityConfirm" @cancel="onCancel">
        <t-picker-column :options="cityOptions" @change="onColumnChange" />
      </t-picker>
    </t-popup>

    <t-popup v-model="show.yearAndSeason" placement="bottom">
      <t-picker @change="onChange" @confirm="onYearAndSeasonConfirm" @cancel="onCancel">
        <t-picker-column :options="yearOptions" :formatter="(val) => `${val}年`" @change="onColumnChange" />
        <t-picker-column :options="seasonOptions" @change="onColumnChange" />
      </t-picker>
    </t-popup>

    <t-popup v-model="show.date" placement="bottom">
      <t-picker @change="onChange" @confirm="onDateConfirm" @cancel="onCancel">
        <t-picker-column :options="yearOptions" :formatter="(val) => `${val}年`" @change="onColumnChange" />
        <t-picker-column :options="monthOptions" :formatter="(val) => `${val}月`" @change="onColumnChange" />
        <t-picker-column :options="dayOptions" :formatter="(val) => `${val}日`" @change="onColumnChange" />
      </t-picker>
    </t-popup>
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
    });
    const text = reactive({
      city: '',
      yearAndSeason: '',
      date: '',
    });
    const cities = ['广州市', '韶关市', '深圳市', '珠海市', '汕头市'];
    const curCityIndex = ref(0);

    const years = [2021, 2020, 2019, 2018, 2017, 2016, 2015];
    const seasons = ['春', '夏', '秋', '冬'];
    const months = Array.from(new Array(12), (_, index) => index + 1);
    const days = Array.from(new Array(31), (_, index) => index + 1);

    const cityOptions = ref(cities);
    const yearOptions = ref(years);
    const seasonOptions = ref(seasons);
    const monthOptions = ref(months);
    const dayOptions = ref(days);

    const onColumnChange = (e: any) => {
      console.log('column:change', e);
    };

    const onRoleChange = (e: any) => {
      console.log('column:change', e);
      curCityIndex.value = e.index;
    };

    const onChange = (e: any) => {
      console.log('picker:change', e);
    };

    const onCityConfirm = (e: any) => {
      console.log('picker:confirm', e);
      text.city = e.value;
      show.city = false;
    };

    const onYearAndSeasonConfirm = (e: any) => {
      console.log('picker:confirm', e);
      text.yearAndSeason = JSON.stringify(e.value);
      show.yearAndSeason = false;
    };

    const onDateConfirm = (e: any) => {
      console.log('picker:confirm', e);
      text.date = JSON.stringify(e.value);
      show.date = false;
    };

    const onCancel = () => {
      console.log('取消');
      Object.keys(show).forEach((item) => (show[item] = false));
    };

    return {
      cityOptions,
      yearOptions,
      seasonOptions,
      monthOptions,
      dayOptions,
      onColumnChange,
      onRoleChange,
      onChange,
      onCityConfirm,
      onYearAndSeasonConfirm,
      onDateConfirm,
      onCancel,
      show,
      text,
    };
  },
});
</script>
