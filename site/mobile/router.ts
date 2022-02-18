import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import Home from './components/home.vue';
import siteConfig from '../docs.config';

const { docs } = siteConfig;

// 引入所有views下.vue文件
// @ts-ignore
const demoModules = import.meta.glob('../../src/**/demos/mobile.vue');

function getDocsRoutes(docs: any[]): RouteRecordRaw[] {
  let docsRoutes: Array<RouteRecordRaw> = [];
  docs.forEach((item) => {
    let { children } = item;
    if (item.type === 'component') {
      children = item.children.sort((a: any, b: any) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
    if (children) {
      docsRoutes = docsRoutes.concat(getDocsRoutes(children));
    } else {
      docsRoutes.push({
        path: `/${item.name}`,
        name: item.name,
        meta: { title: item.title },
        component: demoModules[`../../src/${item.name}/demos/mobile.vue`],
      });
    }
  });
  return docsRoutes;
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
  },
  ...getDocsRoutes(docs),
];
const router = createRouter({
  history: createWebHashHistory('/mobile.html'),
  routes,
});

export default router;
