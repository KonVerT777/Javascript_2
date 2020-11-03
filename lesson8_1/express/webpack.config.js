const path = require('path');


module.exports = {
  entry: {
      main: "./public/index.js"
  },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "bundle.js"
    },
}