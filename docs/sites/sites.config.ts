/*
 * @Author: your name
 * @Date: 2020-05-25 16:40:09
 * @LastEditTime: 2020-05-25 16:52:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tdesign-mobile-vue/docs/sites/sites.config.ts
 */
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
            {
              title: 'Rate',
              name: 'rate',
              component: () => import('@/rate/demos/base.vue'),
            },
            {
              title: 'Switch',
              name: 'switch',
              component: () => import('@/switch/demos/base.vue'),
            },
            {
              title: 'Radio',
              name: 'radio',
              component: () => import('@/radio/demos/base.vue'),
            },
            {
              title: 'Message',
              name: 'message',
              component: () => import('@/message/demos/base.vue'),
            },
            {
              title: 'Progress',
              name: 'progress',
              component: () => import('@/progress/demos/base.vue'),
            },
            {
              title: 'Toast',
              name: 'toast',
              component: () => import('@/toast/demos/base.vue'),
            },
            {
              title: 'Mask',
              name: 'mask',
              component: () => import('@/mask/demos/base.vue'),
            },
          ],
        },
      ],
    },
  },
};
