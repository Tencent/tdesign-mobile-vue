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
          title: 'Picker 选择器',
          name: 'picker',
          component: () => import('@/picker/demos/base.vue'),
        },
      ],
    },
  },
};
