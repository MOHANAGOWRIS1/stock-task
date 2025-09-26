// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// module.exports = withModuleFederationPlugin({

//   name: 'stock-price',

//   exposes: {
//     './Component': './src\app\app.ts',
   
//   },

//   shared: {
//     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//   },

// });


// stock-price/webpack.config.js
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'stock-price',
  filename: 'remoteEntry.js',
  exposes: {
    './Component': './src/app/app.ts',   // expose the standalone component
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

