import { defineConfig } from 'dumi';

const repo = 'visionular';

export default defineConfig({
  title: repo,
  favicon:'https://visionular.cn/wp-content/uploads/2020/06/cropped-visionular-icon-image-32x32.png',
  logo:'https://visionular.cn/wp-content/uploads/2020/06/cropped-visionular-icon-image-32x32.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
   base: `/`,
  publicPath: `/`,

  // more config: https://d.umijs.org/config
  navs: {
    'en-US': [
         {
        title: 'docs,
        path: '/mps',
       },         
       {
          title: 'home',
          path: 'https://www.visionular.com',
       },
    ],
    'zh-CN': [
      {
          title: '文档中心,
          path: '/mps',
       },         
       {
          title: '官网',
          path: 'https://www.visionular.com',
       },
      ],
    },
});
