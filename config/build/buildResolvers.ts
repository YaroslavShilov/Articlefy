import { Configuration } from 'webpack';
import { BuildOptions } from './types';

export const buildResolvers = (options: BuildOptions): Configuration['resolve'] => ({
  extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  alias: {
    '@': options.paths.src,
  },
});
