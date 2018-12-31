const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const htmlWebpack = new htmlWebpackPlugin({
    template: './public/index.html', 
    filename: 'index.html'
});

const hotModuleReplacement = new webpack.HotModuleReplacementPlugin();

module.exports = {
    mode: 'development', 
    devServer: {
        hot: true, //to enable hot reload
        contentBase: './dist', 
        historyApiFallback: true //to fix react router refresh error
    }, 
    entry: ['@babel/polyfill', './src/index.js'], 
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'main.js', 
        publicPath: '/'
    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader'
            }, 
            {
                test: /\.(css|sass|scss)?$/, 
                use: [
                    {
                        loader: 'style-loader'
                    }, 
                    {
                        loader: 'css-loader', 
                        options: {
                            modules: true, 
                            sourceMap: true, 
                            importLoaders: 1, 
                            localIdentName: "[name]_[local]_[hash:base64]"
                        }
                    }, 
                    {
                        loader: 'sass-loader'
                    }
                ]
            }, 
            {
                test: /\.html$/, 
                use: ['html-loader']
            }, 
            {
                test: /\.(jpg|png|gif|svg)/, 
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          outputPath: 'assets/images'                        
                        }                
                    }
                ]
            }, 
            {
                test: /\.(ttf|woff)/, 
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          outputPath: 'assets/fonts'                        
                        }                
                    }
                ]
            }
        ]
    }, 
    plugins: [htmlWebpack, hotModuleReplacement]
}