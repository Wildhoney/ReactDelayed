module.exports = {
    entry: ['babel-polyfill', './example/js/default.js'],
    output: {
        path: __dirname + '/example/js',
        filename: 'build.js',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};
