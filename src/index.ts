import config from './config';
import Icon from './icon';
import Button from './button';
import Rate from './rate';
import CellGroup from './cell-group';
import Cell from './cell';
import Input from './input';
import Switch from './switch';
import { Picker, PickerColumn } from './picker';

const { prefix } = config;

const components = {
  Icon,
  Button,
  Rate,
  CellGroup,
  Input,
  Switch,
  Picker,
  PickerColumn,
};

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
