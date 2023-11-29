import { Configuration } from 'webpack-dev-server';
import { BuildOptions } from './types';

export const buildDevServer = ({ paths, port }: BuildOptions): Configuration => ({
  static: paths.output, //path.resolve(__dirname, '..', 'build'),
  port: port || 3000, // use npm run start port=8000
  hot: true,
  open: true,
  compress: true,
  historyApiFallback: true, // for react-router
});
