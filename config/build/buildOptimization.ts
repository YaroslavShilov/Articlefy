import { BuildOptions } from './types';
import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

const getNodeModulesRegExp = (deps: string[]): RegExp => new RegExp(`[\\\\/]node_modules[\\\\/](${deps.join('|')})`);
const excludeNodeModulesRegExp = (deps: string[]): RegExp =>
  new RegExp(`[\\\\/]node_modules[\\\\/](?!(${deps.length ? deps.join('|') : 'no module'})).*`);

const deps: Record<string, string[]> = { react: ['react', 'react-dom', 'react-router-dom'], moment: ['moment'] };
const allDeps: string[] = Object.keys(deps).reduce((acc: string[], key: string) => acc.concat(deps[key]), []);

interface CacheGroup {
  test: RegExp;
  name: string;
  chunks: 'all';
}

const getCacheGroup = (name: string, exclude?: boolean): CacheGroup => ({
  test: exclude ? excludeNodeModulesRegExp(allDeps) : getNodeModulesRegExp(deps[name]),
  name,
  chunks: 'all',
});

export const buildOptimization = ({ mode }: BuildOptions): Configuration['optimization'] => {
  const isProd = mode === 'production';
  let optimization = {};

  if (isProd) {
    optimization = {
      minimize: true,
      minimizer: [new TerserPlugin()],
      runtimeChunk: { name: 'runtime' },
      splitChunks: {
        cacheGroups: {
          moduleIds: 'deterministic',
          runtimeChunk: 'single',
          react: getCacheGroup('react'),
          moment: getCacheGroup('moment'),
          vendor: getCacheGroup('vendor', true),
          /*
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
          */
        },
      },
    };
  }

  return optimization;
};
