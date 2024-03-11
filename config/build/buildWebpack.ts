import webpack from 'webpack';
import {buildDevServer} from './buildDevServer';
import {buildLoaders} from './buildLoaders';
import {buildPlugins} from './buildPlugins';
import {buildResolvers} from './buildResolvers';
import {BuildOptions} from './types/types';

export function buildWebPack(options: BuildOptions): webpack.Configuration {
    const isDev = options.mode === 'development';

    return {
        mode: options.mode ?? 'development',
        // The entry point
        entry: options.paths.entry,
        output: {
            path: options.paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            // the rules order is important
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: 'eval-cheap-source-map',
        devServer: isDev ? buildDevServer(options) : undefined
    };
}