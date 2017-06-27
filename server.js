let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config');

if (process.env && process.env.PORT) {
  let express = require('express');
  let app = express();

  app.use(express.static(__dirname + '/'));

  app.listen(process.env.PORT || 8080);
}
else {
  new WebpackDevServer(webpack(config),{publicPath: '/build/'}).listen(8080, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:8080');
  });
}