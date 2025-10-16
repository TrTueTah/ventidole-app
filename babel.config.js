module.exports = {
  presets: ['module:@react-native/babel-preset'],
};
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['babel-plugin-styled-components', {
      displayName: true,
      ssr: false,
    }],
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          screens: './src/screens',
          assets: './src/assets',
          navigator: './src/navigator',
          constants: './src/constants',
          typescript: './src/typescript',
          components: './src/components',
          hooks: './src/hooks',
          helpers: './src/helpers',
          api: './src/api',
          contexts: './src/contexts',
          redux: './src/redux',
        },
      },
    ],

    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: process.env.ENV_FILE || '.env',
        blocklist: null,
        allowlist: null,
        blacklist: null, // DEPRECATED
        whitelist: null, // DEPRECATED
        safe: false,
        allowUndefined: false,
        verbose: false,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
