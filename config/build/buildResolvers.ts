import {Configuration} from 'webpack';
import {BuildOptions} from './types/types';

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        // to prepare file extensions
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.src
        }
    }
}