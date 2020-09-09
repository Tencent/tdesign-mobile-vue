declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

declare module 'clipboard';

declare module 'vfile-message' {
  export type VFileMessage = any;
}
