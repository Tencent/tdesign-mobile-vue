/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-11-30 10:39:32
 * */

import { TNode } from '../common';

export interface TdStepsProps {
  /**
   * 当前步骤
   */
  current: string | number;
  /**
   * 当前步骤，非受控属性
   */
  defaultCurrent: string | number;
  /**
   * 步骤条方向，有两种：横向和纵向
   * @default horizontal
   */
  layout: 'horizontal' | 'vertical';
  /**
   * 步骤条数据列表（作用和 StepItem 效果一样）
   */
  options: Array<TdStepItemProps>;
  /**
   * 是否只读
   * @default false
   */
  readonly: boolean;
  /**
   * 步骤条风格
   * @default default
   */
  theme: 'default' | 'dot';
  /**
   * 当前步骤发生变化时触发
   */
  onChange: (current: string | number, previous: string | number, context?: { e?: MouseEvent }) => void;
}

export interface TdStepItemProps {
  /**
   * 步骤描述
   * @default ''
   */
  content: string | TNode;
  /**
   * 图标，默认显示内置图标，也可以自定义图标
   * @default true
   */
  icon: boolean | TNode;
  /**
   * 当前步骤的状态
   * @default default
   */
  status: StepStatus;
  /**
   * 标题
   * @default ''
   */
  title: string | TNode;
}

export type StepStatus = 'default' | 'process' | 'finish' | 'error';
