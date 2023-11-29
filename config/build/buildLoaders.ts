import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types';
import ReactRefreshTypeScript from 'react-refresh-typescript';

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const isDev = options.mode === 'development';

  const jsLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
        }),
        transpileOnly: isDev,
      },
    },
  };

  const fontsLoader = {
    test: /\.(woff(2)?|ttf|eot|)$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[contenthash:10][ext]',
    },
  };

  const imageLoader = {
    test: /\.(jpe?g|png|svg|webp)$/,
    generator: {
      filename: 'img/[contenthash:10][ext]',
    },
    use: [
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
    ],
    type: 'asset/resource',
  };

  return [jsLoader, tsLoader, fontsLoader, imageLoader];
};
