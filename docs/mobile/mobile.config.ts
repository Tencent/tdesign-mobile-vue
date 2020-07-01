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
          title: 'ButtonGroup 按钮组',
          name: 'button-group',
          component: () => import('@/button-group/demos/base.vue'),
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
          title: 'Check-box 多选框',
          name: 'check-box',
          component: () => import('@/check-box/demos/base.vue'),
        },
        {
          title: 'Progress 进度条',
          name: 'progress',
          component: () => import('@/progress/demos/base.vue'),
        },
        {
          title: 'Toast 轻提示',
          name: 'toast',
          component: () => import('@/toast/demos/base.vue'),
        },
        {
          title: 'Dialog 对话框',
          name: 'dialog',
          component: () => import('@/dialog/demos/base.vue'),
        },
        {
          title: 'Mask 遮罩层',
          name: 'mask',
          component: () => import('@/mask/demos/base.vue'),
        },
      ],
    },
  },
};
