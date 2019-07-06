const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
          {
			test: /\.js$/,
			exclude: /node_modules/,
            use: {loader: 'babel-loader'}
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
          },
          {
            test: /\.hbs/,
            loader: 'handlebars-loader'
       	  },{
            test: /\.(jpg|png|gif)$/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath:'img/'
                    }  
                  }]
           }

        ]
    },
    plugins: [
		new ExtractTextPlugin("styles.css"),
		/*new HtmlWebpackPlugin({
			inject: false,
			hash: true,
			template: './index.html',
			filename: 'index.html'
		  })*/
    ]   
};

module.exports = (env, options) => {
    conf.devtool = options.mode === "production" ?
		false : "cheap-module-eval-source-map";
    return conf;
};