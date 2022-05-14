const { ESLINT_MODES } = require('@craco/craco')

module.exports = {
  eslint: {
    mode: ESLINT_MODES.file,
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => ({
      ...webpackConfig,
      entry: {
        main: [env === 'development'
          && require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndexJs].filter(Boolean),
        content: './src/chrome/content.js',
        background: './src/chrome/background.js',
        customTooltip: './src/chrome/customTooltip.js',
        webcomponents: './node_modules/@webcomponents/custom-elements/custom-elements.min.js',
      },
      output: {
        ...webpackConfig.output,
        filename: 'static/js/[name].js',
      },
      optimization: {
        ...webpackConfig.optimization,
        runtimeChunk: false,
      },
    }),
  },
}
