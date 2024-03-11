import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, {DefinePlugin} from 'webpack';
import type {Configuration} from "webpack";
import {BuildOptions} from './types/types';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    const plugins: Configuration['plugins'] = [
        // the link to the html template file (folder, file)
        new HtmlWebpackPlugin({
            template: options.paths.html,
            favicon: path.resolve(options.paths.public, 'favicon.ico')
        }),
        // default global webpack variables
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(options.platform),
            __ENV__: JSON.stringify(options.mode)
        }),
        // typechecking is executed in another process
        new ForkTsCheckerWebpackPlugin()
    ];

    if (isDev) {
        plugins.push(
            // to show progress
            new webpack.ProgressPlugin(),
            new ReactRefreshWebpackPlugin()
        );
    }

    if (isProd) {
        plugins.push(
            // to separate css from JavaScript and save chunks to css folder
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            }),
            options.analyzer && new BundleAnalyzerPlugin(),
            // to move files from current place to new one
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(options.paths.public, 'localize'),
                        to: path.resolve(options.paths.output, 'localize')
                    },
                ],
              }),
        );
    }
    
    return plugins.filter(Boolean);
}