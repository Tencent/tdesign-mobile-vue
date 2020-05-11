export default {
  navs: {
    components: {
      title: '组件',
      url: 'components',
      docs: [
        // {
        //   title: "开始",
        //   type: "document", // 普通文档
        //   children: [
        //     {
        //       title: "安装",
        //       name: "install",
        //       component: import("@/../docs/install.md")
        //     },
        //     {
        //       title: "更新日志",
        //       name: "changelog",
        //       component: () => import("@/../CHANGELOG.md")
        //     }
        //   ]
        // },
        {
          title: '基础组件',
          type: 'component', // 组件文档
          children: [
            // {
            //   title: 'Button 按钮',
            //   name: 'button',
            //   component: () => import('@/button/button.md'),
            // },
            {
              title: 'Icon',
              name: 'icon',
              component: () => import('@/icon/demos/base.vue'),
            },
            {
              title: 'Button',
              name: 'button',
              component: () => import('@/button/demos/base.vue'),
            },
          ],
        },
      ],
    },
  },
};
