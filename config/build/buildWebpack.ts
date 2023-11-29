import { Configuration } from 'webpack';
import { BuildOptions } from './types';
import { buildDevServer } from './buildDevServer';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildOptimization } from './buildOptimization';

export const buildWebpack = (options: BuildOptions): Configuration => {
  const { mode, paths } = options;
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  return {
    entry: paths.entry,
    mode: mode,
    target: isDev ? 'web' : 'browserslist',
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: buildDevServer(options),

    output: {
      path: paths.output,
      filename: '[name].[contenthash:10].js',
      chunkFilename: '[name].[contenthash:10].chunk.js',
      clean: true,
    },

    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(options),
    },

    resolve: buildResolvers(options),

    optimization: buildOptimization(options),
    performance: {
      // hints: isProd && 'error',
    },
  };
};
