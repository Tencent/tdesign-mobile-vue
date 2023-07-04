import { RouteRecordRaw, createRouter, createWebHistory, RouterOptions } from 'vue-router';
import config from '../docs.config';
import { sortDocs } from './utils';

const docs = sortDocs(config.docs);
const enDocs = sortDocs(config.enDocs);

function getDocsRoutes(docs: any[], type: string): RouteRecordRaw[] {
  let docsRoutes: Array<RouteRecordRaw> = [];
  let docRoute;

  docs.forEach((item) => {
    const docType = item.type || type;
    if (docType === type) {
      let { children } = item;
      if (children) {
        docsRoutes = docsRoutes.concat(getDocsRoutes(children, docType));
      } else {
        docRoute = { ...item };
        docsRoutes.push(docRoute);
      }
    }
  });
  return docsRoutes;
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/mobile-vue/overview',
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/mobile-vue/overview',
  },
  ...getDocsRoutes(docs, 'document'),
  ...getDocsRoutes(docs, 'component'),
  ...getDocsRoutes(enDocs, 'document'),
  ...getDocsRoutes(enDocs, 'component'),
];

const routerConfig: RouterOptions = {
  routes,
  history: createWebHistory('/'),
};

const router = createRouter(routerConfig);

router.beforeEach((to, from, next) => {
  if (to.name !== from.name) {
    // @ts-ignore
    window.NProgress && window.NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // @ts-ignore
  window.NProgress && window.NProgress.done();
  // @ts-ignore
  document.querySelector('td-stats')?.track?.();
});

export default router;
