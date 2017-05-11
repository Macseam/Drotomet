let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config');

new WebpackDevServer(webpack(config),{publicPath: '/build/'}).listen(8080, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:8080');
    });