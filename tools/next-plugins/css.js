const regexLikeCss = /\.(css|scss|sass)$/.toString()
// RegExps for Style Sheets
const regexCssGlobal = /(?<!\.module)\.css$/.toString()
const regexCssModules = /\.module\.css$/.toString()
// RegExps for Syntactically Awesome Style Sheets
const regexSassGlobal = /(?<!\.module)\.(scss|sass)$/.toString()
const regexSassModules = /\.module\.(scss|sass)$/.toString()

const defaultStyleTesters = [
  regexLikeCss,
  regexCssGlobal,
  regexCssModules,
  regexSassGlobal,
  regexSassModules
]

const isDefaultStyleRules = rule => {
  const { test, issuer } = rule

  if (Array.isArray(test)) {
    const testExprs = test.map(t => t.toString())
    return !!defaultStyleTesters.find(t => testExprs.includes(t))
  }

  if (test) {
    return defaultStyleTesters.includes(test.toString())
  }

  if (issuer) {
    return defaultStyleTesters.includes(issuer.toString())
  }

  return false
}

const findOneOfRules = rules => {
  return rules.filter(rule => !!rule.oneOf)
}

const removeDefaultStyleRules = webpackConfig => {
  const rules = webpackConfig.module.rules
  const oneOfRules = findOneOfRules(rules)

  oneOfRules.forEach(oneOfRule => {
    // Remove all default style settings exceppt minicss
    oneOfRule.oneOf = oneOfRule.oneOf.filter(rule => !isDefaultStyleRules(rule))
  })
}

module.exports = { removeDefaultStyleRules }
