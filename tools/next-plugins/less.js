const path = require('path')
const { loader } = require('next/dist/build/webpack/config/helpers')
const {
  getCssModuleLoader,
  getGlobalCssLoader
} = require('next/dist/build/webpack/config/blocks/css/loaders')
const {
  getGlobalImportError,
  getGlobalModuleImportError
} = require('next/dist/build/webpack/config/blocks/css/messages')

function getDefaultPlugins(baseDirectory, isProduction) {
  let browsers
  try {
    browsers = browserslist.loadConfig({
      path: baseDirectory,
      env: isProduction ? 'production' : 'development'
    })
  } catch {}

  return [
    require.resolve('next/dist/compiled/postcss-flexbugs-fixes'),
    [
      require.resolve('next/dist/compiled/postcss-preset-env'),
      {
        browsers: browsers || ['defaults'],
        autoprefixer: {
          // Disable legacy flexbox support
          flexbox: 'no-2009'
        },
        // Enable CSS features that have shipped to the
        // web platform, i.e. in 2+ browsers unflagged.
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ]
  ]
}

// const rootDirectory = __dirname;
const customAppFile = path.resolve(__dirname, '../', 'pages/_app.tsx')
// const assetPrefix = '';

// RegExps for all Style Sheet variants
const regexLikeCss = /\.(css|less)$/

// RegExps for Style Sheets
const regexCssGlobal = /(?<!\.module)\.css$/
const regexCssModules = /\.module\.css$/
// RegExps for Syntactically Awesome Style Sheets
const regexLessGlobal = /(?<!\.module)\.less$/
const regexLessModules = /\.module\.less$/

const pipe = (...fns) => param =>
  fns.reduce((result, next) => next(result), param)

const recss = function recss(config, nextConfig, lessOptions) {
  const ctx = {
    rootDirectory: nextConfig.dir,
    customAppFile,
    assetPrefix: nextConfig.config.assetPrefix,
    isDevelopment: nextConfig.dev,
    isProduction: !nextConfig.dev,
    isServer: nextConfig.isServer,
    isClient: !nextConfig.isServer
  }

  const lessPreprocessors = [
    // First, process files with `sass-loader`: this inlines content, and
    // compiles away the proprietary syntax.
    {
      loader: require.resolve('less-loader'),
      options: {
        // Source maps are required so that `resolve-url-loader` can locate
        // files original to their source directory.
        sourceMap: true,
        lessOptions
      }
    },
    // Then, `sass-loader` will have passed-through CSS imports as-is instead
    // of inlining them. Because they were inlined, the paths are no longer
    // correct.
    // To fix this, we use `resolve-url-loader` to rewrite the CSS
    // imports to real file paths.
    {
      loader: require.resolve('resolve-url-loader'),
      options: {
        // Source maps are not required here, but we may as well emit
        // them.
        sourceMap: true
      }
    }
  ]

  const postCssPlugins = getDefaultPlugins(
    ctx.rootDirectory,
    ctx.isProduction,
    // TODO: In the future, we should stop supporting old CSS setups and
    // unconditionally inject ours. When that happens, we should remove this
    // function argument.
    true
  )

  const fns = []

  // CSS Modules support must be enabled on the server and client so the class
  // names are available for SSR or Prerendering.
  fns.push(
    loader({
      oneOf: [
        {
          // CSS Modules should never have side effects. This setting will
          // allow unused CSS to be removed from the production build.
          // We ensure this by disallowing `:global()` CSS at the top-level
          // via the `pure` mode in `css-loader`.
          sideEffects: false,
          // CSS Modules are activated via this specific extension.
          test: regexCssModules,
          // CSS Modules are only supported in the user's application. We're
          // not yet allowing CSS imports _within_ `node_modules`.
          issuer: {
            and: [ctx.rootDirectory],
            not: [/node_modules/]
          },
          use: getCssModuleLoader(ctx, postCssPlugins)
        }
      ]
    })
  )

  fns.push(
    loader({
      oneOf: [
        // Opt-in support for Sass (using .scss or .sass extensions).
        {
          // Sass Modules should never have side effects. This setting will
          // allow unused Sass to be removed from the production build.
          // We ensure this by disallowing `:global()` Sass at the top-level
          // via the `pure` mode in `css-loader`.
          sideEffects: false,
          // Sass Modules are activated via this specific extension.
          test: regexLessModules,
          // Sass Modules are only supported in the user's application. We're
          // not yet allowing Sass imports _within_ `node_modules`.
          issuer: {
            and: [ctx.rootDirectory],
            not: [/node_modules/]
          },
          use: getCssModuleLoader(ctx, postCssPlugins, lessPreprocessors)
        }
      ]
    })
  )

  if (ctx.isServer) {
    fns.push(
      loader({
        oneOf: [
          {
            test: [regexCssGlobal, regexLessGlobal],
            use: require.resolve('next/dist/compiled/ignore-loader')
          }
        ]
      })
    )
  } else {
    fns.push(
      loader({
        oneOf: [
          {
            // A global CSS import always has side effects. Webpack will tree
            // shake the CSS without this option if the issuer claims to have
            // no side-effects.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
            test: regexCssGlobal,
            // We only allow Global CSS to be imported anywhere in the
            // application if it comes from node_modules. This is a best-effort
            // heuristic that makes a safety trade-off for better
            // interoperability with npm packages that require CSS. Without
            // this ability, the component's CSS would have to be included for
            // the entire app instead of specific page where it's required.
            // include: { and: [/node_modules/] },
            // // Global CSS is only supported in the user's application, not in
            // // node_modules.
            // issuer: {
            //   and: [ctx.rootDirectory],
            //   not: [/node_modules/],
            // },
            use: getGlobalCssLoader(ctx, postCssPlugins)
          }
        ]
      })
    )

    fns.push(
      loader({
        oneOf: [
          {
            // A global CSS import always has side effects. Webpack will tree
            // shake the CSS without this option if the issuer claims to have
            // no side-effects.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
            test: regexLessGlobal,
            // include: { and: [/node_modules/] },
            // Global CSS is only supported in the user's application, not in
            // node_modules.
            // issuer: {
            //   and: [ctx.rootDirectory],
            //   not: [/node_modules/],
            // },
            // issuer: { and: [ctx.customAppFile] },
            use: getGlobalCssLoader(ctx, postCssPlugins, lessPreprocessors)
          }
        ]
      })
    )

    // if (ctx.customAppFile) {
    //   fns.push(
    //     loader({
    //       oneOf: [
    //         {
    //           // A global CSS import always has side effects. Webpack will tree
    //           // shake the CSS without this option if the issuer claims to have
    //           // no side-effects.
    //           // See https://github.com/webpack/webpack/issues/6571
    //           sideEffects: false,
    //           test: regexCssGlobal,
    //           issuer: { and: [ctx.customAppFile] },
    //           use: getGlobalCssLoader(ctx, postCssPlugins),
    //         },
    //       ],
    //     })
    //   );
    //   fns.push(
    //     loader({
    //       oneOf: [
    //         {
    //           // A global Sass import always has side effects. Webpack will tree
    //           // shake the Sass without this option if the issuer claims to have
    //           // no side-effects.
    //           // See https://github.com/webpack/webpack/issues/6571
    //           sideEffects: false,
    //           test: regexLessGlobal,
    //           issuer: { and: [ctx.customAppFile] },
    //           use: getGlobalCssLoader(ctx, postCssPlugins, lessPreprocessors),
    //         },
    //       ],
    //     })
    //   );
    // }
  }

  // Throw an error for Global CSS used inside of `node_modules`
  fns.push(
    loader({
      oneOf: [
        {
          test: [regexCssGlobal, regexLessGlobal],
          issuer: { and: [/node_modules/] },
          use: {
            loader: 'error-loader',
            options: {
              reason: getGlobalModuleImportError()
            }
          }
        }
      ]
    })
  )

  // Throw an error for Global CSS used outside of our custom <App> file
  fns.push(
    loader({
      oneOf: [
        {
          test: [regexCssGlobal, regexLessGlobal],
          use: {
            loader: 'error-loader',
            options: {
              reason: getGlobalImportError(
                ctx.customAppFile &&
                  path.relative(ctx.rootDirectory, ctx.customAppFile)
              )
            }
          }
        }
      ]
    })
  )

  if (ctx.isClient) {
    // Automatically transform references to files (i.e. url()) into URLs
    // e.g. url(./logo.svg)
    fns.push(
      loader({
        oneOf: [
          {
            // This should only be applied to CSS files
            issuer: regexLikeCss,
            // Exclude extensions that webpack handles by default
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            use: {
              // `file-loader` always emits a URL reference, where `url-loader`
              // might inline the asset as a data URI
              loader: require.resolve('next/dist/compiled/file-loader'),
              options: {
                // Hash the file for immutable cacheability
                name: 'static/media/[name].[hash].[ext]'
              }
            }
          }
        ]
      })
    )
  }

  const fn = pipe(...fns)
  return fn(config)
}

module.exports = { recss }
