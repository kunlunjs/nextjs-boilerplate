const path = require('path')
const withPlugins = require('next-compose-plugins')

const { removeDefaultStyleRules } = require('./tools/next-plugins/css')
const { recss } = require('./tools/next-plugins/less')
const { antd } = require('./tools/next-plugins/antd')
const { alias } = require('./tools/next-plugins/alias')

const isProd = process.env.NODE_ENV === 'production'

module.exports = withPlugins([], {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN
  },
  webpack: function (config, ctx) {
    removeDefaultStyleRules(config)
    recss(config, ctx, {
      javascriptEnabled: true,
      modifyVars: {
        // TODO: configure theme varaibles
        // 'primary-color': '#1DA57A',
        // 'link-color': '#1DA57A',
        // 'border-radius-base': '2px'
      } // make your antd custome effective
    })
    antd(config, ctx)
    alias(config, {
      '@': path.resolve(__dirname, 'src'),
      '@/styles': path.resolve(__dirname, 'src/styles')
    })

    return config
  }
})
