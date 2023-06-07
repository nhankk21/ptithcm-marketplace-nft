module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.js', '.jsx', '.json', '.svg', '.png', '.ttf'],
          alias: {
            '@components': './components',
            '@assets': './assets',
            '@hooks': './hooks',
            '@constants': './constants',
            '@hoc': './hoc',
            '@screens': './screens',
            '@services': './services',
            '@utils': './utils',
          },
        },
      ],
    ],
  };
};
