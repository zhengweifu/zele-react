const path = require('path');
const fs = require('fs');

let webpackConfig = [
    "var webpack = require('webpack');",
    "var path = require('path');",
    "var HtmlWebpackPlugin = require('html-webpack-plugin');"
    "module.exports = {",
    "    resolve: {",
    "        extensions: ['*', '.js', '.jsx', '.css', '.scss', 'jpg', 'png']",
    "    },",
    "    externals: {",
    "        'react': 'React',",
    "        'react-dom': 'ReactDOM'",
    "    },",
    "    module: {",
    "        rules: [{",
    "            test: /\.(js|jsx)$/,",
    "            exclude: /(node_modules)/,",
    "            use: [{",
    "                loader: 'babel-loader',",
    "                options: {",
    "                    presets: [['es2015', {modules: false}], 'react', 'stage-0'],",
    "                    plugins: ['syntax-dynamic-import']",
    "                }",
    "            }]",
    "        }, {",
    "            test: /\.css$/,",
    "            use: ['style-loader', 'css-loader']",
    "        }, {",
    "            test: /\.(jpg|png|eot|svg|ttf|woff|woff2)$/,",
    "            use: 'file-loader?name=assets/[hash:8].[name].[ext]'",
    "        }]",
    "    },",
    "    plugins: [",
    "        new webpack.NoEmitOnErrorsPlugin(),"
    "        new HtmlWebpackPlugin({hash: true, template: '../src/index.html'}),"
];

let defaultEntry = {
	'js/3dcity/ring/01/ZRing': path.resolve(__dirname, '../../diy/js/3dcity/ring/01/ZRing.js')
};

const argvs = process.argv.splice(2);

if(argvs[0] === '0') { // 0 => 本地编译, 1 => 服务器编译
    webpackConfig.push(
        "        new webpack.DefinePlugin({'process.env.NODE_ENV': undefined})",
        "    ],",
        "    devtool: 'inline-source-map', /*eval-source-map*/",
        "    output:{",
        "        path: path.resolve(__dirname, '../dist'),",
        "        filename: '[name].bundle.js'",
        "    },"
    );
} else if(argvs[0] === '1') {
    webpackConfig.push(
        "        //new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),",
        "        new webpack.DefinePlugin({'process.env.NODE_ENV': '\"production\"'}),",
        "        new webpack.optimize.UglifyJsPlugin({compressor: {pure_getters: true,unsafe: true,unsafe_comps: true,screw_ie8: true,warnings: false}})",
        "    ],",
        "    devtool: 'inline-source-map', /*eval-source-map*/",
        "    output:{",
        "        path: path.resolve(__dirname, '../dist'),",
        "        filename: '[name].server.bundle.js'",
        "    },"
    );
}

if(argvs[1] !== undefined) {
	defaultEntry = JSON.parse(argvs[1]);
}

const isWatch = !!eval(argvs[2]);

((entry = defaultEntry) => {
    webpackConfig.push(
        "    entry: " + JSON.stringify(defaultEntry),
        "};"
    );

    const configFile = path.resolve(__dirname, './webpack.zeleDoc.config.js');

    fs.writeFile(configFile, webpackConfig.join('\n'), 'utf8', error => {
        if (error) throw error;
        const childProcess = require('child_process');
        let child;
        if(isWatch) {
            child = childProcess.execFile('webpack', ['--config', 'webpack.zeleDoc.config.js', '-w', '--colors']);
        } else {
            child = childProcess.execFile('webpack', ['--config', 'webpack.zeleDoc.config.js', '--colors']);
            // let child = childProcess.execFile('ls');
        }
        child.stdout.on('data', function(data) {
            console.log(`stdout: ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
})();