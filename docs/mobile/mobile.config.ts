export default {
  navs: {
    components: {
      title: 'TDesign',
      url: 'components',
      docs: [
        {
          title: 'Button 按钮',
          name: 'button',
          component: () => import('@/button/demos/base.vue'),
        },
        {
          title: 'Icon 图标',
          name: 'icon',
          component: () => import('@/icon/demos/base.vue'),
        },
        {
          title: 'Cell 单元格',
          name: 'cell',
          component: () => import('@/cell/demos/base.vue'),
        },
        {
          title: 'Rate 评分',
          name: 'rate',
          component: () => import('@/rate/demos/base.vue'),
        },
        {
          title: 'Input 输入框',
          name: 'input',
          component: () => import('@/input/demos/base.vue'),
        },
        {
          title: 'Switch 开关',
          name: 'switch',
          component: () => import('@/switch/demos/base.vue'),
        },
      ],
    },
  },
};
