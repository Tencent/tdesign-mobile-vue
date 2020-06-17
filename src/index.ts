/*
 * @Author: your name
 * @Date: 2020-05-25 16:40:09
 * @LastEditTime: 2020-06-06 20:46:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tdesign-mobile-vue/src/index.ts
 */
import config from './config';
import Icon from './icon';
import Button from './button';
import ButtonGroup from './button-group';
import Rate from './rate';
import CellGroup from './cell-group';
import Cell from './cell';
import Input from './input';
import Switch from './switch';
import Radio from './radio';
import RadioGroup from './radio-group';
import { Picker, PickerColumn } from './picker';
import Message from './message';
import Progress from './progress';
import CheckBox from './check-box';
import CheckGroup from './check-group';

import Toast from './toast';
import Mask from './mask';

const { prefix } = config;

const components = {
  Icon,
  Button,
  ButtonGroup,
  Rate,
  Cell,
  CellGroup,
  Input,
  Switch,
  Picker,
  PickerColumn,
  Radio,
  RadioGroup,
  Message,
  Progress,
  CheckBox,
  CheckGroup,
  Toast,
  Mask,
};
const install = function (Vue: any, config?: object): void {
  const defaults = {
    prefix,
  };
  const installConfig = { ...defaults, ...config };
  Object.keys(components).forEach((key) => {
    Vue.component(installConfig.prefix + key, components[key]);
  });
};

// install
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }

export default {
  install,
  version: typeof VERSION === "undefined" ? "" : VERSION, // eslint-disable-line
  ...components,
};
