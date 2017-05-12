module.exports = {
    entry: './src/react-delayed.js',
    output: {
        path: __dirname + '/dist',
        filename: 'react-delayed.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        'react': {
            commonjs2: 'react',
        },
        'react-dom':{
            commonjs2: 'react-dom',
        }
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
