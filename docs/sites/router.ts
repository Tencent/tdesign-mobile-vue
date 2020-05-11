import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import config from './sites.config';

// const demoReq = require.context("@/", true, /demos[/\\][\w-]+\.vue$/im);

const navs = config.navs;

function getDocsRoutes(docs: any[], type: string): RouteRecordRaw[] {
  let docsRoutes: Array<RouteRecordRaw> = [];

  docs.forEach((item) => {
    const docType = item.type || type;
    if (docType === type) {
      if (item.children) {
        docsRoutes = docsRoutes.concat(getDocsRoutes(item.children, docType));
      } else {
        docsRoutes.push({
          path: `/components/${item.name}`,
          name: item.name,
          component: item.component,
        });
      }
    }
  });
  return docsRoutes;
}
console.log(getDocsRoutes(navs.components.docs, 'component'));
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/components/install',
  },
  ...getDocsRoutes(navs.components.docs, 'component'),
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
