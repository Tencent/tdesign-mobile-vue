import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import Home from './components/home.vue';
import siteConfig from '../docs.config';
import LiquidGlassTexturePreview from './dev/liquid-glass-texture-preview.vue';

const { docs } = siteConfig;

// 引入所有views下.vue文件
// @ts-ignore
const demoModules = import.meta.glob('../../src/**/demos/*.vue');

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
        meta: { title: item.titleEn },
        component: demoModules[`../../src/${item.name}/demos/mobile.vue`],
      });
    }
  });

  return docsRoutes;
}

const componentInnerRoutes: RouteRecordRaw[] = [];
const demoRouteGenerator = (compName, demos, title) => {
  const ans = demos.map((demo) => ({
    path: `/${compName}/${demo}`,
    meta: { title },
    component: demoModules[`../../src/${compName}/demos/${demo}.vue`],
  }));

  componentInnerRoutes.push(...ans);
};

// 组件需要多页面展示时，需要多个路由
demoRouteGenerator('side-bar', ['base', 'switch', 'with-icon', 'custom'], 'SideBar');
demoRouteGenerator('indexes', ['base', 'custom'], 'Indexes');
demoRouteGenerator('tab-bar', ['liquid-glass', 'liquid-glass-inspector'], 'TabBar Liquid Glass');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
  },
  ...getDocsRoutes(docs),
  ...componentInnerRoutes,
  ...(import.meta.env.DEV
    ? [
        {
          path: '/tab-bar-texture',
          meta: { title: 'TabBar Texture Diagnostics' },
          component: LiquidGlassTexturePreview,
          beforeEnter: (to) => (to.query['glass-texture-debug'] === '1' ? true : { path: '/tab-bar' }),
        },
      ]
    : []),
];
const router = createRouter({
  history: createWebHashHistory('/mobile.html'),
  routes,
});

export default router;
