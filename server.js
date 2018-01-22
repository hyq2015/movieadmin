var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
// var webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config')

// var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, { 
//   noInfo: true, 
//   publicPath: config.output.publicPath,
//   proxy:{
//         '/alpha/api/': {
//             target: 'http://42.159.244.26',
//             changeOrigin: true,
//             pathRewrite: {'^/alpha/api/' : '/alpha/api/'},
//           }
//     }
// }))
new WebpackDevServer(compiler, config.devServer)
.listen(port, '192.168.31.204', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + port);
});
// app.use(webpackHotMiddleware(compiler))

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

// app.listen(port, function(error) {
//   if (error) {
//     console.error(error)
//   } else {
//     console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
//   }
// })
