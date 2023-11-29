import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';

export const buildPlugins = ({ mode, paths, analyzer }: BuildOptions): Configuration['plugins'] => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new ESLintWebpackPlugin(),
    new WebpackManifestPlugin({}),
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
  ];

  if (isDev) {
    plugins.push(new ForkTsCheckerWebpackPlugin(), new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[contenthash:10].css',
        chunkFilename: 'css/[contenthash:10].css',
      }),
    );
  }

  if (analyzer) {
    // use npm run start analyzer=true
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
