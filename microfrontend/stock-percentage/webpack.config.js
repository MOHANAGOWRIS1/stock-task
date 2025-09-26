// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// module.exports = withModuleFederationPlugin({

//   name: 'stock-percentage',

//   exposes: {
//     './Component': './src\app\app.ts',
//   },

//   shared: {
//     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//   },

// });



// stock-percentage/webpack.config.js
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    'stock-price': 'http://localhost:4201/remoteEntry.js',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
