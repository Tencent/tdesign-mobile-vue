:: BASE_DOC ::

## API
### Footer Props

name | type | default | description | required
-- | -- | -- | -- | --
links | Array | [] | Typescript：`Array<LinkObj>` `interface LinkObj { name: string; url?: string; target?: string}`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/footer/type.ts) | N
logo | Object | - | Typescript：`FooterLogo` `interface FooterLogo { icon: string; title?: string; url?: string; target: string }`。[see more ts definition](https://github.com/Tencent/tdesign-mobile-vue/tree/develop/src/footer/type.ts) | N
text | String | '' | \- | N


### CSS Variables
The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
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
