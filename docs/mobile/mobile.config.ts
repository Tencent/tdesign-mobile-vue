/*
 * @Author: yuliangyang
 * @Date: 2020-05-25 23:24:58
 * @LastEditTime: 2020-05-26 12:11:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tdesign-mobile-vue/docs/mobile/mobile.config.ts
 */
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
        {
          title: 'Picker 选择器',
          name: 'picker',
          component: () => import('@/picker/demos/base.vue'),
        },
        {
          title: 'Radio 单选',
          name: 'radio',
          component: () => import('@/radio/demos/base.vue'),
        },
        {
          title: 'Message 消息通知',
          name: 'message',
          component: () => import('@/message/demos/base.vue'),
        },
        {
          title: 'Tag 标签',
          name: 'tag',
          component: () => import('@/tag/demos/base.vue'),
        },
      ],
    },
  },
};
