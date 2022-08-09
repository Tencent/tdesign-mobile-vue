export default {
  docs: [
    {
      title: '开始',
      type: 'document', // 普通文档
      children: [
        {
          title: '快速开始',
          name: 'getting-started',
          path: '/mobile-vue/getting-started',
          component: () => import('@/../getting-started.md'),
        },
        {
          title: '更新日志',
          name: 'changelog',
          path: '/mobile-vue/changelog',
          component: () => import('@/../CHANGELOG.md'),
        },
        {
          title: '组件概览',
          name: 'overview',
          path: '/mobile-vue/overview',
          component: () => import('@/_common/docs/mobile/overview.md'),
        },
      ],
    },
    {
      title: '基础组件',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Button 按钮',
          name: 'button',
          path: '/mobile-vue/components/button',
          component: () => import('@/button/button.md'),
        },
        {
          title: 'Fab 悬浮按钮',
          name: 'fab',
          path: '/mobile-vue/components/fab',
          component: () => import('@/fab/fab.md'),
        },
        {
          title: 'Icon 图标',
          name: 'icon',
          path: '/mobile-vue/components/icon',
          component: () => import('@/icon/icon.md'),
        },
      ],
    },
    {
      title: '布局',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Divider 分割符',
          name: 'divider',
          path: '/mobile-vue/components/divider',
          component: () => import('@/divider/divider.md'),
        },
        {
          title: 'Cell 单元格',
          name: 'cell',
          path: '/mobile-vue/components/cell',
          component: () => import('@/cell/cell.md'),
        },
        {
          title: 'Grid 宫格',
          name: 'grid',
          path: '/mobile-vue/components/grid',
          component: () => import('@/grid/grid.md'),
        },
      ],
    },
    {
      title: '导航',
      type: 'component',
      children: [
        {
          title: 'Indexes 索引',
          name: 'indexes',
          path: '/mobile-vue/components/indexes',
          component: () => import('@/indexes/indexes.md'),
        },
        {
          title: 'Navbar 导航条',
          name: 'navbar',
          path: '/mobile-vue/components/navbar',
          component: () => import('@/navbar/navbar.md'),
        },
        {
          title: 'Steps 步骤条',
          name: 'steps',
          path: '/mobile-vue/components/steps',
          component: () => import('@/steps/steps.md'),
        },
        {
          title: 'TabBar 标签栏',
          name: 'tab-bar',
          path: '/mobile-vue/components/tabbar',
          component: () => import('@/tab-bar/tab-bar.md'),
        },
        {
          title: 'Tabs 选项卡',
          name: 'tabs',
          path: '/mobile-vue/components/tabs',
          component: () => import('@/tabs/tabs.md'),
        },
        {
          title: 'DropdownMenu 下拉菜单',
          name: 'dropdown-menu',
          path: '/mobile-vue/components/dropdown-menu',
          component: () => import('@/dropdown-menu/dropdown-menu.md'),
        },
        {
          title: 'Sticky 吸顶容器',
          name: 'sticky',
          path: '/mobile-vue/components/sticky',
          component: () => import('@/sticky/sticky.md'),
        },
      ],
    },
    {
      title: '输入',
      type: 'component',
      children: [
        {
          title: 'Calendar 日历',
          name: 'calendar',
          path: '/mobile-vue/components/calendar',
          component: () => import('@/calendar/calendar.md'),
        },
        {
          title: 'CheckBox 复选框',
          name: 'checkbox',
          path: '/mobile-vue/components/checkbox',
          component: () => import('@/checkbox/checkbox.md'),
        },
        {
          title: 'Input 输入框',
          name: 'input',
          path: '/mobile-vue/components/input',
          component: () => import('@/input/input.md'),
        },
        {
          title: 'Textarea 多行输入框',
          name: 'textarea',
          path: '/mobile-vue/components/textarea',
          component: () => import('@/textarea/textarea.md'),
        },
        {
          title: 'Picker 选择器',
          name: 'picker',
          path: '/mobile-vue/components/picker',
          component: () => import('@/picker/picker.md'),
        },
        {
          title: 'DateTimePicker 时间选择器',
          name: 'date-time-picker',
          path: '/mobile-vue/components/date-time-picker',
          component: () => import('@/date-time-picker/date-time-picker.md'),
        },
        {
          title: 'Radio 单选框',
          name: 'radio',
          path: '/mobile-vue/components/radio',
          component: () => import('@/radio/radio.md'),
        },
        {
          title: 'Rate 评分',
          name: 'rate',
          path: '/mobile-vue/components/rate',
          component: () => import('@/rate/rate.md'),
        },
        {
          title: 'Stepper 步进器',
          name: 'stepper',
          path: '/mobile-vue/components/stepper',
          component: () => import('@/stepper/stepper.md'),
        },
        {
          title: 'Switch 开关',
          name: 'switch',
          path: '/mobile-vue/components/switch',
          component: () => import('@/switch/switch.md'),
        },
        {
          title: 'Search 搜索框',
          name: 'search',
          path: '/mobile-vue/components/search',
          component: () => import('@/search/search.md'),
        },
        {
          title: 'Slider 滑动选择器',
          name: 'slider',
          path: '/mobile-vue/components/slider',
          component: () => import('@/slider/slider.md'),
        },
        {
          title: 'Upload 上传',
          name: 'upload',
          path: '/mobile-vue/components/upload',
          component: () => import('@/upload/upload.md'),
        },
      ],
    },
    {
      title: '数据展示',
      type: 'component',
      children: [
        {
          title: 'Image 图片',
          name: 'image',
          path: '/mobile-vue/components/image',
          component: () => import('@/image/image.md'),
        },
        {
          title: 'Avatar 头像',
          name: 'avatar',
          path: '/mobile-vue/components/avatar',
          component: () => import('@/avatar/avatar.md'),
        },
        {
          title: 'Badge 徽标',
          name: 'badge',
          path: '/mobile-vue/components/badge',
          component: () => import('@/badge/badge.md'),
        },
        {
          title: 'CountDown 倒计时',
          name: 'count-down',
          path: '/mobile-vue/components/count-down',
          component: () => import('@/count-down/count-down.md'),
        },
        {
          title: 'Tag 标签',
          name: 'tag',
          path: '/mobile-vue/components/tag',
          component: () => import('@/tag/tag.md'),
        },
        {
          title: 'Collapse 折叠面板',
          name: 'collapse',
          path: '/mobile-vue/components/collapse',
          component: () => import('@/collapse/collapse.md'),
        },
        {
          title: 'Swiper 轮播',
          name: 'swiper',
          path: '/mobile-vue/components/swiper',
          component: () => import('@/swiper/swiper.md'),
        },
        {
          title: 'ImageViewer 图片预览',
          name: 'image-viewer',
          path: '/mobile-vue/components/image-viewer',
          component: () => import('@/image-viewer/image-viewer.md'),
        },
        {
          title: 'Skeleton 骨架屏',
          name: 'skeleton',
          path: '/mobile-vue/components/skeleton',
          component: () => import('@/skeleton/skeleton.md'),
        },
        {
          title: 'List 列表',
          name: 'list',
          path: '/mobile-vue/components/list',
          component: () => import('@/list/list.md'),
        },
        {
          title: 'Result 结果',
          name: 'result',
          path: '/mobile-vue/components/result',
          component: () => import('@/result/result.md'),
        },
      ],
    },
    {
      title: '消息提醒',
      type: 'component', // 组件文档
      children: [
        {
          title: 'Drawer 抽屉',
          name: 'drawer',
          path: '/mobile-vue/components/drawer',
          component: () => import('@/drawer/drawer.md'),
        },
        {
          title: 'Progress 进度条',
          name: 'progress',
          path: '/mobile-vue/components/progress',
          component: () => import('@/progress/progress.md'),
        },
        {
          title: 'BackTop 返回顶部',
          name: 'back-top',
          meta: { docType: 'base' },
          path: '/mobile-vue/components/back-top',
          component: () => import('@/back-top/back-top.md'),
        },
        {
          title: 'PullDownRefresh 下拉刷新',
          name: 'pull-down-refresh',
          path: '/mobile-vue/components/pull-down-refresh',
          component: () => import('@/pull-down-refresh/pull-down-refresh.md'),
        },
        {
          title: 'ActionSheet 动作面板',
          name: 'action-sheet',
          path: '/mobile-vue/components/actionsheet',
          component: () => import('@/action-sheet/action-sheet.md'),
        },
        {
          title: 'Toast 轻提示',
          name: 'toast',
          path: '/mobile-vue/components/toast',
          component: () => import('@/toast/toast.md'),
        },
        {
          title: 'Message 消息',
          name: 'message',
          path: '/mobile-vue/components/message',
          component: () => import('@/message/message.md'),
        },
        {
          title: 'Dialog 对话框',
          name: 'dialog',
          path: '/mobile-vue/components/dialog',
          component: () => import('@/dialog/dialog.md'),
        },
        {
          title: 'Popup 弹出层',
          name: 'popup',
          path: '/mobile-vue/components/popup',
          component: () => import('@/popup/popup.md'),
        },
        {
          title: 'Overlay 遮罩层',
          name: 'overlay',
          path: '/mobile-vue/components/overlay',
          component: () => import('@/overlay/overlay.md'),
        },
        {
          title: 'SwipeCell 滑动单元格',
          name: 'swipe-cell',
          path: '/mobile-vue/components/swipe-cell',
          component: () => import('@/swipe-cell/swipe-cell.md'),
        },
        {
          title: 'NoticeBar 公告栏',
          name: 'notice-bar',
          path: '/mobile-vue/components/notice-bar',
          component: () => import('@/notice-bar/notice-bar.md'),
        },
        {
          title: 'Loading 加载中',
          name: 'loading',
          path: '/mobile-vue/components/loading',
          component: () => import('@/loading/loading.md'),
        },
      ],
    },
  ],
};
