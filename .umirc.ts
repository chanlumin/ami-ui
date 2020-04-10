import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'ami-ui',
  mode: 'site',
  favicon: '/assets/favicon.ico',
  logo: './',
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  // more config: https://d.umijs.org/config
});
