import { provide, inject, ref, Ref, watchEffect } from 'vue';
// import defaultLocale from './lang/zh_CN';

export interface i18nConfig {
  locale?: string;
  componentName?: string;
}

interface Placement {
  [propName: string]: string | number;
}

type i18nContext = {
  lang: Ref<string>;
  locale: Ref<Record<string, unknown>>;
  use: (locale: string, componentname: string) => void;
  t: (pattern: string, placement: Placement) => string;
};

const i18nSymbol = Symbol();

const loadLocales = () => {
  // XXX：需要考虑这里加载的问题
  // eslint-disable-next-line @typescript-eslint/dot-notation
  const locales = require['context']('./lang/', true, /[\w-]+\.ts$/i);
  return locales
    .keys()
    .reduce((locs: Array<string>, loc: string) => ({ ...locs, [loc.replace(/\.|\/|ts/g, '')]: locales(loc) }), {});
};

const createI18n = (config: i18nConfig) => {
  const componentName = ref(config.componentName || '');
  const allLocales = loadLocales();
  const lang = ref(config.locale || 'zh_CN');
  const messages = ref({});
  watchEffect(
    () => {
      let langLocales = allLocales[lang.value].default;
      if (componentName.value !== '') {
        langLocales = langLocales[componentName.value];
      }
      messages.value = langLocales;
    },
    {
      flush: 'sync',
    },
  );
  const use = (locale: string, componentname?: string) => {
    lang.value = locale;
    if (componentname !== undefined) {
      componentName.value = componentname;
    }
  };
  const t = (pattern: string, placement: Placement) => {
    const regx = /\{\s*([\w-]+)\s*\}/g;
    const translated = pattern.replace(regx, (match, key) => {
      if (placement) {
        return String(placement[key]);
      }
      return '';
    });
    return translated;
  };
  return {
    lang,
    locale: messages,
    use,
    t,
  };
};

export function provideI18n(config: i18nConfig): void {
  const i18n = createI18n(config);
  provide(i18nSymbol, i18n);
}

export function useI18n(): i18nContext {
  let i18n = inject<i18nContext>(i18nSymbol);
  if (!i18n) {
    console.log('No i18n provided and use default provide : zh_CN.');
    i18n = createI18n({
      locale: 'zh_CN',
    });
  }

  return i18n;
}
