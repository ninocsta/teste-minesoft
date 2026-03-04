const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');
const path = require('path');

const mfConfig = withModuleFederationPlugin({
  remotes: {
    financeiro: 'http://localhost:4201/remoteEntry.js',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

// Permite editar o manifest em runtime sem acionar recompilacao/reload do shell no dev server.
const ignoredManifestWatch = [
  path.resolve(__dirname, 'src/assets/config/mf.manifest.json'),
  '**/src/assets/config/mf.manifest.json',
];

mfConfig.watchOptions = {
  ignored: ignoredManifestWatch,
};

mfConfig.devServer = {
  ...(mfConfig.devServer || {}),
  static: {
    ...(mfConfig.devServer?.static || {}),
    watch: {
      ignored: ignoredManifestWatch,
    },
  },
};

module.exports = mfConfig;
