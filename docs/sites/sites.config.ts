/*
 * @Author: your name
 * @Date: 2020-05-25 16:40:09
 * @LastEditTime: 2020-07-02 14:45:30
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
        {
          title: '开始',
          type: 'document', // 普通文档
          children: [
            {
              title: '如何开始',
              name: 'install',
              component: () => import('@/../docs/install.md'),
            },
            {
              title: '贡献指南',
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
            {
              title: 'Picker 选择器',
              name: 'picker',
              component: () => import('@/picker/picker.md'),
            },
            {
              title: 'Radio 单选框',
              name: 'radio',
              component: () => import('@/radio/radio.md'),
            },
            {
              title: 'Progress 进度条',
              name: 'progress',
              component: () => import('@/progress/progress.md'),
            },
            {
              title: 'Tag 标签',
              name: 'tag',
              component: () => import('@/tag/tag.md'),
            },
            {
              title: 'CheckBox 复选框',
              name: 'check-box',
              component: () => import('@/check-box/check-box.md'),
            },
            // {
            //   title: 'Mask',
            //   name: 'mask',
            //   component: () => import('@/mask/demos/base.vue'),
            // },
            {
              title: 'Stepper 步进器',
              name: 'stepper',
              component: () => import('@/stepper/stepper.md'),
            },
            {
              title: 'Slider 滑动选择器',
              name: 'slider',
              component: () => import('@/slider/slider.md'),
            },
            {
              title: 'Dialog 弹出框',
              name: 'dialog',
              component: () => import('@/dialog/dialog.md'),
            },
            {
              title: 'DropdownMenu 下拉菜单',
              name: 'dropdown-menu',
              component: () => import('@/dropdown-menu/dropdown-menu.md'),
            },
          ],
        },
        {
          title: '导航组件',
          type: 'component',
          children: [
            {
              title: 'TabBar 标签栏',
              name: 'tab-bar',
              component: () => import('@/tab-bar/tab-bar.md'),
            },
            {
              title: 'SegmentControl 分段器',
              name: 'segment-control',
              component: () => import('@/segment-control/segment-control.md'),
            },
          ],
        },
        {
          title: '消息提醒',
          type: 'component', // 组件文档
          children: [
            {
              title: 'Toast 轻提示',
              name: 'toast',
              component: () => import('@/toast/toast.md'),
            },
            {
              title: 'Message 消息',
              name: 'message',
              component: () => import('@/message/message.md'),
            },
            {
              title: 'NoticeBar 公告栏',
              name: 'noticebar',
              component: () => import('@/noticebar/noticebar.md'),
            },
          ],
        },
      ],
    },
  },
};
