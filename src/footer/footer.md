:: BASE_DOC ::

## API

### Footer Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
links | Array | [] | 链接列表。name 表示链接名称， url 表示跳转链接，target 表示跳转方式，如：当前页面打开、新页面打开等，同 HTML 属性 target 含义相同。TS 类型：`Array<LinkObj>` `interface LinkObj { name: string; url?: string; target?: string}`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/footer/type.ts) | N
logo | Object | - | 图标配置。`logo.icon` 表示图标链接地址，`logo.title` 表示标题文本，`logo.url` 表示链接跳转地址，`logo.target` 表示跳转方式。TS 类型：`FooterLogo` `interface FooterLogo { icon: string; title?: string; url?: string; target?: string; }`。[详细类型定义](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/footer/type.ts) | N
text | String | '' | 版权信息 | N

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
名称 | 默认值 | 描述 
-- | -- | --
--td-footer-link-color | @brand-color | - 
--td-footer-link-dividing-line-color | @font-gray-3 | - 
--td-footer-link-dividing-line-padding | @spacer-1 | - 
--td-footer-link-font-size | @font-size-s | - 
--td-footer-link-line-height | 20px | - 
--td-footer-logo-icon-height | 24px | - 
--td-footer-logo-icon-margin-right | @spacer | - 
--td-footer-logo-icon-width | 24px | - 
--td-footer-logo-title-font-size | @font-size-m | - 
--td-footer-logo-title-line-height | 24px | - 
--td-footer-logo-title-url-width | 128px | - 
--td-footer-text-color | @font-gray-3 | - 
--td-footer-text-font-size | @font-size-s | - 
--td-footer-text-line-height | 20px | - 
--td-footer-text-margin-top | 4px | -