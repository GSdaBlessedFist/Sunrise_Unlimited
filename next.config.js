// next.config.js
module.exports = {
    webpack(config, { isServer }) {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'static/fonts/',
            publicPath: '/_next/static/fonts/',
            name: '[name].[ext]',
          },
        },
      });
  
      return config;
    },
  };
  