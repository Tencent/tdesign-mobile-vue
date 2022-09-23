/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
export interface TdCalendarProps {
  /**
   * 控制日历显示隐藏
   */
  modelValue: boolean;
  /**
   * 背景颜色
   */
  bgColor?: string;

  /**
   * 确认按钮
   */
  confirmBtn?: string;
  /**
   * 第一天从星期几开始，仅在日历展示维度为月份时（mode = month）有效。默认为 1
   */
  firstDayOfWeek?: number;
  /**
   * 头部插槽（左上角处，默认不显示任何内容）
   */
  title?: string;
  /**
   * 当前高亮的日期
   */
  value?: CalendarValue;
}

export interface DateCellDescription {
  date: Date;
  label: string;
}

export type CalendarCell = {
  year: number;
  month: number;
  day: number;
};

export type CalendarValue = number | number[];
