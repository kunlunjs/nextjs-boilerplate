const antd = (config, ctx) => {
  // antd
  if (ctx.isServer) {
    const antdStyles = /antd\/.*?\/style.*?/
    const rawExternals = [...config.externals]
    config.externals = [
      (context, request, callback) => {
        if (request.match(antdStyles)) {
          return callback()
        }
        if (typeof rawExternals[0] === 'function') {
          rawExternals[0](context, request, callback)
        } else {
          callback()
        }
      },
      ...(typeof rawExternals[0] === 'function' ? [] : rawExternals)
    ]

    config.module.rules = [
      {
        test: antdStyles,
        use: 'null-loader'
      },
      ...config.module.rules
    ]
  }
}

module.exports = { antd }
