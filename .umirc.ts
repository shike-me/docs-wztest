import { defineConfig } from 'dumi';

const repo = 'Visionular';

export default defineConfig({
  title: repo,
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
   base: `/`,
  publicPath: `/`,

  // more config: https://d.umijs.org/config


    navs: {
    // 多语言 key 值需与 locales 配置中的 key 一致
    'en-US': [
      null, // null 值代表保留约定式生成的导航，只做增量配置
      {
        title: 'Intelligent coding engine',
        path: '/vice',
      },
      {
        title: 'Media Processing Service',
        path: '/mps',
      },      
    ],
    'zh-CN': [
      null, // null 值代表保留约定式生成的导航，只做增量配置
      {
        title: '智能编码引擎',
        path: '/vice',
      },
    {
      title: '媒体处理',
      path: '/mps',
    },
    ],
  },
 


});
