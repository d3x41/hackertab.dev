const path = require('path')

function isDevelopmentEnv() {
  return process.env.NODE_ENV === 'development'
}

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: {
      output: {
        filename: 'static/js/[name].js',
      },
      optimization: {
        runtimeChunk: isDevelopmentEnv(),
        splitChunks: {
          chunks(chunk) {
            return isDevelopmentEnv()
          },
        },
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          if (isDevelopmentEnv()) {
            return webpackConfig
          }

          let mcep
          webpackConfig.plugins.some((p) => {
            if (p.constructor.name === 'MiniCssExtractPlugin') {
              mcep = p
              return true
            }
          })
          if (mcep) {
            mcep.options.filename = 'static/css/[name].css'
          }

          return webpackConfig
        },
      },
      options: {},
    },
  ],
}
