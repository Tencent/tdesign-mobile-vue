import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import Home from './components/home.vue';
import config from './mobile.config';

// const demoReq = require.context("@/", true, /demos[/\\][\w-]+\.vue$/im);

const navs = config.navs;

function getDocsRoutes(docs: any[]): RouteRecordRaw[] {
  const docsRoutes: Array<RouteRecordRaw> = [];

  docs.forEach((item) => {
    docsRoutes.push({
      path: `/${item.name}`,
      name: item.name,
      component: item.component,
      meta: { title: item.title },
    });
  });
  return docsRoutes;
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
  },
  ...getDocsRoutes(navs.components.docs),
];
const router = createRouter({
  history: createWebHashHistory(`${process.env.BASE_URL}mobile.html/`),
  routes,
});

export default router;
