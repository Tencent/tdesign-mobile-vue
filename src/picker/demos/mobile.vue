<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Picker 选择器</h1>
    <p class="summary">用于选择一个地区的省、市、区、街道等，包含树形用于多层级地区选择以及行政区单层选择</p>
    <tdesign-demo-block title="01 类型" summary="基础选择器">
      <t-input v-model="text.city" label="城市" placeholder="选择城市" @click="show.city = true" />
      <t-input
        v-model="text.yearAndSeason"
        label="年份和季节"
        placeholder="选择城年份和季节"
        @click="show.yearAndSeason = true"
      />
      <t-input v-model="text.date" label="日期" placeholder="选择日期" @click="show.date = true" />

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
    </tdesign-demo-block>
    <tdesign-demo-block summary="带标题选择器">
      <t-input v-model="text.city" label="城市" placeholder="选择城市" @click="show.cityTitle = true" />
      <t-input
        v-model="text.yearAndSeason"
        label="年份和季节"
        placeholder="选择城年份和季节"
        @click="show.yearAndSeasonTitle = true"
      />
      <t-input v-model="text.date" label="日期" placeholder="选择日期" @click="show.dateTitle = true" />
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
          <t-picker-column :options="yearOptions" :formatter="(val: any) => `${val}年`" @change="onColumnChange" />
          <t-picker-column :options="monthOptions" :formatter="(val: any) => `${val}月`" @change="onColumnChange" />
          <t-picker-column :options="dayOptions" :formatter="(val: any) => `${val}日`" @change="onColumnChange" />
        </t-picker>
      </t-popup>
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
    const roleOptions = ref(cities);
    const visible = ref(false);
    const onColumnChange = (e: any) => {
      console.log('column:change', e);
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
    return {
      cityOptions,
      yearOptions,
      seasonOptions,
      monthOptions,
      dayOptions,
      roleOptions,
      onColumnChange,
      onChange,
      onCancel,
      onCityConfirm,
      onYearAndSeasonConfirm,
      onDateConfirm,
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
