import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {BuildOptions} from "./types/types";

export function buildDevServer(option: BuildOptions): DevServerConfiguration {
    return {
        port: option.port ?? 3000,
        open: true,
        // it works only for development
        historyApiFallback: true,
        // hot module replacement to refresh the page without reloading
        hot: true,
    };
}