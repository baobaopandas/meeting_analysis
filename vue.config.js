const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:3000/api/', //接口域名
        // target: 'http://8.142.25.8:5000', //接口域名
        // target: 'http://127.0.0.1:5000', //接口域名
        target: 'http://124.222.217.145:8081',
        changeOrigin: true,             //是否跨域
        ws: true,                       //是否代理 websockets
        secure: false,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/api': ''
        },
        // router:() =>{
        //   return fs.readFileSync(process.cwd() + '/target.env','utf8');
        // }
      },
    }
  },
  baseUrl: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('cmpt', resolve('src/components'))
      .set('comm', resolve('src/components/common'))
      .set('mixins', resolve('src/mixins'))
      .set('images', resolve('src/assets/images'))
      .set('video', resolve('src/assets/video'));
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: path.resolve('src/assets/css/variables.scss')
        })
        .end();
    });



    const FILE_RE = /\.(vue|js|ts|svg)$/;

    // Use vue-cli's default rule for svg in non .vue .js .ts files
    config.module.rule("svg").issuer(file => !FILE_RE.test(file));

    // Use our loader to handle svg imported by other files
    config.module
        .rule("svg-component")
        .test(/\.svg$/)
        .issuer(file => FILE_RE.test(file))
        .use("vue")
        .loader("vue-loader")
        .end()
        .use("svg-to-vue-component")
        .loader("svg-to-vue-component/loader");


  },







  configureWebpack: {
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }]
    }
  }

};
