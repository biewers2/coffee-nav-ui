module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['expo-router/babel']
      },
      development: {
        plugins: ['expo-router/babel']
      }
    }
  };
};
