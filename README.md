Next.js基础模板说明

## 初次使用

进入开发模式

```bash
npm run dev
# or
yarn dev
```

构建

```bash
npm run build
# or
yarn build
```

进入生产模式(必须在构建之后运行)


```bash
npm start
# or
yarn start
```

## 基本特性
- [x] 支持TypeScript
- [x] 支持ESLint
- [x] 支持CommitLint
- [x] 集成tailwindcss
- [x] 支持less

## 文档说明
- [文件目录](docs/文件目录.md)
- [api代理设置](docs/api代理设置.md)
- [环境变量配置](docs/环境变量配置.md)
- [集成tailwindcss](docs/集成tailwindcss.md)
- [集成Antd](docs/集成antd.md)
  - [从iconfont.cn生成图标组件](docs/集成antd.md)
- [国际化配置](docs/国际化配置.md)
- [服务端渲染](docs/服务端渲染.md)
- [如何避免服务端渲染](docs/如何避免服务端渲染.md)
- SSR 基本原理
- 内置文件、模块说明及其扩展案例
- 配置文件 next.config.js 详解
- 自定义 .next 文件夹位置
- 支持 TypeScript
- 绝对导入
- 支持多种 CSS 预处理器和方案：
  - 支持 Less
  - 支持 Sass
  - 支持 CSS Modules
  - 支持 Tailwindcss
  - 如何主题配置
  - 全局样式引用
- 支持多种文件格式解析：markdown、mdx ...
- 全局入口文件的作用： js、css
- 路由：约定式路由、多层 params 路由、路由钩子、命令式路由、重定向、鉴权、动态菜单（接口）
- 页面加载和跳转动画
- 复杂项目目录结构
- 集成第三方库: video.js、styled-component...
- 内置常见第三方 UI 组件库: antd...
- 如何集成状态管理：unstate、redux、rematch、redux-saga、redux-persist、redux-thunk、redux-toolkit、redux-observable、redux-code-splitting...
- 支持多种布局方式：权限布局、动态布局
- 完善的预封装请求响应中间件
- 支持多种请求调用：RESTful APIs、GraphQL
- 自定义 Polyfill
- 特殊 Hacks
- 国际化方案及使用：i18n、react-intl
- Helmet
- 热更新
- 静态文件服务
- 如何调试
- 环境变量管理
- Webassembly
- 自定义构建
- 服务启动与监控：pm2、sentry、接入第三方监控服务
- 性能监控与优化：why-did-you-render webpack-bundle-analyzer web pack-bundle-size-analyzer
- Yarn Workspaces
- Zones
- 测试
- 官方仓库 examples 说明
  - with-urql 不可用
- NextJS 源码解析
