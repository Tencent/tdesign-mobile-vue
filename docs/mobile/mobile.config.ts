/*
 * @Author: yuliangyang
 * @Date: 2020-05-25 23:24:58
 * @LastEditTime: 2020-11-28 12:00:40
 * @LastEditors: angelaguo
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
          title: 'Badge 徽标',
          name: 'badge',
          component: () => import('@/badge/demos/base.vue'),
        },
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
          component: () => import('@/picker/demos/mobile.vue'),
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
          title: 'Stepper 步进器',
          name: 'stepper',
          component: () => import('@/stepper/demos/base.vue'),
        },
        {
          title: 'Slider 滑块',
          name: 'Slider',
          component: () => import('@/slider/demos/base.vue'),
        },
        {
          title: 'NoticeBar 公告栏',
          name: 'noticebar',
          component: () => import('@/noticebar/demos/base.vue'),
        },
        {
          title: 'Dialog 对话框',
          name: 'dialog',
          component: () => import('@/dialog/demos/base.vue'),
        },
        {
          title: 'DropdownMenu 下拉菜单',
          name: 'dropdown-menu',
          component: () => import('@/dropdown-menu/demos/base.vue'),
        },
        {
          title: 'Popup 弹出层',
          name: 'popup',
          component: () => import('@/popup/demos/base.vue'),
        },
        {
          title: 'ActionSheet 动作面板',
          name: 'actionsheet',
          component: () => import('@/action-sheet/demos/base.vue'),
        },
        {
          title: 'Collapse 折叠面板',
          name: 'collapse',
          component: () => import('@/collapse/demos/index.vue'),
        },
        {
          title: 'TabBar 标签栏',
          name: 'tab-bar',
          component: () => import('@/tab-bar/demos/base.vue'),
        },
        {
          title: 'Segment Control 分段器',
          name: 'segment-control',
          component: () => import('@/segment-control/demos/base.vue'),
        },
        {
          title: 'Fab 悬浮按钮',
          name: 'fab',
          component: () => import('@/fab/demos/base.vue'),
        },
        {
          title: 'ImageViewer 图片预览',
          name: 'image-viewer',
          component: () => import('@/image-viewer/demos/base.vue'),
        },
        {
          title: 'Drawer 抽屉',
          name: 'drawer',
          component: () => import('@/drawer/demos/base.vue'),
        },
        {
          title: 'Indexes 索引',
          name: 'indexes',
          component: () => import('@/indexes/demos/base.vue'),
        },
        {
          title: 'Tabs 选项卡',
          name: 'tabs',
          component: () => import('@/tabs/demos/base.vue'),
        },
        {
          title: 'Navbar 导航条',
          name: 'navbar',
          component: () => import('@/navbar/demos/base.vue'),
        },
      ],
    },
  },
};
