var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.scss', 'jpg', 'png']
    },
    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM'
    },
    module: {
        rules: [{
            test: /.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}], 'react', 'stage-0'],
                    plugins: ['syntax-dynamic-import']
                }
            }]
        }, {
            test: /.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /.(jpg|png|eot|svg|ttf|woff|woff2)$/,
            use: 'file-loader?name=assets/[hash:8].[name].[ext]'
        }]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({hash: true, template: '../src/index.html'}),
        new webpack.DefinePlugin({'process.env.NODE_ENV': undefined})
    ],
    devtool: 'inline-source-map', /*eval-source-map*/
    output:{
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    entry: {"doc":"../src/App.js"}
};