/**
 * Created by Administrator on 2017/4/1.
 */
let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// let ExtractTextPlugin = require('extract-text-webpack-plugin');
let BowerWebpackPlugin = require('bower-webpack-plugin');
let CompressionWebpackPlugin = require('compression-webpack-plugin');
let webpack = require('webpack');
// console.log(path.join(__dirname, '/src/index1.html'));
// console.log(path.posix.join('static', 'css/all.css'));
console.log(path.join(__dirname, '/src/'))
module.exports = {
    entry: {
        app: './index',
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.sass/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
            },
            {
                test: /\.styl/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=10000&name=static/images/[name][hash:7].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)\??.*$/,
                loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                loaders: [
                    'babel?' + JSON.stringify({
                        plugins: [
                            'transform-runtime'
                        ],
                        presets: ['es2015', 'react', 'stage-0'],
                    })
                ],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        }),
        new webpack.optimize.DedupePlugin(),
        // new ExtractTextPlugin(path.posix.join('static', 'css/all.css')),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'vendor1']
        // }),

        new BowerWebpackPlugin({
            searchResolveModulesDirectories: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            },
            sourceMap: false,
            mangle: false
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                ['js', 'css'].join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname,'/src'),
                to: path.join(__dirname,'/dist/src')
            }
        ]),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, '/dist/index.html'),
            template: path.join(__dirname, '/index1.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // chunksSortMode: 'dependency'
        }),
        new webpack.NoErrorsPlugin()


    ],
    resolve: {
        extensions: ['', '.web.js', '.jsx', '.js', '.json', '.less']
    }
};
