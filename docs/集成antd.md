# 集成Antd

`Next.js`默认不支持less，而Antd的样式文件是less文件，因此，集成Antd首先要解决的是要使得`Next.js`支持less。

## 移除`Next.js`默认样式配置
在`next.config.js`文件中增加
```js
const { removeDefaultStyleRules } = require('./tools/next-plugins/css')

....
module.exports = withPlugins([], {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN
  },
  webpack: function (config, ctx) {
    ...
    // 新增移除默认style配置
    removeDefaultStyleRules(config)
    ...

    return config
  },
})
```

## 增加`less`设置
在`next.config.js`文件中增加
```js
const { recss } = require('./tools/next-plugins/less')

....
module.exports = withPlugins([], {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN
  },
  webpack: function (config, ctx) {
    ...
    removeDefaultStyleRules(config)
    // 新增less配置
    recss(config, ctx, {
      javascriptEnabled: true,
      modifyVars: {
        // TODO: configure theme varaibles
        // 'primary-color': '#1DA57A',
        // 'link-color': '#1DA57A',
        // 'border-radius-base': '2px'
      } // make your antd custome effective
    })
    ...

    return config
  },
})
```

## 增加`antd`设置
在`next.config.js`文件中增加
```js
const { antd } = require('./tools/next-plugins/antd')

....
module.exports = withPlugins([], {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN
  },
  webpack: function (config, ctx) {
    ...
    // 新增antd配置
    antd(config, ctx)
    ...

    return config
  },
})
```

