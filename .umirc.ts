import { defineConfig } from 'dumi';

const repo = 'Visionular';

export default defineConfig({
  title: repo,
  favicon:
    'https://visionular.cn/wp-content/uploads/2020/06/visionular-logo.png',
  logo:
    'https://visionular.cn/wp-content/uploads/2020/06/visionular-logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
   base: `/`,
  publicPath: `/`,

  // more config: https://d.umijs.org/config
    navs: {
    // 多语言 key 值需与 locales 配置中的 key 一致
    'en-US': [     
    ],
    'zh-CN': [
    ],
  },
 


});
