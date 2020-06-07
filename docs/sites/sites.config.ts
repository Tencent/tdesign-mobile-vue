export default {
  navs: {
    components: {
      title: '组件',
      url: 'components',
      docs: [
        {
          title: '开始',
          type: 'document', // 普通文档
          children: [
            {
              title: '安装',
              name: 'install',
              component: () => import('@/../docs/install.md'),
            },
            {
              title: '开发指南',
              name: 'develop',
              component: () => import('@/../docs/develop.md'),
            },
            {
              title: '更新日志',
              name: 'changelog',
              component: () => import('@/../CHANGELOG.md'),
            },
          ],
        },
        {
          title: '基础组件',
          type: 'component', // 组件文档
          children: [
            {
              title: 'Icon 图标',
              name: 'icon',
              component: () => import('@/icon/icon.md'),
            },
            {
              title: 'Button 按钮',
              name: 'button',
              component: () => import('@/button/button.md'),
            },
            {
              title: 'Rate 评分',
              name: 'rate',
              component: () => import('@/rate/rate.md'),
            },
            {
              title: 'Switch 选择器',
              name: 'switch',
              component: () => import('@/switch/switch.md'),
            },
          ],
        },
      ],
    },
  },
};
