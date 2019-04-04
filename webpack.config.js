const path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	//__dirname动态获取当前文件模块所属目录的绝对路径
	//__filename可以获取当前文件的绝对路径
	entry:path.join(__dirname,'./src/main.js'),
	output:{
		path:path.join(__dirname,'./dist/'),
		filename:'bundle.js'	//指定输出文件的名称
	},
	resolve:{
		alias:{
			//修改Vue被导入的路径
			"vue$":"vue/dist/vue.js",
			"@u": path.resolve("src/utils"),
			"@c": path.resolve("src/components"),
			"@v": path.resolve("src/view"),
			"@s": path.resolve("src/"),
		}
	},
	//该节点用于所有第三方模块加载器
	module:{
		rules:[
            {test: /\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test: /\.(jpg|png|gif|bmp|jpeg)$/,use:['url-loader?limit=17631&name=[hash:8]-[name].[ext]']},
            {test: /\.css$/,use:['style-loader','css-loader']},
			{test:/.vue$/,use:'vue-loader'},
			{test: /\.js$/,use:'babel-loader',exclude:/node_modules/ },
			{test: /\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'}
		]
	},
	plugins:[
		new VueLoaderPlugin(),
/* 		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./dll/manifest.json')
		}), */
		//配置热更新模块对象
		new webpack.HotModuleReplacementPlugin(),
		new htmlWebpackPlugin({
			template:path.join(__dirname,'./src/index.html'),
			//指定模板对象 将来根据指定的页面路径 去生成内存中的页面
			filename:'index.html'
		}),
		// 将react切换到产品环境
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		host:'localhost',
		port:3000,
        proxy: {
          '/api': { // api表示当前项目请求的key
            target: 'http://localhost:8080', // 代理服务器路径
			pathRewrite: {'^/api' : '/'}, // 重写路径
			secure: false, // 接受 运行在 https 上的服务
			changeOrigin: true,
			https: false
		  },
		  '/listen': { // api表示当前项目请求的key
            target: 'http://api.xfyun.cn/v1/service/v1/tts', // 代理服务器路径
			pathRewrite: {'^/listen' : '/'}, // 重写路径
			secure: false, // 接受 运行在 https 上的服务
			changeOrigin: true,
			https: false
		  },
		  '/user': { // api表示当前项目请求的key
            target: 'http://localhost:8081', // 代理服务器路径
			pathRewrite: {'^/user' : '/'}, // 重写路径
			secure: false, // 接受 运行在 https 上的服务
			changeOrigin: true,
			https: false
		  },
		},
		hot:true
     }
}