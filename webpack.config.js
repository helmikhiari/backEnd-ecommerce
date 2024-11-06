module.exports = {
    entry: './server.js',  // Update the entry point to your main file
    output: {
        path: path.resolve(__dirname, 'dist'),  // Output directory
        filename: 'main.js',                    // Output filename
        filename: 'main.js',                       // Output filename
    },
    resolve: {
        extensions: ['.js', '.json'],
    }
}    