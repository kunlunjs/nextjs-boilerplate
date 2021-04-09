const alias = (config, aliasMap) => {
  config.resolve.alias = Object.assign(config.resolve.alias, aliasMap)
}

module.exports = { alias }
