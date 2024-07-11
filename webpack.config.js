const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx', // Ensure this path is correct
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Add .tsx and .ts extensions
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match both .ts and .tsx files
        use: {
            loader: 'ts-loader',
            options: {
              allowTsInNodeModules: true, // Enable this option
            },
          },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Match .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
      {
        test: /\.(png|jpg|gif)$/, // Match image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // Preserve the original file name and path
            },
          },
        ],
      },
      {
        test: /\.svg$/, // Match .svg files
        use: 'svg-url-loader', // Use svg-url-loader
      },
    ],
  },
  // ... other configurations ...
};