declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

declare module '*.vue' {
  import type { DefineComponent, Plugin } from 'vue';

  const component: DefineComponent<{}, {}, any> & Plugin;
  export default component;
}
