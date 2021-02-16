import { defineConfig } from 'umi';

export default defineConfig({
  // 编译提速
  nodeModulesTransform: {
    type: 'none',
  },
  // 路由配置
  routes: [
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/login', component: '@/pages/login/index' },
        {
          path: '/',
          component: '@/layouts/SecurityLayout',
          routes: [
            { path: '/cart', component: '@/pages/cart/index' },
            { path: '/olist', component: '@/pages/olist/index' },
            { path: '/user', component: '@/pages/user/index' },
          ],
        },
      ],
    },
  ],
  fastRefresh: {},
});
