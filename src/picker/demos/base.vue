<template>
  <div class="tdesign-demo-block">
    <!-- demos -->
    <t-cell-group>
      <t-input :value="cityText.join(',')" label="城市" placeholder="选择城市" @click="showCity.value = true" />
    </t-cell-group>
    <t-cell-group style="margin-top: 20px">
      <t-input
        :value="yearAndSeasonText"
        label="年份和季节"
        placeholder="选择城年份和季节"
        @click="showYearAndSeason = true"
      />
    </t-cell-group>
    <t-cell-group style="margin-top: 20px">
      <t-input :value="dateText" label="日期" placeholder="选择日期" @click="showDate.value = true" />
      <span style="color: #888; padding: 5px 10px; font-size: 12px">仅做展示，年月日关联关系由自己实现</span>
    </t-cell-group>

    <!-- pickers -->
    <t-popup v-model="showCity" placement="bottom">
      <t-picker v-model="cityText" @change="onCityChange" @confirm="onCityConfirm" @cancel="showCity.value = false">
        <t-picker-column :options="cityOptions" @change="onColumnChange" />
      </t-picker>
    </t-popup>

    <t-popup v-model="showYearAndSeason" placement="bottom">
      <t-picker v-model="yearAndSeasonText" @change="onChange" @confirm="onYearAndSeasonConfirm" @cancel="onCancel">
        <t-picker-column :options="yearOptions" :formatter="(val) => `${val}年`" @change="onColumnChange" />
        <t-picker-column :options="seasonOptions" @change="onColumnChange" />
      </t-picker>
    </t-popup>

    <t-popup v-model="showDate" placement="bottom">
      <t-picker v-model="dateText" @change="onChange" @confirm="onDateConfirm" @cancel="onCancel">
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
    const showCity = ref(false);
    const showYearAndSeason = ref(false);
    const showDate = ref(false);
    const cityText = reactive([]);
    const yearAndSeasonText = reactive([]);
    const dateText = reactive([]);

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

    const onColumnChange = (e: any) => {
      console.log('column:change', e);
    };

    const onChange = (e: any) => {
      console.log('xxxx')
      console.log('picker:change', e);
      console.log({ cityText: typeof cityText })
    };

    const onCityConfirm = (e: any) => {
      console.log('picker:confirm', e, cityText);
      showCity.value = false;
    };

    const onYearAndSeasonConfirm = (e: any) => {
      console.log('picker:confirm', e);
      showYearAndSeason.value = false;
    };

    const onDateConfirm = (e: any) => {
      console.log('picker:confirm', e);
      showDate.value = false;
    };

    return {
      cityOptions,
      yearOptions,
      seasonOptions,
      monthOptions,
      dayOptions,
      onColumnChange,
      onChange,
      onCityConfirm,
      onYearAndSeasonConfirm,
      onDateConfirm,
      cityText,
      yearAndSeasonText,
      dateText,
      showCity,
      showYearAndSeason,
      showDate,
    };
  },
});
</script>
