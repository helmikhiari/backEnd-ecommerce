const path = require('path');

module.exports = {
    entry: './server.js',  // Update the entry point to your main file
    output: {
        path: path.resolve(__dirname, 'dist'),  // Output directory
        filename: 'main.js',                    // Output filename
    },
    resolve: {
        extensions: ['.js', '.json'],           // Extensions to resolve
    },
    module: {
        rules: [
            // Loaders for different file types, if needed
        ],
    },
    target: 'node',                           // Ensures Webpack treats it as a Node.js app
};
