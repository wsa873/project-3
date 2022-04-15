const path = require('path');

module.exports = {
    entry: {
        app: './client/maker.jsx',
        login: './client/login.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    //mapbox has compatibility issues with babel. this
                    //makes it so babel skips over mapbox entirely when transpiling
                    options :{
                        ignore: [ './node_modules/mapbox-gl/dist/mapbox-gl.js' ]
                    }
                },
            },
        ],
    },
    mode: 'development',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};