import { RouteRecordRaw, createRouter, createWebHistory, RouterOptions } from 'vue-router';
import docsConfig from '../docs.config';
import { sortDocs } from './utils';

const docs = sortDocs(docsConfig.docs);

function getDocsRoutes(docs: any[], type: string): RouteRecordRaw[] {
  let docsRoutes: Array<RouteRecordRaw> = [];
  docs.forEach((item) => {
    const docType = item.type || type;
    if (docType === type) {
      let { children } = item;
      if (children) {
        docsRoutes = docsRoutes.concat(getDocsRoutes(children, docType));
      } else {
        docsRoutes.push({
          path: item.path,
          name: item.name,
          meta: item.meta || {},
          component: item.component,
        });
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
