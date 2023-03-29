const pck = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: ['./src/index.ts'],
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    output: {
        path: __dirname,
        filename: `./${pck.name}.min.js`,
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};