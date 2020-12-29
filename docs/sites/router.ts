import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import config from './sites.config';

// const demoReq = require.context("@/", true, /demos[/\\][\w-]+\.vue$/im);

const navs = config.navs;

function getDocsRoutes(docs: any[], type: string): RouteRecordRaw[] {
  let docsRoutes: Array<RouteRecordRaw> = [];

  docs.forEach((item) => {
    const docType = item.type || type;
    if (docType === type) {
      let { children } = item;
      if (item.type === 'component') {
        children = item.children.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      }
      if (children) {
        docsRoutes = docsRoutes.concat(getDocsRoutes(children, docType));
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
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/components/install',
  },
  ...getDocsRoutes(navs.components.docs, 'document'),
  ...getDocsRoutes(navs.components.docs, 'component'),
];
console.log(process.env.BASE_URL);
const router = createRouter({
  history: createWebHistory('vue-mobile'),
  routes,
});

export default router;
