const repo = 'visionular';


export default ({
  title: repo,
  favicon:'https://visionular.cn/wp-content/uploads/2020/06/cropped-visionular-icon-image-32x32.png',
  logo:'https://visionular.cn/wp-content/uploads/2020/06/cropped-visionular-icon-image-32x32.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  base: `/docs-wztest`,
  publicPath: `/docs-wztest/`,

  // more config: https://d.umijs.org/config
  exportStatic: {},
  targets: {
    ie: 9,
  },
  locales:[['zh-CN', '中文'],['en-US', 'English']],
  navs: {
    'en-US': [
      null,
       {
          title: 'home',
          path: 'https://www.visionular.com',
       },
    ],
    'zh-CN': [
      null,     
       {
          title: '官网',
          path: 'https://www.visionular.com',
       },
      ],
    },
});
